import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Money Niche: AI YouTube CPM Calculator | CreatorOps',
  description: 'Discover high-CPM YouTube niches tailored to your interests. Build a faceless channel that actually pays.',
  keywords: ['high CPM YouTube niches', 'YouTube niche finder', 'faceless channel ideas'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
