import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '90-Day Money Map: Roadmap to $1k/month | CreatorOps',
  description: 'A week-by-week roadmap to your first $1000 on YouTube. The exact steps to take in your first 90 days.',
  keywords: ['YouTube roadmap', 'creator growth plan', '90 day challenge'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
