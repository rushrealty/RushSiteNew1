import type { Metadata } from 'next';
import AvailableCommunitiesContent from "../../components/AvailableCommunitiesContent";
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = {
  title: "New Construction Communities Delaware | Browse All | Rush Home Team",
  description: "Explore brand-new homes in Delaware's most desirable communities.",
  keywords: 'Delaware new construction communities, new home communities, Delaware builders, new neighborhoods Delaware',
  openGraph: {
    title: 'New Construction Communities Delaware | Rush Home Team',
    description: "Explore brand-new homes in Delaware's most desirable communities.",
    type: 'website',
    url: 'https://rushhome.com/available-communities',
    siteName: 'Rush Home Team at Compass',
    images: [
      {
        url: 'https://rushhome.com/images/og-communities.jpg',
        width: 1200,
        height: 630,
        alt: 'New Construction Communities - Rush Home Team Delaware',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Construction Communities Delaware | Rush Home Team',
    description: "Explore brand-new homes in Delaware's most desirable communities.",
    images: ['https://rushhome.com/images/og-communities.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com/available-communities',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AvailableCommunitiesPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Home', url: 'https://rushhome.com' },
        { name: 'Communities', url: 'https://rushhome.com/available-communities' },
      ]} />
      <AvailableCommunitiesContent />
    </>
  );
}
