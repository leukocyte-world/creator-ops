import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '4-Line Transformation: High-Impact Post Generator | CreatorOps',
  description: 'Before → Change → After → Lesson. The 4-line formula that dominates X feeds. Maximum impact, zero fluff.',
  keywords: ['4-line post formula', 'X content strategy', 'transformation posts'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
