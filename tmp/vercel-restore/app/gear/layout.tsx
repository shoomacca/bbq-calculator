import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BBQ Gear Recommendations — BBQ Pro',
  description:
    'Thermometers, smokers, charcoal, rubs, and accessories recommended by BBQ Pro for better results.',
};

export default function GearLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
