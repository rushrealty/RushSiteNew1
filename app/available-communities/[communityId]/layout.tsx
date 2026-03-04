import type { Metadata } from 'next';
import { fetchInventoryData } from '@/lib/inventory';
import { COMMUNITIES_DATA } from '@/data/communities';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ communityId: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { communityId } = await params;

  // Try hardcoded data first
  const hardcoded = COMMUNITIES_DATA[communityId];

  // Try sheet data
  let sheetCommunity: { name: string; city?: string; description?: string; modelPhotos?: string[] } | undefined;
  try {
    const inventoryData = await fetchInventoryData();
    sheetCommunity = inventoryData.communities.find(c => c.id === communityId || c.slug === communityId);
  } catch {
    // Fall back to hardcoded
  }

  const name = sheetCommunity?.name || hardcoded?.name || communityId;
  const city = sheetCommunity?.city || hardcoded?.location || 'Delaware';
  const description = sheetCommunity?.description || hardcoded?.description || `New construction homes in ${city}`;
  const image = sheetCommunity?.modelPhotos?.[0] || hardcoded?.img || 'https://rushhome.com/images/og-home.jpg';

  const title = `${name} - New Homes in ${city}`;

  return {
    title: `${title} | Rush Home Team`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://rushhome.com/available-communities/${communityId}`,
      siteName: 'Rush Home Team at Compass',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default function CommunityLayout({ children }: LayoutProps) {
  return children;
}
