import { NextRequest, NextResponse } from 'next/server';
import { searchListings, transformListing } from '@/lib/repliers';
import { MOCK_COMMUNITIES } from '@/constants';
import { COMMUNITIES_DATA } from '@/data/communities';
import { fetchInventoryData } from '@/lib/inventory';

// Cache for 5 minutes
export const revalidate = 300;

/**
 * Mapping of community slugs to search configuration.
 * `keywords` are lowercased tokens that must ALL appear in the
 * Repliers `address.neighborhood` value for a match.
 * `addressKeywords` are used as a secondary match against the
 * full street address (for communities named after a road).
 */
const COMMUNITY_SEARCH_CONFIG: Record<
  string,
  { city: string; keywords: string[]; addressKeywords?: string[] }
> = {
  'abbotts-pond': {
    city: 'Greenwood',
    keywords: ['abbotts', 'pond'],
  },
  'pinehurst-village': {
    city: 'Felton',
    keywords: ['pinehurst'],
  },
  'wiggins-mill': {
    city: 'Middletown',
    keywords: ['wiggins'],
    addressKeywords: ['wiggins mill'],
  },
  'baywood-greens': {
    city: 'Millsboro',
    keywords: ['baywood'],
  },
  'village-of-bayberry': {
    city: 'Middletown',
    keywords: ['village', 'bayberry'],
  },
  'bayberry': {
    city: 'Middletown',
    keywords: ['village', 'bayberry'],
  },
  'mitchells-corner': {
    city: 'Lewes',
    keywords: ['mitchell'],
  },
};

/**
 * Check if a listing's neighborhood or address matches the community.
 */
function matchesCommunity(
  listing: {
    address: {
      neighborhood?: string;
      streetName?: string;
      streetNumber?: string;
      streetSuffix?: string;
    };
  },
  config: { keywords: string[]; addressKeywords?: string[] }
): boolean {
  // Primary match: neighborhood field contains all keywords
  const neighborhood = (listing.address.neighborhood || '').toLowerCase();
  if (
    neighborhood &&
    config.keywords.every((kw) => neighborhood.includes(kw))
  ) {
    return true;
  }

  // Secondary match: street address contains address keywords
  if (config.addressKeywords) {
    const streetAddr = [
      listing.address.streetNumber,
      listing.address.streetName,
      listing.address.streetSuffix,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (config.addressKeywords.some((kw) => streetAddr.includes(kw))) {
      return true;
    }
  }

  return false;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    // Look up community data from static sources first
    const mockCommunity = MOCK_COMMUNITIES.find(
      (c) => c.slug === slug || c.id === slug
    );
    const communityData = COMMUNITIES_DATA[slug];

    // If not found in static data, check Google Sheet inventory
    let sheetCommunity: { name: string; city: string } | null = null;
    if (!mockCommunity && !communityData) {
      try {
        const inventoryData = await fetchInventoryData();
        const match = inventoryData.communities.find(
          (c) => c.slug === slug || c.id === slug
        );
        if (match) {
          sheetCommunity = { name: match.name, city: match.city };
        }
      } catch (error) {
        console.error('[Community Homes] Error fetching sheet data:', error);
      }
    }

    if (!mockCommunity && !communityData && !sheetCommunity) {
      return NextResponse.json(
        { error: 'Community not found' },
        { status: 404 }
      );
    }

    // Get search config for this community
    const config = COMMUNITY_SEARCH_CONFIG[slug];
    const city =
      config?.city ||
      mockCommunity?.city ||
      communityData?.location?.split(',')[0]?.trim() ||
      sheetCommunity?.city ||
      '';
    const communityName = mockCommunity?.name || communityData?.name || sheetCommunity?.name || '';

    // Fetch all new construction homes in this city from Repliers
    const response = await searchListings({
      status: 'A',
      city,
      resultsPerPage: 200,
      rawFilters: {
        'raw.NewConstructionYN': 'contains:Y',
      },
    });

    if (!response.listings || response.listings.length === 0) {
      console.log(
        `[Community Homes] No new construction listings found in ${city}`
      );
      return NextResponse.json({
        availableHomes: [],
        quickMoveInHomes: [],
        total: 0,
        communityName,
      });
    }

    console.log(
      `[Community Homes] Found ${response.listings.length} new construction listings in ${city}`
    );

    // Filter to listings matching this community
    const matchConfig = config || {
      keywords: communityName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2),
    };

    const matchingListings = response.listings.filter((listing) =>
      matchesCommunity(listing, matchConfig)
    );

    console.log(
      `[Community Homes] ${matchingListings.length} listings match "${communityName}" (keywords: ${matchConfig.keywords.join(', ')})`
    );

    // Split into two groups:
    // 1. Available Homes: New Construction = Y, ConstructionCompleted != Y
    // 2. Quick Move-In: New Construction = Y, ConstructionCompleted = Y
    const availableHomes = matchingListings
      .filter(
        (listing) =>
          listing.raw?.ConstructionCompletedYN?.toUpperCase() !== 'Y'
      )
      .map((listing) => ({
        ...transformListing(listing),
        isQuickMoveIn: false,
      }));

    const quickMoveInHomes = matchingListings
      .filter(
        (listing) =>
          listing.raw?.ConstructionCompletedYN?.toUpperCase() === 'Y'
      )
      .map((listing) => ({
        ...transformListing(listing),
        isQuickMoveIn: true,
      }));

    return NextResponse.json({
      availableHomes,
      quickMoveInHomes,
      total: availableHomes.length + quickMoveInHomes.length,
      communityName,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching community homes:', error);
    return NextResponse.json({
      availableHomes: [],
      quickMoveInHomes: [],
      total: 0,
      error: 'Failed to fetch homes',
    });
  }
}
