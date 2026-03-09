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
  schoolsUrl?: string; // Niche.com URL with lat/lng for nearby school search
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
  homeType?: string;
  stories?: number;
  basement?: string;
  heating?: string;
  cooling?: string;
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
  class?: string; // e.g. 'ResidentialProperty', 'CondoProperty', 'CommercialProperty'
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
    numBedrooms: number;
    numBathrooms: number;
    numBedroomsPlus?: number;
    numBathroomsHalf?: number;
    sqft?: number;
    lotSize?: string;
    yearBuilt?: number;
    numGarageSpaces?: number;
    description?: string;
    constructionStatus?: string; // "Complete", "Under Construction", "Proposed", or null
    style?: string;
  };
  lot?: {
    acres?: string;
    size?: string;
    depth?: string;
    width?: string;
    measurement?: string;
    irregular?: string;
    legalDescription?: string;
  };
  images?: string[];
  constructionStatus?: string;
  map?: {
    latitude?: number;
    longitude?: number;
  };
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
  taxes?: {
    annualAmount?: number;
  };
  condominium?: {
    fees?: {
      maintenance?: number; // HOA / condo fee amount
      type?: string; // Payment frequency: "Monthly", "Annually", "Quarterly", etc.
    };
  };
  raw?: {
    NewConstructionYN?: string; // "Y" or "N" - from Bright MLS
    ConstructionCompletedYN?: string; // "Y" or "N" - from Bright MLS
    StructureDesignType?: string; // e.g. "Detached", "Interior Row/Townhouse", "Twin/Semi-Detached"
    TaxAnnualAmount?: string; // Annual property tax amount from Bright MLS
    AssociationFee?: string; // HOA/Association fee amount from Bright MLS
    AssociationFeeFrequency?: string; // "Monthly", "Annually", "Quarterly", etc.
    ListOfficeName?: string; // Listing office/brokerage name from Bright MLS
    ListOfficePhone?: string; // Listing office phone from Bright MLS
    ListAgentFullName?: string; // Listing agent full name from Bright MLS
    ListAgentDirectPhone?: string; // Listing agent direct phone from Bright MLS
    ListAgentPreferredPhone?: string; // Listing agent preferred phone from Bright MLS
    BasementYN?: string; // Y/N - whether property has a basement
    StoriesTotal?: string; // Number of stories (numeric string, e.g. "1", "2")
    Levels?: string; // Story level description (e.g. "1", "2", "Multi/Split")
    SeniorCommunityYN?: string; // Y/N - whether property is in a 55+ community
    PoolYN?: string; // Y/N - whether property has a pool
    LotSizeArea?: string; // Numeric lot size value
    LotSizeUnits?: string; // "Acres" or "Square Feet"
    LotSizeAcres?: string; // Lot size in acres (RESO standard)
    LotSizeSquareFeet?: string; // Lot size in square feet (RESO standard)
    [key: string]: string | undefined;
  };
}

// Repliers listing history entry (from /listings/history endpoint)
export interface RepliersHistoryEntry {
  mlsNumber: string;
  type?: string; // "Sale", "Lease", etc.
  listPrice?: number;
  soldPrice?: number;
  listDate?: string;
  soldDate?: string;
  lastStatus?: string; // "Sold", "Terminated", "Expired", etc.
  office?: { brokerageName?: string };
}

// Repliers API response
export interface RepliersResponse {
  listings: RepliersListing[];
  count: number;
  page: number;
  numPages: number;
  resultsPerPage: number;
  pageSize?: number; // API v2 uses pageSize instead of resultsPerPage
}

// Search filters for Repliers API
export interface RepliersSearchFilters {
  city?: string;
  county?: string;
  state?: string;
  zip?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBaths?: number;
  maxBaths?: number;
  minSqft?: number;
  maxSqft?: number;
  minLotSizeSqft?: number;
  maxLotSizeSqft?: number;
  propertyType?: string;
  status?: string;
  mlsNumber?: string;
  boardId?: string;
  page?: number;
  resultsPerPage?: number;
  // Raw MLS field filters (e.g. 'raw.NewConstructionYN': 'contains:Y')
  rawFilters?: Record<string, string>;
}
