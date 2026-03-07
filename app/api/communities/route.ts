import { NextResponse } from 'next/server';
import { fetchInventoryData } from '@/lib/inventory';
import { InventoryCommunity, Builder } from '@/lib/inventory-types';

export interface EnrichedCommunity extends InventoryCommunity {
  builder?: Builder;
}

export async function GET() {
  try {
    const inventoryData = await fetchInventoryData();

    // Enrich communities with builder info
    const enrichedCommunities: EnrichedCommunity[] = inventoryData.communities.map(community => {
      const builder = inventoryData.builders.find(b => b.id === community.builderId);
      return { ...community, builder };
    });

    return NextResponse.json({
      communities: enrichedCommunities,
      total: enrichedCommunities.length,
    });
  } catch (error) {
    console.error('Error fetching communities:', error);
    return NextResponse.json({
      communities: [],
      total: 0,
      error: 'Failed to fetch communities',
    });
  }
}
