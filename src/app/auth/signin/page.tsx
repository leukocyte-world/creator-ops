'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function SignInPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isLogin) {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password');
        setLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } else {
      // Register
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Registration failed');
          setLoading(false);
          return;
        }

        // Auto login after register
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/dashboard'
        });
      } catch {
        setError('Network error. Try again.');
        setLoading(false);
      }
    }
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
          <span className="logo-text" style={{ fontSize: 20 }}>CreatorOps</span>
        </div>

        <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create an account'}</h1>
        <p className="auth-sub">
          {isLogin ? 'Sign in to access all 17 creator tools' : 'Start using all 17 tools instantly for free'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="input-wrap">
            <label className="input-label">Email</label>
            <input 
              type="email" 
              className="input" 
              placeholder="you@example.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-wrap">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              minLength={6}
            />
          </div>

          {error && <div style={{ color: '#ff7070', fontSize: 13, background: 'rgba(255,0,0,0.1)', padding: 10, borderRadius: 6 }}>{error}</div>}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? <span className="spinner" /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="divider">or</div>

        <button 
          className="btn btn-ghost btn-full" 
          onClick={() => { setIsLogin(!isLogin); setError(''); }}
          style={{ fontSize: 14 }}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>

        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'var(--accent-orange)' }}>← Back to home</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
