import { NextRequest, NextResponse } from 'next/server';
import { searchListings, transformListing } from '@/lib/repliers';
import { MOCK_PROPERTIES } from '@/constants';

// Cache for 5 minutes (same as search)
export const revalidate = 300;

/**
 * Seeded shuffle using a simple hash-based PRNG.
 * The seed changes every 4 hours so featured homes rotate ~6 times per day.
 */
function seededShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  // Seed = current 4-hour window (changes at 00:00, 04:00, 08:00, 12:00, 16:00, 20:00)
  let seed = Math.floor(Date.now() / (4 * 60 * 60 * 1000));

  // Simple mulberry32 PRNG
  function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

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
        homes: limit ? MOCK_PROPERTIES.slice(0, limit) : MOCK_PROPERTIES,
        total: MOCK_PROPERTIES.length,
        isMockData: true,
      });
    }

    console.log(`[QMI API] Fetched ${response.listings.length} quick move-in homes (NewConstruction=Y, ConstructionComplete=Y)`);

    // Transform using the same function as the search page
    let homes = response.listings.map((listing) => ({
      ...transformListing(listing),
      isQuickMoveIn: true,
    }));

    // When a limit is requested (e.g. homepage featured), shuffle with a
    // time-based seed so the selection rotates every 4 hours (~6x per day)
    if (limit && limit < homes.length) {
      homes = seededShuffle(homes).slice(0, limit);
    } else if (limit) {
      homes = homes.slice(0, limit);
    }

    return NextResponse.json({
      homes,
      total: homes.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching quick move-in listings:', error);

    return NextResponse.json({
      homes: MOCK_PROPERTIES.slice(0, 6),
      total: MOCK_PROPERTIES.length,
      isMockData: true,
      error: 'Failed to fetch live data, showing sample listings',
    });
  }
}
