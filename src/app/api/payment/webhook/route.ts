import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { activatePro } from '@/lib/supabase';

const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET!;

function verifySignature(body: string, signature: string): boolean {
  const expected = crypto
    .createHmac('sha512', IPN_SECRET)
    .update(body)
    .digest('hex');
  return expected === signature;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-nowpayments-sig') ?? '';

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const payload = JSON.parse(rawBody);

  // Only activate on confirmed / partially_paid finish
  if (payload.payment_status === 'finished' || payload.payment_status === 'confirmed') {
    const orderId: string = payload.order_id ?? '';
    // order_id format: creator-ops-{email}-{timestamp}
    const emailMatch = orderId.match(/^creator-ops-(.+)-\d+$/);
    if (emailMatch) {
      const email = emailMatch[1];
      await activatePro(email, String(payload.payment_id));
    }
  }

  return NextResponse.json({ ok: true });
}
