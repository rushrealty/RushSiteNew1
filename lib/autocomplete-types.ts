import type { InventoryHome, InventoryCommunity } from './inventory-types';

export type PredictionType = 'location' | 'property' | 'community' | 'inventory';

export interface AutocompletePrediction {
  description: string;
  type: PredictionType;
  // Location fields
  city?: string;
  county?: string;
  area?: string;
  neighborhood?: string;
  zip?: string;
  // MLS fields
  mlsNumber?: string;
  listPrice?: string;
  // Inventory home
  inventoryId?: string;
  inventoryData?: InventoryHome;
  // Community
  communityId?: string;
  communityData?: InventoryCommunity;
}

export interface AutocompleteResults {
  locations: AutocompletePrediction[];
  properties: AutocompletePrediction[];
  communities: AutocompletePrediction[];
}

/** API response shape from /api/locations/autocomplete */
export interface AutocompleteApiResponse {
  properties: AutocompletePrediction[];
  communities: AutocompletePrediction[];
}
