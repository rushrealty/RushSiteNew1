import { NextRequest, NextResponse } from 'next/server';

const REPLIERS_API_URL = 'https://api.repliers.io';
const API_KEY = process.env.REPLIERS_API_KEY || '';

// Google Sheet URL for inventory
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQq5kKLZrq1Ror-1rXh_krZnhcs_V1ssIm4uykHjgURw-Y4j2k-RrteDMqfvod9OkHu4hofA071UOJo/pub?output=csv&gid=1527336354';

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

interface AutocompletePrediction {
  description: string;
  type: string;
  city?: string;
  area?: string;
  neighborhood?: string;
  zip?: string;
  // For inventory homes
  inventoryId?: string;
  inventoryData?: InventoryHome;
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
    const response = await fetch(GOOGLE_SHEET_URL, {
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

async function fetchRepliersAutocomplete(query: string): Promise<AutocompletePrediction[]> {
  try {
    const url = new URL(`${REPLIERS_API_URL}/locations/autocomplete`);
    url.searchParams.append('search', query);
    // Filter to Delaware
    url.searchParams.append('state', 'Delaware');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'REPLIERS-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Repliers autocomplete error:', response.status);
      return [];
    }

    const data = await response.json();

    // Transform Repliers response to our format
    // Repliers returns an array of location objects
    if (Array.isArray(data)) {
      return data.map((item: { name?: string; city?: string; area?: string; neighborhood?: string; zip?: string; type?: string }) => ({
        description: item.name || item.city || item.area || item.neighborhood || item.zip || '',
        type: item.type || 'location',
        city: item.city,
        area: item.area,
        neighborhood: item.neighborhood,
        zip: item.zip,
      })).filter((p: AutocompletePrediction) => p.description);
    }

    return [];
  } catch (error) {
    console.error('Repliers autocomplete error:', error);
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
    // Fetch both Repliers locations and inventory homes in parallel
    const [repliersResults, inventoryHomes] = await Promise.all([
      fetchRepliersAutocomplete(query),
      fetchInventoryHomes(),
    ]);

    // Filter inventory homes that match the query
    const matchingInventory: AutocompletePrediction[] = inventoryHomes
      .filter(home =>
        home.address.toLowerCase().includes(query) ||
        home.community_id.toLowerCase().includes(query)
      )
      .slice(0, 5) // Limit to 5 inventory results
      .map(home => ({
        description: home.address,
        type: 'inventory',
        inventoryId: home.id,
        inventoryData: home,
      }));

    // Combine results: inventory homes first, then Repliers locations
    const predictions: AutocompletePrediction[] = [
      ...matchingInventory,
      ...repliersResults.slice(0, 10 - matchingInventory.length), // Fill remaining with Repliers
    ];

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Autocomplete error:', error);
    return NextResponse.json({ predictions: [] });
  }
}
