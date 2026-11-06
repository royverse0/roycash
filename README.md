# RoyCash – Affiliate & Performance Marketing Network

RoyCash is a professional, mobile-first affiliate marketing network website built with React, TypeScript, Vite, and Tailwind CSS.

## Tagline
**Earn Through Actions. Grow Through Referrals.**

## Brand Identity & Theme
- **Theme**: Dark navy (`#070b14`), emerald green (`#10b981`), white, and subtle gold accents.
- **Design**: Premium fintech SaaS with glassmorphism cards and responsive navigation for Android, iOS, and desktop.

---

## Website Sections

1. **Home**: Premium hero section, RoyCash branding, network introduction, advertiser & publisher cards, how it works, and campaign categories.
2. **Campaign Models**: Comprehensive breakdown of 10 performance models (CPA, CPL, CPC, CPI, CPD, CPS, CPO, CPR, Revenue Share, and Hybrid).
3. **Publishers**: Affiliate publishing guidelines, tracking links, eligible conversions, commission structures, payout processes, and FAQs.
4. **Advertisers**: Direct partnerships, campaign budgeting, conversion tracking, reporting tools, and onboarding FAQs.
5. **How Tracking Works**: Step-by-step breakdown of unique click IDs (`click_id`), S2S postbacks, attribution, validation, and duplicate prevention.
6. **About RoyCash**: Honest business vision and platform goals focused on transparency and trust.
7. **Contact Us**: Professional enquiry form with instant success feedback.
8. **Footer**: Links to platform pages, technology specifications, and legal/compliance modals (Privacy Policy, Terms & Conditions, Disclaimer).

---

## Interactive Features

- **S2S Postback Sandbox Simulator**: Test conversion attribution and generate custom postback endpoint URLs in real time.
- **Publisher Earnings Estimator**: Calculate projected monthly revenue based on traffic volume, conversion rates, and payout models.
- **Dynamic Campaign Model Explorer**: Deep-dive into all 10 affiliate models.

---

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Cloudflare Pages Deployment Instructions

1. Push this repository to GitHub.
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your GitHub repository.
4. Configure build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.
