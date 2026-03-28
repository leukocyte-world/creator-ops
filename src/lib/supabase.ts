import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Server-side Supabase client (uses service role key, NOT for client-side)
// We use a conditional check to avoid breaking the build when environment variables are missing
export const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })
  : null as any;

export interface UserRecord {
  id: string;
  email: string;
  password_hash?: string;
  usage_count: number;
  is_pro: boolean;
  nowpayments_payment_id?: string;
  subscription_expires_at?: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image?: string;
  author: string;
  category: string;
  published_at: string;
  created_at: string;
  is_published: boolean;
}

export async function registerUser(email: string, password: string): Promise<{ user?: UserRecord; error?: string }> {
  // Check if user exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    return { error: 'User already exists with this email' };
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  // Create new user
  const { data: created, error } = await supabase
    .from('users')
    .insert({ email, password_hash, usage_count: 0, is_pro: false })
    .select()
    .single();

  if (error) {
    return { error: 'Failed to create user account' };
  }

  return { user: created as UserRecord };
}

export async function authenticateUser(email: string, password: string): Promise<UserRecord | null> {
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user || !user.password_hash) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  return user as UserRecord;
}

export async function getOrCreateUser(email: string): Promise<UserRecord | null> {
  // Legacy method kept for fallback/safety
  const { data: existing } = await supabase.from('users').select('*').eq('email', email).single();
  if (existing) return existing as UserRecord;
  const { data: created, error } = await supabase.from('users').insert({ email, usage_count: 0, is_pro: false }).select().single();
  if (error) return null;
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

// Blog Functions
export async function getPosts(publishedOnly = true): Promise<Post[]> {
  let query = supabase.from('posts').select('*').order('published_at', { ascending: false });
  if (publishedOnly) {
    query = query.eq('is_published', true);
  }
  const { data } = await query;
  return (data || []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data } = await supabase.from('posts').select('*').eq('slug', slug).single();
  return data as Post | null;
}

export async function upsertPost(post: Partial<Post>): Promise<{ data: Post | null; error: any }> {
  const { data, error } = await supabase
    .from('posts')
    .upsert({
      ...post,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  return { data: data as Post | null, error };
}

export async function deletePost(id: string): Promise<void> {
  await supabase.from('posts').delete().eq('id', id);
}
