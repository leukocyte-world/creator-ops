import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Dashboard | CreatorOps AI',
  description: 'Manage your CreatorOps AI account, tools, and profile.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
