import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creator Playbook: AI Growth Resources | CreatorOps AI',
  description: 'Expert strategies on AI content creation, algorithm hacking, and building digital assets.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
