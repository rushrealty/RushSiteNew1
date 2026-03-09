import {
  RepliersListing,
  RepliersResponse,
  RepliersSearchFilters,
  RepliersHistoryEntry,
} from './inventory-types';
import { PriceHistoryItem } from '../types';

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
    fields: 'mlsNumber,listPrice,address,details,lot,status,class,listDate,images,map,office,agent,taxes,condominium,raw.NewConstructionYN,raw.ConstructionCompletedYN,raw.StructureDesignType,raw.TaxAnnualAmount,raw.AssociationFee,raw.AssociationFeeFrequency,raw.ListOfficeName,raw.ListOfficePhone,raw.ListAgentFullName,raw.ListAgentDirectPhone,raw.ListAgentPreferredPhone,raw.BasementYN,raw.StoriesTotal,raw.Levels,raw.SeniorCommunityYN,raw.PoolYN,raw.LotSizeArea,raw.LotSizeUnits,raw.LotSizeAcres,raw.LotSizeSquareFeet',
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

  // Lot size filters (in square feet)
  if (filters.minLotSizeSqft) params.minLotSizeSqft = filters.minLotSizeSqft;
  if (filters.maxLotSizeSqft) params.maxLotSizeSqft = filters.maxLotSizeSqft;

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
 * Map Repliers listing to home type label.
 * Checks raw.StructureDesignType for townhouse variants from Bright MLS
 * (Twin/Semi-Detached, End of Row/Townhouse, Interior Row/Townhouse),
 * then falls back to the listing class.
 */
export function mapHomeType(listingClass?: string, structureDesignType?: string): string {
  // Check StructureDesignType for townhouse variants first
  if (structureDesignType) {
    const sdt = structureDesignType.toLowerCase();
    if (
      sdt.includes('townhouse') ||
      sdt.includes('row/') ||
      sdt.includes('semi-detached') ||
      sdt.includes('twin')
    ) {
      return 'Townhouse';
    }
  }

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
 * Parse HOA fee into monthly amount based on the stated frequency.
 * Handles: Monthly, Annually, Semi-Annually, Quarterly, Bi-Monthly, Weekly.
 */
function parseMonthlyHoa(amount: number, frequency?: string): number {
  if (!amount || amount <= 0) return 0;
  if (!frequency) return amount; // assume monthly if unspecified

  const freq = frequency.toLowerCase();
  if (freq.includes('annual') && !freq.includes('semi')) return Math.round(amount / 12);
  if (freq.includes('semi')) return Math.round(amount / 6);
  if (freq.includes('quarter')) return Math.round(amount / 3);
  if (freq.includes('bi-month') || freq.includes('bimonth')) return Math.round(amount / 2);
  if (freq.includes('week')) return Math.round((amount * 52) / 12);
  return amount; // Monthly or unknown → use as-is
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

  // --- Tax Assessment ---
  // Try structured taxes field first, then raw Bright MLS field
  const taxAnnual =
    listing.taxes?.annualAmount ??
    (listing.raw?.TaxAnnualAmount ? parseFloat(listing.raw.TaxAnnualAmount) : 0);

  // --- HOA / Association Fee ---
  // Try condominium.fees.maintenance first, then raw Bright MLS field
  const rawHoaAmount =
    listing.condominium?.fees?.maintenance ??
    (listing.raw?.AssociationFee ? parseFloat(listing.raw.AssociationFee) : 0);

  const hoaFrequency =
    listing.condominium?.fees?.type ??
    listing.raw?.AssociationFeeFrequency;

  const monthlyHoa = parseMonthlyHoa(rawHoaAmount, hoaFrequency);

  // --- Lot Size (normalized to acres) ---
  // Priority: 1) lot.acres, 2) raw.LotSizeAcres, 3) raw.LotSizeArea+Units, 4) raw.LotSizeSquareFeet, 5) lot.size, 6) details.lotSize
  let lotSize = '';
  const lotAcres = listing.lot?.acres ? parseFloat(listing.lot.acres) : 0;
  const rawLotSizeAcres = listing.raw?.LotSizeAcres ? parseFloat(listing.raw.LotSizeAcres) : 0;
  const rawLotArea = listing.raw?.LotSizeArea ? parseFloat(listing.raw.LotSizeArea) : 0;
  const rawLotUnits = listing.raw?.LotSizeUnits || '';
  const rawLotSqft = listing.raw?.LotSizeSquareFeet ? parseFloat(listing.raw.LotSizeSquareFeet) : 0;

  if (lotAcres > 0) {
    lotSize = `${lotAcres.toFixed(2)} Acres`;
  } else if (rawLotSizeAcres > 0) {
    lotSize = `${rawLotSizeAcres.toFixed(2)} Acres`;
  } else if (rawLotArea > 0) {
    const acres = rawLotUnits.toLowerCase().includes('square') ? rawLotArea / 43560 : rawLotArea;
    lotSize = `${acres.toFixed(2)} Acres`;
  } else if (rawLotSqft > 0) {
    const acres = rawLotSqft / 43560;
    lotSize = `${acres.toFixed(2)} Acres`;
  } else if (listing.lot?.size) {
    lotSize = listing.lot.size;
  } else {
    lotSize = details.lotSize || '';
  }

  // --- Stories ---
  const rawStories = listing.raw?.StoriesTotal ? parseInt(listing.raw.StoriesTotal, 10) : NaN;
  const rawLevels = listing.raw?.Levels ? parseInt(listing.raw.Levels, 10) : NaN;
  const stories = !isNaN(rawStories) ? rawStories : !isNaN(rawLevels) ? rawLevels : undefined;

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
    lotSize,
    yearBuilt: details.yearBuilt || new Date().getFullYear(),
    builder: '', // Not provided by MLS
    community: toTitleCase(address.neighborhood || ''),
    homeType: mapHomeType(listing.class, listing.raw?.StructureDesignType),
    status: listing.status === 'A' ? 'Active' : listing.status,
    description: details.description || '',
    images,
    features: [],
    latitude: listing.map?.latitude,
    longitude: listing.map?.longitude,
    listingBrokerage: listing.office?.name || listing.raw?.ListOfficeName || '',
    listingAgent: listing.agent?.name || listing.raw?.ListAgentFullName || '',
    listingAgentPhone: listing.agent?.phone || listing.raw?.ListAgentDirectPhone || listing.raw?.ListAgentPreferredPhone || '',
    brokeragePhone: listing.office?.phone || listing.raw?.ListOfficePhone || '',
    lastUpdated: listing.listDate || new Date().toISOString(),
    heating: '',
    cooling: '',
    parking: details.numGarageSpaces ? `${details.numGarageSpaces} Car Garage` : '',
    basement: listing.raw?.BasementYN?.toUpperCase() === 'Y' ? 'Yes' : '',
    stories,
    is55Plus: listing.raw?.SeniorCommunityYN?.toUpperCase() === 'Y',
    hasCommunityPool: listing.raw?.PoolYN?.toUpperCase() === 'Y',
    isNewConstruction: listing.raw?.NewConstructionYN?.toUpperCase() === 'Y',
    hoaFee: monthlyHoa,
    taxAssessment: taxAnnual || 0,
    schools: [],
    priceHistory: [],
  };
}

