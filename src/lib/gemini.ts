import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API client with key rotation across 3 keys on rate limit (429)

const KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

async function callGemini(apiKey: string, prompt: string, keyIndex: number): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    console.log(`[Gemini] Calling API with key #${keyIndex + 1}...`);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log(`[Gemini] Success (key #${keyIndex + 1}). Length: ${text.length}`);
    return text;
  } catch (err: any) {
    const errorMessage = err.message || String(err);
    console.error(`[Gemini] Error (key #${keyIndex + 1}):`, errorMessage);
    
    if (errorMessage.includes('429') || errorMessage.includes('quota')) {
      throw new Error('RATE_LIMIT');
    }
    throw new Error(`Gemini SDK error: ${errorMessage}`);
  }
}

export async function askGemini(prompt: string): Promise<string> {
  let lastError: Error | null = null;

  for (let i = 0; i < KEYS.length; i++) {
    try {
      return await callGemini(KEYS[i], prompt, i);
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (lastError.message !== 'RATE_LIMIT') {
        // If it's a fatal error (like invalid key or safety block), log and rethrow
        console.error(`[Gemini] Fatal error on key #${i + 1}.`, lastError.message);
        throw lastError;
      }
      // Try next key on rate limit
      console.warn(`[Gemini] Rate limit hit on key #${i + 1}. Retrying with next key...`);
    }
  }

  throw lastError ?? new Error('All Gemini API keys exhausted or rate limited');
}
