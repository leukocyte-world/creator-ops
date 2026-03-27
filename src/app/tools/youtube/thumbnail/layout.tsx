import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thumbnail Psychology: Maximize Your YouTube CTR | CreatorOps',
  description: 'Generate 5 thumbnail concepts that maximize CTR with clickability analysis and psychology-driven design.',
  keywords: ['YouTube thumbnail concepts', 'CTR optimization', 'thumbnail psychology'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