/**
 * Fetch listing history for an address from the Repliers history endpoint.
 * Returns past listings / transactions for the given property address.
 */
export async function getListingHistory(address: {
  streetNumber: string;
  streetName: string;
  streetSuffix?: string;
  city: string;
  zip: string;
}): Promise<RepliersHistoryEntry[]> {
  try {
    const params: Record<string, string | number | undefined> = {
      streetNumber: address.streetNumber,
      streetName: address.streetName,
      streetSuffix: address.streetSuffix,
      city: address.city,
      zip: address.zip,
    };

    const response = await repliersRequest<{ history?: RepliersHistoryEntry[] } | RepliersHistoryEntry[]>(
      '/listings/history',
      params,
      'GET'
    );

    // API may return { history: [...] } or the array directly
    if (Array.isArray(response)) return response;
    if (response && Array.isArray(response.history)) return response.history;
    return [];
  } catch (error) {
    console.error('[Repliers] Error fetching listing history:', error);
    return [];
  }
}

/**
 * Map a Repliers lastStatus string to a PriceHistoryItem event type.
 */
function mapHistoryStatus(lastStatus?: string): PriceHistoryItem['event'] {
  if (!lastStatus) return 'Listed';
  const s = lastStatus.toLowerCase();
  if (s.includes('sold') || s.includes('closed')) return 'Sold';
  if (s.includes('pending')) return 'Pending';
  if (s.includes('contingent')) return 'Contingent';
  if (s.includes('expired')) return 'Expired';
  if (s.includes('withdrawn') || s.includes('cancelled') || s.includes('canceled')) return 'Withdrawn';
  if (s.includes('terminated') || s.includes('suspend')) return 'Terminated';
  return 'Listed';
}

/**
 * Transform Repliers history entries into PriceHistoryItem[].
 * Returns entries sorted newest-first.
 */
export function transformHistory(entries: RepliersHistoryEntry[]): PriceHistoryItem[] {
  const items: PriceHistoryItem[] = entries
    .filter(e => e.listDate || e.soldDate) // skip entries with no date
    .map(entry => {
      const event = mapHistoryStatus(entry.lastStatus);
      const isSold = event === 'Sold';

      // Use soldDate for sold events, otherwise listDate
      const rawDate = isSold && entry.soldDate ? entry.soldDate : entry.listDate || '';
      const date = rawDate
        ? new Date(rawDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
        : '';

      // Use soldPrice for sold events, otherwise listPrice
      const price = (isSold && entry.soldPrice) ? entry.soldPrice : (entry.listPrice || 0);

      return { date, event, price };
    });

  // Sort newest first by date
  items.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return db - da;
  });

  return items;
}

// Delaware-specific location options
export const DELAWARE_LOCATIONS = {
  counties: ['New Castle', 'Kent', 'Sussex'],
  cities: {
    'New Castle': [
      'Wilmington', 'Newark', 'Middletown', 'Bear', 'Hockessin', 'Pike Creek',
      'Claymont', 'New Castle', 'Glasgow', 'Elsmere', 'Brookside', 'North Star',
      'Townsend', 'Odessa', 'Delaware City',
    ],
    Kent: [
      'Dover', 'Smyrna', 'Milford', 'Camden', 'Harrington', 'Felton', 'Greenwood',
      'Clayton', 'Cheswold', 'Wyoming', 'Magnolia', 'Frederica', 'Hartly',
      'Viola', 'Woodside', 'Little Creek',
    ],
    Sussex: [
      'Rehoboth Beach', 'Lewes', 'Georgetown', 'Millsboro', 'Seaford', 'Milton', 'Long Neck',
      'Dewey Beach', 'Bethany Beach', 'Fenwick Island', 'Laurel', 'Bridgeville',
      'Selbyville', 'Dagsboro', 'Delmar', 'Frankford', 'Ocean View', 'Millville',
      'Ellendale', 'Lincoln', 'Greenwood',
    ],
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
