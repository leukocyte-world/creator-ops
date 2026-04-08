'use client';

import Link from "next/link";
import { useSession } from 'next-auth/react';
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

import { X_TOOLS, YT_TOOLS } from "@/lib/tools-config";

import JsonLd from "@/components/JsonLd";
import ToolIcon from "@/components/ToolIcon";
import { Microscope, Video, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

function LiveUserTicker() {
  const [count, setCount] = useState(542);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #1bbf8a' }}></span>
      <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}><span style={{ color: 'var(--text-primary)' }}>{count}</span> creators live now</span>
    </div>
  );
}

export default function LandingPage() {
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();

  return (
    <div className="landing-page-root" style={{ background: 'var(--bg-base)', minHeight: '100vh', overflowX: 'hidden' }}>
      <JsonLd />
      <div className="top-banner" style={{ background: '#1c1842', color: '#fff', fontSize: 13, padding: '10px 0', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        Try out CreatorOps for free. <Link href="/auth/signin" style={{ color: 'var(--brand-accent)', fontWeight: 600, textDecoration: 'underline' }}>Here!</Link>
      </div>

      <nav className="desktop-nav" style={{ position: 'relative', height: 'auto', padding: '24px 40px' }}>
        <div className="nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '0 auto' }}>
          <Link href="/" className="logo-mark" style={{ flexShrink: 0 }}>
            <div className="logo-icon">C</div>
            <span className="logo-text">CreatorOps</span>
          </Link>
          
          <div className="nav-links" style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 500 }}>
            <Link href="/tools">AI Tools</Link>
            <Link href="/blog">Resources</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/#contact">Contact Us</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <div className="lang-flags" style={{ display: 'flex', gap: 10, opacity: 0.8 }}>
              <span title="Spanish" style={{ cursor: 'pointer', fontSize: 18 }}>🇪🇸</span>
              <span title="Ukrainian" style={{ cursor: 'pointer', fontSize: 18 }}>🇺🇦</span>
            </div>
            <Link href={session ? "/dashboard" : "/auth/signin"} style={{ fontSize: 14, fontWeight: 500, marginLeft: 8 }}>Login</Link>
            <Link href={session ? "/dashboard" : "/auth/signin"} className="btn btn-primary btn-sm" style={{ borderRadius: 99, padding: '10px 24px', background: 'var(--brand-accent)', color: '#1a1000' }}>Sign Up</Link>
          </div>
        </div>
      </nav>

      <Sidebar hiddenOnDesktop />
      <div className="landing-main">
        {/* Hero */}
        <section className="hero" style={{ padding: '80px 20px 40px' }}>
          <div className="hero-glow" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)', top: '10%' }} />

          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            <span style={{ padding: '5px 14px', background: 'var(--brand-accent)', color: '#1a1000', borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Latest All Tools</span>
            <span style={{ padding: '5px 14px', background: 'var(--bg-glass)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 99, fontSize: 11, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Explore All World</span>
          </div>

          <h1 className="hero-title animate-fade-up" style={{ fontSize: 'clamp(40px, 6vw, 76px)', maxWidth: 1000, color: '#fff', textAlign: 'center', marginBottom: 20 }}>
            Stop Guessing. <br />
            Master Viral AI <span style={{ color: 'var(--brand-accent)' }}>Creator</span> Toolkit.
          </h1>

          <p className="hero-sub animate-fade-up animate-delay-1" style={{ maxWidth: 650, fontSize: 18, opacity: 0.8 }}>
            The ultimate AI toolkit for X and YouTube growth. Reverse-engineer viral posts, generate scroll-stopping hooks, 
            build faceless YouTube channels, and scale your business.
          </p>

          <div className="hero-ctas animate-fade-up animate-delay-2" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href={session ? "/dashboard" : "/auth/signin"} className="btn btn-primary btn-lg" style={{ borderRadius: 12, padding: '16px 36px', background: 'var(--brand-accent)' }}>
              Get Started 🚀
            </Link>
            <Link href="/#features" className="btn btn-ghost btn-lg" style={{ borderRadius: 12, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, opacity: 0.7 }}>⚙</span> Our All Tools
            </Link>
          </div>

          <div className="live-user-counter animate-fade-up" style={{ marginTop: 40, padding: '8px 20px', background: 'var(--bg-glass)', borderRadius: 99, border: '1px solid var(--border)', fontSize: 14 }}>
            <LiveUserTicker />
          </div>
        </section>

        {/* Trust Bar */}
        <section className="trust-bar animate-fade-up" style={{ padding: '24px 0', margin: '40px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
          <div className="trust-bar-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', opacity: 0.6, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span>17 ai tools</span>
            <span>gemini-powered</span>
            <span>cancel anytime</span>
            <span>pay with crypto/card</span>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="demo-section animate-fade-up" style={{ padding: '60px 20px', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-tag" style={{ margin: '0 auto 16px' }}><span>See it in action</span></div>
          <h2 className="section-title" style={{ marginBottom: 40 }}>How to Find Your Money Niche</h2>
          <div className="video-container" style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', aspectRatio: '16/9' }}>
            <video 
              src="/money-niche-demo.webp" 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, padding: '16px 24px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderRadius: 12, textAlign: 'left', pointerEvents: 'none' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Find Your Money Niche Demo</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>See how we identify high-CPM topics tailored to your interests.</div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-fold animate-fade-up" style={{ padding: '60px 20px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              { name: "@AlexCreator", text: "CreatorOps doubled my X engagement in 2 weeks. The reverse-engineering tool is magic.", role: "YouTube Strategist" },
              { name: "@SarahGrowth", text: "Finally an AI tool that doesn't sound like a bot. My scripts sound more human than ever.", role: "Content House Lead" },
              { name: "@DavidWeb3", text: "The faceless YouTube systems are a game changer. Scaled to 100k subs with zero friction.", role: "Viral Creator" }
            ].map((t, i) => (
              <div key={i} className="card-glass" style={{ padding: 24, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ color: 'var(--brand-accent)', fontSize: 20 }}>★★★★★</div>
                <p style={{ fontSize: 15, fontStyle: 'italic', opacity: 0.9 }}>"{t.text}"</p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.5 }}>{t.role}</div>
                </div>
              </div>
            ))}
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
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}><Microscope size={32} /></div>
              <h3>Reverse Engineering</h3>
              <p>Don't just copy. Understand <em>why</em> a post went viral and replicate the chemistry.</p>
            </div>
            <div className="value-card">
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}><Video size={32} /></div>
              <h3>Faceless Systems</h3>
              <p>Full YouTube automation paths designed for creators who value privacy and scale.</p>
            </div>
            <div className="value-card">
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}><Zap size={32} /></div>
              <h3>0% Friction</h3>
              <p>No complex dashboards. Paste your idea, get your viral output in 3 seconds.</p>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="features-section" id="features">
          <div className="section-tag">
            <span>What's inside</span>
          </div>
          <h2 className="section-title">17 tools. Zero friction.</h2>
          <p className="section-sub">
            Every tool is laser-focused on one job. Pick the one you need right now.
          </p>

          <div className="platform-split">
            {/* X column */}
            <div>
              <div className="platform-column-header x-col">
                <span className="platform-column-header-icon" style={{ fontSize: 20 }}>𝕏</span> Viral Twitter / X Tools
              </div>
              <div className="tool-list">
                {X_TOOLS.map(t => (
                  <Link key={t.href} href={t.href} className="tool-list-item">
                    <div className="tool-list-item-icon x-icon-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28 }}><ToolIcon name={t.icon} size={16} /></div>
                    <h2 style={{ fontSize: 'inherit', fontWeight: 'inherit', margin: 0 }}>{t.label}</h2>
                    <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 12 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* YouTube column */}
            <div>
              <div className="platform-column-header yt-col">
                <span className="platform-column-header-icon" style={{ fontSize: 20 }}>▶</span> AI YouTube Automation
              </div>
              <div className="tool-list">
                {YT_TOOLS.map(t => (
                  <Link key={t.href} href={t.href} className="tool-list-item">
                    <div className="tool-list-item-icon yt-icon-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28 }}><ToolIcon name={t.icon} size={16} /></div>
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

        {/* Contact Section */}
        <section id="contact" className="contact-section" style={{ padding: '100px 24px', maxWidth: 800, margin: '0 auto' }}>
          <div className="section-tag" style={{ margin: '0 auto 16px' }}><span>Get in touch</span></div>
          <h2 className="section-title" style={{ marginBottom: 12 }}>Have Questions?</h2>
          <p className="section-sub" style={{ marginBottom: 48 }}>
            Whether you need help with a tool or want to discuss custom solutions, we're here to help.
          </p>
          
          <form 
            className="card-glass" 
            style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 24 }}
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData);
              
              try {
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  body: JSON.stringify(data),
                  headers: { 'Content-Type': 'application/json' }
                });
                if (res.ok) {
                  alert("Message sent! We'll get back to you at leukocyteng@gmail.com.");
                  (e.target as HTMLFormElement).reset();
                } else {
                  alert("Failed to send message. Please try again.");
                }
              } catch (err) {
                alert("An error occurred. Please try again later.");
              }
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="input-wrap">
                <label className="input-label">Name</label>
                <input name="name" className="input" placeholder="Your name" required />
              </div>
              <div className="input-wrap">
                <label className="input-label">Email</label>
                <input name="email" type="email" className="input" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="input-wrap">
              <label className="input-label">Message</label>
              <textarea name="message" className="textarea" placeholder="How can we help?" required style={{ minHeight: 120 }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Send Message</button>
          </form>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
