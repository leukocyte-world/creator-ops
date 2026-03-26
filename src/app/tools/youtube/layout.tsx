import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube Automation & Growth AI',
  description: 'Build faceless YouTube channels, generate viral titles, and script your videos with AI-powered creator systems.',
  keywords: ['YouTube automation', 'faceless YouTube AI', 'YouTube script generator', 'viral YouTube titles'],
};

export default function YouTubeToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
