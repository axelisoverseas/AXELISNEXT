/**
 * Latest posts from the Axelis Instagram account.
 *
 * Instagram has no public feed any more, so this needs the Graph API and
 * therefore credentials:
 *
 *   INSTAGRAM_USER_ID       the Instagram Business/Creator account id
 *   INSTAGRAM_ACCESS_TOKEN  a long-lived token for that account
 *
 * Both come from a Meta app linked to the Facebook Page. Neither is optional
 * for live data: and neither is required for the page to work.
 *
 * The contract this route promises the UI: it ALWAYS returns 200 with
 * `{ ok, source, posts }`. When the token is missing, expired, or Meta is
 * unreachable, `posts` is empty and `source` says why. The component then
 * keeps showing the curated reels it already has. A lapsed token is a
 * certainty on a 60-day refresh cycle, and it must never blank a section of
 * the site when it happens.
 *
 * Cached for an hour so a page view is not a Graph API call.
 */

export const revalidate = 3600;

const GRAPH = 'https://graph.instagram.com';
const FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';

function payload(source, posts = []) {
  return Response.json({ ok: posts.length > 0, source, posts });
}

export async function GET() {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !token) return payload('not-configured');

  try {
    const url = `${GRAPH}/${encodeURIComponent(userId)}/media`
      + `?fields=${FIELDS}&limit=12&access_token=${encodeURIComponent(token)}`;

    const res = await fetch(url, { next: { revalidate } });

    if (!res.ok) {
      const detail = await res.text();
      // 190 is Meta's "token expired or revoked". Worth naming in the logs,
      // because the fix is a token refresh and nothing to do with this code.
      console.error('[instagram] Graph API refused:', res.status, detail.slice(0, 300));
      return payload(res.status === 400 || res.status === 401 ? 'token-invalid' : 'upstream-error');
    }

    const json = await res.json();
    const posts = (json.data || [])
      // A carousel's children are separate objects; the parent has no media_url.
      .filter((m) => m.media_url || m.thumbnail_url)
      .map((m) => ({
        id: m.id,
        permalink: m.permalink,
        caption: (m.caption || '').split('\n')[0].slice(0, 140),
        // A video's media_url is the file; thumbnail_url is the frame we want.
        image: m.media_type === 'VIDEO' ? (m.thumbnail_url || m.media_url) : m.media_url,
        isVideo: m.media_type === 'VIDEO',
        timestamp: m.timestamp,
      }));

    return payload('live', posts);
  } catch (err) {
    console.error('[instagram] unreachable:', err?.message);
    return payload('unreachable');
  }
}
