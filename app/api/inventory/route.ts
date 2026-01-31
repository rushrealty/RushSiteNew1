import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQq5kKLZrq1Ror-1rXh_krZnhcs_V1ssIm4uykHjgURw-Y4j2k-RrteDMqfvod9OkHu4hofA071UOJo/pub?output=csv&gid=1527336354';

interface InventoryHome {
  id: string;
  community_id: string;
  mls_number: string;
  status: string;
  address: string;
  lot: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  garage: string;
  move_in_date: string;
  model_name: string;
  description: string;
  photo_url: string;
  featured: boolean;
}

function parseCSV(csvText: string): InventoryHome[] {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  const data: InventoryHome[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || '';
    });

    data.push({
      id: row['id'] || '',
      community_id: row['community_id'] || '',
      mls_number: row['mls_number'] || '',
      status: row['status'] || '',
      address: row['address'] || '',
      lot: row['lot'] || '',
      price: row['price'] || '',
      beds: row['beds'] || '',
      baths: row['baths'] || '',
      sqft: row['sqft'] || '',
      garage: row['garage'] || '',
      move_in_date: row['move_in_date'] || '',
      model_name: row['model_name'] || '',
      description: row['description'] || '',
      photo_url: row['photo_url'] || '',
      featured: row['featured']?.toLowerCase() === 'true',
    });
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const communityId = searchParams.get('community_id');

    // Fetch CSV from Google Sheets
    const response = await fetch(GOOGLE_SHEET_URL, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${response.status}`);
    }

    const csvText = await response.text();
    let inventory = parseCSV(csvText);

    // Filter by community_id if provided
    if (communityId) {
      inventory = inventory.filter(
        (home) => home.community_id.toLowerCase() === communityId.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: inventory,
      count: inventory.length,
    });
  } catch (error) {
    console.error('Error fetching inventory:', error);
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
