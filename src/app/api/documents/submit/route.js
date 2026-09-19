import { NextResponse } from 'next/server';
import { documentRequirements, UPLOAD_LIMITS } from '../../../../data/documentRequirements';
import { postSubmission, slackReady } from '../../../../lib/slackDocuments';

// Receives a candidate's documents and delivers them to operations as one
// Slack message with Naveen tagged.
//
// Everything is re-validated here. The browser already checks type, size and
// count, but a check that only runs in the browser is a suggestion: anyone can
// POST this endpoint directly, so the limits are enforced again on the server
// where they cannot be skipped.
//
// Nothing is written to disk. Files go straight from the request to Slack,
// which becomes the system of record. That is deliberate: candidate documents
// are passports and bank statements, and the fewer places they are copied to,
// the smaller the surface if anything is ever breached.

export const runtime = 'nodejs';

const bad = (error, message, status = 400) =>
  NextResponse.json({ error, message }, { status });

export async function POST(request) {
  if (!slackReady()) {
    return bad(
      'unconfigured',
      'Document upload is not switched on yet. Please email your documents to axelisoverseas@overseeducation.com and we will pick them up from there.',
      503,
    );
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return bad(
      'too_large',
      `That upload was too large to receive. Keep the total under ${Math.floor(UPLOAD_LIMITS.maxTotalBytes / (1024 * 1024))} MB, or send it in two submissions using the same payment reference.`,
      413,
    );
  }

  const serviceKey = String(form.get('serviceKey') || '');
  const requirement = documentRequirements[serviceKey];
  if (!requirement) return bad('unknown_service', 'That service does not accept document uploads.');

  const name = String(form.get('name') || '').trim();
  const phone = String(form.get('phone') || '').replace(/\D/g, '');
  const email = String(form.get('email') || '').trim();
  const notes = String(form.get('notes') || '').trim().slice(0, 1000);
  const reference = String(form.get('reference') || '').trim().slice(0, 80);
  const paid = String(form.get('paid') || '') === 'true';
  const amount = Number(form.get('amount') || 0) || null;
  const documentCount = Number(form.get('documentCount') || 0) || null;

  if (name.length < 2) return bad('invalid_name', 'Please give the name on your documents.');
  if (phone.length < 10 || phone.length > 12) {
    return bad('invalid_phone', 'Please give a valid mobile number so we can reach you about these documents.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad('invalid_email', 'Please give a valid email address. Your confirmation goes there.');
  }

  const files = form.getAll('files').filter((f) => typeof f === 'object' && f.size > 0);

  if (!files.length) return bad('no_files', 'Please attach at least one document.');
  if (files.length > UPLOAD_LIMITS.maxFiles) {
    return bad('too_many', `Please attach no more than ${UPLOAD_LIMITS.maxFiles} files at a time.`);
  }

  let total = 0;
  for (const f of files) {
    if (f.size > UPLOAD_LIMITS.maxFileBytes) {
      return bad(
        'file_too_large',
        `"${f.name}" is larger than ${Math.floor(UPLOAD_LIMITS.maxFileBytes / (1024 * 1024))} MB. Scan at 150 to 200 DPI and it will come down well under that.`,
      );
    }
    // Some browsers report an empty type for HEIC, so the extension is
    // accepted as a fallback rather than rejecting a valid scan.
    const okType =
      UPLOAD_LIMITS.accept.includes(f.type) || /\.(pdf|jpe?g|png|heic)$/i.test(f.name);
    if (!okType) {
      return bad('bad_type', `"${f.name}" is not a ${UPLOAD_LIMITS.acceptLabel} file.`);
    }
    total += f.size;
  }
  if (total > UPLOAD_LIMITS.maxTotalBytes) {
    return bad(
      'too_large',
      `Those files come to ${(total / (1024 * 1024)).toFixed(1)} MB. Keep each submission under ${Math.floor(UPLOAD_LIMITS.maxTotalBytes / (1024 * 1024))} MB, or send them in two submissions using the same payment reference.`,
      413,
    );
  }

  try {
    const { fileCount } = await postSubmission({
      serviceName: requirement.service,
      candidate: { name, phone, email, notes, source: String(form.get('source') || 'overseeducation.com') },
      payment: { reference, paid, amount, documentCount },
      files,
    });
    return NextResponse.json({ ok: true, fileCount });
  } catch (err) {
    // The real cause is logged for us and never echoed to the candidate: a
    // Slack error string tells an attacker about our internals and tells a
    // candidate nothing they can act on.
    console.error('[documents/submit]', err);
    return bad(
      'delivery_failed',
      'We could not deliver your documents just now. Please email them to axelisoverseas@overseeducation.com and we will take it from there.',
      502,
    );
  }
}
