'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  Users, Ticket, Activity, ShieldCheck, 
  Search, RefreshCw, Trash2, Plus, ArrowLeft, BookOpen, Edit2, Upload, Loader2, Image as ImageIcon
} from 'lucide-react';
import { Post } from '../blog/page';
import BlogEditor from './components/BlogEditor';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'users' | 'discounts' | 'resources'>('users');
  
  // New Discount Form
  const [newDisc, setNewDisc] = useState({ code: '', percent: 20 });
  const [addingDisc, setAddingDisc] = useState(false);
  
  // New Post Form
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [savingPost, setSavingPost] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, discsRes] = await Promise.all([
        fetch('/api/admin/users_list'),
        fetch('/api/admin/discounts')
      ]);
      
      if (usersRes.ok) {
        const userData = await usersRes.json();
        if (Array.isArray(userData)) setUsers(userData);
      }
      
      if (discsRes.ok) {
        const discData = await discsRes.json();
        if (Array.isArray(discData)) setDiscounts(discData);
      }

      const postRes = await fetch('/api/blog?all=true');
      const postData = await postRes.json();
      setPosts(Array.isArray(postData) ? postData : []);
    } catch (e) {
      console.error('Admin Fetch Error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && (session?.user as any)?.role === 'admin') {
      fetchData();
    }
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="tool-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--accent-blue)' }} />
      </div>
    );
  }

  if (status !== 'authenticated' || (session?.user as any)?.role !== 'admin') {
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

  const togglePro = async (email: string, current: boolean) => {
    try {
      await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, is_pro: !current })
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const changeRole = async (email: string, role: string) => {
    try {
      await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const addDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisc.code) return;
    setAddingDisc(true);
    try {
      await fetch('/api/admin/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: newDisc.code.toUpperCase(), percent_off: newDisc.percent })
      });
      setNewDisc({ code: '', percent: 20 });
      fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setAddingDisc(false);
    }
  };

  const deleteDiscount = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/admin/discounts?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title || !editingPost?.slug) return;
    setSavingPost(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingPost,
          author: editingPost.author || 'CreatorOps AI',
          category: editingPost.category || 'Strategy',
          is_published: editingPost.is_published ?? false,
          published_at: editingPost.published_at || new Date().toISOString(),
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }
      
      setEditingPost(null);
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Error saving post. Check console.');
    } finally {
      setSavingPost(false);
    }
  };

  const removePost = async (id: string) => {
    if (!confirm('Delete this post forever?')) return;
    try {
      await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPost) return;

    setUploadingCover(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditingPost({ ...editingPost, cover_image: data.url });
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed');
    } finally {
      setUploadingCover(false);
    }
  };

  const filteredUsers = (users || []).filter(u => 
    u && u.email && u.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: users?.length || 0,
    pro: (users || []).filter(u => u?.is_pro).length,
    gens: (users || []).reduce((acc, u) => acc + (u?.usage_count || 0), 0)
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
            <button className={`btn ${tab === 'users' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('users')}>
              <Users size={18} /> User Management
            </button>
            <button className={`btn ${tab === 'discounts' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('discounts')}>
              <Ticket size={18} /> Discount Codes
            </button>
            <button className={`btn ${tab === 'resources' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('resources')}>
              <BookOpen size={18} /> Blog/Resources
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
                    {filteredUsers.map((u, i) => (
                      <tr key={u?.email || i} style={{ borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ fontWeight: 600 }}>{u?.email}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Joined {u?.created_at ? new Date(u.created_at).toLocaleDateString() : 'Unknown'}</div>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ color: (u?.usage_count || 0) >= 5 ? 'var(--accent-yt)' : 'inherit' }}>{u?.usage_count || 0} / 5</span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          {u?.is_pro ? (
                            <span className="badge badge-pro">PRO MEMBER</span>
                          ) : (
                            <span className="badge badge-free">FREE TIER</span>
                          )}
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <select 
                            className="select" 
                            style={{ width: 100, padding: '4px 8px', height: 32 }}
                            value={u?.role || 'user'}
                            onChange={(e) => changeRole(u.email, e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <button 
                            className={`btn btn-sm ${u?.is_pro ? 'btn-ghost' : 'btn-primary'}`}
                            onClick={() => togglePro(u.email, u.is_pro)}
                          >
                            {u?.is_pro ? 'Revoke PRO' : 'Grant PRO'}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan={5} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : tab === 'discounts' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: 24, alignItems: 'start' }}>
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
                          {d.created_at ? new Date(d.created_at).toLocaleDateString() : 'Recent'}
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
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700 }}>Blog Posts</h2>
                <button className="btn btn-primary btn-sm" onClick={() => setEditingPost({ title: '', slug: '', content: '', excerpt: '', category: 'Strategy', author: 'CreatorOps AI', is_published: false })}>
                  <Plus size={16} /> New Post
                </button>
              </div>

              {editingPost && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                  <div className="card" style={{ width: '100%', maxWidth: 800, maxHeight: '90vh', overflowY: 'auto', padding: 32 }}>
                    <h3 style={{ marginBottom: 24, fontSize: 24 }}>{editingPost.id ? 'Edit Post' : 'Create New Post'}</h3>
                    <form onSubmit={savePost} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div className="input-wrap">
                          <label className="input-label">Title</label>
                          <input className="input" required value={editingPost.title || ''} onChange={e => setEditingPost({...editingPost, title: e.target.value})} />
                        </div>
                        <div className="input-wrap">
                          <label className="input-label">Slug</label>
                          <input className="input" required value={editingPost.slug || ''} onChange={e => setEditingPost({...editingPost, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} />
                        </div>
                      </div>
                      <div className="input-wrap">
                        <label className="input-label">Excerpt</label>
                        <input className="input" required value={editingPost.excerpt || ''} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} />
                      </div>
                      <div className="input-wrap">
                        <label className="input-label">Content (Rich Markdown Editor)</label>
                        <BlogEditor 
                          content={editingPost.content || ''} 
                          onChange={(val) => setEditingPost({ ...editingPost, content: val })} 
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                         <div className="input-wrap">
                          <label className="input-label">Category</label>
                          <input className="input" value={editingPost.category || ''} onChange={e => setEditingPost({...editingPost, category: e.target.value})} />
                        </div>
                        <div className="input-wrap">
                          <label className="input-label">Author</label>
                          <input className="input" value={editingPost.author || ''} onChange={e => setEditingPost({...editingPost, author: e.target.value})} />
                        </div>
                        <div className="input-wrap">
                          <label className="input-label">Cover Image</label>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <input className="input" placeholder="URL or upload..." value={editingPost.cover_image || ''} onChange={e => setEditingPost({...editingPost, cover_image: e.target.value})} />
                            <label className={`btn btn-secondary ${uploadingCover ? 'disabled' : ''}`} style={{ padding: '0 12px', flexShrink: 0, cursor: 'pointer' }}>
                              {uploadingCover ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                              <input type="file" hidden accept="image/*" onChange={handleCoverUpload} disabled={uploadingCover} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <input type="checkbox" checked={editingPost.is_published || false} onChange={e => setEditingPost({...editingPost, is_published: e.target.checked})} />
                        <label>Publish immediately</label>
                      </div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                        <button type="button" className="btn btn-ghost" onClick={() => setEditingPost(null)}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={savingPost}>
                          {savingPost ? 'Saving...' : 'Save Post'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-glass)', fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                      <th style={{ padding: '16px 24px' }}>Title</th>
                      <th style={{ padding: '16px 24px' }}>Category</th>
                      <th style={{ padding: '16px 24px' }}>Status</th>
                      <th style={{ padding: '16px 24px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(posts || []).map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ fontWeight: 600 }}>{p.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>/{p.slug}</div>
                        </td>
                        <td style={{ padding: '16px 24px' }}>{p.category}</td>
                        <td style={{ padding: '16px 24px' }}>
                          {p.is_published ? (
                            <span className="badge badge-pro">PUBLISHED</span>
                          ) : (
                            <span className="badge badge-free">DRAFT</span>
                          )}
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-sm btn-ghost" onClick={() => setEditingPost(p)}>
                              <Edit2 size={16} />
                            </button>
                            <button className="btn btn-sm btn-ghost" style={{ color: 'var(--accent-yt)' }} onClick={() => removePost(p.id)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(posts || []).length === 0 && (
                      <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No posts found.</td></tr>
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
