import type { Metadata } from 'next';
import CommunitiesContent from '@/components/pages/CommunitiesContent';

export const metadata: Metadata = {
  title: 'New Construction Communities | Rush Home Team at Compass',
  description: 'Browse Delaware new construction communities. From 55+ active adult communities to luxury waterfront estates. Find your perfect neighborhood.',
  keywords: 'Delaware communities, new construction neighborhoods, 55+ communities Delaware, waterfront homes, golf course communities',
  openGraph: {
    title: 'New Construction Communities | Rush Home Team',
    description: 'Browse Delaware new construction communities. Find your perfect neighborhood.',
    type: 'website',
    url: 'https://rushhome.com/communities',
  },
};

export default function CommunitiesPage() {
  return <CommunitiesContent />;
}