export type ActiveTab = 
  | 'home' 
  | 'models' 
  | 'publishers' 
  | 'advertisers' 
  | 'tracking' 
  | 'about' 
  | 'contact';

export interface CampaignModel {
  id: string;
  code: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  bestFor: string;
  paymentTrigger: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
