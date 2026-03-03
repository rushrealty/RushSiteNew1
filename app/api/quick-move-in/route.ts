import { NextRequest, NextResponse } from 'next/server';
import { getQuickMoveInListings } from '@/lib/quick-move-in';
import { MOCK_PROPERTIES } from '@/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const featuredOnly = searchParams.get('featuredOnly') === 'true';
    const includeAll = searchParams.get('includeAll') === 'true';
    const communityId = searchParams.get('communityId');

    const result = await getQuickMoveInListings({
      limit: limit ? parseInt(limit) : undefined,
      featuredOnly,
      includeAll,
      communityId: communityId || undefined,
    });

    // If no real listings found, fall back to mock data for development
    if (result.homes.length === 0) {
      const mockHomes = featuredOnly
        ? MOCK_PROPERTIES.slice(0, limit ? parseInt(limit) : 6)
        : MOCK_PROPERTIES;

      return NextResponse.json({
        homes: mockHomes,
        fromRepliers: 0,
        fromSheet: 0,
        total: mockHomes.length,
        isMockData: true,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching quick move-in listings:', error);

    // Fall back to mock data on error
    return NextResponse.json({
      homes: MOCK_PROPERTIES.slice(0, 6),
      fromRepliers: 0,
      fromSheet: 0,
      total: 6,
      isMockData: true,
      error: 'Failed to fetch live data, showing sample listings',
    });
  }
}
