import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'X (Twitter) Viral Growth Tools',
  description: 'AI-powered tools to reverse-engineer viral tweets, generate hooks, and write high-engagement threads for X.',
  keywords: ['Twitter AI', 'X growth tools', 'viral tweet generator', 'Twitter hook generator'],
};

export default function XToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
