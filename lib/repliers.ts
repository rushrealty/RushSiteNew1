import {
  RepliersListing,
  RepliersResponse,
  RepliersSearchFilters,
} from './inventory-types';

const REPLIERS_API_URL = 'https://api.repliers.io';
function getApiKey(): string {
  const key = process.env.REPLIERS_API_KEY;
  if (!key) throw new Error('REPLIERS_API_KEY environment variable is not set');
  return key;
}

/**
 * Make a request to the Repliers API
 * Uses GET with query parameters — POST ignores filters like state
 */
async function repliersRequest<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
  method: 'GET' | 'POST' = 'GET'
): Promise<T> {
  const url = new URL(`${REPLIERS_API_URL}${endpoint}`);

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method,
    headers: {
      'REPLIERS-API-KEY': getApiKey(),
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // Cache for 1 minute
  };

  if (method === 'POST' && params) {
    // Send params as JSON body for POST requests
    const body: Record<string, string | number> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        body[key] = value;
      }
    });
    fetchOptions.body = JSON.stringify(body);
  }

  // Always append params as query string (required for GET; also works for POST as fallback)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }

  console.log(`[Repliers] ${method} ${url.pathname}?${url.searchParams.toString()}`);

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Repliers] API error ${response.status}:`, errorText);
    throw new Error(`Repliers API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Search listings with filters
 */
export async function searchListings(
  filters: RepliersSearchFilters = {}
): Promise<RepliersResponse> {
  const params: Record<string, string | number | undefined> = {
    resultsPerPage: filters.resultsPerPage || 20,
    pageNum: filters.page || 1,
    type: 'sale',
    state: filters.state || 'DE', // Default to Delaware
    // Request raw Bright MLS fields for new construction detection
    // Must include standard fields too, otherwise API only returns the raw fields
    // Include 'class' for home type mapping (ResidentialProperty, CondoProperty, etc.)
    fields: 'mlsNumber,listPrice,address,details,status,class,listDate,images,map,office,agent,raw.NewConstructionYN,raw.ConstructionCompletedYN',
  };

  // Board ID for multi-MLS accounts
  if (filters.boardId) params.boardId = filters.boardId;

  // Location filters
  if (filters.city) params.city = filters.city;
  if (filters.county) params.county = filters.county;
  if (filters.zip) params.zip = filters.zip;

  // Price filters
  if (filters.minPrice) params.minPrice = filters.minPrice;
  if (filters.maxPrice) params.maxPrice = filters.maxPrice;

  // Bedroom/Bathroom filters
  if (filters.minBedrooms) params.minBedrooms = filters.minBedrooms;
  if (filters.maxBedrooms) params.maxBedrooms = filters.maxBedrooms;
  if (filters.minBaths) params.minBaths = filters.minBaths;
  if (filters.maxBaths) params.maxBaths = filters.maxBaths;

  // Square footage filters
  if (filters.minSqft) params.minSqft = filters.minSqft;
  if (filters.maxSqft) params.maxSqft = filters.maxSqft;

  // Property type and status
  if (filters.propertyType) params.propertyType = filters.propertyType;
  if (filters.status) params.status = filters.status;

  // MLS number
  if (filters.mlsNumber) params.mlsNumber = filters.mlsNumber;

  // Raw MLS field filters (e.g. raw.NewConstructionYN=contains:Y)
  if (filters.rawFilters) {
    for (const [key, value] of Object.entries(filters.rawFilters)) {
      params[key] = value;
    }
  }

  try {
    const response = await repliersRequest<RepliersResponse>('/listings', params, 'GET');
    return response;
  } catch (error) {
    console.error('Error searching listings:', error);
    // Return empty response on error
    return {
      listings: [],
      count: 0,
      page: 1,
      numPages: 0,
      resultsPerPage: filters.resultsPerPage || 20,
    };
  }
}

/**
 * Get a single listing by MLS number
 */
