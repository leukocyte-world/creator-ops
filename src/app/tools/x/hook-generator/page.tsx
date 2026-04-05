'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { X_TOOLS } from '@/lib/tools-config';

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Write a powerful X (Twitter) hook for:
Topic: ${topic}
Target audience: ${audience}

Optimize completely for the CURRENT ${new Date().getFullYear()} X algorithm.

Rules:
- Open a loop so strong that readers NEED to keep scrolling
- Tease a specific result, story, or list that follows
- End with a bold promise, an open question, or a numbered list title like "here are 7 reasons"
- NEVER close the loop in the hook itself
- No hashtags
- Write like a human, NOT a marketer
- The hook should be 1-3 lines max
- Make it IMPOSSIBLE to scroll past based on current social media dopamine patterns

Output:
1. The hook text
2. Why this hook works (2-3 sentences based on 2026 engagement psychology)
3. Two alternative versions`
    });
  };

  const relatedTools = X_TOOLS.filter(t => t.href !== '/tools/x/hook-generator').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Art of the Open Loop</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        In the attention economy, your hook is 90% of the battle. If your first line doesn&apos;t grab them, the rest of your post doesn&apos;t exist. 
        Our Hook Generator focuses on the &quot;Open Loop&quot; technique — a psychological principle where the brain feels a physical need to resolve an unanswered question. 
        By teasing a specific result or secret without giving it away immediately, you force the reader to stop and engage.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Stopping the Scroll in {new Date().getFullYear()}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Modern readers are hyper-aware of &quot;clickbait.&quot; To win on X today, your hooks must be both provocative and authentic. 
        This tool helps you find the sweet spot between &quot;boring&quot; and &quot;spammy.&quot; 
        It generates variations based on your specific audience, ensuring the tone matches their expectations—whether they are crypto degens, serious founders, or hobbyist developers.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>SEO and Authority</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Generating high-engagement hooks tells search engines and social algorithms that your content is &quot;High Quality.&quot; 
        This tool isn&apos;t just for posts; use these hooks for your blog titles, YouTube descriptions, and email subject lines. 
        It&apos;s a universal growth engine that ensures your message never goes unheard.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Hook Generator" 
      description="Generate loop-opening hooks that make readers physically unable to scroll past your post." 
      badge="x"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label className="input-label">Topic</label>
          <input className="input" placeholder="e.g. why most freelancers fail, my morning routine, how I made $10k..." value={topic} onChange={e => setTopic(e.target.value)} required />
        </div>
        <div className="input-wrap">
          <label className="input-label">Target Audience</label>
          <input className="input" placeholder="e.g. beginner entrepreneurs, developers, crypto investors..." value={audience} onChange={e => setAudience(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !topic.trim() || !audience.trim()}>
          {loading ? <><span className="spinner" /> Generating...</> : 'Generate Hook'}
        </button>
      </form>
      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Hook + Alternatives" />}
    </ToolLayout>
  );
}
