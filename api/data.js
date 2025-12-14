// Serverless endpoint to proxy JSON data from jsonbin.io (secret kept server-side)
// Expects two environment variables to be set in the deployment:
// - JSONBIN_URL: full jsonbin.io endpoint (e.g. https://api.jsonbin.io/v3/b/<BIN_ID>/latest)
// - JSONBIN_KEY: your JSONBin secret key (do NOT commit this)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = process.env.JSONBIN_URL;
  const key = process.env.JSONBIN_KEY;

  if (!url || !key) {
    return res.status(500).json({ error: 'JSONBin configuration missing' });
  }

  try {
    const r = await fetch(url, {
      headers: {
        'X-Master-Key': key,
        'Accept': 'application/json'
      }
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(502).json({ error: 'Upstream error', details: text });
    }

    const data = await r.json();

    // JSONBin v3 wraps data in a 'record' field, try to return the raw record when present
    const payload = data && data.record ? data.record : data;

    // Cache for a short while on CDN
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(payload);
  } catch (err) {
    console.error('Error fetching JSONBin:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
