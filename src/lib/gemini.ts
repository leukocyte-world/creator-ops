// Professional-grade Gemini API client with SDK + REST fallback
// Bypasses SDK bugs/404s by forcing stable v1 endpoints and verified model names.

const KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

/**
 * MODELS verified for this environment via API discovery:
 * - gemini-2.5-flash (Primary)
 * - gemini-2.0-flash
 * - gemini-2.5-pro
 * - gemini-2.0-flash-lite
 */
const MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash-lite'
];

/**
 * Direct REST call to the stable v1 API
 */
async function callGeminiRest(apiKey: string, prompt: string, model: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.error?.message || 'REST API Unknown error';
    throw new Error(`REST_${response.status}: ${errorMsg}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('REST: Empty response body');
  
  return text;
}

export async function askGemini(prompt: string): Promise<string> {
  if (KEYS.length === 0) throw new Error('No Gemini API keys found.');

  let lastError: any = null;

  for (let k = 0; k < KEYS.length; k++) {
    const apiKey = KEYS[k];
    
    for (const modelName of MODELS) {
      try {
        console.log(`[Gemini/REST] Trying key #${k + 1} with model ${modelName}...`);
        return await callGeminiRest(apiKey, prompt, modelName);
      } catch (err: any) {
        lastError = err;
        const msg = err.message || String(err);
        
        // Handle rate limits (retry with next key)
        if (msg.includes('429') || msg.includes('quota')) {
          console.warn(`[Gemini] Rate limit hit on key #${k + 1}.`);
          break; // Move to next key
        }

        // Handle model 404 (try next model in the verified list)
        if (msg.includes('404') || msg.includes('not found')) {
          console.warn(`[Gemini] Model ${modelName} not found on key #${k + 1}. Trying next model...`);
          continue;
        }

        // Fatal errors (auth, safety)
        if (msg.includes('401') || msg.includes('403') || msg.includes('safety')) {
          console.error(`[Gemini] Fatal error on key #${k + 1}:`, msg);
          break; // Move to next key
        }

        console.error(`[Gemini] Error with ${modelName}:`, msg);
      }
    }
  }

  throw lastError || new Error('All keys and models failed. Please check if your API keys have the Generative Language API enabled.');
}
