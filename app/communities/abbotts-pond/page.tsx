import type { Metadata } from 'next';
import AbbottsPondContent from '@/components/pages/AbbottsPondContent';

export const metadata: Metadata = {
  title: "Abbott's Pond Acres | New Homes in Clayton, DE | Rush Home Team",
  description: "Discover peaceful country living at Abbott's Pond Acres in Clayton, DE. New construction homes starting at $489,900. 3-5 bedrooms, 2,022-2,890 sq ft. Built by Ashburn Homes.",
  openGraph: {
    title: "Abbott's Pond Acres | New Homes in Clayton, DE",
    description: "New construction homes starting at $489,900 in Kent County, Delaware. Schedule a tour today!",
    type: 'website',
  },
};

export default function AbbottsPondPage() {
  return <AbbottsPondContent />;
}
