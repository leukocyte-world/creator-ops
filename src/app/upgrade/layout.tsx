import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upgrade to PRO | CreatorOps AI',
  description: 'Unlock unlimited access to all 17+ AI creator tools and scale your growth.',
};

export default function UpgradeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
