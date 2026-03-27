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
  };

  const relatedTools = X_TOOLS.filter(t => t.href !== '/tools/x/reverse-engineer').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>How the Viral X Reverse Engineer Works</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The secret to growing on X (Twitter) isn't just about posting frequently; it's about understanding the "chemistry" of what's already working. 
        Our Viral Reverse Engineer uses the Gemini 1.5 Flash engine to dismantle high-performing posts down to their DNA. 
        By analyzing the structural patterns, emotional triggers, and rhythmic pacing of viral content, the AI identifies the exact reasons why a post gained traction.
      </p>
      
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Science of Virality</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Virality on X is rarely an accident. It's often a combination of a compelling "Open Loop" hook, a relatable core conflict, and a satisfying resolution or "Aha!" moment. 
        When you paste 3 or more URLs into this tool, our system looks for the common threads between them. Does the creator use short, punchy sentences? 
        Do they utilize "negative space" to make the text more readable? Are they leveraging a specific trend or psychological bias? 
        The Reverse Engineer extracts these insights so you can apply them to your own brand without sounding like a copycat.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Why This Matters for Your Growth</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        In 2026, the X algorithm prioritizes retention and engagement over pure follower count. If users stop scrolling to read your post, your reach explodes. 
        By using a proven formula, you significantly increase the probability of your content being pushed to the "For You" feed. 
        This tool saves you hours of manual study. Instead of guessing what might work, you start with a blueprint that has already been validated by the market. 
        It's like having a viral content strategist working for you 24/7, ensuring every post you draft has the highest possible "Viral Potential Score."
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Step-by-Step Guide to Mastery</h3>
      <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20, paddingLeft: 20 }}>
        <li style={{ marginBottom: 10 }}><strong>Curate Viral Examples:</strong> Find at least 3 posts in your niche that have high likes and retweets.</li>
        <li style={{ marginBottom: 10 }}><strong>Input the Data:</strong> Paste the URLs into the fields above. This gives the AI the context it needs to find patterns.</li>
        <li style={{ marginBottom: 10 }}><strong>Draft Your Post:</strong> Provide a rough draft or just a general topic you want to write about.</li>
        <li style={{ marginBottom: 10 }}><strong>Generate & Refine:</strong> Let the AI rewrite your content using the viral formula. Review the output and tweak it to keep your unique voice.</li>
      </ol>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        Consistent use of the Viral Reverse Engineer trains your own "creator eye." Over time, you'll start to see these patterns naturally, 
        making you a faster and more effective writer even when you aren't using the toolkit.
      </p>
    </div>
  );

  return (
    <ToolLayout
      title="🔬 Viral Reverse Engineer"
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
          {loading ? <><span className="spinner" /> Analysing posts...</> : '🔬 Reverse Engineer'}
        </button>
      </form>

      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Viral Formula + Rewrite" />}
    </ToolLayout>
  );
}
