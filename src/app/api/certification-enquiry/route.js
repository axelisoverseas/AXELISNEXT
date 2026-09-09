import { NextResponse } from 'next/server';

/**
 * Certification enquiry intake.
 *
 * Creates a HubSpot contact and an associated deal on the Certifications
 * pipeline (stages: Enquiry -> Consultation -> Enrolled -> Started ->
 * Completed -> Certified).
 *
 * Credentials come from the environment. Nothing is hardcoded:
 *
 *   HUBSPOT_PRIVATE_APP_TOKEN   required for the HubSpot write
 *   HUBSPOT_CERT_PIPELINE_ID    optional; the Certifications pipeline id
 *   HUBSPOT_CERT_STAGE_ENQUIRY  optional; the "Enquiry" stage id
 *
 * The pipeline and stage ids must come from the live HubSpot account. Until
 * they are set, the enquiry is accepted, logged server-side, and reported as
 * received so the form is never a silent drop.
 */

const HUBSPOT_API = 'https://api.hubapi.com';

function bad(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
// 10 digits, optionally with +91 / 0 prefix and separators.
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
  const programTitle = String(body.programTitle || '').trim();
  const intake = String(body.intake || '').trim();
  const financing = String(body.financing || '').trim();
  const referral = String(body.referral || '').trim();
  const sourcePage = String(body.sourcePage || '').trim();

  if (!name || name.length < 2) return bad('Please enter your name.');
  if (!isEmail(email)) return bad('Please enter a valid email address.');
  if (!isPhone(phone)) return bad('Please enter a valid 10-digit Indian mobile number.');

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

  // No credentials configured yet. Accept the enquiry and log it so it is
  // recoverable from server logs rather than lost.
  if (!token) {
    console.warn(
      '[certification-enquiry] HUBSPOT_PRIVATE_APP_TOKEN is not set. Enquiry captured in logs only:',
      JSON.stringify({ name, email, phone, programTitle, intake, financing, referral, sourcePage }),
    );
    return NextResponse.json({ ok: true, delivered: 'log' });
  }

  const [firstname, ...rest] = name.split(/\s+/);
  const lastname = rest.join(' ');

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    // 1. Upsert the contact by email.
    const contactRes = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        properties: {
          email,
          firstname,
          lastname: lastname || undefined,
          phone,
          hs_lead_status: 'NEW',
        },
      }),
    });

    let contactId = null;
    if (contactRes.ok) {
      contactId = (await contactRes.json()).id;
    } else if (contactRes.status === 409) {
      // Already exists — pull the id out of the conflict message.
      const conflict = await contactRes.json().catch(() => ({}));
      contactId = conflict?.message?.match(/\b(\d{4,})\b/)?.[1] || null;
    } else {
      const detail = await contactRes.text();
      console.error('[certification-enquiry] HubSpot contact create failed:', contactRes.status, detail);
      return bad('We could not record your enquiry just now. Please call us on +91 9098522711.', 502);
    }

    // 2. Create the deal on the Certifications pipeline.
    const pipeline = process.env.HUBSPOT_CERT_PIPELINE_ID;
    const dealstage = process.env.HUBSPOT_CERT_STAGE_ENQUIRY;

    const dealProperties = {
      dealname: `${name} — ${programTitle || 'Certification enquiry'}`,
      ...(pipeline ? { pipeline } : {}),
      ...(dealstage ? { dealstage } : {}),
    };

    const dealRes = await fetch(`${HUBSPOT_API}/crm/v3/objects/deals`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        properties: dealProperties,
        associations: contactId
          ? [{
              to: { id: contactId },
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
            }]
          : undefined,
      }),
    });

    if (!dealRes.ok) {
      const detail = await dealRes.text();
      // The contact landed, so the lead is not lost. Log and report success.
      console.error('[certification-enquiry] HubSpot deal create failed:', dealRes.status, detail);
      console.warn('[certification-enquiry] Enquiry context:', JSON.stringify({ programTitle, intake, financing, referral, sourcePage }));
      return NextResponse.json({ ok: true, delivered: 'contact-only' });
    }

    return NextResponse.json({ ok: true, delivered: 'hubspot' });
  } catch (err) {
    console.error('[certification-enquiry] Unexpected failure:', err);
    return bad('We could not record your enquiry just now. Please call us on +91 9098522711.', 502);
  }
}
