'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '48px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      color: 'var(--text-muted)',
      fontSize: 14,
      textAlign: 'center',
      background: 'rgba(19, 22, 30, 0.4)',
      width: '100%',
      marginTop: 'auto'
    }}>
      <div className="logo-mark" style={{ opacity: 0.8 }}>
        <div className="logo-icon" style={{ width: 28, height: 28, fontSize: 14 }}>C</div>
        <span className="logo-text" style={{ fontSize: 14 }}>CreatorOps</span>
      </div>
      
      <div style={{ maxWidth: 600 }}>
        Built by <a href="https://x.com/leukocyteng1" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>Leukocyte</a> || All Rights Reserved {currentYear}
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
        <Link href="/tools" style={{ color: 'var(--text-secondary)' }}>Tools</Link>
        <Link href="/#pricing" style={{ color: 'var(--text-secondary)' }}>Pricing</Link>
        <a
          href="https://cv-resume-murex-iota.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-secondary)' }}
        >CV Builder ↗</a>
      </div>
    </footer>
  );
}
