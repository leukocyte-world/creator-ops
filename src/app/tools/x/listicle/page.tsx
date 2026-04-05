'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { X_TOOLS } from '@/lib/tools-config';

export default function ListiclePage() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Write a viral X (Twitter) listicle post for:
Topic: ${topic}
Target audience: ${audience}

Base the advice on what is actively working and relevant in ${new Date().getFullYear()}.

Rules:
- Start with a 4-6 word title in ALL CAPS
- Write 6-8 bullet points using the • symbol
- Each bullet = one actionable, specific tip
- ORDER bullet points strictly by CHARACTER LENGTH — shortest bullet first, longest last. Each one gradually gets longer.
- No hashtags
- No intro sentence before bullets
- No outro after bullets
- Just the title and the list

Output ONLY the post. Nothing else.`
    });
  };

  const relatedTools = X_TOOLS.filter(t => t.href !== '/tools/x/listicle').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Why Listicles Outperform Everything</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Listicles are the most &quot;saved&quot; and &quot;shared&quot; content type on X. They offer immediate, structured value that feels easy to digest. 
        Our Listicle Post engine goes a step further by utilizing a specific visual trick: <strong>character-length ordering</strong>. 
        By starting with shorter points and gradually increasing their length, you create a &quot;slippery slope&quot; that pulls the reader&apos;s eye down the screen.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Visual Advantage</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        On X, formatting is as important as the words themselves. Poorly spaced text is ignored. 
        Listicles use &quot;White Space&quot; to make your advice stand out. This tool automatically formats your tips with high-contrast bullet points, 
        ensuring your post looks premium and professional in the feed.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Maximizing Your SEO Reach</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        List-based content is highly favored by Google Search. By posting listicles that get high engagement, 
        you increase the chances of your X profile or website being featured for &quot;best tips&quot; or &quot;how-to&quot; keywords. 
        It&apos;s a proven strategy for building a massive, searchable library of value in your niche.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Listicle Post" 
      description="All-caps title + bullets ordered by length — the format that prints engagement every time." 
      badge="x"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label className="input-label">Topic</label>
          <input className="input" placeholder="e.g. productivity tips, making money online, coding habits..." value={topic} onChange={e => setTopic(e.target.value)} required />
        </div>
        <div className="input-wrap">
          <label className="input-label">Target Audience</label>
          <input className="input" placeholder="e.g. startup founders, remote workers, students..." value={audience} onChange={e => setAudience(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !topic.trim() || !audience.trim()}>
          {loading ? <><span className="spinner" /> Building...</> : 'Generate Listicle'}
        </button>
      </form>
      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Listicle Post" />}
    </ToolLayout>
  );
}
