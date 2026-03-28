'use client';

import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for password reset
    // This connects to the Auth provider logic
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="auth-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', gap: 60, padding: '80px 32px 0' }}>
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(255,107,53,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 70% 70%, rgba(65,88,208,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="auth-card animate-fade-up" style={{ alignSelf: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 60 }}>
        <div className="logo-mark" style={{ justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo-icon">C</div>
          <span className="logo-text" style={{ fontSize: 20 }}>CreatorOps AI</span>
        </div>

        {!submitted ? (
          <>
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-sub">Enter your email and we'll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="input-wrap">
                <label className="input-label">Email Address</label>
                <input 
                  type="email" 
                  className="input" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? <span className="spinner" /> : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📧</div>
            <h2 className="auth-title" style={{ fontSize: 24 }}>Check your email</h2>
            <p className="auth-sub">We've sent a password reset link to <strong>{email}</strong>.</p>
            <Link href="/auth/signin" className="btn btn-primary btn-full" style={{ marginTop: 24 }}>
              Return to Sign In
            </Link>
          </div>
        )}

        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
          <Link href="/auth/signin" style={{ color: 'var(--accent-orange)' }}>← Back to login</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
