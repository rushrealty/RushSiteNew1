import {
  Builder,
  InventoryCommunity,
  InventoryHome,
  InventoryData,
  EnrichedInventoryHome,
} from './inventory-types';
import { convertGoogleDriveUrl } from './utils';

// Published Google Sheet ID from environment or default
// This is the published sheet ID (from "File > Share > Publish to web")
const PUBLISHED_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '2PACX-1vQq5kKLZrq1Ror-1rXh_krZnhcs_V1ssIm4uykHjgURw-Y4j2k-RrteDMqfvod9OkHu4hofA071UOJo';

// Tab GIDs - these are the actual GID values from the published Google Sheet
const TABS = {
  builders: 0,            // Builders tab
  communities: 1651556845, // Communities tab
  inventory: 1527336354,   // Inventory tab
};

// Cache for inventory data (5 minute TTL)
let inventoryCache: { data: InventoryData | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch CSV data from a published Google Sheet tab
 * Uses the "Publish to web" CSV export format
 */
async function fetchSheetTab(gid: number): Promise<string> {
  const url = `https://docs.google.com/spreadsheets/d/e/${PUBLISHED_SHEET_ID}/pub?gid=${gid}&single=true&output=csv`;
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
 * Parse school names from semicolon-separated format: "School Name;School 2;School 3"
 */
function parseSchoolNames(schoolsStr: string | undefined): string[] {
  if (!schoolsStr || !schoolsStr.trim()) return [];
  return schoolsStr.split(';').map(s => s.trim()).filter(Boolean);
}

/**
 * Parse communities from CSV data
 */
function parseCommunities(data: Record<string, string>[]): InventoryCommunity[] {
  return data.map(row => {
    // Helper to check Yes value with case-insensitive and whitespace handling
    const isYes = (value: string | undefined) => value?.trim().toLowerCase() === 'yes';

    // Check multiple possible column names for 55+
    const is55Plus = isYes(row['55+']) || isYes(row['55plus']) || isYes(row['is_55_plus']) || isYes(row['is55plus']);

    // Check multiple possible column names for clubhouse
    const hasClubhouse = isYes(row['clubhouse']) || isYes(row['Clubhouse']) || isYes(row['has_clubhouse']);

    // Parse school names from semicolon-separated format
    const schoolNames = parseSchoolNames(row.schools);

    return {
      id: row.id || '',
      name: row.name || '',
      builderId: row.builder_id || '',
      city: row.city || '',
      county: row.county || '',
      slug: row.slug || '',
      minPrice: parseInt(row.min_price, 10) || 0,
      description: row.description || '',
      is55Plus,
      hasClubhouse,
      address: row.address || '',
      schoolDistrict: row.school_district || '',
      schoolNames,
      modelPhotos: [
        row.model_photo_1,
        row.model_photo_2,
        row.model_photo_3,
      ].filter(Boolean).map(convertGoogleDriveUrl),
    };
  }).filter(c => c.id);
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
    photoUrl: row.photo_url ? convertGoogleDriveUrl(row.photo_url) : undefined,
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
    { id: 'abbotts-pond', name: "Abbott's Pond", builderId: 'ashburn', city: 'Greenwood', county: 'Sussex', slug: 'abbotts-pond', minPrice: 425000, description: '', is55Plus: false, hasClubhouse: false, address: 'Greenwood, DE 19950', schoolDistrict: 'Milford School District', schoolNames: ['Evelyn I. Morris Early Childhood', 'Mispillion Elementary School', 'Milford Central Academy', 'Milford Senior High School'], modelPhotos: [] },
    { id: 'pinehurst', name: 'Pinehurst Village', builderId: 'ashburn', city: 'Felton', county: 'Kent', slug: 'pinehurst-village', minPrice: 389000, description: '', is55Plus: true, hasClubhouse: true, address: '25 Belfry Dr, Felton, DE 19943', schoolDistrict: 'Lake Forest School District', schoolNames: ['Lake Forest North Elementary', 'Lake Forest Central Elementary', 'W.T. Chipman Middle School', 'Lake Forest High School'], modelPhotos: [] },
    { id: 'baywood', name: 'Baywood Greens', builderId: 'tunnell', city: 'Millsboro', county: 'Sussex', slug: 'baywood-greens', minPrice: 450000, description: '', is55Plus: false, hasClubhouse: true, address: 'Millsboro, DE 19966', schoolDistrict: 'Indian River School District', schoolNames: ['Long Neck Elementary', 'Millsboro Middle School', 'Sussex Central High School'], modelPhotos: [] },
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
