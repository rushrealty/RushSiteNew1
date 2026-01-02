import type { Metadata } from 'next';
import GetYourOfferContent from '@/components/pages/GetYourOfferContent';

export const metadata: Metadata = {
  title: 'Get Your Instant Cash Offer | Rush Home Team',
  description: 'Get a guaranteed cash offer on your Delaware home in minutes. Sell on your timeline with no repairs, no showings, and flexible closing from 14-60 days.',
  openGraph: {
    title: 'Get Your Instant Cash Offer | Rush Home Team',
    description: 'Get a guaranteed cash offer on your Delaware home in minutes. Sell on your timeline with no repairs, no showings, and flexible closing from 14-60 days.',
    type: 'website',
  },
};

export default function GetYourOfferPage() {
  return <GetYourOfferContent />;
}
