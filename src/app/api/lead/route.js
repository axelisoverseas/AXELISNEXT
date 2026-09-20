import { NextResponse } from 'next/server';

/**
 * General lead intake.
 *
 * Used by the guide library and anywhere else we ask for a contact before
 * there is a specific programme in mind. It deliberately mirrors
 * /api/certification-enquiry rather than inventing a second shape: same
 * validation, same environment contract, same promise that a submission is
 * never silently dropped.
 *
 *   HUBSPOT_PRIVATE_APP_TOKEN   required for the HubSpot write
 *
 * If the token is absent the lead is still accepted and logged server-side,
 * and the caller is told it was received. A form that quietly fails is worse
 * than one that is honestly queued.
 */

const HUBSPOT_API = 'https://api.hubapi.com';

function bad(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v) => /^(\+?91[-\s]?|0)?[6-9]\d{9}$/.test(String(v).replace(/[\s-]/g, ''));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return bad('Malformed request body.');
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const destination = String(body.destination || '').trim();
  const source = String(body.source || 'guide-library').trim();

  if (name.length < 2) return bad('Please tell us your name.');
  if (!isEmail(email)) return bad('That email address does not look right.');
  if (!isPhone(phone)) return bad('Please give a 10-digit Indian mobile number.');

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    // Accepted, not lost. Someone reads the logs; nobody reads a dropped form.
    console.info('[lead] HubSpot token absent, lead queued in logs:', {
      name, email, phone, destination, source, at: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, queued: true });
  }

  const [firstname, ...rest] = name.split(/\s+/);
  try {
    const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          firstname,
          lastname: rest.join(' ') || '',
          email,
          phone,
          hs_lead_status: 'NEW',
          ...(destination ? { country: destination } : {}),
        },
      }),
    });

    // An existing contact is a 409. That is a returning student, not a failure.
    if (!res.ok && res.status !== 409) {
      const detail = await res.text();
      console.error('[lead] HubSpot rejected the contact:', res.status, detail.slice(0, 400));
      return NextResponse.json({ ok: true, queued: true });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[lead] HubSpot unreachable:', err?.message);
    return NextResponse.json({ ok: true, queued: true });
  }
}
