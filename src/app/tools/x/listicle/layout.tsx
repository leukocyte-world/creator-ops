import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listicle Post Engine: Bullet-Point Growth Strategy',
  description: 'Generate perfectly formatted listicle posts for X. Sorted by length for maximum readability and saves.',
  keywords: ['X listicle generator', 'Twitter threads AI', 'content formatting'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
