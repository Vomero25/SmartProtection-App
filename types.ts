
export enum TargetMarket {
  FAMILIES = 'FAMILIES',
  SENIORS = 'SENIORS',
  FREELANCERS = 'FREELANCERS',
  YOUTH = 'YOUTH'
}

export interface PremiumTable {
  [capital: number]: {
    NF: { [age: number]: { [duration: number]: number | null } };
    F: { [age: number]: { [duration: number]: number | null } };
  };
}

export interface Injury {
  id: number;
  category: string;
  description: string;
  amount: number;
  level: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface SalesHook {
  segment: string;
  title: string;
  hook: string;
  objection: string;
  response: string;
  icon: string;
}

export interface CommercialStrategy {
  segment: string;
  targetDescription: string;
  needs: string[];
  strategies: {
    title: string;
    description: string;
  }[];
  keyBenefits: string[];
}

export interface StoryCase {
  id: number;
  title: string;
  protagonist: string;
  scenario: string;
  event: string;
  impact: string;
  benefit: string;
  lesson: string;
  tags: string[];
}

export interface ClientProfile {
  age: number;
  isSmoker: boolean;
  capital: number;
  duration: number;
}
