import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import Footer from '@/components/Footer';

const X_TOOLS = [
  { icon: '🔬', label: 'Viral Reverse Engineer', desc: 'Analyze viral posts and rewrite yours with the same formula', href: '/tools/x/reverse-engineer' },
  { icon: '⚡', label: 'Viral One-Liner', desc: '10 raw, emotional one-line posts on any topic', href: '/tools/x/one-liner' },
  { icon: '🔄', label: '4-Line Transformation', desc: 'Before → Change → After → Lesson. 4 lines. Maximum impact.', href: '/tools/x/transformation' },
  { icon: '🎣', label: 'Hook Generator', desc: 'Open loops so strong readers have no choice but to keep scrolling', href: '/tools/x/hook-generator' },
  { icon: '📋', label: 'Listicle Post', desc: 'Bullet-point posts sorted by length for maximum readability', href: '/tools/x/listicle' },
];

const YT_TOOLS = [
  { icon: '💰', label: 'Find Your Money Niche', desc: 'Top 5 niches with highest CPM that fit your age and interests', href: '/tools/youtube/money-niche' },
  { icon: '🎭', label: 'Faceless Video System', desc: 'Complete faceless video concept — script, voiceover, thumbnail, music', href: '/tools/youtube/faceless-video' },
  { icon: '🚀', label: 'Viral Title Machine', desc: '20 viral titles in 4 categories with CTR scores and thumbnail suggestions', href: '/tools/youtube/viral-titles' },
  { icon: '🤖', label: 'AI Automation Workflow', desc: 'Full $0 YouTube automation system for any niche', href: '/tools/youtube/ai-workflow' },
  { icon: '💸', label: 'Multiple Income Streams', desc: 'Complete income blueprint at 1K/5K/10K/50K subscribers', href: '/tools/youtube/income-streams' },
  { icon: '📊', label: 'Algorithm Hack System', desc: 'Algorithm strategy + weekly checklist for your niche', href: '/tools/youtube/algorithm-hack' },
  { icon: '🗺️', label: '90-Day Money Map', desc: 'Week-by-week roadmap to your first $100/$500/$1000', href: '/tools/youtube/90-day-map' },
  { icon: '🎯', label: 'Retention Killer Script', desc: 'High-retention video script with drop-off markers and fixes', href: '/tools/youtube/retention-script' },
  { icon: '🖼️', label: 'Thumbnail Psychology', desc: '5 thumbnail concepts that maximize CTR with clickability analysis', href: '/tools/youtube/thumbnail' },
  { icon: '📱', label: 'Shorts Growth Engine', desc: '30 viral Shorts ideas + 5 ready-to-post scripts', href: '/tools/youtube/shorts' },
  { icon: '🕵️', label: 'Competitor Breakdown', desc: 'Top 5 channels analyzed + 10 ideas to outperform them', href: '/tools/youtube/competitor' },
  { icon: '🎬', label: 'First 10 Videos Blueprint', desc: 'Your first 10 videos ordered for fastest channel growth', href: '/tools/youtube/first-10' },
  { icon: '📅', label: 'Content Calendar', desc: '30-day content calendar: educational, viral, trending mix', href: '/tools/youtube/calendar' },
];

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
                    <div className="tool-list-item-icon x-icon-bg" style={{ width: 36, height: 36, fontSize: 18, flexShrink: 0 }}>{t.icon}</div>
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
                    <div className="tool-list-item-icon yt-icon-bg" style={{ width: 36, height: 36, fontSize: 18, flexShrink: 0 }}>{t.icon}</div>
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
