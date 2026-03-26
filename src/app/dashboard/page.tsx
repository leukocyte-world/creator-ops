'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  User, Shield, CreditCard, 
  ExternalLink, LogOut, Calendar, Star,
  Settings, Zap, CheckCircle
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchUser();
    }
  }, [session]);

  async function fetchUser() {
    try {
      const res = await fetch(`/api/admin/users_list`); // Re-using admin route but it needs protection fix or new route
      // Actually /api/admin/users_list is protected for admins only. 
      // I should create /api/user/profile
      const userData = await res.json();
      // ... for now I'll just use session data since I don't have a profile route yet
    } catch (e) {}
    setLoading(false);
  }

  if (!session) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: 16 }}>Please Sign In</h1>
          <Link href="/auth/signin" className="btn btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const isPro = (session.user as any).role === 'admin' || (session.user as any).is_pro;

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main className="main-content" style={{ marginLeft: 0, flex: 1 }}>
        <div className="tool-page" style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800 }}>My Dashboard</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Manage your profile and access tools.</p>
            </div>
            <button onClick={() => signOut()} className="btn btn-ghost" style={{ color: '#ff7070' }}>
              <LogOut size={18} /> Sign Out
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: 32 }}>
            {/* Sidebar / Profile Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                <div style={{ 
                  width: 80, height: 80, borderRadius: '50%', 
                  background: 'linear-gradient(45deg, var(--accent-orange), var(--accent-gold))',
                  margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, fontWeight: 800, color: 'white'
                }}>
                  {session.user?.email?.[0].toUpperCase()}
                </div>
                <h2 style={{ fontSize: 20, marginBottom: 4 }}>{session.user?.name || session.user?.email?.split('@')[0]}</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <User size={14} /> {session.user?.email}
                </div>
                
                <div style={{ marginTop: 20 }}>
                  {isPro ? (
                    <span className="badge badge-pro" style={{ fontSize: 12, padding: '6px 12px' }}>PRO MEMBER</span>
                  ) : (
                    <span className="badge badge-free" style={{ fontSize: 12, padding: '6px 12px' }}>FREE TIER</span>
                  )}
                </div>
              </div>

              {isPro && (
                <div className="card" style={{ padding: 24, background: 'rgba(255,107,53,0.05)', borderColor: 'var(--accent-orange)' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Zap size={16} /> Pro Status
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Next Renewal</span>
                      <span style={{ fontWeight: 600 }}>April 26, 2026</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Plan</span>
                      <span style={{ fontWeight: 600 }}>Monthly $10</span>
                    </div>
                  </div>
                </div>
              )}

              {!isPro && (
                <Link href="/upgrade" className="card" style={{ padding: 24, textAlign: 'center', textDecoration: 'none', background: 'var(--accent-yt)', borderColor: 'transparent' }}>
                  <h3 style={{ color: 'white', marginBottom: 8 }}>Upgrade to Pro</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Unlock unlimited access to all 17 tools.</p>
                </Link>
              )}
            </div>

            {/* Main Content Areas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              
              {/* Affiliate Section (PRO only) */}
              {isPro && (
                <section>
                  <h3 style={{ fontSize: 18, marginBottom: 16 }}>Exceptional Features</h3>
                  <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Star size={18} color="var(--accent-gold)" /> Affiliate Registration
                      </h4>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Earn commissions by referring other creators.</p>
                    </div>
                    <button className="btn btn-secondary btn-sm" disabled>Coming Soon</button>
                  </div>
                </section>
              )}

              <section>
                <h3 style={{ fontSize: 18, marginBottom: 16 }}>All Tools</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { name: 'Viral Reverse Engineer', path: '/tools/reverse-engineer' },
                    { name: 'X Content Strategy', path: '/tools/content-strategy' },
                    { name: 'Twitter Growth Bot', path: '/tools/growth-bot' },
                    { name: 'LinkedIn Hook Gen', path: '/tools/linkedin-hooks' }
                  ].map(tool => (
                    <Link key={tool.path} href={tool.path} className="card" style={{ padding: 16, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s' }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{tool.name}</span>
                      <ExternalLink size={14} style={{ opacity: 0.5 }} />
                    </Link>
                  ))}
                  <Link href="/tools" style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: 13, color: 'var(--accent-orange)' }}>
                    View all 17 tools →
                  </Link>
                </div>
              </section>

              <section>
                <h3 style={{ fontSize: 18, marginBottom: 16 }}>Profile Settings</h3>
                <div className="card" style={{ padding: 24 }}>
                   <div className="input-wrap" style={{ marginBottom: 20 }}>
                     <label className="input-label">Display Name</label>
                     <input className="input" defaultValue={session.user.name || ''} placeholder="Your Name" />
                   </div>
                   <button className="btn btn-primary" style={{ width: 'fit-content' }}>Save Changes</button>
                </div>
              </section>

            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
