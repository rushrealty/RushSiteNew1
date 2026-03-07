import { NextRequest, NextResponse } from 'next/server';
import { searchListings } from '@/lib/repliers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const community = searchParams.get('community');
  const status = searchParams.get('status') || 'A';

  try {
    const response = await searchListings({
      status,
      state: 'DE',
      ...(community ? { city: community } : {}),
    });

    // Enrich listings with construction status
    const enrichedListings = response.listings.map((listing) => {
      const constructionStatus = listing.constructionStatus;

      return {
        ...listing,
        construction_status: constructionStatus || 'unknown',
      };
    });

    return NextResponse.json({
      count: response.count,
      data: enrichedListings,
    });
  } catch (error) {
    console.error('Community homes API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
