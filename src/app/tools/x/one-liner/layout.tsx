import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viral One-Liner Generator: AI Emotional Hook Posts | CreatorOps',
  description: 'Generate 10 raw, emotional one-line posts on any topic. Optimized for high engagement and virality on X.',
  keywords: ['one-liner generator', 'viral X posts', 'emotional hooks'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
