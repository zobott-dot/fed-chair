/**
 * Cloudflare Worker: FRED API Proxy with Calendar Route
 *
 * Deploy this to your fred-proxy.dave-zobott.workers.dev worker.
 *
 * This worker:
 * 1. Proxies /fred/* requests to api.stlouisfed.org/fred/* (existing behavior)
 * 2. Adds a /calendar route that fetches upcoming FRED release dates (Phase 7.8)
 * 3. Handles CORS headers for browser access
 * 4. Caches calendar responses for 12 hours
 */

const FRED_BASE = 'https://api.stlouisfed.org';
const FRED_API_KEY = '5f1dfeb40783eefa1e7d0d4e3e602597';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // --- /calendar route (Phase 7.8) ---
    if (url.pathname === '/calendar') {
      return handleCalendar(request, url, ctx);
    }

    // --- Existing /fred/* proxy ---
    if (url.pathname.startsWith('/fred/')) {
      return handleFredProxy(request, url);
    }

    return new Response('Not Found', { status: 404 });
  }
};

async function handleCalendar(request, url, ctx) {
  // Check cache first
  const cache = caches.default;
  const cacheKey = new Request(url.toString(), request);
  let response = await cache.match(cacheKey);

  if (response) {
    return response;
  }

  try {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 45);

    const todayStr = today.toISOString().split('T')[0];
    const futureStr = future.toISOString().split('T')[0];

    const fredUrl = `${FRED_BASE}/fred/releases/dates`
      + `?api_key=${FRED_API_KEY}`
      + `&file_type=json`
      + `&realtime_start=${todayStr}`
      + `&realtime_end=${futureStr}`
      + `&include_release_dates_with_no_data=true`
      + `&sort_order=asc`
      + `&limit=1000`;

    const fredResponse = await fetch(fredUrl);

    if (!fredResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'calendar_unavailable' }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
        }
      );
    }

    const data = await fredResponse.json();

    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=43200', // 12 hours
        ...CORS_HEADERS
      }
    });

    // Store in cache
    ctx.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'calendar_unavailable' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      }
    );
  }
}

async function handleFredProxy(request, url) {
  // Proxy to FRED API, preserving path and query string
  const fredUrl = `${FRED_BASE}${url.pathname}${url.search}`;

  try {
    const fredResponse = await fetch(fredUrl);
    const data = await fredResponse.text();

    return new Response(data, {
      status: fredResponse.status,
      headers: {
        'Content-Type': fredResponse.headers.get('Content-Type') || 'application/json',
        ...CORS_HEADERS
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'proxy_error' }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      }
    );
  }
}
