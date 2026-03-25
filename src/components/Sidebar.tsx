'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

const X_TOOLS = [
  { icon: '🔬', label: 'Viral Reverse Engineer', href: '/tools/x/reverse-engineer' },
  { icon: '⚡', label: 'Viral One-Liner', href: '/tools/x/one-liner' },
  { icon: '🔄', label: '4-Line Transformation', href: '/tools/x/transformation' },
  { icon: '🎣', label: 'Hook Generator', href: '/tools/x/hook-generator' },
  { icon: '📋', label: 'Listicle Post', href: '/tools/x/listicle' },
];

const YT_TOOLS = [
  { icon: '💰', label: 'Find Your Money Niche', href: '/tools/youtube/money-niche' },
  { icon: '🎭', label: 'Faceless Video System', href: '/tools/youtube/faceless-video' },
  { icon: '🚀', label: 'Viral Title Machine', href: '/tools/youtube/viral-titles' },
  { icon: '🤖', label: 'AI Automation Workflow', href: '/tools/youtube/ai-workflow' },
  { icon: '💸', label: 'Multiple Income Streams', href: '/tools/youtube/income-streams' },
  { icon: '📊', label: 'Algorithm Hack System', href: '/tools/youtube/algorithm-hack' },
  { icon: '🗺️', label: '90-Day Money Map', href: '/tools/youtube/90-day-map' },
  { icon: '🎯', label: 'Retention Killer Script', href: '/tools/youtube/retention-script' },
  { icon: '🖼️', label: 'Thumbnail Psychology', href: '/tools/youtube/thumbnail' },
  { icon: '📱', label: 'Shorts Growth Engine', href: '/tools/youtube/shorts' },
  { icon: '🕵️', label: 'Competitor Breakdown', href: '/tools/youtube/competitor' },
  { icon: '🎬', label: 'First 10 Videos Blueprint', href: '/tools/youtube/first-10' },
  { icon: '📅', label: 'Content Calendar', href: '/tools/youtube/calendar' },
];

export default function Sidebar() {
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
        <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>☰</button>
      </div>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <Link href="/" className="logo-mark">
          <div className="logo-icon">C</div>
          <span className="logo-text">CreatorOps</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {/* X Section */}
        <div className="nav-section-label">𝕏 Twitter Tools</div>
        {X_TOOLS.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`nav-item x-section ${pathname === tool.href ? 'active' : ''}`}
          >
            <span className="nav-item-icon">{tool.icon}</span>
            {tool.label}
          </Link>
        ))}

        {/* YouTube Section */}
        <div className="nav-section-label">YouTube Tools</div>
        {YT_TOOLS.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`nav-item yt-section ${pathname === tool.href ? 'active' : ''}`}
          >
            <span className="nav-item-icon">{tool.icon}</span>
            {tool.label}
          </Link>
        ))}

        {/* CV Builder */}
        <div className="nav-section-label">Other Tools</div>
        <a
          href="https://cv-resume-murex-iota.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item special"
        >
          <span className="nav-item-icon">📄</span>
          CV Builder
          <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.6 }}>↗</span>
        </a>
      </nav>

      {/* Footer — usage + auth */}
      <div className="sidebar-footer">
        {session?.user && !usage.isPro && (
          <div className="usage-bar-wrap">
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
            <span className="nav-item-icon">👤</span>
            <span style={{ fontSize: 13, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {session.user.name || session.user.email}
            </span>
            <span style={{ fontSize: 11, opacity: 0.5 }}>Sign out</span>
          </div>
        ) : (
          <button className="btn btn-secondary btn-full" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </aside>
    </>
  );
}
