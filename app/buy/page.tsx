import type { Metadata } from 'next';
import BuyContent from '@/components/pages/BuyContent';

export const metadata: Metadata = {
  title: 'Search Homes for Sale in Delaware | Rush Home Team',
  description: 'Find your dream home in Delaware. Search all available listings across New Castle, Kent, and Sussex counties with Rush Home Team.',
  keywords: 'homes for sale Delaware, buy home Delaware, Delaware real estate, MLS search Delaware, houses for sale DE',
  openGraph: {
    title: 'Search Homes for Sale in Delaware',
    description: 'Find your dream home in Delaware. Search all available listings with Rush Home Team.',
    type: 'website',
    url: 'https://rushhome.com/buy',
    siteName: 'Rush Home Team',
  },
};

export default function BuyPage() {
  return <BuyContent />;
}
