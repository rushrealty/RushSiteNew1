import { NextRequest, NextResponse } from 'next/server';
import { searchListings, transformListing } from '@/lib/repliers';
import { MOCK_PROPERTIES } from '@/constants';

// Cache for 5 minutes (same as search)
export const revalidate = 300;

/**
 * Mapping of community slugs to search configuration.
 * Shared with /api/community-homes — keywords must ALL appear in
 * the Repliers `address.neighborhood` value for a match.
 */
const COMMUNITY_SEARCH_CONFIG: Record<
  string,
  { city?: string; keywords: string[]; addressKeywords?: string[] }
> = {
  'abbotts-pond': { city: 'Greenwood', keywords: ['abbotts', 'pond'] },
  'pinehurst-village': { city: 'Felton', keywords: ['pinehurst'] },
  'wiggins-mill': { city: 'Middletown', keywords: ['wiggins'], addressKeywords: ['wiggins mill'] },
  'baywood-greens': { city: 'Millsboro', keywords: ['baywood'] },
  'village-of-bayberry': { city: 'Middletown', keywords: ['village', 'bayberry'] },
  'bayberry': { city: 'Middletown', keywords: ['village', 'bayberry'] },
  'mitchells-corner': { city: 'Lewes', keywords: ['mitchell'] },
};

/**
 * Check if a listing's neighborhood or address matches the community.
 */
function matchesCommunity(
  listing: { address: { neighborhood?: string; streetName?: string; streetNumber?: string; streetSuffix?: string } },
  config: { keywords: string[]; addressKeywords?: string[] }
): boolean {
  const neighborhood = (listing.address.neighborhood || '').toLowerCase();
  if (neighborhood && config.keywords.every((kw) => neighborhood.includes(kw))) {
    return true;
  }
  if (config.addressKeywords) {
    const streetAddr = [listing.address.streetNumber, listing.address.streetName, listing.address.streetSuffix]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    if (config.addressKeywords.some((kw) => streetAddr.includes(kw))) {
      return true;
    }
  }
  return false;
}

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
    const communityId = searchParams.get('communityId');

    // Build search filters
    const searchFilters: Parameters<typeof searchListings>[0] = {
      status: 'A',
      resultsPerPage: 200,
      rawFilters: {
        'raw.NewConstructionYN': 'contains:Y',
        'raw.ConstructionCompletedYN': 'contains:Y',
      },
    };

    // If filtering by community, narrow the search to that city
    const communityConfig = communityId ? COMMUNITY_SEARCH_CONFIG[communityId] : null;
    if (communityConfig?.city) {
      searchFilters.city = communityConfig.city;
    }

    // Fetch new construction homes with completed construction from Repliers
    const response = await searchListings(searchFilters);

    if (!response.listings || response.listings.length === 0) {
      // No community filtering for mock data
      if (!communityId) {
        return NextResponse.json({
          homes: limit ? MOCK_PROPERTIES.slice(0, limit) : MOCK_PROPERTIES,
          total: MOCK_PROPERTIES.length,
          isMockData: true,
        });
      }
      return NextResponse.json({ homes: [], total: 0 });
    }

    console.log(`[QMI API] Fetched ${response.listings.length} quick move-in homes (NewConstruction=Y, ConstructionComplete=Y)${communityId ? ` for city: ${communityConfig?.city || 'all'}` : ''}`);

    // Filter by community neighborhood if communityId was provided
    let filteredListings = response.listings;
    if (communityId) {
      const matchConfig = communityConfig || {
        keywords: communityId
          .replace(/-/g, ' ')
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w.length > 2),
      };
      filteredListings = response.listings.filter((listing) =>
        matchesCommunity(listing, matchConfig)
      );
      console.log(
        `[QMI API] ${filteredListings.length} of ${response.listings.length} listings match community "${communityId}" (keywords: ${matchConfig.keywords.join(', ')})`
      );
    }

    // Transform using the same function as the search page
    let homes = filteredListings.map((listing) => ({
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
