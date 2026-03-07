import type { Metadata } from 'next';
import TermsContent from '@/components/pages/TermsContent';

export const metadata: Metadata = {
  title: "Terms of Service | Rush Home Team | Compass",
  description: "Terms of Service for Rush Home Team at Compass. Read our terms and conditions for using our real estate services and website.",
  alternates: {
    canonical: 'https://rushhome.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
