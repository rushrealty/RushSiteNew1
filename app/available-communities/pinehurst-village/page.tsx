import type { Metadata } from 'next';
import PinehurstVillageContent from '@/components/pages/PinehurstVillageContent';

export const metadata: Metadata = {
  title: 'Pinehurst Village | New Homes in Felton, DE | Rush Home Team',
  description: 'Explore Pinehurst Village in Felton, DE. New construction homes from $400,000 featuring 1,727-2,680 sq ft, 3-5 bedrooms, unfinished basements, and 20% off design options. Schedule your tour today!',
  openGraph: {
    title: 'Pinehurst Village | New Homes in Felton, DE',
    description: 'New construction homes from $400,000. 3-5 bed, 2-3.5 bath, 1,727-2,680 sq ft. Unfinished basements included!',
    images: ['https://drive.google.com/thumbnail?id=1rz0seNr6VhDlx6m9LKMqAIyuGRuoAOOs&sz=w1200'],
  },
};

export default function PinehurstVillagePage() {
  return <PinehurstVillageContent />;
}
