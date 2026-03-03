import { NextResponse } from 'next/server';
import { fetchInventoryData } from '@/lib/inventory';

/**
 * Debug endpoint to test Google Sheets connectivity
 * Use this to verify your sheet is configured correctly
 *
 * GET /api/debug/inventory
 */
export async function GET() {
  const startTime = Date.now();

  try {
    console.log('[Debug] Starting inventory fetch test');

    const data = await fetchInventoryData();

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      duration: `${duration}ms`,
      counts: {
        builders: data.builders.length,
        communities: data.communities.length,
        homes: data.homes.length,
      },
      // Show first item of each type for verification
      samples: {
        builder: data.builders[0] || null,
        community: data.communities[0] || null,
        home: data.homes[0] || null,
      },
      // Full data for debugging
      data: {
        builders: data.builders,
        communities: data.communities,
        homes: data.homes,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    console.error('[Debug] Inventory fetch failed:', error);

    return NextResponse.json({
      success: false,
      duration: `${duration}ms`,
      error: errorMessage,
      help: {
        message: 'Common issues:',
        issues: [
          '1. Google Sheet not published to web - Go to File > Share > Publish to web > Select "Entire Document" > Publish',
          '2. Wrong GID values - Click each tab and copy the gid=XXXXXX from the URL',
          '3. Wrong PUBLISHED_SHEET_ID - After publishing, copy the ID from the published URL (starts with 2PACX-)',
          '4. Column names don\'t match expected format (id, name, builder_id, community_id, etc.)',
        ],
      },
    }, { status: 500 });
  }
}
