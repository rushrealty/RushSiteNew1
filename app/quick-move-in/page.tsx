import type { Metadata } from 'next';
import QuickMoveInContent from '@/components/pages/QuickMoveInContent';

export const metadata: Metadata = {
  title: 'Quick Move-In Homes | Rush Home Team at Compass',
  description: 'Browse move-in ready new construction homes in Delaware. Find homes that are already built or under construction - no waiting to build from scratch.',
  keywords: 'quick move-in homes Delaware, move-in ready, new construction homes, Delaware real estate, spec homes',
  openGraph: {
    title: 'Quick Move-In Homes | Rush Home Team',
    description: 'Browse move-in ready new construction homes in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/quick-move-in',
  },
};

export default function QuickMoveInPage() {
  return <QuickMoveInContent />;
}