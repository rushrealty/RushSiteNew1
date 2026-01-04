import type { Metadata } from 'next';
import HowToBuyContent from '@/components/HowToBuyContent';

export const metadata: Metadata = {
  title: 'How to Buy a Home in Delaware | Complete Buyer\'s Guide | Rush Home Team',
  description: 'Your complete guide to buying a home in Delaware. From pre-approval to closing, learn the home buying process step-by-step with Rush Home Team\'s expert guidance.',
  keywords: 'buy home Delaware, first time home buyer Delaware, Delaware real estate, home buying process, buy house Delaware, Delaware home buying guide, pre-approval Delaware',
  openGraph: {
    title: 'How to Buy a Home in Delaware | Complete Buyer\'s Guide',
    description: 'From pre-approval to closing day, your step-by-step guide to buying a home in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/how-to-buy',
    siteName: 'Rush Home Team',
    images: [
      {
        url: 'https://rushhome.com/images/og-how-to-buy.jpg',
        width: 1200,
        height: 630,
        alt: 'How to Buy a Home in Delaware - Rush Home Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Buy a Home in Delaware',
    description: 'Your complete guide to buying a home in Delaware. From pre-approval to closing.',
    images: ['https://rushhome.com/images/og-how-to-buy.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com/how-to-buy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToBuyPage() {
  return <HowToBuyContent />;
}
