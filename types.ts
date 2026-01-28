// Existing types (used by kept pages)
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

// New types for rebrand
export enum PropertyStatus {
  MOVE_IN_READY = 'Move-in Ready',
  UNDER_CONSTRUCTION = 'Under Construction',
  TO_BE_BUILT = 'To Be Built',
  MODEL_HOME = 'Model Home'
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  zip: string;
  builder: string;
  builderLogo?: string;
  priceRange: string;
  minPrice: number;
  image: string;
  status: 'Grand Opening' | 'Selling Fast' | 'Closeout' | 'Coming Soon' | 'Now Selling';
  homesAvailable: number;
  floorPlansCount: number;
  description: string;
  amenities: string;
  features: string[];
}

export interface SchoolInfo {
  name: string;
  rating: number;
  level: 'Elementary' | 'Middle' | 'High';
  distance: string;
}

export interface PriceHistoryItem {
  date: string;
  event: 'Listed' | 'Price Change' | 'Sold' | 'Pending' | 'Contingent';
  price: number;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  builder: string;
  community: string;
  status: PropertyStatus;
  description: string;
  images: string[];
  features: string[];
  heating: string;
  cooling: string;
  parking: string;
  basement: string;
  hoaFee: number;
  taxAssessment: number;
  schools: SchoolInfo[];
  completionDate?: string;
  featured?: boolean;
  mlsId: string;
  listingBrokerage: string;
  listingAgent: string;
  listingAgentPhone: string;
  brokeragePhone: string;
  lastUpdated: string;
  priceHistory: PriceHistoryItem[];
}

export interface SearchFilters {
  query: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
}