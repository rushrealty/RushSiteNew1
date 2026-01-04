import type { Metadata } from 'next';
import SellContent from '@/components/pages/SellContent';

export const metadata: Metadata = {
  title: 'How to Sell Your Home in Delaware | Complete Seller\'s Guide | Rush Home Team',
  description: 'Your complete guide to selling your home in Delaware. From preparation to closing, learn the home selling process with Rush Home Team\'s expert guidance and guaranteed sale options.',
  keywords: 'sell home Delaware, how to sell house Delaware, home selling guide, list house Delaware, sell house fast Delaware, Delaware real estate agent, home selling process',
  openGraph: {
    title: 'How to Sell Your Home in Delaware | Complete Seller\'s Guide',
    description: 'From preparation to closing, your step-by-step guide to selling your home in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/sell',
    siteName: 'Rush Home Team',
    images: [
      {
        url: 'https://rushhome.com/images/og-how-to-sell.jpg',
        width: 1200,
        height: 630,
        alt: 'How to Sell Your Home in Delaware - Rush Home Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Sell Your Home in Delaware',
    description: 'Your complete guide to selling your home in Delaware. From preparation to closing.',
    images: ['https://rushhome.com/images/og-how-to-sell.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com/sell',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SellPage() {
  return <SellContent />;
}
