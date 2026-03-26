'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function UpgradeSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
      <div className="animate-fade-up">
        <CheckCircle size={80} color="var(--accent-gold)" style={{ marginBottom: 24, margin: '0 auto' }} />
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, marginBottom: 16 }}>
          You&apos;re now Pro!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 400, margin: '0 auto 32px' }}>
          Your account has been upgraded successfully. You now have unlimited access to all tools.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/dashboard" className="btn btn-primary btn-lg">
            Go to My Dashboard
          </Link>
          <Link href="/tools" className="btn btn-secondary btn-lg">
            Explore Tools
          </Link>
        </div>
        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
          Redirecting to dashboard in a few seconds...
        </p>
      </div>
    </div>
  );
}
