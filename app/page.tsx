import type { Metadata } from 'next';
import HomeContent from '@/components/pages/HomeContent';

export const metadata: Metadata = {
  title: 'Delaware New Construction Homes | Rush Home Team at Compass',
  description: 'Your guide to Delaware new construction. Explore communities, find quick move-in homes, and work with Delaware\'s new construction experts. Serving New Castle, Kent, and Sussex counties.',
  keywords: 'Delaware new construction, new homes Delaware, quick move-in homes, new construction communities, Rush Home Team, Compass real estate, Ashburn Homes, Delaware builders',
  openGraph: {
    title: 'Delaware New Construction Homes | Rush Home Team',
    description: 'Your guide to Delaware new construction. Explore communities, find quick move-in homes, and work with Delaware\'s new construction experts.',
    type: 'website',
    url: 'https://rushhome.com',
    siteName: 'Rush Home Team at Compass',
    images: [
      {
        url: 'https://rushhome.com/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Rush Home Team - Delaware New Construction Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delaware New Construction Homes | Rush Home Team',
    description: 'Your guide to Delaware new construction. Explore communities and find quick move-in homes.',
    images: ['https://rushhome.com/images/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <HomeContent />;
}