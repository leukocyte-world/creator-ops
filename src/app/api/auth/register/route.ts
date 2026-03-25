import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: 'Valid email and a 6+ char password required' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Send Email to Admin
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'CreatorOps <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Signup: ${email}`,
        html: `<p>A new user just joined CreatorOps!</p><p><strong>Email:</strong> ${email}</p>`
      }).catch(console.error);
    }

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
