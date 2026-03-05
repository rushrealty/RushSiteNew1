import type { Metadata } from 'next';
import PrivacyContent from '@/components/pages/PrivacyContent';

export const metadata: Metadata = {
  title: "Privacy Policy | Rush Home Team | Compass",
  description: "Privacy Policy for Rush Home Team at Compass. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: 'https://rushhome.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
