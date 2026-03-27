import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube Income Blueprints: Monetize Your Audience | CreatorOps',
  description: 'Scale from 0 to $10k/month. Multiple income stream strategies for creators at every stage.',
  keywords: ['YouTube monetization', 'creator income streams', 'make money on YouTube'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
