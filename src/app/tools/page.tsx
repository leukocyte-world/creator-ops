import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ToolIcon from '@/components/ToolIcon';

import { X_TOOLS, YT_TOOLS } from '@/lib/tools-config';

export default function ToolsDashboard() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: '40px 32px', flex: 1, width: '100%' }}>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
              Your Creator Arsenal
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
              17 AI tools. Pick one. Get results in under 60 seconds.
            </p>
          </div>

          {/* X tools */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 20 }}>𝕏</span>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700 }}>Twitter / X Tools</h2>
              <span className="badge badge-x">5 tools</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {X_TOOLS.map(t => (
                <Link key={t.href} href={t.href} className="card" style={{ padding: '18px 20px', display: 'block', textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div className="tool-list-item-icon x-icon-bg" style={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ToolIcon name={t.icon} size={18} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{t.label}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5 }}>{t.desc}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* YouTube tools */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 20 }}>▶</span>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700 }}>YouTube Tools</h2>
              <span className="badge badge-yt">13 tools</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {YT_TOOLS.map(t => (
                <Link key={t.href} href={t.href} className="card" style={{ padding: '18px 20px', display: 'block', textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div className="tool-list-item-icon yt-icon-bg" style={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ToolIcon name={t.icon} size={18} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{t.label}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5 }}>{t.desc}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
