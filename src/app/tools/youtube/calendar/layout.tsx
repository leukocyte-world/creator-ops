import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Content Calendar: 30-Day Creator Strategy',
  description: '30-day content calendar with high-engagement educational, viral, and trending post ideas.',
  keywords: ['content calendar generator', 'social media planner', 'creator strategy'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
