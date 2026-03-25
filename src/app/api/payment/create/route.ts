import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY!;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { currency = 'usdtbsc', discount_code } = await req.json();

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

  try {
    const res = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: price,
        price_currency: 'usd',
        pay_currency: currency,
        order_id: `creator-ops-${session.user.email}-${Date.now()}`,
        order_description: `CreatorOps Pro — ${discount_code ? `Discount Applied (${discount_code})` : '1 Month Subscription'}`,
        ipn_callback_url: `https://${(process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'localhost:3000').replace(/^https?:\/\//, '')}/api/payment/webhook`,
        success_url: `https://${(process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'localhost:3000').replace(/^https?:\/\//, '')}/upgrade/success`,
        cancel_url: `https://${(process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'localhost:3000').replace(/^https?:\/\//, '')}/upgrade`,
        is_fixed_rate: true,
        is_fee_paid_by_user: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ invoice_url: data.invoice_url, payment_id: data.id });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
