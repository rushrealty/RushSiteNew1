import {
  Builder,
  InventoryCommunity,
  InventoryHome,
  InventoryData,
  EnrichedInventoryHome,
} from './inventory-types';

// Google Sheet ID from environment or default
const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '1AlZ9mDsfIOR6DGAO9DQ548_CMIU4tsOEIxIkYa_dxV0';

// Tab GIDs (these may need to be updated based on your sheet)
const TABS = {
  builders: 0,      // First tab
  communities: 1,   // Second tab
  inventory: 2,     // Third tab
};

// Cache for inventory data (5 minute TTL)
let inventoryCache: { data: InventoryData | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch CSV data from a published Google Sheet tab
 */
async function fetchSheetTab(gid: number): Promise<string> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  const response = await fetch(url, {
    next: { revalidate: 300 } // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sheet tab ${gid}: ${response.statusText}`);
  }

  return response.text();
}

/**
 * Parse CSV string into array of objects
 */
function parseCSV<T>(csv: string): T[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj: Record<string, string> = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });

    return obj as T;
  });
}

/**
 * Parse a single CSV line handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Parse builders from CSV data
 */
function parseBuilders(data: Record<string, string>[]): Builder[] {
  return data.map(row => ({
    id: row.id || '',
    name: row.name || '',
    logoUrl: row.logo_url || '',
    website: row.website || '',
  })).filter(b => b.id);
}

/**
 * Parse communities from CSV data
 */
function parseCommunities(data: Record<string, string>[]): InventoryCommunity[] {
  return data.map(row => ({
    id: row.id || '',
    name: row.name || '',
    builderId: row.builder_id || '',
    city: row.city || '',
    county: row.county || '',
    slug: row.slug || '',
    modelPhotos: [
      row.model_photo_1,
      row.model_photo_2,
      row.model_photo_3,
    ].filter(Boolean),
  })).filter(c => c.id);
}

/**
 * Parse inventory homes from CSV data
 */
function parseInventory(data: Record<string, string>[]): InventoryHome[] {
  return data.map(row => ({
    id: row.id || '',
    communityId: row.community_id || '',
    mlsNumber: row.mls_number || undefined,
    status: (row.status as InventoryHome['status']) || 'Available',
    address: row.address || '',
    lot: row.lot || undefined,
    price: parseInt(row.price, 10) || 0,
    beds: parseInt(row.beds, 10) || 0,
    baths: parseFloat(row.baths) || 0,
    sqft: parseInt(row.sqft, 10) || 0,
    garage: row.garage ? parseInt(row.garage, 10) : undefined,
    moveInDate: row.move_in_date || '',
    modelName: row.model_name || '',
    description: row.description || undefined,
    photoUrl: row.photo_url || undefined,
    featured: row.featured?.toLowerCase() === 'true',
  })).filter(h => h.id && h.communityId);
}

/**
 * Fetch all inventory data from Google Sheets
 */
export async function fetchInventoryData(): Promise<InventoryData> {
  // Check cache
  const now = Date.now();
  if (inventoryCache.data && (now - inventoryCache.timestamp) < CACHE_TTL) {
    return inventoryCache.data;
  }

  try {
    // Fetch all tabs in parallel
    const [buildersCSV, communitiesCSV, inventoryCSV] = await Promise.all([
      fetchSheetTab(TABS.builders),
      fetchSheetTab(TABS.communities),
      fetchSheetTab(TABS.inventory),
    ]);

    // Parse CSV data
    const buildersRaw = parseCSV<Record<string, string>>(buildersCSV);
    const communitiesRaw = parseCSV<Record<string, string>>(communitiesCSV);
    const inventoryRaw = parseCSV<Record<string, string>>(inventoryCSV);

    const data: InventoryData = {
      builders: parseBuilders(buildersRaw),
      communities: parseCommunities(communitiesRaw),
      homes: parseInventory(inventoryRaw),
    };

    // Update cache
    inventoryCache = { data, timestamp: now };

    return data;
  } catch (error) {
    console.error('Error fetching inventory data:', error);

    // Return cached data if available, even if stale
    if (inventoryCache.data) {
      return inventoryCache.data;
    }

    // Return empty data as fallback
    return { builders: [], communities: [], homes: [] };
  }
}

