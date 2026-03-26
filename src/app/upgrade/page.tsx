'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { Check } from 'lucide-react';

const CURRENCIES = [
  { id: 'usdtbsc', label: 'USDT (BSC)', icon: '₮' },
  { id: 'btc', label: 'Bitcoin (BTC)', icon: '₿' },
  { id: 'eth', label: 'Ethereum (ETH)', icon: 'Ξ' },
  { id: 'usdttrc20', label: 'USDT (TRC20)', icon: '₮' },
  { id: 'ltc', label: 'Litecoin (LTC)', icon: 'Ł' },
  { id: 'bnb', label: 'BNB', icon: '⬡' },
];

export default function UpgradePage() {
  const { data: session } = useSession();
  const [selected, setSelected] = useState('usdtbsc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string, percent: number } | null>(null);
  const [verifyingCode, setVerifyingCode] = useState(false);

  const applyDiscount = async () => {
    if (!discountCode) return;
    setVerifyingCode(true);
    setError('');
    try {
      const res = await fetch('/api/payment/verify-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode }),
      });
      const data = await res.json();
      if (data.percent_off) {
        setAppliedDiscount({ code: data.code, percent: data.percent_off });
      } else {
        setError(data.error || 'Invalid code');
        setAppliedDiscount(null);
      }
    } catch {
      setError('Error verifying code');
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleUpgrade = async () => {
    if (!session) { signIn(); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          currency: selected,
          discount_code: appliedDiscount?.code
        }),
      });
      const data = await res.json();
      if (data.invoice_url) {
        window.location.href = data.invoice_url;
      } else if (data.success) {
        window.location.href = '/upgrade/success';
      } else {
        setError(data.error ?? 'Failed to create payment. Try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 32px 0' }}>
      <div style={{ width: '100%', maxWidth: 520, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 60 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" className="logo-mark" style={{ justifyContent: 'center', marginBottom: 24, display: 'flex' }}>
            <div className="logo-icon">C</div>
            <span className="logo-text" style={{ fontSize: 20 }}>CreatorOps</span>
          </Link>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
            Upgrade to Pro
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            Unlimited access to all 17 tools. $10/month.
          </p>
        </div>

        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            What&apos;s included
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Unlimited tool uses — forever', 'All 17 AI tools', 'New tools as they ship', 'Priority AI responses'].map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            Pay with crypto
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CURRENCIES.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                  borderRadius: 'var(--r-md)', border: '1px solid',
                  borderColor: selected === c.id ? 'var(--accent-orange)' : 'var(--border)',
                  background: selected === c.id ? 'rgba(255,107,53,0.08)' : 'var(--bg-glass)',
                  color: selected === c.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.18s',
                }}
              >
                <span style={{ fontSize: 18, opacity: 0.8 }}>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            Discount Code
          </h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <input 
              className="input" 
              placeholder="Enter code" 
              value={discountCode}
              onChange={e => setDiscountCode(e.target.value)}
              style={{ flex: 1 }}
            />
            <button 
              className="btn btn-secondary" 
              onClick={applyDiscount}
              disabled={verifyingCode || !discountCode}
            >
              {verifyingCode ? <span className="spinner" /> : 'Apply'}
            </button>
          </div>
          {appliedDiscount && (
            <div style={{ marginTop: 12, color: 'var(--accent-gold)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Check size={14} /> Applied: {appliedDiscount.percent}% OFF ({appliedDiscount.code})
            </div>
          )}
        </div>

        {error && (
          <div style={{ background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.2)', borderRadius: 'var(--r-md)', padding: '12px 16px', color: '#ff7070', fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button
          className="btn btn-primary btn-full btn-lg"
          onClick={handleUpgrade}
          disabled={loading}
          style={{ fontSize: 16 }}
        >
          {loading ? <><span className="spinner" /> Processing...</> : (
            `Pay $${appliedDiscount ? (10 * (1 - appliedDiscount.percent/100)).toFixed(2) : '10'} with ${CURRENCIES.find(c => c.id === selected)?.label}`
          )}
        </button>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, marginTop: 14 }}>
          Secure payment via NOWPayments · Cancel anytime
        </p>
      </div>
    </div>
  );
}