export async function getListingByMlsNumber(
  mlsNumber: string
): Promise<RepliersListing | null> {
  try {
    const response = await searchListings({ mlsNumber });
    return response.listings[0] || null;
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

/**
 * Search for new construction listings
 * Uses year built filter to find newer homes
 */
export async function searchNewConstruction(
  filters: Omit<RepliersSearchFilters, 'status'> = {}
): Promise<RepliersResponse> {
  // Search for active listings built in the last 2 years
  const currentYear = new Date().getFullYear();
  return searchListings({
    ...filters,
    status: 'A', // Active listings
    // Note: You may need to add yearBuilt filter depending on Repliers API support
  });
}

/**
 * Get listing aggregates for filter options
 * Useful for populating dropdown values
 */
export async function getAggregates(
  field: string
): Promise<Record<string, number>> {
  try {
    const response = await repliersRequest<Record<string, number>>(
      '/listings',
      { aggregates: field as unknown as string, listings: 'false' as unknown as string, state: 'DE' },
      'GET'
    );
    return response;
  } catch (error) {
    console.error('Error fetching aggregates:', error);
    return {};
  }
}

// Repliers CDN base URL for listing images
const REPLIERS_CDN_URL = 'https://cdn.repliers.io/';

/**
 * Convert a string to Title Case (e.g. "NEW CASTLE" → "New Castle")
 */
function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Map Repliers listing class to home type label
 */
function mapHomeType(listingClass?: string): string {
  switch (listingClass) {
    case 'CondoProperty':
      return 'Condo';
    case 'CommercialProperty':
      return 'Commercial';
    case 'ResidentialProperty':
    default:
      return 'Single Family';
  }
}

/**
 * Transform Repliers listing to match our Property interface
 */
export function transformListing(listing: RepliersListing) {
  const address = listing.address;
  const details = listing.details;

  // Convert relative image paths to full CDN URLs
  const images = (listing.images || []).map(img =>
    img.startsWith('http') ? img : `${REPLIERS_CDN_URL}${img}`
  );

  return {
    id: listing.mlsNumber,
    mlsId: listing.mlsNumber,
    title: details.propertyType || 'Residential',
    price: listing.listPrice,
    address: `${address.streetNumber} ${address.streetName}${address.streetSuffix ? ' ' + address.streetSuffix : ''}`,
    city: address.city,
    state: address.state || 'DE',
    zip: address.zip,
    county: toTitleCase(address.area || ''),
    beds: details.numBedrooms,
    baths: details.numBathrooms,
    sqft: details.sqft || 0,
    lotSize: details.lotSize || '',
    yearBuilt: details.yearBuilt || new Date().getFullYear(),
    builder: '', // Not provided by MLS
    community: toTitleCase(address.neighborhood || ''),
    homeType: mapHomeType(listing.class),
    status: listing.status === 'A' ? 'Active' : listing.status,
    description: details.description || '',
    images,
    features: [],
    latitude: listing.map?.latitude,
    longitude: listing.map?.longitude,
    listingBrokerage: listing.office?.name || '',
    listingAgent: listing.agent?.name || '',
    listingAgentPhone: listing.agent?.phone || '',
    brokeragePhone: listing.office?.phone || '',
    lastUpdated: listing.listDate || new Date().toISOString(),
  };
}

// Delaware-specific location options
export const DELAWARE_LOCATIONS = {
  counties: ['New Castle', 'Kent', 'Sussex'],
  cities: {
    'New Castle': ['Wilmington', 'Newark', 'Middletown', 'Bear', 'Hockessin', 'Pike Creek'],
    Kent: ['Dover', 'Smyrna', 'Milford', 'Camden', 'Harrington', 'Felton', 'Greenwood'],
    Sussex: ['Rehoboth Beach', 'Lewes', 'Georgetown', 'Millsboro', 'Seaford', 'Milton', 'Long Neck'],
  },
};

// Price range options
export const PRICE_RANGES = [
  { label: 'Under $300K', min: 0, max: 300000 },
  { label: '$300K - $400K', min: 300000, max: 400000 },
  { label: '$400K - $500K', min: 400000, max: 500000 },
  { label: '$500K - $600K', min: 500000, max: 600000 },
  { label: '$600K - $750K', min: 600000, max: 750000 },
  { label: '$750K - $1M', min: 750000, max: 1000000 },
  { label: '$1M+', min: 1000000, max: undefined },
];

// Bedroom options
export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

// Bathroom options
export const BATHROOM_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4];
