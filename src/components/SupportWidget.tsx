'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle2 } from 'lucide-react';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setIsOpen(false);
        }, 3000);
      } else {
        setError('Failed to send. Please try again or email us.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="support-widget" style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 9999 }}>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'var(--brand-primary)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(90deg)' : 'none'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(1.1)' : 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = isOpen ? 'rotate(90deg)' : 'none')}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Pop-up Window */}
      {isOpen && (
        <div 
          className="animate-fade-up"
          style={{
            position: 'absolute',
            bottom: 80,
            right: 0,
            width: 'clamp(300px, 90vw, 380px)',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{ background: 'var(--brand-primary)', padding: '24px 20px', color: '#fff' }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Creator Support</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.9 }}>Get help from the CreatorOps team.</p>
          </div>

          <div style={{ padding: 24 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ color: '#10b981', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h4 style={{ fontSize: 18, marginBottom: 8 }}>Message Sent!</h4>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>We&apos;ll get back to you shortly at leukocyteng@gmail.com.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="input-wrap">
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>Your Name</label>
                  <input name="name" className="input" placeholder="Full name" style={{ fontSize: 14 }} />
                </div>
                <div className="input-wrap">
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>Email Address</label>
                  <input name="email" type="email" className="input" placeholder="you@domain.com" style={{ fontSize: 14 }} required />
                </div>
                <div className="input-wrap">
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>How can we help?</label>
                  <textarea 
                    name="message" 
                    className="textarea" 
                    placeholder="Describe your issue..." 
                    style={{ fontSize: 14, minHeight: 100 }}
                    required
                  ></textarea>
                </div>
                
                {error && <p style={{ fontSize: 12, color: '#ef4444', margin: 0 }}>{error}</p>}
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary btn-full"
                  style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
          
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
            Typically replies within 2 hours
          </div>
        </div>
      )}
    </div>
  );
}
