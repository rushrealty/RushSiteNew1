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
  },
};

export default function GuidePage() {
  return <GuideContent />;
}