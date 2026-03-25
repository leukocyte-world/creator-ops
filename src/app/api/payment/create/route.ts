import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY!;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { currency = 'usdtbsc' } = await req.json();

  try {
    const res = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: 10,
        price_currency: 'usd',
        pay_currency: currency,
        order_id: `creator-ops-${session.user.email}-${Date.now()}`,
        order_description: 'CreatorOps Pro — 1 Month Subscription',
        ipn_callback_url: `${process.env.NEXTAUTH_URL}/api/payment/webhook`,
        success_url: `${process.env.NEXTAUTH_URL}/upgrade/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/upgrade`,
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
