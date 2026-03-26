import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | CreatorOps AI Tools',
    default: 'CreatorOps AI Tools — X & YouTube Growth',
  },
  description: 'Specialized AI tools for content creators. Scale your X (Twitter) and YouTube accounts with data-driven AI systems.',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
