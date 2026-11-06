import { CampaignModel, FAQItem } from '../types';

export const CAMPAIGN_MODELS: CampaignModel[] = [
  {
    id: 'cpa',
    code: 'CPA',
    name: 'Cost Per Action / Acquisition',
    shortDesc: 'Earn when a user completes a verified specific action such as a purchase, signup, or form submission.',
    fullDesc: 'Cost Per Action (CPA) is the cornerstone of performance marketing. Advertisers pay only when a user successfully completes a pre-defined conversion event. This model minimizes risk for brands and maximizes ROI for targeted traffic.',
    bestFor: 'E-commerce, SaaS subscriptions, Fintech account openings, Mobile fintech deposits.',
    paymentTrigger: 'Verified conversion postback confirmed via S2S secure token.',
    riskLevel: 'Low',
    icon: 'Target'
  },
  {
    id: 'cpl',
    code: 'CPL',
    name: 'Cost Per Lead',
    shortDesc: 'Payouts generated upon capturing qualified prospective user contact information or registrations.',
    fullDesc: 'Cost Per Lead (CPL) bridges traffic and sales pipelines. Advertisers acquire verified leads (emails, phone numbers, consultation bookings) ready for sales nurturing.',
    bestFor: 'B2B software, Real estate, Insurance quotes, Financial advisory services.',
    paymentTrigger: 'Double opt-in or verified phone/email verification.',
    riskLevel: 'Medium',
    icon: 'UserPlus'
  },
  {
    id: 'cpc',
    code: 'CPC',
    name: 'Cost Per Click',
    shortDesc: 'Traditional pay-per-click traffic generation model for targeted promotional banners and text ads.',
    fullDesc: 'Cost Per Click (CPC) rewards publishers for delivering high-intent unique human traffic directly to advertiser landing pages, filtered rigorously for bot and proxy fraud.',
    bestFor: 'Content blogs, News portals, Product discovery engines, Brand awareness campaigns.',
    paymentTrigger: 'Unique human click validated by IP & fingerprint verification.',
    riskLevel: 'Low',
    icon: 'MousePointerClick'
  },
  {
    id: 'cpi',
    code: 'CPI',
    name: 'Cost Per Install',
    shortDesc: 'Performance model tailored exclusively for mobile application downloads and first opens.',
    fullDesc: 'Cost Per Install (CPI) drives app store velocity. Advertisers pay upon successful app installation and initialization on iOS or Android devices.',
    bestFor: 'Mobile games, Fintech apps, Utilities, E-commerce shopping apps.',
    paymentTrigger: 'SDK postback confirming device install and first app session.',
    riskLevel: 'Low',
    icon: 'Smartphone'
  },
  {
    id: 'cpd',
    code: 'CPD',
    name: 'Cost Per Download',
    shortDesc: 'Incentivized or direct software, document, or media package download attribution model.',
    fullDesc: 'Cost Per Download (CPD) compensates publishers when users download desktop software, plugins, whitepapers, or media kits.',
    bestFor: 'Desktop software, Browser extensions, Enterprise whitepapers.',
    paymentTrigger: 'Completed file download signature verification.',
    riskLevel: 'Low',
    icon: 'Download'
  },
  {
    id: 'cps',
    code: 'CPS',
    name: 'Cost Per Sale',
    shortDesc: 'Revenue percentage or fixed bounty upon completion of a financial checkout transaction.',
    fullDesc: 'Cost Per Sale (CPS) ensures advertisers pay strictly as a percentage of closed revenue or fixed transaction commission, aligning publisher earnings directly with sales volume.',
    bestFor: 'Retail e-commerce, Travel bookings, D2C brands, Digital goods.',
    paymentTrigger: 'Completed checkout order ID with verified transaction amount.',
    riskLevel: 'Low',
    icon: 'ShoppingBag'
  },
  {
    id: 'cpo',
    code: 'CPO',
    name: 'Cost Per Order',
    shortDesc: 'Simplified order placement tracking for catalog ordering systems and wholesale distribution.',
    fullDesc: 'Cost Per Order (CPO) focuses on order slips generated rather than dynamic item-level basket values, streamlining commission calculations for standardized product catalogs.',
    bestFor: 'Subscription boxes, B2B wholesale portals, Direct-to-consumer goods.',
    paymentTrigger: 'Successfully placed order in advertiser backend.',
    riskLevel: 'Low',
    icon: 'FileText'
  },
  {
    id: 'cpr',
    code: 'CPR',
    name: 'Cost Per Registration',
    shortDesc: 'User acquisition model rewarding community signups, forum memberships, and portal accounts.',
    fullDesc: 'Cost Per Registration (CPR) targets community growth by rewarding publishers for bringing active users who complete profile creation and account activation.',
    bestFor: 'Gaming portals, Streaming platforms, Professional networks, Forums.',
    paymentTrigger: 'Email-activated user account creation.',
    riskLevel: 'Low',
    icon: 'UserCheck'
  },
  {
    id: 'revshare',
    code: 'Revenue Share',
    name: 'Lifetime Revenue Share',
    shortDesc: 'Ongoing lifetime commission percentage from user spending or trading activity on partner platforms.',
    fullDesc: 'Revenue Share enables long-term passive income. Publishers earn a percentage of net revenue generated by referred users over their lifetime on the advertiser platform.',
    bestFor: 'Fintech trading platforms, SaaS annual subscriptions, Gaming ecosystems.',
    paymentTrigger: 'Monthly reconciliation of net platform revenue generated by referred accounts.',
    riskLevel: 'Medium',
    icon: 'TrendingUp'
  },
  {
    id: 'hybrid',
    code: 'Hybrid',
    name: 'Hybrid Campaigns (CPA + RevShare)',
    shortDesc: 'Combined payout structure offering an upfront acquisition bounty plus ongoing lifetime revenue share.',
    fullDesc: 'Hybrid models provide the best of both worlds: immediate liquidity for publishers via upfront CPA/CPL alongside long-term upside through recurring revenue share percentages.',
    bestFor: 'High-LTV SaaS platforms, Premium fintech brokers, Subscription services.',
    paymentTrigger: 'Combined upfront action trigger + recurring monthly postback.',
    riskLevel: 'Medium',
    icon: 'Layers'
  }
];

