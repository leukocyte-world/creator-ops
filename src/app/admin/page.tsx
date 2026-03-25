'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  Users, Ticket, Activity, ShieldCheck, 
  Search, Check, X, RefreshCw, Trash2, Plus, ArrowLeft
} from 'lucide-react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'users' | 'discounts'>('users');
  
  // New Discount Form
  const [newDisc, setNewDisc] = useState({ code: '', percent: 20 });
  const [addingDisc, setAddingDisc] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await Promise.all([
        fetch('/api/admin/users_list'),
        fetch('/api/admin/discounts')
      ]);
      
      const userData = await res[0].json();
      const discData = await res[1].json();
      
      if (Array.isArray(userData)) setUsers(userData);
      if (Array.isArray(discData)) setDiscounts(discData);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  const togglePro = async (email: string, current: boolean) => {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, is_pro: !current })
    });
    fetchData();
  };

  const changeRole = async (email: string, role: string) => {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role })
    });
    fetchData();
  };

  const addDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingDisc(true);
    await fetch('/api/admin/discounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: newDisc.code.toUpperCase(), percent_off: newDisc.percent })
    });
    setNewDisc({ code: '', percent: 20 });
    fetchData();
    setAddingDisc(false);
  };

  const deleteDiscount = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/admin/discounts?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (!session?.user || (session.user as any).role !== 'admin') {
    return (
      <div className="tool-page" style={{ textAlign: 'center', paddingTop: 100 }}>
        <h1 style={{ color: 'var(--accent-yt)' }}>401 Unauthorized</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 10 }}>You do not have administrative access.</p>
        <Link href="/" className="btn btn-secondary" style={{ marginTop: 24 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: users.length,
    pro: users.filter(u => u.is_pro).length,
    gens: users.reduce((acc, u) => acc + (u.usage_count || 0), 0)
  };

  return (
    <div className="app-shell">
      <main className="main-content" style={{ marginLeft: 0 }}>
        <div className="tool-page" style={{ maxWidth: 1100 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <h1 className="tool-title" style={{ fontSize: 32 }}>Backend Command Center</h1>
              <p className="tool-desc">Monitor users, manage subscriptions, and configure the platform.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/tools" className="btn btn-secondary">
                Go to App Dashboard
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
            <div className="card" style={{ padding: 24, borderLeft: '4px solid var(--accent-blue)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                <Users size={16} /> Total Users
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Syne' }}>{stats.total}</div>
            </div>
            <div className="card" style={{ padding: 24, borderLeft: '4px solid var(--accent-gold)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                <ShieldCheck size={16} /> Pro Subscribers
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Syne', color: 'var(--accent-gold)' }}>{stats.pro}</div>
            </div>
            <div className="card" style={{ padding: 24, borderLeft: '4px solid var(--accent-purple)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                <Activity size={16} /> Total Generations
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Syne' }}>{stats.gens}</div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button 
              className={`btn ${tab === 'users' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setTab('users')}
            >
              <Users size={18} /> User Management
            </button>
            <button 
              className={`btn ${tab === 'discounts' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setTab('discounts')}
            >
              <Ticket size={18} /> Discount Codes
            </button>
            <button className="btn btn-ghost" onClick={fetchData} disabled={loading} style={{ marginLeft: 'auto' }}>
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          {tab === 'users' ? (
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: 20, borderBottom: '1px solid var(--border)', display: 'flex', gap: 16 }}>
                <div className="input-wrap" style={{ flex: 1 }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      className="input" 
                      placeholder="Search by email..." 
                      style={{ paddingLeft: 40 }}
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-glass)', fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                      <th style={{ padding: '16px 24px' }}>User</th>
                      <th style={{ padding: '16px 24px' }}>Usage</th>
                      <th style={{ padding: '16px 24px' }}>Status</th>
                      <th style={{ padding: '16px 24px' }}>Role</th>
                      <th style={{ padding: '16px 24px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.email} style={{ borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ fontWeight: 600 }}>{u.email}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Joined {new Date(u.created_at).toLocaleDateString()}</div>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ color: u.usage_count >= 5 ? 'var(--accent-yt)' : 'inherit' }}>{u.usage_count} / 5</span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          {u.is_pro ? (
                            <span className="badge badge-pro">PRO MEMBER</span>
                          ) : (
                            <span className="badge badge-free">FREE TIER</span>
                          )}
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <select 
                            className="select" 
                            style={{ width: 100, padding: '4px 8px', height: 32 }}
                            value={u.role || 'user'}
                            onChange={(e) => changeRole(u.email, e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <button 
                            className={`btn btn-sm ${u.is_pro ? 'btn-ghost' : 'btn-primary'}`}
                            onClick={() => togglePro(u.email, u.is_pro)}
                          >
                            {u.is_pro ? 'Revoke PRO' : 'Grant PRO'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 24, alignItems: 'start' }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ marginBottom: 20 }}>Create Discount</h3>
                <form onSubmit={addDiscount} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="input-wrap">
                    <label className="input-label">Coupon Code</label>
                    <input 
                      className="input" 
                      placeholder="e.g. SUMMER50" 
                      required 
                      value={newDisc.code}
                      onChange={e => setNewDisc({...newDisc, code: e.target.value})}
                    />
                  </div>
                  <div className="input-wrap">
                    <label className="input-label">Percentage Off (%)</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="1" 
                      max="100" 
                      required 
                      value={newDisc.percent}
                      onChange={e => setNewDisc({...newDisc, percent: parseInt(e.target.value)})}
                    />
                  </div>
                  <button className="btn btn-primary btn-full" disabled={addingDisc}>
                    {addingDisc ? <RefreshCw className="animate-spin" size={16} /> : <><Plus size={16} /> Create Code</>}
                  </button>
                </form>
              </div>

              <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-glass)', fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                      <th style={{ padding: '16px 24px' }}>Code</th>
                      <th style={{ padding: '16px 24px' }}>Discount</th>
                      <th style={{ padding: '16px 24px' }}>Created</th>
                      <th style={{ padding: '16px 24px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discounts.map(d => (
                      <tr key={d.id} style={{ borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                        <td style={{ padding: '16px 24px' }}>
                          <code style={{ background: 'var(--bg-glass)', padding: '4px 8px', borderRadius: 4, color: 'var(--accent-orange)', fontWeight: 700 }}>{d.code}</code>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: 18, fontWeight: 700 }}>
                          {d.percent_off}% OFF
                        </td>
                        <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: 12 }}>
                          {new Date(d.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <button 
                            className="btn btn-ghost btn-sm" 
                            style={{ color: 'var(--accent-yt)' }}
                            onClick={() => deleteDiscount(d.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {discounts.length === 0 && (
                      <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No discount codes created yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
}
