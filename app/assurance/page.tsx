import type { Metadata } from 'next';
import AssuranceContent from '@/components/pages/AssuranceContent';

export const metadata: Metadata = {
  title: 'RushHome Assurance Guarantee | Speed. Confidence. Certainty.',
  description: 'Our $1,000 Assurance Guarantee backs every offer you make. Get verified pre-approval, faster closings, and the confidence sellers trust.',
};

export default function AssurancePage() {
  return <AssuranceContent />;
}
