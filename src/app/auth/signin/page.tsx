'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="auth-page">
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(255,107,53,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 70% 70%, rgba(65,88,208,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="auth-card animate-fade-up">
        <div className="logo-mark" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo-icon">C</div>
          <span className="logo-text" style={{ fontSize: 20 }}>CreatorOps</span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to access all 17 creator tools</p>

        <button
          className="btn btn-secondary btn-full"
          style={{ gap: 12, fontSize: 15, padding: '13px 20px' }}
          onClick={() => signIn('google', { callbackUrl: '/tools' })}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="divider">or</div>

        <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
          By signing in, you get 5 free tool uses instantly.
        </p>

        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'var(--accent-orange)' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
