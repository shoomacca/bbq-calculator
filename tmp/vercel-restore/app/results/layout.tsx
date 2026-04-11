import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cook Plan | BBQ Pro',
  description: 'Your personalised BBQ cook plan with times, temperatures, and milestones.',
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
