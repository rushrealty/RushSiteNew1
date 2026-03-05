import type { Metadata } from 'next';
import GuideContent from '@/components/pages/GuideContent';

export const metadata: Metadata = {
  title: 'New Construction Guide | Rush Home Team at Compass',
  description: 'The ultimate guide to buying new construction in Delaware. Learn the 7 steps to your new home, why you need an agent, and frequently asked questions.',
  keywords: 'new construction guide, buying new construction, Delaware new homes, builder contracts, home buying process',
  openGraph: {
    title: 'New Construction Guide | Rush Home Team',
    description: 'The ultimate guide to buying new construction in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/guide',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Construction Guide | Rush Home Team',
    description: 'The ultimate guide to buying new construction in Delaware.',
  },
  alternates: {
    canonical: 'https://rushhome.com/guide',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GuidePage() {
  return <GuideContent />;
}