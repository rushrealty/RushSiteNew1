import { NextResponse } from 'next/server';
import { searchListings, transformListing } from '@/lib/repliers';
import { MOCK_PROPERTIES } from '@/constants';

export async function GET() {
  try {
    const result = await searchListings({
      status: 'A',
      resultsPerPage: 200,
    });

    if (result.listings && result.listings.length > 0) {
      const homes = result.listings.map(transformListing);
      return NextResponse.json({
        homes,
        total: result.count,
        page: result.page,
        numPages: result.numPages,
      });
    }

    // Fall back to mock data if no listings
    return NextResponse.json({
      homes: MOCK_PROPERTIES,
      total: MOCK_PROPERTIES.length,
      isMockData: true,
    });
  } catch (error) {
    console.error('Error fetching search listings:', error);
    return NextResponse.json({
      homes: MOCK_PROPERTIES,
      total: MOCK_PROPERTIES.length,
      isMockData: true,
      error: 'Failed to fetch live data, showing sample listings',
    });
  }
}
