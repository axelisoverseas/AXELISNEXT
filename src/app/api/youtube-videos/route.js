// Public route handler that fetches the latest videos from the Axelis Overseas
// YouTube channel (@axelisoverseas) using YouTube's public RSS feed.
//
// Strategy: RSS needs a channel UC... ID, but we only know the @handle.
// Step 1 — fetch the channel page HTML and extract `"channelId":"UC..."`.
// Step 2 — fetch the RSS feed for that channel and parse <entry> blocks.
// Step 3 — return normalized JSON. Results are cached on the server for 1h
// (revalidate = 3600) so we don't hammer YouTube on every request.

export const revalidate = 3600;

const CHANNEL_HANDLE = 'axelisoverseas';

const TAG = (name) =>
  new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'g');

function firstMatch(regex, text) {
  regex.lastIndex = 0;
  const m = regex.exec(text);
  return m ? m[1] : null;
}

function stripCdata(s) {
  if (!s) return '';
  return s.replace(/^<!\[CDATA\[|\]\]>$/g, '').trim();
}

async function resolveChannelId(handle) {
  const res = await fetch(`https://www.youtube.com/@${handle}`, {
    headers: {
      // YouTube serves a lighter / more regex-friendly HTML for a plain UA
      'User-Agent':
        'Mozilla/5.0 (compatible; AxelisBot/1.0; +https://www.overseeducation.com)',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    // Cache resolution result for a day — channel ID never changes
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`channel page ${res.status}`);
  const html = await res.text();
  const match =
    html.match(/"channelId":"(UC[\w-]{10,})"/) ||
    html.match(/"externalId":"(UC[\w-]{10,})"/) ||
    html.match(/channel\/(UC[\w-]{10,})/);
  if (!match) throw new Error('channelId not found in page');
  return match[1];
}

async function fetchFeed(channelId) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`rss ${res.status}`);
  return res.text();
}

function parseFeed(xml) {
  const videos = [];
  const entries = xml.match(/<entry\b[\s\S]*?<\/entry>/g) || [];
  for (const entry of entries) {
    const id = firstMatch(/<yt:videoId>([^<]+)<\/yt:videoId>/g, entry);
    if (!id) continue;
    const title = stripCdata(firstMatch(/<title>([\s\S]*?)<\/title>/g, entry));
    const description = stripCdata(
      firstMatch(/<media:description>([\s\S]*?)<\/media:description>/g, entry) || ''
    );
    const published = firstMatch(/<published>([^<]+)<\/published>/g, entry);
    const author = stripCdata(
      firstMatch(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/g, entry) || ''
    );
    videos.push({
      id,
      title,
      description,
      author,
      publishedAt: published,
      url: `https://www.youtube.com/watch?v=${id}`,
      // hqdefault (480×360) always exists; maxresdefault can 404 for some videos
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      thumbnailHigh: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    });
  }
  return videos;
}

export async function GET() {
  try {
    const channelId = await resolveChannelId(CHANNEL_HANDLE);
    const xml = await fetchFeed(channelId);
    const videos = parseFeed(xml);
    return Response.json(
      { channelId, videos },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err) {
    return Response.json(
      { videos: [], error: err?.message || 'failed to fetch youtube feed' },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60' } }
    );
  }
}
