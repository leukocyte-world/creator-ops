import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Competitor Breakdown: AI YouTube Analysis | CreatorOps',
  description: 'Analyze your top competitors and get 10 actionable ideas to outperform them on YouTube.',
  keywords: ['YouTube competitor analysis', 'channel audit AI', 'content strategy'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
