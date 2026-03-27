import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retention Killer Script: AI Video Scriptwriter | CreatorOps',
  description: 'Write high-retention video scripts with AI. Includes drop-off markers and fixes to keep viewers watching.',
  keywords: ['AI scriptwriter', 'YouTube retention script', 'video engagement'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
