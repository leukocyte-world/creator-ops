import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API client with key rotation across 3 keys AND model fallback
// This ensures that if gemini-1.5-flash is 404ing (due to regional or SDK version issues), 
// we try other available models like 1.5-pro or 1.0-pro.

const KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

// Ordered by preference: Flash is fastest/cheapest, then Pro, then legacy Pro
const MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-flash-001',
  'gemini-1.5-pro',
  'gemini-pro'
];

async function callWithRetry(apiKey: string, prompt: string, keyIndex: number): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError: any = null;

  for (const modelName of MODELS) {
    try {
      console.log(`[Gemini] Trying key #${keyIndex + 1} with model ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      if (text) {
        console.log(`[Gemini] Success using model ${modelName} on key #${keyIndex + 1}.`);
        return text;
      }
    } catch (err: any) {
      lastError = err;
      const msg = err.message || String(err);
      
      // If it's a 404 (model not found), we try the next model in the list
      if (msg.includes('404') || msg.includes('not found')) {
        console.warn(`[Gemini] Model ${modelName} not found on key #${keyIndex + 1}. Trying next...`);
        continue;
      }
      
      // If it's a 429 (rate limit), we should probably try the next KEY instead of next model
      if (msg.includes('429') || msg.includes('quota')) {
        console.warn(`[Gemini] Rate limit hit on key #${keyIndex + 1}.`);
        throw new Error('RATE_LIMIT');
      }

      // If it's a fatal safety error or invalid key, don't bother trying other models on this key
      if (msg.includes('API_KEY_INVALID') || msg.includes('safety')) {
        console.error(`[Gemini] Fatal error on key #${keyIndex + 1}:`, msg);
        throw err;
      }

      // For other errors, try the next model
      console.error(`[Gemini] Error with ${modelName}:`, msg);
    }
  }

  throw lastError || new Error(`All models failed on key #${keyIndex + 1}`);
}

export async function askGemini(prompt: string): Promise<string> {
  if (KEYS.length === 0) {
    throw new Error('No Gemini API keys found in environment variables (GEMINI_API_KEY_1, etc.)');
  }

  let finalError: Error | null = null;

  for (let i = 0; i < KEYS.length; i++) {
    try {
      return await callWithRetry(KEYS[i], prompt, i);
    } catch (err: any) {
      finalError = err instanceof Error ? err : new Error(String(err));
      if (finalError.message === 'RATE_LIMIT') {
        process.stdout.write(`[Gemini] Retrying with next key...\n`);
        continue;
      }
      // If it's not a rate limit, it might be a model availability issue or invalid key
      // We still try the next key just in case one key has better permissions/quota than others
      console.warn(`[Gemini] Key #${i + 1} failed. Moving to next...`);
    }
  }

  throw finalError ?? new Error('All Gemini API keys and models exhausted');
}
