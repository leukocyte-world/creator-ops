import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viral Title Machine: 20+ High-CTR YouTube Titles | CreatorOps',
  description: 'Stop guessing your titles. Generate 20 viral YouTube titles across 4 categories with CTR scores.',
  keywords: ['YouTube title generator', 'viral video titles', 'CTR optimization'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
