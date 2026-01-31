// Builder information from Google Sheets
export interface Builder {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
}

// School information (used by API response)
export interface School {
  name: string;
  grades: string;
  distance: string;
}

// Community information from Google Sheets
export interface InventoryCommunity {
  id: string;
  name: string;
  builderId: string;
  city: string;
  county: string;
  slug: string;
  minPrice: number;
  description: string;
  is55Plus: boolean;
  hasClubhouse: boolean;
  hasGolfCourse: boolean;
  hasCommunityPool: boolean;
  address: string;
  schoolDistrict: string;
  schoolNames: string[]; // Simple school names - details fetched via API
  modelPhotos: string[];
}

// Inventory home from Google Sheets (pre-MLS spec homes)
export type InventoryStatus = 'Available' | 'Coming Soon' | 'Under Contract' | 'Sold';

export interface InventoryHome {
  id: string;
  communityId: string;
  mlsNumber?: string; // If present, home is filtered out (MLS is source of truth)
  status: InventoryStatus;
  address: string;
  lot?: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  garage?: number;
  moveInDate: string;
  modelName: string;
  description?: string;
  photoUrl?: string;
  featured: boolean;
}

// Enriched inventory home with builder and community data
export interface EnrichedInventoryHome extends InventoryHome {
  community?: InventoryCommunity;
  builder?: Builder;
}

// Google Sheets data structure
export interface InventoryData {
  builders: Builder[];
  communities: InventoryCommunity[];
  homes: InventoryHome[];
}

// Repliers MLS Listing
export interface RepliersListing {
  mlsNumber: string;
  listPrice: number;
  address: {
    streetNumber: string;
    streetName: string;
    streetSuffix?: string;
    city: string;
    state: string;
    zip: string;
    area?: string;
    neighborhood?: string;
  };
  details: {
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    sqft?: number;
    lotSize?: string;
    yearBuilt?: number;
    garage?: number;
    description?: string;
    constructionStatus?: string; // "Complete", "Under Construction", "Proposed", or null
  };
  images?: string[];
  status: string;
  listDate?: string;
  daysOnMarket?: number;
  office?: {
    name: string;
    phone?: string;
  };
  agent?: {
    name: string;
    phone?: string;
  };
}

// Repliers API response
export interface RepliersResponse {
  listings: RepliersListing[];
  count: number;
  page: number;
  numPages: number;
  resultsPerPage: number;
}

// Search filters for Repliers API
export interface RepliersSearchFilters {
  city?: string;
  county?: string;
  zip?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBaths?: number;
  maxBaths?: number;
  minSqft?: number;
  maxSqft?: number;
  propertyType?: string;
  status?: string;
  mlsNumber?: string;
  page?: number;
  resultsPerPage?: number;
}
