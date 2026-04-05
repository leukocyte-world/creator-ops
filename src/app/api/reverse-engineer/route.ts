// Special route for reverse-engineer: fetches X posts first, then calls Gemini
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { askGemini } from '@/lib/gemini';
import { fetchThread } from '@/lib/fxtwitter';
import { incrementUsage } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Please sign in to use this tool' }, { status: 401 });
  }

  const usage = await incrementUsage(session.user.email);
  if (!usage.allowed) {
    return NextResponse.json({ error: 'upgrade_required', message: 'You have used all 5 free uses. Upgrade to Pro to continue.' }, { status: 402 });
  }

  const { urls, userPost } = await req.json();
  if (!urls || !Array.isArray(urls) || urls.length < 1) {
    return NextResponse.json({ error: 'Please provide at least 1 X post URL' }, { status: 400 });
  }

  // Fetch actual tweet content
  const threadContent = await fetchThread(urls);

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const prompt = `Today is ${currentDate}. You are a master content strategist and reverse engineer of viral social media content.

Analyze these posts based on what is performing best on X RIGHT NOW in ${new Date().getFullYear()}.

Here are ${urls.length} viral posts from X (Twitter):

${threadContent}

Analyze these posts and tell me EXACTLY:

1. **HOOK PATTERN** — What is the opening hook formula? (e.g., "Bold claim → social proof → question")
2. **STRUCTURE** — Break down the architecture line by line. What format did they use?
3. **TONE & VOICE** — Describe the exact tone (conversational, authoritative, raw, etc.)
4. **EMOTIONAL TRIGGER** — What emotion is being activated and why does it work?
5. **THE FORMULA** — Write out the reusable formula someone could follow.
${userPost ? `\n6. **REWRITE** — Now rewrite this post using the exact formula you identified:\n"${userPost}"\n\nKeep the same structure and emotional intent. Make it just as compelling.` : ''}

Be specific. Be tactical. Give me something I can actually USE immediately.`;

  try {
    const result = await askGemini(prompt);
    return NextResponse.json({ result, remaining: usage.remaining });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'AI error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
