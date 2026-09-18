import { NextResponse } from 'next/server';

// Reads an order's real status from Cashfree. The browser is told only the
// status and amount — never Cashfree's raw payload, which carries customer
// and payment metadata the payer's own page has no need for.

const BASE = process.env.CASHFREE_ENV === 'sandbox'
  ? 'https://sandbox.cashfree.com/pg/orders'
  : 'https://api.cashfree.com/pg/orders';

export async function GET(request) {
  const appId = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;
  if (!appId || !secret) {
    return NextResponse.json({ error: 'unconfigured' }, { status: 503 });
  }

  const orderId = request.nextUrl.searchParams.get('order_id');
  // Order ids are alphanumeric with - and _ ; anything else is not ours and
  // must not be interpolated into an upstream URL.
  if (!orderId || !/^[A-Za-z0-9_-]{3,45}$/.test(orderId)) {
    return NextResponse.json({ error: 'bad_order_id' }, { status: 400 });
  }

  try {
    const res = await fetch(`${BASE}/${encodeURIComponent(orderId)}`, {
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': appId,
        'x-client-secret': secret,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('[cashfree] status lookup failed', res.status, orderId);
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json({
      status: data.order_status,
      amount: data.order_amount,
      order_id: data.order_id,
    });
  } catch (err) {
    console.error('[cashfree] status threw', err);
    return NextResponse.json({ error: 'gateway_error' }, { status: 502 });
  }
}
