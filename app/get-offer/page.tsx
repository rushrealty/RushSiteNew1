import type { Metadata } from 'next';
import GetYourOfferContent from '@/components/pages/GetYourOfferContent';

export const metadata: Metadata = {
  title: 'Get Your Guaranteed Home Offer in 48 Hours | Rush Home Team',
  description: 'Get a guaranteed cash offer on your Delaware home in 48 hours. No showings, no repairs, close on your timeline. Sell with certainty or list traditionally with a backup offer.',
  keywords: 'guaranteed home offer, cash offer Delaware, sell house fast Delaware, QuickBuy Delaware, instant home offer, sell home no showings, guaranteed home sale',
  openGraph: {
    title: 'Get Your Guaranteed Home Offer in 48 Hours',
    description: 'Sell your Delaware home with certainty. Get a guaranteed cash offer, close on your timeline, or list traditionally with a backup offer.',
    type: 'website',
    url: 'https://rushhome.com/get-offer',
    siteName: 'Rush Home Team',
    images: [
      {
        url: 'https://rushhome.com/images/og-get-offer.jpg',
        width: 1200,
        height: 630,
        alt: 'Get Your Guaranteed Home Offer - Rush Home Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Your Guaranteed Home Offer in 48 Hours',
    description: 'Sell your Delaware home with certainty. Get a guaranteed cash offer today.',
    images: ['https://rushhome.com/images/og-get-offer.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com/get-offer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GetOfferPage() {
  return <GetYourOfferContent />;
}
