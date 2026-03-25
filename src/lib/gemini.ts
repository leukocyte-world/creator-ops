import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API client with key rotation across 3 keys on rate limit (429)

const KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

async function callGemini(apiKey: string, prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  // Using the widely available 1.5 flash model via official SDK
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err: any) {
    const errorMessage = err.message || String(err);
    if (errorMessage.includes('429') || errorMessage.includes('quota')) {
      throw new Error('RATE_LIMIT');
    }
    throw new Error(`Gemini SDK error: ${errorMessage}`);
  }
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

  throw lastError ?? new Error('All Gemini API keys exhausted or rate limited');
}