/**
 * Get inventory homes filtered for Quick Move-In display
 * Filters out homes that have an MLS number (those are in Repliers)
 */
export async function getQuickMoveInHomes(): Promise<EnrichedInventoryHome[]> {
  const data = await fetchInventoryData();

  // Filter out homes with MLS numbers (deduplication rule)
  const availableHomes = data.homes.filter(home => !home.mlsNumber);

  // Enrich with community and builder data
  return availableHomes.map(home => {
    const community = data.communities.find(c => c.id === home.communityId);
    const builder = community
      ? data.builders.find(b => b.id === community.builderId)
      : undefined;

    return {
      ...home,
      community,
      builder,
    };
  });
}

/**
 * Get featured inventory homes for homepage
 */
export async function getFeaturedHomes(): Promise<EnrichedInventoryHome[]> {
  const homes = await getQuickMoveInHomes();
  return homes.filter(home => home.featured);
}

/**
 * Get inventory homes by community
 */
export async function getHomesByCommunity(communityId: string): Promise<EnrichedInventoryHome[]> {
  const homes = await getQuickMoveInHomes();
  return homes.filter(home => home.communityId === communityId);
}

/**
 * Get inventory homes by status
 */
export async function getHomesByStatus(status: InventoryHome['status']): Promise<EnrichedInventoryHome[]> {
  const homes = await getQuickMoveInHomes();
  return homes.filter(home => home.status === status);
}

// Mock data for development/fallback
export const MOCK_INVENTORY: InventoryData = {
  builders: [
    { id: 'ashburn', name: 'Ashburn Homes', logoUrl: '/images/builders/ashburn.png', website: 'https://ashburnhomes.com' },
    { id: 'nvr', name: 'NVR/Ryan Homes', logoUrl: '/images/builders/nvr.png', website: 'https://ryanhomes.com' },
    { id: 'tunnell', name: 'Tunnell Companies', logoUrl: '/images/builders/tunnell.png', website: 'https://tunnellcompanies.com' },
  ],
  communities: [
    { id: 'abbotts-pond', name: "Abbott's Pond", builderId: 'ashburn', city: 'Milford', county: 'Kent', slug: 'abbotts-pond', modelPhotos: [] },
    { id: 'pinehurst', name: 'Pinehurst Village', builderId: 'ashburn', city: 'Felton', county: 'Kent', slug: 'pinehurst-village', modelPhotos: [] },
    { id: 'baywood', name: 'Baywood Greens', builderId: 'tunnell', city: 'Millsboro', county: 'Sussex', slug: 'baywood-greens', modelPhotos: [] },
  ],
  homes: [
    {
      id: '1',
      communityId: 'abbotts-pond',
      status: 'Available',
      address: '123 Pond View Dr',
      lot: '45',
      price: 425000,
      beds: 4,
      baths: 2.5,
      sqft: 2400,
      garage: 2,
      moveInDate: 'Ready Now',
      modelName: 'The Easton',
      featured: true,
    },
    {
      id: '2',
      communityId: 'abbotts-pond',
      status: 'Coming Soon',
      address: '125 Pond View Dr',
      lot: '47',
      price: 445000,
      beds: 4,
      baths: 3,
      sqft: 2600,
      garage: 2,
      moveInDate: 'March 2026',
      modelName: 'The Milford',
      featured: false,
    },
    {
      id: '3',
      communityId: 'pinehurst',
      status: 'Available',
      address: '456 Pine Ridge Ct',
      price: 389000,
      beds: 3,
      baths: 2.5,
      sqft: 2100,
      garage: 2,
      moveInDate: 'Ready Now',
      modelName: 'The Dover',
      featured: true,
    },
  ],
};
