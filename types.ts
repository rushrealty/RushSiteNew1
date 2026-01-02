export interface ProgramFeature {
  text: string;
}

export interface SaleOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bestFor: string;
  features: string[];
  highlight?: boolean;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}