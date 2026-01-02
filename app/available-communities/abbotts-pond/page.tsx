import type { Metadata } from 'next';
import AbbottsPondContent from '@/components/pages/AbbottsPondContent';

export const metadata: Metadata = {
  title: "Abbott's Pond Acres | New Homes in Greenwood, DE | Rush Home Team",
  description: "New construction single-family homes in Abbott's Pond Acres, Greenwood, Delaware. Starting from $430,000. 3-5 bedrooms, 1,955-2,513 sq ft. Built by Ashburn Homes.",
  openGraph: {
    title: "Abbott's Pond Acres | New Homes in Greenwood, DE",
    description: "New construction homes starting at $430,000 in Kent County, Delaware. Schedule a tour today!",
    type: 'website',
  },
};

export default function AbbottsPondPage() {
  return <AbbottsPondContent />;
}
