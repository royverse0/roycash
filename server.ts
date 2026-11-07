import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// PostgreSQL Connection Pool
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/roycash';
const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // relaxed for Vite dev assets if needed
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || true,
  credentials: true
}));

app.use(express.json());

// Rate Limiter for Login / Auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: 'Too many authentication attempts, please try again later.' }
});

// Simple Cookie Parser helper
function parseCookies(req: Request): Record<string, string> {
  const list: Record<string, string> = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length === 2) {
      list[parts[0].trim()] = decodeURIComponent(parts[1].trim());
    }
  });
  return list;
}

// Admin Authentication Middleware
async function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const cookies = parseCookies(req);
    const sessionToken = cookies.roycash_admin_session;

    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized: No active admin session' });
    }

    const tokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');

    const sessionResult = await pool.query(
      `SELECT s.*, a.id as admin_id, a.email, a.name, a.role 
       FROM sessions s 
       JOIN admin_users a ON s.admin_id = a.id 
       WHERE s.token_hash = $1 AND s.expires_at > NOW()`,
      [tokenHash]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
    }

    (req as any).admin = sessionResult.rows[0];
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
}

// Helper: Audit Logger
async function logAudit(adminId: string | null, action: string, targetEntity: string, targetId: string | null, details: any, ip: string) {
  try {
    await pool.query(
      `INSERT INTO audit_logs (admin_id, action, target_entity, target_id, details, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [adminId, action, targetEntity, targetId, JSON.stringify(details || {}), ip]
    );
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}

// Database Initialization & Bootstrap Seeding
async function initDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'database/migrations/001_initial_schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(schemaSql);
      console.log('Database schema migrations applied successfully.');
    }

    // Bootstrap Admin User if none exists
    const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL || 'admin@roycash.network';
    const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || 'ChangeThisSecureAdminPassword123!';

    const adminCheck = await pool.query('SELECT * FROM admin_users WHERE email = $1', [adminEmail]);
    if (adminCheck.rows.length === 0) {
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(adminPassword, saltRounds);
      await pool.query(
        `INSERT INTO admin_users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)`,
        [adminEmail, passwordHash, 'RoyCash Super Admin', 'super_admin']
      );
      console.log(`Bootstrap admin user created successfully (${adminEmail}).`);
    }
  } catch (err) {
    console.error('Database initialization warning/error:', err);
  }
}

// API Routes
async function setupApiRoutes(app: express.Express) {
  // --- AUTH ENDPOINTS ---
  app.post('/api/v1/auth/login', authLimiter, async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
      });

      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid email or password format' });
      }

      const { email, password } = parsed.data;
      const result = await pool.query('SELECT * FROM admin_users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const admin = result.rows[0];
      const validPassword = await bcrypt.compare(password, admin.password_hash);

      if (!validPassword) {
        await logAudit(null, 'ADMIN_LOGIN_FAILED', 'admin_users', admin.id, { email }, req.ip || 'unknown');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate secure session token
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await pool.query(
        `INSERT INTO sessions (admin_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
        [admin.id, tokenHash, expiresAt]
      );

      await logAudit(admin.id, 'ADMIN_LOGIN_SUCCESS', 'admin_users', admin.id, { email }, req.ip || 'unknown');

      // Set HttpOnly secure cookie
      res.setHeader('Set-Cookie', `roycash_admin_session=${sessionToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${isProduction ? '; Secure' : ''}`);

      return res.json({
        success: true,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/v1/auth/logout', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const cookies = parseCookies(req);
      const sessionToken = cookies.roycash_admin_session;
      if (sessionToken) {
        const tokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');
        await pool.query('DELETE FROM sessions WHERE token_hash = $1', [tokenHash]);
      }

      await logAudit((req as any).admin.admin_id, 'ADMIN_LOGOUT', 'admin_users', (req as any).admin.admin_id, {}, req.ip || 'unknown');

      res.setHeader('Set-Cookie', 'roycash_admin_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
      return res.json({ success: true });
    } catch (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/v1/auth/me', requireAdminAuth, async (req: Request, res: Response) => {
    const admin = (req as any).admin;
    return res.json({
      admin: {
        id: admin.admin_id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  });

  // --- ADMIN DASHBOARD OVERVIEW ---
  app.get('/api/v1/admin/dashboard', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const [pubCount, advCount, campCount, convCount, pendingApps, totalVolume] = await Promise.all([
        pool.query('SELECT COUNT(*) FROM publisher_profiles'),
        pool.query('SELECT COUNT(*) FROM advertiser_profiles'),
        pool.query('SELECT COUNT(*) FROM campaigns'),
        pool.query('SELECT COUNT(*) FROM conversions'),
        pool.query('SELECT (SELECT COUNT(*) FROM publisher_applications WHERE status = \'pending\') + (SELECT COUNT(*) FROM advertiser_applications WHERE status = \'pending\') as count'),
        pool.query('SELECT COALESCE(SUM(payout_amount), 0) as total FROM conversions WHERE status = \'approved\'')
      ]);

      return res.json({
        stats: {
          publishers: Number(pubCount.rows[0].count),
          advertisers: Number(advCount.rows[0].count),
          campaigns: Number(campCount.rows[0].count),
          conversions: Number(convCount.rows[0].count),
          pendingApplications: Number(pendingApps.rows[0].count),
          totalPayoutVolume: Number(totalVolume.rows[0].total)
        }
      });
    } catch (err) {
      console.error('Dashboard stats error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- PUBLISHERS API ---
  app.get('/api/v1/admin/publishers', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const result = await pool.query(
        `SELECT p.*, u.email, u.status as user_status, u.created_at as joined_at 
         FROM publisher_profiles p 
         JOIN users u ON p.user_id = u.id 
         ORDER BY u.created_at DESC`
      );
      return res.json({ publishers: result.rows });
    } catch (err) {
      console.error('Fetch publishers error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/api/v1/admin/publishers/:id/status', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, admin_notes } = req.body;

      await pool.query(
        `UPDATE users SET status = $1, updated_at = NOW() WHERE id = (SELECT user_id FROM publisher_profiles WHERE id = $2)`,
        [status, id]
      );

      if (admin_notes !== undefined) {
        await pool.query('UPDATE publisher_profiles SET admin_notes = $1, updated_at = NOW() WHERE id = $2', [admin_notes, id]);
      }

      await logAudit((req as any).admin.admin_id, 'UPDATE_PUBLISHER_STATUS', 'publisher_profiles', id, { status, admin_notes }, req.ip || 'unknown');

      return res.json({ success: true });
    } catch (err) {
      console.error('Update publisher status error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- ADVERTISERS API ---
  app.get('/api/v1/admin/advertisers', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const result = await pool.query(
        `SELECT a.*, u.email, u.status as user_status, u.created_at as joined_at 
         FROM advertiser_profiles a 
         JOIN users u ON a.user_id = u.id 
         ORDER BY u.created_at DESC`
      );
      return res.json({ advertisers: result.rows });
    } catch (err) {
      console.error('Fetch advertisers error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/api/v1/admin/advertisers/:id/status', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, admin_notes } = req.body;

      await pool.query(
        `UPDATE users SET status = $1, updated_at = NOW() WHERE id = (SELECT user_id FROM advertiser_profiles WHERE id = $2)`,
        [status, id]
      );

      if (admin_notes !== undefined) {
        await pool.query('UPDATE advertiser_profiles SET admin_notes = $1, updated_at = NOW() WHERE id = $2', [admin_notes, id]);
      }

      await logAudit((req as any).admin.admin_id, 'UPDATE_ADVERTISER_STATUS', 'advertiser_profiles', id, { status, admin_notes }, req.ip || 'unknown');

      return res.json({ success: true });
    } catch (err) {
      console.error('Update advertiser status error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- APPLICATIONS API ---
  app.get('/api/v1/admin/applications', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const pubApps = await pool.query('SELECT *, \'publisher\' as app_type FROM publisher_applications ORDER BY created_at DESC');
      const advApps = await pool.query('SELECT *, \'advertiser\' as app_type FROM advertiser_applications ORDER BY created_at DESC');

      return res.json({
        applications: [...pubApps.rows, ...advApps.rows]
      });
    } catch (err) {
      console.error('Fetch applications error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.patch('/api/v1/admin/applications/:type/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { type, id } = req.params;
      const { status, review_notes } = req.body;
      const adminId = (req as any).admin.admin_id;

      const tableName = type === 'publisher' ? 'publisher_applications' : 'advertiser_applications';
      
      await pool.query(
        `UPDATE ${tableName} SET status = $1, reviewed_by = $2, review_notes = $3, updated_at = NOW() WHERE id = $4`,
        [status, adminId, review_notes, id]
      );

      // Also update user status if approved
      const userStatus = status === 'approved' ? 'approved' : 'rejected';
      await pool.query(
        `UPDATE users SET status = $1, updated_at = NOW() WHERE id = (SELECT user_id FROM ${tableName} WHERE id = $2)`,
        [userStatus, id]
      );

      await logAudit(adminId, `REVIEW_APPLICATION_${type.toUpperCase()}`, tableName, id, { status, review_notes }, req.ip || 'unknown');

      return res.json({ success: true });
    } catch (err) {
      console.error('Review application error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- CAMPAIGNS API ---
  app.get('/api/v1/admin/campaigns', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const result = await pool.query(
        `SELECT c.*, a.company_name as advertiser_name 
         FROM campaigns c 
         JOIN advertiser_profiles a ON c.advertiser_id = a.id 
         ORDER BY c.created_at DESC`
      );
      return res.json({ campaigns: result.rows });
    } catch (err) {
      console.error('Fetch campaigns error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/v1/admin/campaigns', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { advertiser_id, title, model, payout_amount, currency, budget_total, eligibility_rules, allowed_geos } = req.body;

      const result = await pool.query(
        `INSERT INTO campaigns (advertiser_id, title, model, payout_amount, currency, budget_total, eligibility_rules, allowed_geos, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active') RETURNING *`,
        [advertiser_id, title, model, payout_amount || 0, currency || 'USD', budget_total || 0, eligibility_rules, allowed_geos || []]
      );

      await logAudit((req as any).admin.admin_id, 'CREATE_CAMPAIGN', 'campaigns', result.rows[0].id, { title, model }, req.ip || 'unknown');

      return res.json({ success: true, campaign: result.rows[0] });
    } catch (err) {
      console.error('Create campaign error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/api/v1/admin/campaigns/:id/status', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await pool.query('UPDATE campaigns SET status = $1, updated_at = NOW() WHERE id = $2', [status, id]);
      await logAudit((req as any).admin.admin_id, 'UPDATE_CAMPAIGN_STATUS', 'campaigns', id, { status }, req.ip || 'unknown');

      return res.json({ success: true });
    } catch (err) {
      console.error('Update campaign status error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- AUDIT LOGS API ---
  app.get('/api/v1/admin/audit-logs', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const result = await pool.query(
        `SELECT l.*, a.email as admin_email 
         FROM audit_logs l 
         LEFT JOIN admin_users a ON l.admin_id = a.id 
         ORDER BY l.created_at DESC LIMIT 100`
      );
      return res.json({ auditLogs: result.rows });
    } catch (err) {
      console.error('Fetch audit logs error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}

async function startServer() {
  await initDatabase();
  await setupApiRoutes(app);

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`RoyCash server running on port ${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
