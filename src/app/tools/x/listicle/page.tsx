'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function ListiclePage() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Write a viral X (Twitter) listicle post for:
Topic: ${topic}
Target audience: ${audience}

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

  return (
    <ToolLayout title="📋 Listicle Post" description="All-caps title + bullets ordered by length — the format that prints engagement every time." badge="x">
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
          {loading ? <><span className="spinner" /> Building...</> : '📋 Generate Listicle'}
        </button>
      </form>
      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Listicle Post" />}
    </ToolLayout>
  );
}
