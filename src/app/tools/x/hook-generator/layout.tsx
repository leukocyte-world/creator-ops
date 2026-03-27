import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viral Hook Generator: Open Loops for Maximum Retention | CreatorOps',
  description: 'Create hooks so strong readers have no choice but to keep scrolling. The ultimate AI hook toolkit.',
  keywords: ['X hook generator', 'viral hooks AI', 'retention hooks'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
