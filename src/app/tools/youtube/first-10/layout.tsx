import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'First 10 Videos Blueprint: Fastest YouTube Growth | CreatorOps',
  description: 'Your first 10 videos ordered for the fastest possible channel growth. The AI-powered blueprint.',
  keywords: ['YouTube growth plan', 'start a YouTube channel', 'first 10 videos'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
