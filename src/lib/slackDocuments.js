// ---------------------------------------------------------------------------
// SLACK DELIVERY FOR CANDIDATE DOCUMENT SUBMISSIONS
// ---------------------------------------------------------------------------
//
// One submission becomes exactly one Slack message in #operation-axelis-blr,
// with every uploaded file attached to that same message and Naveen tagged on
// it. Not a message plus separate file posts: an ops person seeing "3 files"
// scattered across a channel cannot tell which candidate they belong to.
//
// That constraint is what dictates the API used. files.completeUploadExternal
// accepts an array of file ids together with a channel and an initial comment,
// and posts them as a single message. The older files.upload cannot do this
// and is deprecated, so it is not used.
//
// The flow per file is three calls:
//   1. files.getUploadURLExternal  -> a one-time upload URL and a file id
//   2. POST the bytes to that URL  -> no auth header, the URL carries it
//   3. files.completeUploadExternal with ALL ids at once, plus channel and
//      initial_comment -> the single message
//
// The bot must be a member of the channel. It is private, so it has to be
// invited; posting will fail with not_in_channel otherwise, and that error is
// surfaced rather than swallowed.
// ---------------------------------------------------------------------------

const SLACK_API = 'https://slack.com/api';

export function slackConfig() {
  return {
    token: process.env.SLACK_BOT_TOKEN || '',
    channel: process.env.SLACK_OPS_CHANNEL_ID || '',
    naveen: process.env.SLACK_NAVEEN_USER_ID || '',
  };
}

export function slackReady() {
  const c = slackConfig();
  return Boolean(c.token && c.channel);
}

async function slackGet(method, token, params) {
  const url = `${SLACK_API}/${method}?${new URLSearchParams(params)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}

async function slackPost(method, token, body) {
  const res = await fetch(`${SLACK_API}/${method}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * Uploads one file and returns its Slack file id. Does not post it anywhere:
 * posting happens once, for all files together, in postSubmission.
 */
async function uploadOne(token, file) {
  const bytes = Buffer.from(await file.arrayBuffer());

  const reserve = await slackGet('files.getUploadURLExternal', token, {
    filename: file.name,
    length: String(bytes.length),
  });
  if (!reserve.ok) throw new Error(`getUploadURL: ${reserve.error}`);

  const put = await fetch(reserve.upload_url, { method: 'POST', body: bytes });
  if (!put.ok) throw new Error(`upload: HTTP ${put.status}`);

  return { id: reserve.file_id, title: file.name };
}

const INR = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

/** The message body. Kept scannable: an ops person reads this on a phone. */
function buildComment({ serviceName, candidate, payment, files, naveen }) {
  const tag = naveen ? `<@${naveen}>` : '@Naveen';
  const lines = [
    `${tag} — new document submission`,
    '',
    `*Service:* ${serviceName}`,
    `*Candidate:* ${candidate.name}`,
    `*Phone:* ${candidate.phone}`,
    `*Email:* ${candidate.email}`,
  ];

  if (payment.reference) lines.push(`*Payment reference:* \`${payment.reference}\``);
  lines.push(`*Payment status:* ${payment.paid ? 'Paid' : 'NOT YET PAID — confirm before starting work'}`);
  if (payment.amount) lines.push(`*Amount quoted:* ${INR(payment.amount)}`);
  if (payment.documentCount) lines.push(`*Documents billed:* ${payment.documentCount}`);

  lines.push('', `*Files attached:* ${files.length}`);
  files.forEach((f, i) => lines.push(`  ${i + 1}. ${f.title}`));

  if (candidate.notes) lines.push('', `*Candidate notes:* ${candidate.notes}`);

  lines.push(
    '',
    `_Submitted ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST via ${candidate.source}_`,
  );
  return lines.join('\n');
}

/**
 * Uploads every file and posts one message carrying all of them.
 * Throws on any Slack error, so the caller can tell the candidate honestly
 * rather than showing a success screen for a submission that never landed.
 */
export async function postSubmission({ serviceName, candidate, payment, files }) {
  const { token, channel, naveen } = slackConfig();
  if (!token || !channel) throw new Error('slack_unconfigured');

  const uploaded = [];
  for (const file of files) {
    uploaded.push(await uploadOne(token, file));
  }

  const complete = await slackPost('files.completeUploadExternal', token, {
    files: uploaded,
    channel_id: channel,
    initial_comment: buildComment({ serviceName, candidate, payment, files: uploaded, naveen }),
  });

  if (!complete.ok) throw new Error(`completeUpload: ${complete.error}`);
  return { fileCount: uploaded.length };
}
