'use client';

import Link from "next/link";
import { useSession } from 'next-auth/react';
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

import { X_TOOLS, YT_TOOLS } from "@/lib/tools-config";

import JsonLd from "@/components/JsonLd";

export default function LandingPage() {
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();

  return (
    <div className="app-shell">
      <JsonLd />
      <nav className="desktop-nav">
        <div className="nav-container">
          <Link href="/" className="logo-mark">
            <div className="logo-icon">C</div>
            <span className="logo-text">CreatorOps</span>
          </Link>
          <div className="nav-links">
            <Link href="/tools">AI Tools</Link>
            <Link href="/blog">Resources</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href={session ? "/dashboard" : "/auth/signin"} className="btn btn-secondary btn-sm">Sign In</Link>
            <Link href={session ? "/dashboard" : "/auth/signin"} className="btn btn-primary btn-sm">Start Free</Link>
          </div>
        </div>
      </nav>

      <Sidebar hiddenOnDesktop />
      <main className="main-content landing">
        {/* Hero */}
        <section className="hero" style={{ paddingTop: 120 }}>
          <div className="hero-glow" />

          <div className="hero-eyebrow animate-fade-up">
            <span className="hero-eyebrow-dot" />
            AI-powered creator toolkit — X & YouTube
          </div>

          <h1 className="hero-title animate-fade-up animate-delay-1">
            Stop Guessing. <br />
            <span className="hero-title-gradient">Master Viral AI Creator Toolkit.</span>
          </h1>

          <p className="hero-sub animate-fade-up animate-delay-2">
            The ultimate AI toolkit for X and YouTube growth. Reverse-engineer viral posts, generate scroll-stopping hooks, 
            build faceless YouTube channels, and scale your creator business.
          </p>

          <div className="hero-ctas animate-fade-up animate-delay-3">
            <Link href={session ? "/dashboard" : "/auth/signin"} className="btn btn-primary btn-lg">
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

        {/* Why Us / Differentiation Section */}
        <section className="differentiation-section" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <div className="section-tag"><span>The AI-First Advantage</span></div>
          <h2 className="section-title">Built for the New Era of Attention.</h2>
          <p className="section-sub" style={{ maxWidth: 800, margin: '0 auto 40px' }}>
            Most "Creator Ops" tools are just project management apps. <br />
            <strong>CreatorOps AI</strong> is a viral growth engine fueled by Gemini 1.5 Flash.
          </p>
          <div className="value-props" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 30, maxWidth: 1200, margin: '0 auto' }}>
            <div className="value-card">
              <div style={{ fontSize: 32, marginBottom: 16 }}>🧠</div>
              <h3>Reverse Engineering</h3>
              <p>Don't just copy. Understand <em>why</em> a post went viral and replicate the chemistry.</p>
            </div>
            <div className="value-card">
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎭</div>
              <h3>Faceless Systems</h3>
              <p>Full YouTube automation paths designed for creators who value privacy and scale.</p>
            </div>
            <div className="value-card">
              <div style={{ fontSize: 32, marginBottom: 16 }}>⚡</div>
              <h3>0% Fluff</h3>
              <p>No complex dashboards. Paste your idea, get your viral output in 3 seconds.</p>
            </div>
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
                <span role="img" aria-label="X (Twitter)">𝕏</span> Viral Twitter / X Tools
              </div>
              <div className="tool-list">
                {X_TOOLS.map(t => (
                  <Link key={t.href} href={t.href} className="tool-list-item">
                    <div className="tool-list-item-icon x-icon-bg" role="img" aria-label={t.label}>{t.icon}</div>
                    <h2 style={{ fontSize: 'inherit', fontWeight: 'inherit', margin: 0 }}>{t.label}</h2>
                    <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 12 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* YouTube column */}
            <div>
              <div className="platform-column-header yt-col">
                <span role="img" aria-label="YouTube">▶</span> AI YouTube Automation
              </div>
              <div className="tool-list">
                {YT_TOOLS.map(t => (
                  <Link key={t.href} href={t.href} className="tool-list-item">
                    <div className="tool-list-item-icon yt-icon-bg" role="img" aria-label={t.label}>{t.icon}</div>
                    <h2 style={{ fontSize: 'inherit', fontWeight: 'inherit', margin: 0 }}>{t.label}</h2>
                    <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 12 }}>→</span>
                  </Link>
                ))}
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
              <Link href={session ? "/tools" : "/auth/signin"} className="btn btn-secondary btn-full">
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
        <Footer />
      </main>
    </div>
  );
}
