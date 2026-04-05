'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

import { 
  Menu, X, Microscope, Zap, RefreshCw, Anchor, List, 
  CircleDollarSign, Video, TrendingUp, Bot, Wallet, 
  Activity, Map, Target, Image as ImageIcon, Smartphone, 
  Search, Calendar, FileText, UserCircle, LogOut 
} from 'lucide-react';

const X_TOOLS = [
  { icon: Microscope, label: 'Viral Reverse Engineer', href: '/tools/x/reverse-engineer' },
  { icon: Zap, label: 'Viral One-Liner', href: '/tools/x/one-liner' },
  { icon: RefreshCw, label: '4-Line Transformation', href: '/tools/x/transformation' },
  { icon: Anchor, label: 'Hook Generator', href: '/tools/x/hook-generator' },
  { icon: List, label: 'Listicle Post', href: '/tools/x/listicle' },
];

const YT_TOOLS = [
  { icon: CircleDollarSign, label: 'Find Your Money Niche', href: '/tools/youtube/money-niche' },
  { icon: Video, label: 'Faceless Video System', href: '/tools/youtube/faceless-video' },
  { icon: TrendingUp, label: 'Viral Title Machine', href: '/tools/youtube/viral-titles' },
  { icon: Bot, label: 'AI Automation Workflow', href: '/tools/youtube/ai-workflow' },
  { icon: Wallet, label: 'Multiple Income Streams', href: '/tools/youtube/income-streams' },
  { icon: Activity, label: 'Algorithm Hack System', href: '/tools/youtube/algorithm-hack' },
  { icon: Map, label: '90-Day Money Map', href: '/tools/youtube/90-day-map' },
  { icon: Target, label: 'Retention Killer Script', href: '/tools/youtube/retention-script' },
  { icon: ImageIcon, label: 'Thumbnail Psychology', href: '/tools/youtube/thumbnail' },
  { icon: Smartphone, label: 'Shorts Growth Engine', href: '/tools/youtube/shorts' },
  { icon: Search, label: 'Competitor Breakdown', href: '/tools/youtube/competitor' },
  { icon: Video, label: 'First 10 Videos Blueprint', href: '/tools/youtube/first-10' },
  { icon: Calendar, label: 'Content Calendar', href: '/tools/youtube/calendar' },
];

export default function Sidebar({ hiddenOnDesktop = false }: { hiddenOnDesktop?: boolean }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [usage, setUsage] = useState({ count: 0, isPro: false });
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (session?.user) {
      fetch('/api/usage').then(r => r.json()).then(d => {
        if (d.usage_count !== undefined) setUsage({ count: d.usage_count, isPro: d.is_pro });
      }).catch(() => {});
    }
  }, [session]);

  const usagePct = Math.min((usage.count / 5) * 100, 100);

  return (
    <>
      <div className="mobile-header">
        <Link href="/" className="logo-mark">
          <div className="logo-icon">C</div>
          <span className="logo-text">CreatorOps</span>
        </Link>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''} ${hiddenOnDesktop ? 'hidden-on-desktop' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <Link href="/" className="logo-mark">
          <div className="logo-icon">C</div>
          <span className="logo-text">CreatorOps</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {pathname === '/' ? (
          <>
            <div className="nav-section-label">Navigation</div>
            <Link href="/tools" className="nav-item">
              <span className="nav-item-icon"><TrendingUp size={18} /></span>
              AI Tools Dashboard
            </Link>
            <Link href="/#pricing" className="nav-item">
              <span className="nav-item-icon"><CircleDollarSign size={18} /></span>
              Pricing
            </Link>
          </>
        ) : (
          <>
            {/* X Section */}
            <div className="nav-section-label">𝕏 Twitter Tools</div>
            {X_TOOLS.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`nav-item x-section ${pathname === tool.href ? 'active' : ''}`}
                >
                  <span className="nav-item-icon"><Icon size={18} strokeWidth={2.5} /></span>
                  {tool.label}
                </Link>
              );
            })}

            {/* YouTube Section */}
            <div className="nav-section-label">YouTube Tools</div>
            {YT_TOOLS.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`nav-item yt-section ${pathname === tool.href ? 'active' : ''}`}
                >
                  <span className="nav-item-icon"><Icon size={18} strokeWidth={2.5} /></span>
                  {tool.label}
                </Link>
              );
            })}
          </>
        )}

        {/* CV Builder */}
        <div className="nav-section-label">Other Tools</div>
        <a
          href="https://cv.creatorops.site/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item special"
        >
          <span className="nav-item-icon"><FileText size={18} strokeWidth={2.5} /></span>
          CV Builder
          <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.6 }}>↗</span>
        </a>
      </nav>

      {/* Footer — usage + auth */}
      <div className="sidebar-footer">
        {session?.user && !usage.isPro && (
          <div className="usage-bar-wrap">
            {session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
              <div style={{ padding: '8px 12px', background: 'var(--bg-glass)', borderRadius: 8, fontSize: 12, color: 'var(--accent-orange)', fontWeight: 600, textAlign: 'center' }}>
                Admin Account — Unlimited
              </div>
            ) : (
              <>
                <div className="usage-bar-label">
                  <span>Free uses</span>
                  <span>{usage.count}/5</span>
                </div>
                <div className="usage-bar">
                  <div className="usage-bar-fill" style={{ width: `${usagePct}%` }} />
                </div>
                {usage.count >= 4 && (
                  <Link href="/upgrade" className="btn btn-primary btn-sm btn-full" style={{ marginTop: 10 }}>
                    Upgrade — $10/mo
                  </Link>
                )}
              </>
            )}
          </div>
        )}

        {session?.user && usage.isPro && (
          <div className="usage-bar-wrap" style={{ marginBottom: 10 }}>
            <div className="usage-bar-label">
              <span>Plan</span>
              <span className="badge badge-pro">PRO</span>
            </div>
          </div>
        )}

        {session?.user ? (
          <div
            className="nav-item"
            onClick={() => signOut()}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <span className="nav-item-icon"><LogOut size={18} /></span>
            <span style={{ fontSize: 13, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {session.user.name || session.user.email}
            </span>
            <span style={{ fontSize: 11, opacity: 0.5 }}>Sign out</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn btn-secondary btn-md btn-full" onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}>
              Sign In
            </button>
            <Link href="/auth/signin" className="btn btn-primary btn-md btn-full">
              Start Free
            </Link>
          </div>
        )}
      </div>
    </aside>
    </>
  );
}
