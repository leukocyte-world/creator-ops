'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

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

  return (
    <ToolLayout
      title="🔬 Viral Reverse Engineer"
      description="Paste 3+ viral X posts. The AI breaks down the exact formula, structure, and hook pattern — then rewrites your post using the same winning blueprint."
      badge="x"
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
