import type { Metadata } from 'next';
import AssuranceContent from '@/components/pages/AssuranceContent';

export const metadata: Metadata = {
  title: 'Rush Home Assurance Guarantee | $1,000 Buyer Protection | Rush Home Team',
  description: 'Our $1,000 Assurance Guarantee backs every offer you make. Get verified pre-approval, faster closings, and the confidence sellers trust. Speed. Confidence. Certainty.',
  keywords: 'buyer protection, home buying guarantee, Rush Home assurance, verified pre-approval, buyer confidence, home purchase protection, Delaware buyer program',
  openGraph: {
    title: 'Rush Home Assurance Guarantee | $1,000 Buyer Protection',
    description: 'Our $1,000 Assurance Guarantee backs every offer you make. Speed. Confidence. Certainty.',
    type: 'website',
    url: 'https://rushhome.com/assurance',
    siteName: 'Rush Home Team',
    images: [
      {
        url: 'https://rushhome.com/images/og-assurance.jpg',
        width: 1200,
        height: 630,
        alt: 'Rush Home Assurance Guarantee - Rush Home Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rush Home Assurance Guarantee',
    description: 'Our $1,000 Assurance Guarantee backs every offer you make. Speed. Confidence. Certainty.',
    images: ['https://rushhome.com/images/og-assurance.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com/assurance',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AssurancePage() {
  return <AssuranceContent />;
}
