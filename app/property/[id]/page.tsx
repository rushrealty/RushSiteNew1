import type { Metadata } from 'next';
import { getQuickMoveInListings } from '@/lib/quick-move-in';
import PropertyRedirect from './PropertyRedirect';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const result = await getQuickMoveInListings({ includeAll: true });
    const property = result.homes.find(h => h.id === id);

    if (!property) {
      return {
        title: 'Property Not Found | Rush Home Team',
      };
    }

    const title = `${property.title} - ${property.address}, ${property.city}, ${property.state}`;
    const description = `${property.beds} bed, ${property.baths} bath, ${property.sqft.toLocaleString()} sqft home${property.community ? ` in ${property.community}` : ''}. $${property.price.toLocaleString()}`;
    const image = property.images?.[0] || 'https://rushhome.com/images/og-home.jpg';

    return {
      title: `${title} | Rush Home Team`,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://rushhome.com/property/${id}`,
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
  } catch {
    return {
      title: 'Property | Rush Home Team',
    };
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;
  return <PropertyRedirect propertyId={id} />;
}
