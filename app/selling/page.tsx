import type { Metadata } from 'next';
import SellingContent from '@/components/pages/SellingContent';

export const metadata: Metadata = {
  title: 'Sell Your Home | Rush Home Team at Compass',
  description: 'Sell your Delaware home with confidence. Get a guaranteed cash offer or list with our comprehensive 10-step process. Close in as little as 14 days.',
  keywords: 'sell home Delaware, cash offer Delaware, guaranteed home sale, Rush Home Team, Compass real estate, sell house fast',
  openGraph: {
    title: 'Sell Your Home | Rush Home Team',
    description: 'Get a guaranteed cash offer or list with our comprehensive process. Close in as little as 14 days.',
    type: 'website',
    url: 'https://rushhome.com/selling',
  },
};

export default function SellingPage() {
  return <SellingContent />;
}