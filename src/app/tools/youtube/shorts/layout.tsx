import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shorts Growth Engine: Viral Short-Form AI | CreatorOps',
  description: '30 viral Shorts ideas and 5 ready-to-post scripts tailored for YouTube Shorts, Reels, and TikTok.',
  keywords: ['YouTube Shorts generator', 'viral shorts ideas', 'short form content AI'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
