'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { X_TOOLS } from '@/lib/tools-config';

export default function TransformationPage() {
  const [topic, setTopic] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Write a viral X (Twitter) post about a transformation in: ${topic}

Structure exactly like this (based on the highest converting ${new Date().getFullYear()} algorithm patterns):
Line 1 = painful before state (7-8 words)
Line 2 = the single thing that changed everything (7-8 words)
Line 3 = the after state (7-8 words)
Line 4 = the lesson in one sentence (7-8 words)

Rules:
- Write it like it happened to a REAL person, not a case study
- No hashtags, no em dashes, no motivational fluff
- Each line is 7-8 words maximum
- Make it feel true and lived-in for the current year
- Output ONLY the 4-line post. Nothing else.`
    });
  };

  const relatedTools = X_TOOLS.filter(t => t.href !== '/tools/x/transformation').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Mastering the 4-Line Formula</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The 4-line transformation is the &quot;Swiss Army Knife&quot; of X content. It&apos;s the most effective format for telling a compelling story in under 30 words. 
        The structure is simple but deadly: <strong>Before → Change → After → Lesson</strong>. 
        This format works because it leverages the human brain&apos;s natural craving for narrative resolution. 
        By showing a clear shift from a painful state to a successful one, you provide both value and inspiration.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Psychology of Transformation</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Readers on X are looking for shortcuts to success. A transformation post proves that you&apos;ve already walked the path. 
        It builds authority faster than any &quot;how-to&quot; thread because it provides social proof within the content itself. 
        Our AI ensures that every line is strictly optimized for 7-8 words, maintaining a rhythmic &quot;staccato&quot; that keeps the reader moving down the page.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Why This Matters for Reach</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        &quot;Transformation&quot; and &quot;Before and After&quot; content are some of the most engaging formats on the platform. 
        By utilizing this tool, you create high-velocity posts that algorithm loves to push to new audiences. 
        It allows you to dominate the &quot;How-To&quot; intent in your niche while keeping your content brief and viral-ready.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="4-Line Transformation" 
      description="Before → Change → After → Lesson. 4 lines, 7-8 words each. Maximum emotional punch." 
      badge="x"
      slug="transformation"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label className="input-label">Topic / Transformation</label>
          <input className="input" placeholder="e.g. learning to code, leaving a toxic job, losing weight, going broke..." value={topic} onChange={e => setTopic(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !topic.trim()}>
          {loading ? <><span className="spinner" /> Writing...</> : 'Write Transformation Post'}
        </button>
      </form>
      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="4-Line Transformation Post" />}
    </ToolLayout>
  );
}
