import { NextRequest, NextResponse } from 'next/server';
import { activatePro } from '@/lib/supabase';

// Flutterwave webhook verification (Secret Hash)
const FLW_SECRET_HASH = process.env.FLW_SECRET_HASH; 

export async function POST(req: NextRequest) {
  const hash = req.headers.get('verif-hash');
  
  // If the user has set a secret hash, we verify it
  if (FLW_SECRET_HASH && hash !== FLW_SECRET_HASH) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await req.json();

  // Flutterwave uses status 'successful' for completed payments
  if (payload.status === 'successful' || payload.event === 'charge.completed') {
    const data = payload.data || payload;
    
    // We try to extract email from metadata or tx_ref
    let email = data.meta?.email || data.customer?.email;
    
    // If not found, try to extract from tx_ref (our format: creator-ops-{email_at_email_com}-{timestamp})
    if (!email && data.tx_ref) {
      const refMatch = data.tx_ref.match(/^creator-ops-(.+)-\d+$/);
      if (refMatch) {
         email = refMatch[1].replace(/_at_/g, '@');
      }
    }

    if (email) {
      // Activate pro for the user
      await activatePro(email, `flw-${data.id || data.tx_ref}`);
    }
  }

  return NextResponse.json({ ok: true });
}
