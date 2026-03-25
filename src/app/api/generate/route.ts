import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { askGemini } from '@/lib/gemini';
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

  const { prompt } = await req.json();
  if (!prompt) return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });

  try {
    const result = await askGemini(prompt);
    return NextResponse.json({ result, remaining: usage.remaining });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'AI error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
