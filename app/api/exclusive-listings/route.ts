import { NextResponse } from 'next/server';
import { searchListings, transformListing } from '@/lib/repliers';
import { MOCK_PROPERTIES } from '@/constants';

export const revalidate = 300; // Cache for 5 minutes

// Rush Home Team agent MLS IDs
const RUSH_HOME_AGENT_IDS = [
  '3162981',
  '3187332',
  '3132330',
  '3321511',
  '3353395',
  '3335527',
  '3371137',
  '3367677',
];

export async function GET() {
  try {
    // Query Repliers for each agent's listings in parallel
    const agentPromises = RUSH_HOME_AGENT_IDS.map((agentId) =>
      searchListings({
        status: 'A',
        agent: agentId,
        hasImages: true, // Only include listings with photos from Repliers
        resultsPerPage: 200,
      })
    );

    const results = await Promise.all(agentPromises);

    // Merge all listings, deduplicate by MLS number
    const seen = new Set<string>();
    const allListings = [];

    for (const result of results) {
      for (const listing of result.listings || []) {
        if (!seen.has(listing.mlsNumber)) {
          seen.add(listing.mlsNumber);
          allListings.push(listing);
        }
      }
    }

    if (allListings.length === 0) {
      return NextResponse.json({
        homes: MOCK_PROPERTIES.slice(0, 9),
        total: 9,
        isMockData: true,
      });
    }

    const homes = allListings.map(transformListing);

    // Shuffle to rotate which homes appear first
    for (let i = homes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [homes[i], homes[j]] = [homes[j], homes[i]];
    }

    return NextResponse.json({
      homes,
      total: homes.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Exclusive Listings] Error:', error);
    return NextResponse.json({
      homes: MOCK_PROPERTIES.slice(0, 9),
      total: 9,
      isMockData: true,
      error: 'Failed to fetch live data',
    });
  }
}
