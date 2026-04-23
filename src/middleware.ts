import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Inject Cloudflare runtime env vars into process.env (no-op on Netlify)
  const env = context.locals.runtime?.env;
  if (env) {
    for (const [key, value] of Object.entries(env)) {
      if (typeof value === 'string') {
        process.env[key] = value;
      }
    }
  }

  // If GitHub redirected the OAuth code to /keystatic instead of the callback
  // route (e.g. because the OAuth App's callback URL was set to /keystatic),
  // exchange the code here and redirect back without it.
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const isKeystatic = url.pathname === '/keystatic' || url.pathname.startsWith('/keystatic/');
  const isApiRoute = url.pathname.startsWith('/api/');

  if (code && isKeystatic && !isApiRoute) {
    const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
    const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
    if (clientId && clientSecret) {
      try {
        const tokenUrl = new URL('https://github.com/login/oauth/access_token');
        tokenUrl.searchParams.set('client_id', clientId);
        tokenUrl.searchParams.set('client_secret', clientSecret);
        tokenUrl.searchParams.set('code', code);
        const tokenRes = await fetch(tokenUrl, {
          method: 'POST',
          headers: { Accept: 'application/json' },
        });
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json() as Record<string, unknown>;
          if (tokenData.access_token) {
            const token = tokenData.access_token as string;
            const cleanUrl = url.pathname;
            const headers = new Headers({ Location: cleanUrl });
            // Must NOT be HttpOnly — Keystatic reads this via document.cookie
            headers.append('Set-Cookie', `keystatic-gh-access-token=${token}; Path=/; SameSite=Lax`);
            return new Response(null, { status: 302, headers });
          }
        }
      } catch {
        // Exchange failed — let the request continue normally
      }
    }
  }

  return next();
});
