import type { Metadata } from 'next';
import HeroCarousel from '@/components/home/HeroCarousel';

export const metadata: Metadata = {
  title: 'BBQ Cook Calculator — Free Time & Temp Guide for Any Cut',
  description:
    'Calculate exact cook times, rest periods, and internal temperatures for brisket, ribs, pulled pork, chicken, fish, and more. Free BBQ calculator — no account needed.',
  openGraph: {
    title: 'BBQ Cook Calculator — Free Time & Temp Guide for Any Cut',
    description:
      'Precise cook times and temperatures for every cut. Brisket, ribs, pork shoulder, chicken, and more.',
    type: 'website',
  },
};

export default function HomePage() {
  return <HeroCarousel />;
}