export const PUBLISHER_FAQS: FAQItem[] = [
  {
    question: 'How do I get started as a RoyCash publisher?',
    answer: 'Simply submit your application with your traffic sources, website, social channels, or media buying portfolio. Once reviewed by our compliance team (typically within 24 hours), you will gain access to campaign inventory and tracking link generators.'
  },
  {
    question: 'What are the payout thresholds and cycles?',
    answer: 'RoyCash operates on transparent Net-15 or Net-30 payment terms depending on your tier. Standard payout threshold is $100 USD via wire transfer, USDT (Crypto), PayPal, or localized business bank settlement.'
  },
  {
    question: 'How does RoyCash prevent fraudulent traffic?',
    answer: 'We deploy multi-layered fraud detection including IP geolocation filtering, device fingerprinting, behavioral bot scoring, and automated postback validation. Publishers must adhere strictly to white-hat promotional guidelines.'
  },
  {
    question: 'Can I promote campaigns across multiple channels?',
    answer: 'Yes, provided your channels are declared during campaign application. We support social media, search engine marketing (SEM), email newsletters, display banners, and influencer reviews.'
  }
];

export const ADVERTISER_FAQS: FAQItem[] = [
  {
    question: 'How are conversions tracked for my offers?',
    answer: 'We provide robust Server-to-Server (S2S) postback integration and secure pixel tracking. Every click receives a unique click ID (`click_id`) which is passed back upon successful conversion.'
  },
  {
    question: 'What is the onboarding process for advertisers?',
    answer: 'Advertisers submit campaign briefs with target geos, desired payout models (CPA, CPL, etc.), and landing page URLs. Our technical team tests the postback integration in a sandbox environment before public rollout.'
  },
  {
    question: 'How do you vet publishers?',
    answer: 'All publishers undergo manual and automated identity & traffic source verification. We maintain strict zero-tolerance policies against incent fraud, brand bidding, and misleading claims.'
  },
  {
    question: 'What reporting tools are available?',
    answer: 'Advertisers get real-time dashboards tracking clicks, unique visitors, conversion rates, payout costs, and publisher performance breakdowns.'
  }
];
