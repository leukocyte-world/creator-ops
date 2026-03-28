import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In / Join | CreatorOps AI',
  description: 'Sign in to CreatorOps AI to access your tools and dashboard.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
