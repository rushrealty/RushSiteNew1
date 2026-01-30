import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQq5kKLZrq1Ror-1rXh_krZnhcs_V1ssIm4uykHjgURw-Y4j2k-RrteDMqfvod9OkHu4hofA071UOJo/pub?output=csv&gid=1527336354';
const REPLIERS_API_URL = 'https://api.repliers.io/listings';

interface UnifiedListing {
  id: string;
  mls_number: string;
  community_id: string;
  source: 'sheet' | 'repliers' | 'merged';
  status: string;
  address: string;
  lot: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  garage: string;
  lot_size: string;
  move_in_date: string;
  model_name: string;
  description: string;
  photo_url: string;
  images: string[];
  featured: boolean;
  construction_status: string;
  is_quick_move_in: boolean;
}

// Parse CSV from Google Sheets
function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const data: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || '';
    });

    data.push(row);
  }

  return data;
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

// Normalize address for comparison
function normalizeAddress(address: string): string {
  return address
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
}

// Fetch inventory from Google Sheet
async function fetchSheetInventory(communityId?: string): Promise<UnifiedListing[]> {
  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    let inventory = rows.map((row): UnifiedListing => ({
      id: row['id'] || '',
      mls_number: row['mls_number'] || '',
      community_id: row['community_id'] || '',
      source: 'sheet',
      status: row['status'] || '',
      address: row['address'] || '',
      lot: row['lot'] || '',
      price: row['price'] || '',
      beds: row['beds'] || '',
      baths: row['baths'] || '',
      sqft: row['sqft'] || '',
      garage: row['garage'] || '',
      lot_size: '',
      move_in_date: row['move_in_date'] || '',
      model_name: row['model_name'] || '',
      description: row['description'] || '',
      photo_url: row['photo_url'] || '',
      images: row['photo_url'] ? [row['photo_url']] : [],
      featured: row['featured']?.toLowerCase() === 'true',
      construction_status: 'Complete',
      is_quick_move_in: true, // Sheet items are always quick move-in
    }));

    if (communityId) {
      inventory = inventory.filter(
        (home) => home.community_id.toLowerCase() === communityId.toLowerCase()
      );
    }

    return inventory;
  } catch (error) {
    console.error('Error fetching sheet inventory:', error);
    return [];
  }
}

// Fetch listings from Repliers
async function fetchRepliersListings(community?: string): Promise<UnifiedListing[]> {
  const apiKey = process.env.REPLIERS_API_KEY;

  if (!apiKey) {
    console.log('Repliers API key not configured, skipping');
    return [];
  }

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('status', 'A');

    if (community) {
      queryParams.append('search', community);
      queryParams.append('searchFields', 'address.subdivision,address.neighborhood,address.area');
    }

    const apiUrl = `${REPLIERS_API_URL}?${queryParams.toString()}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error('Repliers API error:', response.status);
      return [];
    }

    const data = await response.json();

    return (data.listings || []).map((listing: any): UnifiedListing => {
      const constructionStatus = listing.constructionStatus || '';
      const isNewConstruction = listing.newConstruction || false;

      // Determine if this is a quick move-in home
      // Quick move-in = newConstruction AND constructionStatus indicates complete
      const isQuickMoveIn = isNewConstruction &&
        (constructionStatus.toLowerCase().includes('complete') ||
         constructionStatus.toLowerCase().includes('finished') ||
         constructionStatus.toLowerCase().includes('ready'));

      const addressParts = [
        listing.address?.streetNumber,
        listing.address?.streetName,
        listing.address?.streetSuffix,
      ].filter(Boolean);

      return {
        id: listing.mlsNumber || '',
        mls_number: listing.mlsNumber || '',
        community_id: listing.address?.subdivision?.toLowerCase().replace(/\s+/g, '-') || '',
        source: 'repliers',
        status: listing.status || '',
        address: addressParts.join(' '),
        lot: '',
        price: listing.listPrice?.toString() || '',
        beds: listing.details?.numBedrooms?.toString() || '',
        baths: listing.details?.numBathrooms?.toString() || '',
        sqft: listing.details?.sqft?.toString() || '',
        garage: listing.details?.numGarageSpaces?.toString() || '',
        lot_size: listing.lot?.size || listing.details?.lotSizeSqft?.toString() || '',
        move_in_date: isQuickMoveIn ? 'Ready Now' : '',
        model_name: '',
        description: listing.description || '',
        photo_url: listing.images?.[0] || '',
        images: listing.images || [],
        featured: false,
        construction_status: constructionStatus,
        is_quick_move_in: isQuickMoveIn,
      };
    });
  } catch (error) {
    console.error('Error fetching from Repliers:', error);
    return [];
  }
}

// Merge listings with Repliers taking precedence for matching addresses
function mergeListings(
  sheetListings: UnifiedListing[],
  repliersListings: UnifiedListing[]
): UnifiedListing[] {
  const merged: UnifiedListing[] = [];
  const repliersAddressMap = new Map<string, UnifiedListing>();

  // Index Repliers listings by normalized address
  for (const listing of repliersListings) {
    const normalizedAddr = normalizeAddress(listing.address);
    if (normalizedAddr) {
      repliersAddressMap.set(normalizedAddr, listing);
    }
  }

  // Process sheet listings, check for Repliers match
  for (const sheetListing of sheetListings) {
    const normalizedAddr = normalizeAddress(sheetListing.address);
    const repliersMatch = repliersAddressMap.get(normalizedAddr);

    if (repliersMatch) {
      // Repliers data takes precedence, but keep some sheet data
      merged.push({
        ...repliersMatch,
        community_id: sheetListing.community_id || repliersMatch.community_id,
        model_name: sheetListing.model_name || repliersMatch.model_name,
        featured: sheetListing.featured,
        source: 'merged',
      });
      // Remove from map so it's not added again
      repliersAddressMap.delete(normalizedAddr);
    } else {
      // No match, use sheet data
      merged.push(sheetListing);
    }
  }

  // Add remaining Repliers listings that didn't match sheet
  for (const listing of repliersAddressMap.values()) {
    merged.push(listing);
  }

  return merged;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const communityId = searchParams.get('community_id');
    const quickMoveInOnly = searchParams.get('quick_move_in') === 'true';
    const newConstructionOnly = searchParams.get('new_construction') === 'true';

    // Fetch from both sources in parallel
    const [sheetListings, repliersListings] = await Promise.all([
      fetchSheetInventory(communityId || undefined),
      fetchRepliersListings(communityId || undefined),
    ]);

    // Merge with Repliers taking precedence
    let listings = mergeListings(sheetListings, repliersListings);

    // Filter for quick move-in if requested
    if (quickMoveInOnly) {
      listings = listings.filter((l) => l.is_quick_move_in);
    }

    // Filter for new construction only
    if (newConstructionOnly) {
      listings = listings.filter(
        (l) => l.source === 'repliers' || l.source === 'merged'
      );
    }

    return NextResponse.json({
      success: true,
      data: listings,
      count: listings.length,
      sources: {
        sheet: sheetListings.length,
        repliers: repliersListings.length,
      },
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
