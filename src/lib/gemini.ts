// Gemini API client with key rotation across 3 keys on rate limit (429)

const KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

async function callGemini(apiKey: string, prompt: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.85, maxOutputTokens: 4096 },
      }),
    }
  );

  if (res.status === 429 || res.status === 503) {
    throw new Error('RATE_LIMIT');
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

export async function askGemini(prompt: string): Promise<string> {
  let lastError: Error | null = null;

  for (const key of KEYS) {
    try {
      return await callGemini(key, prompt);
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (lastError.message !== 'RATE_LIMIT') throw lastError;
      // Try next key on rate limit
    }
  }

  throw lastError ?? new Error('All Gemini API keys exhausted');
}
