import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Simple protection: You can set ADMIN_EMAIL in Vercel to lock this down securely
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && session?.user?.email !== adminEmail) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'red', fontFamily: 'var(--font-dm-sans)' }}>
        <h1>401 Unauthorized</h1>
        <p>You are not the administrator.</p>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div style={{ padding: 40, textAlign: 'center', fontFamily: 'var(--font-dm-sans)' }}>
        <h1>Admin Portal</h1>
        <p>Please sign in first.</p>
        <Link href="/auth/signin">Sign In</Link>
      </div>
    );
  }

  // Use service role to bypass RLS and fetch all users
  const { data: users, error } = await supabase
    .from('users')
    .select('email, usage_count, is_pro, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return <div style={{ padding: 40 }}>Error loading users: {error.message}</div>;
  }

  const totalUsers = users?.length || 0;
  const proUsers = users?.filter(u => u.is_pro).length || 0;
  const totalGenerations = users?.reduce((acc, u) => acc + (u.usage_count || 0), 0) || 0;

  return (
    <div style={{ padding: '40px 32px', maxWidth: 1000, margin: '0 auto', fontFamily: 'var(--font-dm-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 32, fontWeight: 800 }}>CreatorOps Admin</h1>
        <Link href="/tools" style={{ padding: '8px 16px', background: 'var(--bg-glass)', borderRadius: 8, textDecoration: 'none' }}>
          Back to App
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 40 }}>
        {/* Stat Cards */}
        <div style={{ background: 'var(--bg-card)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total Users</div>
          <div style={{ fontSize: 36, fontWeight: 700, fontFamily: 'var(--font-syne)' }}>{totalUsers}</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(65,88,208,0.1) 100%)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,107,53,0.3)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Pro Subscribers</div>
          <div style={{ fontSize: 36, fontWeight: 700, fontFamily: 'var(--font-syne)', color: 'var(--accent-orange)' }}>{proUsers}</div>
        </div>
        
        <div style={{ background: 'var(--bg-card)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total AI Generations</div>
          <div style={{ fontSize: 36, fontWeight: 700, fontFamily: 'var(--font-syne)' }}>{totalGenerations}</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Users</h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-glass)', fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Usage Count</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Plan</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(u => (
              <tr key={u.email} style={{ borderBottom: '1px solid var(--border)', fontSize: 15 }}>
                <td style={{ padding: '16px 24px' }}>{u.email}</td>
                <td style={{ padding: '16px 24px' }}>{u.usage_count} / 5</td>
                <td style={{ padding: '16px 24px' }}>
                  {u.is_pro ? 
                    <span style={{ background: 'var(--gradient-gold)', color: '#000', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>PRO</span> : 
                    <span style={{ background: 'var(--bg-glass)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: 999, fontSize: 12 }}>Free</span>
                  }
                </td>
                <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: 14 }}>
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {users?.length === 0 && (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
