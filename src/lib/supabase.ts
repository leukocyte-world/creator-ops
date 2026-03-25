import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side Supabase client (uses service role key, NOT for client-side)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

export interface UserRecord {
  id: string;
  email: string;
  usage_count: number;
  is_pro: boolean;
  nowpayments_payment_id?: string;
  subscription_expires_at?: string;
  created_at: string;
}

export async function getOrCreateUser(email: string): Promise<UserRecord | null> {
  // Try to get existing user
  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existing) return existing as UserRecord;

  // Create new user
  const { data: created, error } = await supabase
    .from('users')
    .insert({ email, usage_count: 0, is_pro: false })
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return created as UserRecord;
}

export async function incrementUsage(email: string): Promise<{ allowed: boolean; remaining: number }> {
  const { data: user } = await supabase
    .from('users')
    .select('usage_count, is_pro')
    .eq('email', email)
    .single();

  if (!user) return { allowed: false, remaining: 0 };

  if (user.is_pro) return { allowed: true, remaining: Infinity };

  if (user.usage_count >= 5) {
    return { allowed: false, remaining: 0 };
  }

  await supabase
    .from('users')
    .update({ usage_count: user.usage_count + 1 })
    .eq('email', email);

  return { allowed: true, remaining: 4 - user.usage_count };
}

export async function checkUsage(email: string): Promise<{ allowed: boolean; remaining: number; is_pro: boolean; usage_count: number }> {
  const { data: user } = await supabase
    .from('users')
    .select('usage_count, is_pro')
    .eq('email', email)
    .single();

  if (!user) return { allowed: false, remaining: 0, is_pro: false, usage_count: 0 };

  if (user.is_pro) return { allowed: true, remaining: Infinity, is_pro: true, usage_count: user.usage_count };

  return {
    allowed: user.usage_count < 5,
    remaining: Math.max(0, 5 - user.usage_count),
    is_pro: false,
    usage_count: user.usage_count,
  };
}

export async function activatePro(email: string, paymentId: string): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  await supabase
    .from('users')
    .update({
      is_pro: true,
      nowpayments_payment_id: paymentId,
      subscription_expires_at: expiresAt.toISOString(),
    })
    .eq('email', email);
}
