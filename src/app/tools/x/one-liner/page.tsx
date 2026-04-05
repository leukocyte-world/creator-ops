'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { X_TOOLS } from '@/lib/tools-config';

export default function OneLinerPage() {
  const [topic, setTopic] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. You are a viral X (Twitter) creator known for raw, unfiltered, emotionally charged content.

Write 10 one-line posts about: ${topic}

Use the tone and style that is CURRENTLY getting the highest engagement on X in ${new Date().getFullYear()} — punchy, contrarian, or hyper-relatable based on current meta.

Rules:
- Start each with a bold, emotional or opinionated claim
- Keep it raw, human, slightly unfiltered
- Use natural emphasis (CAPS for key words if needed)
- NEVER use generic motivational tone
- NEVER use em dashes
- Vary the style: some controversial, some inspiring, some painful truths
- Each post stands alone as a complete thought
- Output ONLY the 10 posts, numbered. Nothing else.`
    });
  };

  const relatedTools = X_TOOLS.filter(t => t.href !== '/tools/x/one-liner').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Power of the One-Liner</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        In the fast-paced world of X, brevity isn&apos;t just a constraint; it&apos;s a superpower. A single, well-crafted sentence can travel further than a thousand-word article. 
        The &quot;One-Liner&quot; tool is designed to help you master the art of the punchy, emotionally-charged post that resonates instantly with your audience. 
        Whether you&apos;re sharing a controversial take, an inspiring lesson, or a painful truth, these one-liners are built to stop the scroll and trigger a reaction.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Emotional Resonance and Virality</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Why do one-liners work? Because they remove all friction from the reading experience. 
        In less than a second, a reader can consume your entire thought and decide whether to engage. 
        By stripping away the &quot;fluff,&quot; you expose the core emotion or logic of your message. 
        Our AI generates 10 different variations so you can choose the one that best fits your current voice and audience mood.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Why This Matters for Rapid Growth</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        High-performing accounts on X use one-liners to maintain a high &quot;signal-to-noise&quot; ratio. 
        Each post serves as an entry point to your profile. If your one-liners are consistently strong, your follower conversion rate sky-rockets. 
        This tool ensures you never run out of ideas, even on days when your own creativity is low. 
        It leverages AI to ensure every sentence carries enough weight to stand alone as a viral hit.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Viral One-Liner" 
      description="Drop your topic. Get 10 raw, emotionally charged one-line posts built to stop the scroll." 
      badge="x"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label className="input-label">Topic</label>
          <input className="input" placeholder="e.g. building in public, quitting your job, crypto, AI..." value={topic} onChange={e => setTopic(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !topic.trim()}>
          {loading ? <><span className="spinner" /> Generating...</> : 'Generate 10 One-Liners'}
        </button>
      </form>
      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="10 Viral One-Liners" />}
    </ToolLayout>
  );
}
