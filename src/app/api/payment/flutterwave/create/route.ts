import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY!;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { discount_code } = await req.json();

  let price = 10;
  if (discount_code) {
    const { data: discount } = await (require('@/lib/supabase').supabase)
      .from('discount_codes')
      .select('percent_off')
      .eq('code', discount_code.toUpperCase())
      .eq('is_active', true)
      .single();
    
    if (discount) {
      price = 10 * (1 - discount.percent_off / 100);
    }
  }

  // Handle 100% discount
  if (price <= 0) {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const { error: updateError } = await (require('@/lib/supabase').supabase)
      .from('users')
      .update({ 
        is_pro: true,
        subscription_expires_at: expiresAt.toISOString(),
        nowpayments_payment_id: `discount-flw-${discount_code || '100pct'}-${Date.now()}`
      })
      .eq('email', session.user.email);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to apply 100% discount' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Free upgrade applied successfully!' });
  }

  const tx_ref = `creator-ops-${session.user.email.replace(/@/g, '_at_')}-${Date.now()}`;

  try {
    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: tx_ref,
        amount: price.toString(),
        currency: 'USD',
        redirect_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/upgrade/success`,
        meta: {
          email: session.user.email,
        },
        customer: {
          email: session.user.email,
          name: session.user.name || session.user.email,
        },
        customizations: {
          title: 'CreatorOps Pro',
          description: '1 Month Subscription to CreatorOps AI Tools',
          logo: 'https://creator-ops.vercel.app/logo.png', // Fallback URL
        },
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return NextResponse.json({ link: data.data.link });
    } else {
      return NextResponse.json({ error: data.message || 'Flutterwave initialization failed' }, { status: 400 });
    }
  } catch (err) {
    console.error('Flutterwave Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
