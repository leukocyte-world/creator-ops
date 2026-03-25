import Link from "next/link";

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
  { icon: '💸', label: 'Multiple Income Streams', href: '/tools/youtube/income-streams' },
  { icon: '📊', label: 'Algorithm Hack System', href: '/tools/youtube/algorithm-hack' },
  { icon: '🗺️', label: '90-Day Money Map', href: '/tools/youtube/90-day-map' },
  { icon: '🎯', label: 'Retention Killer Script', href: '/tools/youtube/retention-script' },
  { icon: '📱', label: 'Shorts Growth Engine', href: '/tools/youtube/shorts' },
];

export default function LandingPage() {
  return (
    <main className="landing">
      {/* Top nav */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        background: 'rgba(13,15,20,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="logo-mark">
          <div className="logo-icon">C</div>
          <span className="logo-text">CreatorOps</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/tools" className="btn btn-ghost btn-sm">Tools</Link>
          <Link href="/#pricing" className="btn btn-ghost btn-sm">Pricing</Link>
          <a
            href="https://cv-resume-murex-iota.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >CV Builder ↗</a>
          <Link href="/auth/signin" className="btn btn-secondary btn-sm">Sign In</Link>
          <Link href="/auth/signin" className="btn btn-primary btn-sm">Start Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-eyebrow animate-fade-up">
          <span className="hero-eyebrow-dot" />
          AI-powered creator toolkit — X & YouTube
        </div>

        <h1 className="hero-title animate-fade-up animate-delay-1">
          Stop Guessing.
          <span className="hero-title-gradient">Start Going Viral.</span>
        </h1>

        <p className="hero-sub animate-fade-up animate-delay-2">
          Reverse-engineer viral posts, generate hooks that demand attention, build faceless YouTube channels,
          and map your path to creator income — all with AI.
        </p>

        <div className="hero-ctas animate-fade-up animate-delay-3">
          <Link href="/auth/signin" className="btn btn-primary btn-lg">
            <span>→</span> Start for free
          </Link>
          <Link href="/#features" className="btn btn-secondary btn-lg">
            See all 17 tools
          </Link>
        </div>

        <div className="hero-social-proof animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div>✓ <span>5 free uses</span> — no credit card</div>
          <div>✓ <span>17 AI tools</span> for creators</div>
          <div>✓ <span>Instant</span> results</div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="features-section" id="features">
        <div className="section-tag">
          <span>What's inside</span>
        </div>
        <h2 className="section-title">17 tools. Zero fluff.</h2>
        <p className="section-sub">
          Every tool is laser-focused on one job. Pick the one you need right now.
        </p>

        <div className="platform-split">
          {/* X column */}
          <div>
            <div className="platform-column-header x-col">
              <span>𝕏</span> Twitter / X Tools
            </div>
            <div className="tool-list">
              {X_TOOLS.map(t => (
                <Link key={t.href} href="/auth/signin" className="tool-list-item">
                  <div className="tool-list-item-icon x-icon-bg">{t.icon}</div>
                  {t.label}
                  <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 12 }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* YouTube column */}
          <div>
            <div className="platform-column-header yt-col">
              ▶ YouTube Tools
            </div>
            <div className="tool-list">
              {YT_TOOLS.map(t => (
                <Link key={t.href} href="/auth/signin" className="tool-list-item">
                  <div className="tool-list-item-icon yt-icon-bg">{t.icon}</div>
                  {t.label}
                  <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 12 }}>→</span>
                </Link>
              ))}
              <div className="tool-list-item" style={{ opacity: 0.5 }}>
                <div className="tool-list-item-icon yt-icon-bg">+</div>
                5 more YouTube tools...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section" id="pricing">
        <div className="section-tag"><span>Simple pricing</span></div>
        <h2 className="section-title">Start free. Scale when ready.</h2>
        <p className="section-sub">No lock-ins. Pay with card, crypto, USDT — whatever works for you.</p>

        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card">
            <div className="pricing-name">Free</div>
            <div className="pricing-price">$0</div>
            <div className="pricing-desc">Try it out. No credit card, no commitment.</div>
            <ul className="pricing-features">
              <li>5 tool uses total</li>
              <li>All 17 tools available</li>
              <li>Full AI-generated output</li>
              <li>Copy to clipboard</li>
            </ul>
            <Link href="/auth/signin" className="btn btn-secondary btn-full">
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div className="pricing-card featured">
            <div className="pricing-badge">MOST POPULAR</div>
            <div className="pricing-name">Pro</div>
            <div className="pricing-price">
              <sup>$</sup>10<span>/month</span>
            </div>
            <div className="pricing-desc">For creators who are serious about growth.</div>
            <ul className="pricing-features">
              <li>Unlimited tool uses</li>
              <li>All 17 tools + future tools</li>
              <li>Priority AI responses</li>
              <li>Pay with card, USDT or crypto</li>
              <li>Cancel anytime</li>
            </ul>
            <Link href="/upgrade" className="btn btn-primary btn-full">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'var(--text-muted)',
        fontSize: 13,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div className="logo-mark">
          <div className="logo-icon" style={{ width: 28, height: 28, fontSize: 14 }}>C</div>
          <span className="logo-text" style={{ fontSize: 14 }}>CreatorOps</span>
        </div>
        <div>© 2025 CreatorOps. Built for creators who mean business.</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <a
            href="https://cv-resume-murex-iota.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)' }}
          >CV Builder ↗</a>
        </div>
      </footer>
    </main>
  );
}
