import type { Metadata } from 'next';
import { fetchInventoryData } from '@/lib/inventory';
import { COMMUNITIES_DATA } from '@/data/communities';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

// Revalidate every 6 hours for ISR
export const revalidate = 21600;

export async function generateStaticParams() {
  const knownSlugs = [
    'abbotts-pond',
    'pinehurst-village',
    'wiggins-mill',
    'baywood-greens',
    'currie-lane',
    'canaan-woods',
  ];

  try {
    const inventoryData = await fetchInventoryData();
    const sheetSlugs = inventoryData.communities
      .map(c => c.slug || c.id)
      .filter(Boolean);
    const allSlugs = [...new Set([...knownSlugs, ...sheetSlugs])];
    return allSlugs.map(communityId => ({ communityId }));
  } catch {
    return knownSlugs.map(communityId => ({ communityId }));
  }
}

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
    alternates: {
      canonical: `https://rushhome.com/available-communities/${communityId}`,
    },
    robots: {
      index: true,
      follow: true,
    },
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

export default async function CommunityLayout({ children, params }: LayoutProps) {
  const { communityId } = await params;

  // Get community name for breadcrumb
  const hardcoded = COMMUNITIES_DATA[communityId];
  let communityName = hardcoded?.name || communityId;

  if (!hardcoded) {
    try {
      const inventoryData = await fetchInventoryData();
      const sheetCommunity = inventoryData.communities.find(c => c.id === communityId || c.slug === communityId);
      if (sheetCommunity?.name) communityName = sheetCommunity.name;
    } catch {
      // Use fallback name
    }
  }

  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Home', url: 'https://rushhome.com' },
        { name: 'Communities', url: 'https://rushhome.com/available-communities' },
        { name: communityName, url: `https://rushhome.com/available-communities/${communityId}` },
      ]} />
      {children}
    </>
  );
}
