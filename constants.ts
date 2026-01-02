import { SaleOption, Step } from './types';

export const SALE_OPTIONS: SaleOption[] = [
  {
    id: 'immediate',
    title: 'RUSH HOME IMMEDIATE',
    subtitle: 'Instant Cash Offer',
    description: 'Instant cash offer with closing in as few as 14 days.',
    bestFor: 'Maximum speed & certainty',
    features: [
      'Close in as few as 14 days',
      'No staging or repairs needed',
      'Leaseback option available',
      'Avoid market uncertainty'
    ]
  },
  {
    id: 'advantage',
    title: 'RUSH HOME ADVANTAGE',
    subtitle: 'Maximize Equity',
    description: 'Access majority of proceeds upfront while we handle improvements.',
    bestFor: 'Convenience + equity capture',
    features: [
      'Access funds immediately',
      'We manage improvements',
      'Capture more equity',
      'Hassle-free transition'
    ]
  },
  {
    id: 'flex',
    title: 'RUSH HOME FLEX',
    subtitle: 'Guaranteed Backup',
    description: '150-day guaranteed backup offer while you sell traditionally.',
    bestFor: 'Buy before you sell',
    features: [
      '150-day guaranteed offer',
      'Buy your next home first',
      'Compete without contingency',
      'Try traditional sale first'
    ],
    highlight: true
  }
];

export const FLEX_STEPS: Step[] = [
  {
    number: '01',
    title: 'Get a Guaranteed Backup Offer',
    description: 'We secure a firm purchase contract on your current home, valid for 150 days.'
  },
  {
    number: '02',
    title: 'Shop with Confidence',
    description: 'Make non-contingent offers on your dream home, knowing your current home will sell.'
  },
  {
    number: '03',
    title: 'List Traditionally',
    description: 'We market your home to maximize value. If it sells before the backup deadline, you keep the higher price.'
  },
  {
    number: '04',
    title: 'Guaranteed Sale',
    description: "If your home doesn't sell traditionally, the guaranteed backup offer activates automatically."
  }
];