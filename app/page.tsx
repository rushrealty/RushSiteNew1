import type { Metadata } from 'next';
import HomeContent from '@/components/pages/HomeContent';

export const metadata: Metadata = {
  title: 'Your Home. Sold. Guaranteed. | Rush Home Team',
  description: 'Get a guaranteed offer on your Delaware home in 48 hours. Buy your next home before selling. No showings, no stress, your timeline.',
  keywords: 'sell home Delaware, guaranteed home sale, cash offer Delaware, sell house fast, Rush Home Team',
};

export default function HomePage() {
  return <HomeContent />;
}
