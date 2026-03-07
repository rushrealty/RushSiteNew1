import { NextRequest, NextResponse } from 'next/server';

const REPLIERS_API_URL = 'https://api.repliers.io';
const API_KEY = process.env.REPLIERS_API_KEY || '';

// Google Sheet URLs
const PUBLISHED_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '2PACX-1vQq5kKLZrq1Ror-1rXh_krZnhcs_V1ssIm4uykHjgURw-Y4j2k-RrteDMqfvod9OkHu4hofA071UOJo';
const INVENTORY_GID = process.env.NEXT_PUBLIC_SHEET_GID_INVENTORY || '1527336354';
const COMMUNITIES_GID = process.env.NEXT_PUBLIC_SHEET_GID_COMMUNITIES || '1651556845';

interface InventoryHome {
  id: string;
  community_id: string;
  address: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  status: string;
  photo_url: string;
}

interface Community {
  id: string;
  name: string;
  builder_id: string;
  city: string;
  county: string;
  min_price: string;
  description: string;
}

interface AutocompletePrediction {
  description: string;
  type: string;
  city?: string;
  area?: string;
  neighborhood?: string;
  zip?: string;
  mlsNumber?: string;
  listPrice?: string;
  // For inventory homes
  inventoryId?: string;
  inventoryData?: InventoryHome;
  // For communities
  communityId?: string;
  communityData?: Community;
}

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
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

async function fetchInventoryHomes(): Promise<InventoryHome[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/e/${PUBLISHED_SHEET_ID}/pub?gid=${INVENTORY_GID}&single=true&output=csv`;
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) return [];

    const csvText = await response.text();
    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const data: InventoryHome[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);
      const row: Record<string, string> = {};

      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || '';
      });

      if (row['address']) {
        data.push({
          id: row['id'] || `inv-${i}`,
          community_id: row['community_id'] || '',
          address: row['address'] || '',
          price: row['price'] || '',
          beds: row['beds'] || '',
          baths: row['baths'] || '',
          sqft: row['sqft'] || '',
          status: row['status'] || '',
          photo_url: row['photo_url'] || '',
        });
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
}

async function fetchCommunities(): Promise<Community[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/e/${PUBLISHED_SHEET_ID}/pub?gid=${COMMUNITIES_GID}&single=true&output=csv`;
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) return [];

    const csvText = await response.text();
    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const data: Community[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);
      const row: Record<string, string> = {};

      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || '';
      });

      if (row['name'] || row['id']) {
        data.push({
          id: row['id'] || row['community_id'] || `com-${i}`,
          name: row['name'] || '',
          builder_id: row['builder_id'] || '',
          city: row['city'] || '',
          county: row['county'] || '',
          min_price: row['min_price'] || '',
          description: row['description'] || '',
        });
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching communities:', error);
    return [];
  }
}

async function fetchRepliersLocations(query: string): Promise<AutocompletePrediction[]> {
  try {
    const url = new URL(`${REPLIERS_API_URL}/locations/autocomplete`);
    url.searchParams.append('search', query);
    url.searchParams.append('type', 'city');
    url.searchParams.append('type', 'neighborhood');
    url.searchParams.append('state', 'DE'); // FIX: was 'Delaware', needs abbreviation

    const response = await fetch(url.toString(), {
      headers: {
        'REPLIERS-API-KEY': process.env.REPLIERS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) return [];

    const data = await response.json();

    // FIX: Repliers returns { locations: [...] }, NOT a bare array
    const locations = data.locations || [];

    return locations.map((item: {
      name?: string;
      type?: string;
      address?: { city?: string; area?: string; neighborhood?: string; state?: string };
    }) => ({
      description: item.name || '',
      type: item.type || 'location',
      city: item.address?.city,
      area: item.address?.area,
      neighborhood: item.address?.neighborhood,
    })).filter((p: AutocompletePrediction) => p.description);
  } catch (error) {
    console.error('Repliers locations autocomplete error:', error);
    return [];
  }
}

async function fetchRepliersListings(query: string): Promise<AutocompletePrediction[]> {
  try {
    const url = new URL(`${REPLIERS_API_URL}/listings`);
    url.searchParams.append('search', query);
    url.searchParams.append('searchFields', 'address.streetNumber,address.streetName,address.streetSuffix,mlsNumber,address.city,address.zip,address.neighborhood');
    url.searchParams.append('fields', 'address.*,mlsNumber,listPrice,images');
    url.searchParams.append('state', 'DE');
    url.searchParams.append('status', 'A');
    url.searchParams.append('resultsPerPage', '8');

    const response = await fetch(url.toString(), {
      headers: {
        'REPLIERS-API-KEY': process.env.REPLIERS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    const listings = data.listings || [];

    return listings.map((listing: {
      mlsNumber?: string;
      listPrice?: string | number;
      address?: {
        streetNumber?: string;
        streetName?: string;
        streetSuffix?: string;
        city?: string;
        state?: string;
        zip?: string;
        neighborhood?: string;
        area?: string;
      };
    }) => {
      const addr = listing.address || {};
      const street = [addr.streetNumber, addr.streetName, addr.streetSuffix].filter(Boolean).join(' ');
      const cityState = [addr.city, addr.state].filter(Boolean).join(', ');
      const fullAddress = [street, cityState].filter(Boolean).join(', ');

      return {
        description: fullAddress || listing.mlsNumber || '',
        type: 'property',
        city: addr.city,
        area: addr.area,
        neighborhood: addr.neighborhood,
        zip: addr.zip,
        mlsNumber: listing.mlsNumber,
        listPrice: listing.listPrice?.toString(),
      };
    }).filter((p: AutocompletePrediction) => p.description);
  } catch (error) {
    console.error('Repliers listings autocomplete error:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query')?.toLowerCase() || '';

  if (!query || query.length < 2) {
    return NextResponse.json({ predictions: [] });
  }

  try {
    // Run all sources concurrently — Repliers MLS is the primary data source
    const [repliersLocations, repliersListings, inventoryHomes, communities] = await Promise.all([
      fetchRepliersLocations(query),
      fetchRepliersListings(query),
      fetchInventoryHomes(),
      fetchCommunities(),
    ]);

    const matchingCommunities: AutocompletePrediction[] = communities
      .filter(c => c.name.toLowerCase().includes(query) || c.city.toLowerCase().includes(query))
      .slice(0, 2)
      .map(c => ({
        description: c.name,
        type: 'community',
        city: c.city,
        area: c.county,
        communityId: c.id,
        communityData: c,
      }));

    const matchingInventory: AutocompletePrediction[] = inventoryHomes
      .filter(h => h.address.toLowerCase().includes(query) || h.community_id.toLowerCase().includes(query))
      .slice(0, 2)
      .map(h => ({
        description: h.address,
        type: 'inventory',
        inventoryId: h.id,
        inventoryData: h,
      }));

    // Order: MLS listings first (primary), then communities, inventory, locations
    // MLS listings from Repliers are the main data source
    const listingsSlice = repliersListings.slice(0, 6);
    const remaining = 10 - listingsSlice.length;
    const predictions: AutocompletePrediction[] = [
      ...listingsSlice,
      ...matchingCommunities.slice(0, Math.min(matchingCommunities.length, remaining)),
      ...matchingInventory.slice(0, Math.min(matchingInventory.length, Math.max(0, remaining - matchingCommunities.length))),
      ...repliersLocations.slice(0, Math.max(0, remaining - matchingCommunities.length - matchingInventory.length)),
    ].slice(0, 10);

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Autocomplete error:', error);
    return NextResponse.json({ predictions: [] });
  }
}
