'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function ViralTitlesPage() {
  const [topic, setTopic] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Generate 20 highly clickable YouTube video titles about: ${topic}.

Break them into these categories:
- 5 curiosity-gap titles
- 5 number-based titles
- 5 fear/urgency titles
- 5 transformation titles

For EACH title, provide:
- Predicted CTR score (1-10)
- Target emotion triggered
- Best thumbnail style to match
- SEO keyword strength

Finally, rank all 20 from most to least viral potential.`
    });
  };

  return (
    <ToolLayout title="🚀 Viral Title Machine" description="Stop struggling with titles. Get 20 high-CTR title variations ranked by viral potential." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Video Topic</label><input className="input" value={topic} onChange={e => setTopic(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Generating...' : 'Generate Virality'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Viral Titles" />}
    </ToolLayout>
  );
}
