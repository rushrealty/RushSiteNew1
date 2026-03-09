import type { Metadata } from 'next';
import ExclusiveContent from '@/components/pages/ExclusiveContent';

export const metadata: Metadata = {
  title: 'Rush Home Exclusives | Rush Home Team at Compass',
  description:
    'Browse homes listed exclusively by the Rush Home Team agents in Delaware. Personalized guidance for every listing.',
  keywords:
    'Rush Home Team listings, exclusive listings Delaware, Compass real estate, Delaware homes for sale',
  openGraph: {
    title: 'Rush Home Exclusives | Rush Home Team at Compass',
    description:
      'Browse homes listed exclusively by the Rush Home Team agents in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/exclusive',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rush Home Exclusives | Rush Home Team',
    description:
      'Browse homes listed exclusively by the Rush Home Team agents in Delaware.',
  },
  alternates: {
    canonical: 'https://rushhome.com/exclusive',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PageProps {
  searchParams: Promise<{ property?: string }>;
}

export default async function ExclusivePage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <ExclusiveContent initialPropertyId={params.property} />;
}
