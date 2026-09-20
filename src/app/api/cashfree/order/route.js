import { NextResponse } from 'next/server';
import { cashfreeLinks, withGst, MAX_UNITS } from '../../../../data/cashfreeLinks';

// Creates a Cashfree order and hands the browser a payment_session_id.
//
// Why this and not a payment link: link_creation_api is not approved on the
// Axelis merchant account (Cashfree returns PaymentLink_link_creation_api_failed),
// while the PG order API works. It is also the better shape, the amount is
// computed HERE from the catalogue, so the browser cannot choose what it pays.
//
// Cashfree's own hosted checkout collects the card details. Nothing sensitive
// touches this route or this domain.

const API = process.env.CASHFREE_ENV === 'sandbox'
  ? 'https://sandbox.cashfree.com/pg/orders'
  : 'https://api.cashfree.com/pg/orders';

export async function POST(request) {
  const appId = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;

  if (!appId || !secret) {
    // Unset keys must not look like a payment failure to the customer.
    return NextResponse.json(
      { error: 'unconfigured', message: 'Online payment is not switched on yet.' },
      { status: 503 },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const { product, customer, quantity } = payload || {};
  const item = cashfreeLinks[product];

  // An unknown product must never fall through to an arbitrary amount.
  if (!item) {
    return NextResponse.json({ error: 'unknown_product' }, { status: 400 });
  }

  const phone = String(customer?.phone || '').replace(/\D/g, '').slice(-10);
  if (phone.length !== 10) {
    return NextResponse.json(
      { error: 'invalid_phone', message: 'Enter a 10-digit mobile number.' },
      { status: 400 },
    );
  }

  // Per-document services are billed by count, so a quantity is accepted for
  // them and rejected for everything else. Sending qty=6 for a fixed-price
  // programme must not multiply the fee.
  let qty = 1;
  if (item.perUnit) {
    qty = Number.parseInt(quantity, 10);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_UNITS) {
      return NextResponse.json(
        { error: 'invalid_quantity', message: `Enter a document count between 1 and ${MAX_UNITS}.` },
        { status: 400 },
      );
    }
  }

  // The unit price comes from the catalogue, never from the request body, and
  // GST is applied to the computed total here rather than trusted from the
  // client. The buyer is shown this same gross figure before they press pay.
  const amount = withGst(item.amount * qty).gross;

  const body = {
    order_amount: amount,
    order_currency: 'INR',
    order_note: item.perUnit ? `${item.label} x ${qty}` : item.label,
    customer_details: {
      customer_id: `web-${Date.now()}`,
      customer_phone: phone,
      customer_name: customer?.name?.slice(0, 100) || undefined,
      customer_email: customer?.email?.slice(0, 100) || undefined,
    },
    order_tags: { product, quantity: String(qty), site: 'overseeducation.com', segment: 'd2c' },
    order_meta: {
      return_url: `https://overseeducation.com/payment-status?order_id={order_id}`,
    },
  };

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': appId,
        'x-client-secret': secret,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || !data.payment_session_id) {
      // Log server-side; never hand Cashfree's raw error to the browser.
      console.error('[cashfree] order failed', res.status, data);
      return NextResponse.json({ error: 'gateway_error' }, { status: 502 });
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
      amount,
    });
  } catch (err) {
    console.error('[cashfree] order threw', err);
    return NextResponse.json({ error: 'gateway_error' }, { status: 502 });
  }
}
