import { NextResponse } from 'next/server';

// Diagnostic: is this deployment actually seeing the Cashfree credentials?
//
// Reports only whether each variable is present, its length, and whether it
// has stray whitespace — never the values. Length and whitespace are what
// distinguish "not set" from "set but pasted with a trailing newline", which
// is the failure that looks identical from the outside.
//
// Safe to leave in place: it discloses nothing the 503 on /order doesn't
// already imply, and it is noindex by virtue of being an API route.
export const dynamic = 'force-dynamic';

function describe(v) {
  if (v === undefined) return { set: false, reason: 'variable not present in this deployment' };
  if (v === '') return { set: false, reason: 'present but empty' };
  const trimmed = v.trim();
  return {
    set: true,
    length: v.length,
    hasSurroundingWhitespace: trimmed.length !== v.length,
    looksTruncated: v.length < 8,
  };
}

/**
 * Presence is not validity. The variables can be set perfectly and still be
 * rejected by Cashfree — that is exactly what happened here, and a green
 * "ready" sent us looking in the wrong place. So actually ask Cashfree.
 *
 * Fetches a deliberately nonexistent order: 401 means the credentials are
 * refused, 404 means they authenticated fine and the order simply is not
 * there. Cheap, creates nothing, charges nothing.
 */
async function probeAuth(appId, secret, sandbox) {
  if (!appId || !secret) return { checked: false, reason: 'credentials not set' };
  const base = sandbox ? 'https://sandbox.cashfree.com' : 'https://api.cashfree.com';
  try {
    const res = await fetch(`${base}/pg/orders/does-not-exist-probe`, {
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': appId,
        'x-client-secret': secret,
      },
      cache: 'no-store',
    });
    if (res.status === 401 || res.status === 403) {
      let msg = '';
      try { msg = (await res.json()).message || ''; } catch {}
      return { checked: true, authenticated: false, status: res.status, cashfreeSays: msg };
    }
    return { checked: true, authenticated: true, status: res.status };
  } catch (err) {
    return { checked: true, authenticated: null, error: 'could not reach Cashfree' };
  }
}

export async function GET() {
  const appId = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;
  const envMode = process.env.CASHFREE_ENV;

  const app = describe(appId);
  const sec = describe(secret);

  const auth = await probeAuth(appId, secret, envMode === 'sandbox');

  return NextResponse.json({
    // Both must hold. Variables present but refused by Cashfree is the exact
    // failure this endpoint existed to catch and previously reported as ready.
    ready: app.set && sec.set && auth.authenticated === true,
    credentialsAccepted: auth,
    CASHFREE_APP_ID: app,
    CASHFREE_SECRET_KEY: sec,
    // Absent means live. If this says "sandbox" on production, payments will
    // appear to work and no money will move.
    CASHFREE_ENV: envMode || '(not set — live mode)',
    apiTarget: envMode === 'sandbox'
      ? 'https://sandbox.cashfree.com/pg/orders'
      : 'https://api.cashfree.com/pg/orders',
    deployedCommit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || '(local)',
  });
}
