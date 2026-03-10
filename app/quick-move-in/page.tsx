import type { Metadata } from 'next';
import QuickMoveInContent from '@/components/pages/QuickMoveInContent';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Quick Move-In Homes Delaware | Move-In Ready New Construction | Rush Home Team',
  description: 'Browse move-in ready new construction homes in Delaware. Find homes that are already built or under construction - no waiting to build from scratch.',
  keywords: 'quick move-in homes Delaware, move-in ready, new construction homes, Delaware real estate, spec homes',
  openGraph: {
    title: 'Quick Move-In Homes Delaware | Rush Home Team',
    description: 'Browse move-in ready new construction homes in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/quick-move-in',
    siteName: 'Rush Home Team at Compass',
    images: [
      {
        url: 'https://rushhome.com/images/og-quick-move-in.jpg',
        width: 1200,
        height: 630,
        alt: 'Quick Move-In Homes - Rush Home Team Delaware',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Move-In Homes Delaware | Rush Home Team',
    description: 'Browse move-in ready new construction homes in Delaware.',
    images: ['https://rushhome.com/images/og-quick-move-in.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com/quick-move-in',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PageProps {
  searchParams: Promise<{ property?: string }>;
}

export default async function QuickMoveInPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Home', url: 'https://rushhome.com' },
        { name: 'Quick Move-In Homes', url: 'https://rushhome.com/quick-move-in' },
      ]} />
      <QuickMoveInContent initialPropertyId={params.property} />
    </>
  );
}