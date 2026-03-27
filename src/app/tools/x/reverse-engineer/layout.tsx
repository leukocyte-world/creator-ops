import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viral X Post Reverse Engineer: Deconstruct Viral Tweets | CreatorOps',
  description: 'Analyze viral X (Twitter) posts and rewrite yours with the same winning formula. The ultimate tool for viral growth.',
  keywords: ['X viral formula', 'Twitter reverse engineering', 'viral post analyzer'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
