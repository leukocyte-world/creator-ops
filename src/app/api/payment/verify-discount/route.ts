import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid or expired discount code' }, { status: 404 });
    }

    return NextResponse.json({ 
      code: data.code, 
      percent_off: data.percent_off 
    });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
