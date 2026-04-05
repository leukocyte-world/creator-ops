'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

import { X_TOOLS } from '@/lib/tools-config';

export default function ReverseEngineerPage() {
  const [urls, setUrls] = useState(['', '', '']);
  const [userPost, setUserPost] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI({ endpoint: '/api/reverse-engineer' });

  const addUrl = () => setUrls(prev => [...prev, '']);
  const updateUrl = (i: number, val: string) => setUrls(prev => prev.map((u, idx) => idx === i ? val : u));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validUrls = urls.filter(u => u.trim());
    if (validUrls.length < 1) return;
    generate({ urls: validUrls, userPost: userPost.trim() });
    // Note: The /api/reverse-engineer route also handles adding current-date context in its own implementation 
    // to ensure the AI analyzes the content based on current 2026 standards.
  };

  const relatedTools = X_TOOLS.filter(t => t.href !== '/tools/x/reverse-engineer').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>How the Viral X Reverse Engineer Works</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The secret to growing on X (Twitter) isn&apos;t just about posting frequently; it&apos;s about understanding the &quot;chemistry&quot; of what&apos;s already working right now. 
        Our Viral Reverse Engineer uses advanced AI to dismantle high-performing posts down to their DNA. 
        By analyzing the structural patterns, emotional triggers, and rhythmic pacing of viral content, the AI identifies the exact reasons why a post gained traction.
      </p>
      
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Science of Virality</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Virality on X is rarely an accident. It&apos;s often a combination of a compelling &quot;Open Loop&quot; hook, a relatable core conflict, and a satisfying resolution or &quot;Aha!&quot; moment. 
        When you paste 3 or more URLs into this tool, our system looks for the common threads. Does the creator use short, punchy sentences? 
        The Reverse Engineer extracts these insights so you can apply them to your own brand without sounding like a copycat.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Why This Matters for Your Growth</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        In {new Date().getFullYear()}, the X algorithm prioritizes retention and engagement over pure follower count. If users stop scrolling to read your post, your reach explodes. 
        By using a proven formula, you significantly increase the probability of your content being pushed to the &quot;For You&quot; feed. 
        This tool saves you hours of manual study.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Step-by-Step Guide to Mastery</h3>
      <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20, paddingLeft: 20 }}>
        <li style={{ marginBottom: 10 }}><strong>Curate Viral Examples:</strong> Find at least 3 posts in your niche that have high likes and retweets.</li>
        <li style={{ marginBottom: 10 }}><strong>Input the Data:</strong> Paste the URLs into the fields above. This gives the AI the context it needs to find patterns.</li>
        <li style={{ marginBottom: 10 }}><strong>Draft Your Post:</strong> Provide a rough draft or just a general topic you want to write about.</li>
        <li style={{ marginBottom: 10 }}><strong>Generate &amp; Refine:</strong> Let the AI rewrite your content using the viral formula.</li>
      </ol>
    </div>
  );

  return (
    <ToolLayout
      title="Viral Reverse Engineer"
      description="Paste 3+ viral X posts. The AI breaks down the exact formula, structure, and hook pattern — then rewrites your post using the same winning blueprint."
      badge="x"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label className="input-label">Viral X Post URLs (paste at least 3)</label>
          {urls.map((url, i) => (
            <div key={i} className="input-wrap">
              <input
                className="input"
                placeholder={`https://x.com/user/status/...  (post ${i + 1})`}
                value={url}
                onChange={e => updateUrl(i, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={addUrl} className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }}>
            + Add another URL
          </button>
        </div>

        <div className="input-wrap">
          <label className="input-label">Your post to rewrite (optional)</label>
          <textarea
            className="textarea"
            placeholder="Paste your draft post here and the AI will rewrite it using the viral formula..."
            value={userPost}
            onChange={e => setUserPost(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading || urls.filter(u => u.trim()).length < 1}>
          {loading ? <><span className="spinner" /> Analysing posts...</> : 'Reverse Engineer'}
        </button>
      </form>

      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Viral Formula + Rewrite" />}
    </ToolLayout>
  );
}
