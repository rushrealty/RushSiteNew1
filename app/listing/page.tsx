import type { Metadata } from 'next';
import ListingContent from '@/components/pages/ListingContent';

export const metadata: Metadata = {
  title: 'Property Details | Rush Home Team',
  description: 'View property details, photos, and information. Rush Home Team - Delaware Real Estate.',
  openGraph: {
    title: 'Property Details | Rush Home Team',
    description: 'View property details, photos, and information.',
    type: 'website',
    siteName: 'Rush Home Team',
  },
};

export default function ListingPage() {
  return <ListingContent />;
}
