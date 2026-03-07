import type { Metadata } from 'next';
import AvailableCommunitiesContent from "../../components/AvailableCommunitiesContent";

export const metadata: Metadata = {
  title: "New Construction Communities | Delaware | Rush Home Team",
  description: "Explore brand-new homes in Delaware's most desirable communities.",
  keywords: 'Delaware new construction communities, new home communities, Delaware builders, new neighborhoods Delaware',
  openGraph: {
    title: 'New Construction Communities | Delaware | Rush Home Team',
    description: "Explore brand-new homes in Delaware's most desirable communities.",
    type: 'website',
    url: 'https://rushhome.com/available-communities',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Construction Communities | Delaware | Rush Home Team',
    description: "Explore brand-new homes in Delaware's most desirable communities.",
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
  return <AvailableCommunitiesContent />;
}
