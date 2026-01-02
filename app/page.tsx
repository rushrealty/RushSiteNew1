import type { Metadata } from 'next';
import HomeContent from '@/components/pages/HomeContent';

export const metadata: Metadata = {
  title: 'Your Home. Sold. Guaranteed. | Rush Home Team',
  description: 'Get an instant cash offer. Skip the showings, repairs, and uncertainty. Close on your timeline.',
  keywords: 'sell home Delaware, guaranteed home sale, cash offer Delaware, sell house fast, Rush Home Team',
};

export default function HomePage() {
  return <HomeContent />;
}
