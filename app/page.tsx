import type { Metadata } from 'next';
import HomeContent from '@/components/pages/HomeContent';

export const metadata: Metadata = {
  title: 'Your Home. Sold. Guaranteed. | Rush Home Team | Delaware Real Estate',
  description: 'Get a guaranteed offer on your Delaware home in 48 hours. Buy your next home before selling. No showings, no stress, close on your timeline. Serving all three Delaware counties.',
  keywords: 'sell home Delaware, guaranteed home sale, cash offer Delaware, sell house fast, Rush Home Team, Delaware real estate, buy before you sell, QuickBuy Delaware',
  openGraph: {
    title: 'Your Home. Sold. Guaranteed. | Rush Home Team',
    description: 'Get a guaranteed offer on your Delaware home in 48 hours. Buy your next home before selling.',
    type: 'website',
    url: 'https://rushhome.com',
    siteName: 'Rush Home Team',
    images: [
      {
        url: 'https://rushhome.com/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Rush Home Team - Your Home. Sold. Guaranteed.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Home. Sold. Guaranteed. | Rush Home Team',
    description: 'Get a guaranteed offer on your Delaware home in 48 hours.',
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
