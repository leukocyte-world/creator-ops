import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkUsage } from '@/lib/supabase';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ usage_count: 0, is_pro: false, remaining: 5 });
  }

  const usage = await checkUsage(session.user.email);
  return NextResponse.json(usage);
}
