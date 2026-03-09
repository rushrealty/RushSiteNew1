import { NextResponse } from 'next/server';
import { searchListings, transformListing } from '@/lib/repliers';
import { MOCK_PROPERTIES } from '@/constants';

// Cache for 5 minutes (same as search)
export const revalidate = 300;

export async function GET() {
  try {
    // Fetch new construction homes with completed construction from Repliers
    // Criteria: NewConstructionYN = Y AND ConstructionCompletedYN = Y
    const response = await searchListings({
      status: 'A',
      resultsPerPage: 200,
      rawFilters: {
        'raw.NewConstructionYN': 'contains:Y',
        'raw.ConstructionCompletedYN': 'contains:Y',
      },
    });

    if (!response.listings || response.listings.length === 0) {
      return NextResponse.json({
        homes: MOCK_PROPERTIES,
        total: MOCK_PROPERTIES.length,
        isMockData: true,
      });
    }

    console.log(`[QMI API] Fetched ${response.listings.length} quick move-in homes (NewConstruction=Y, ConstructionComplete=Y)`);

    // Transform using the same function as the search page
    const homes = response.listings.map((listing) => ({
      ...transformListing(listing),
      isQuickMoveIn: true,
    }));

    return NextResponse.json({
      homes,
      total: homes.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching quick move-in listings:', error);

    return NextResponse.json({
      homes: MOCK_PROPERTIES,
      total: MOCK_PROPERTIES.length,
      isMockData: true,
      error: 'Failed to fetch live data, showing sample listings',
    });
  }
}
