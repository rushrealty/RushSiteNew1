import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQq5kKLZrq1Ror-1rXh_krZnhcs_V1ssIm4uykHjgURw-Y4j2k-RrteDMqfvod9OkHu4hofA071UOJo/pub?output=csv&gid=1651556845';

interface Community {
  id: string;
  name: string;
  builder_id: string;
  address: string;
  city: string;
  county: string;
  slug: string;
  min_price: string;
  model_photo_1: string;
  description: string;
  is_55_plus: boolean;
  clubhouse: boolean;
  golfcourse: boolean;
  community_pool: boolean;
  school_district: string;
  schools: string;
}

function parseCSV(csvText: string): Community[] {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  const data: Community[] = [];
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
      name: row['name'] || '',
      builder_id: row['builder_id'] || '',
      address: row['address'] || '',
      city: row['city'] || '',
      county: row['county'] || '',
      slug: row['slug'] || '',
      min_price: row['min_price'] || '',
      model_photo_1: row['model_photo_1'] || '',
      description: row['description'] || '',
      is_55_plus: row['55+']?.toLowerCase() === 'true' || row['55+']?.toLowerCase() === 'yes',
      clubhouse: row['clubhouse']?.toLowerCase() === 'true' || row['clubhouse']?.toLowerCase() === 'yes',
      golfcourse: row['golfcourse']?.toLowerCase() === 'true' || row['golfcourse']?.toLowerCase() === 'yes',
      community_pool: row['community_pool']?.toLowerCase() === 'true' || row['community_pool']?.toLowerCase() === 'yes',
      school_district: row['school_district'] || '',
      schools: row['schools'] || '',
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
    const slug = searchParams.get('slug');
    const county = searchParams.get('county');

    // Fetch CSV from Google Sheets
    const response = await fetch(GOOGLE_SHEET_URL, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${response.status}`);
    }

    const csvText = await response.text();
    let communities = parseCSV(csvText);

    // Filter by slug if provided
    if (slug) {
      communities = communities.filter(
        (c) => c.slug.toLowerCase() === slug.toLowerCase()
      );
    }

    // Filter by county if provided
    if (county) {
      communities = communities.filter(
        (c) => c.county.toLowerCase() === county.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: communities,
      count: communities.length,
    });
  } catch (error) {
    console.error('Error fetching communities:', error);
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
