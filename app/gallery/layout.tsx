import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cook Gallery — BBQ Pro',
  description:
    'Before and after photos from the BBQ Pro community. Filter by cut and method.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
