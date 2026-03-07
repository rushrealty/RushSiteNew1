import type { Metadata } from 'next';
import SearchContent from '@/components/pages/SearchContent';

export const metadata: Metadata = {
  title: 'Search Homes | Rush Home Team at Compass',
  description: 'Search all available homes for sale in Delaware. Browse listings by price, location, bedrooms, and more.',
  keywords: 'search homes Delaware, homes for sale, Delaware real estate, MLS listings, buy a home Delaware',
  openGraph: {
    title: 'Search Homes | Rush Home Team',
    description: 'Search all available homes for sale in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/search',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Homes | Rush Home Team',
    description: 'Search all available homes for sale in Delaware.',
  },
  alternates: {
    canonical: 'https://rushhome.com/search',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PageProps {
  searchParams: Promise<{ property?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <SearchContent initialPropertyId={params.property} />;
}
