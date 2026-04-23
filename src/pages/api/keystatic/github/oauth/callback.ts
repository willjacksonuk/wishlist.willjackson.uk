export const prerender = false;

// Custom callback that accepts GitHub OAuth tokens with or without expiry.
// Keystatic's built-in callback requires expires_in/refresh_token fields that
// only appear when "Expire user authorization tokens" is enabled on the OAuth App.
export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  if (errorDescription) {
    return new Response(`GitHub authorization error: ${errorDescription}`, { status: 400 });
  }
  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response('Missing GitHub credentials', { status: 500 });
  }

  const tokenUrl = new URL('https://github.com/login/oauth/access_token');
  tokenUrl.searchParams.set('client_id', clientId);
  tokenUrl.searchParams.set('client_secret', clientSecret);
  tokenUrl.searchParams.set('code', code);

  const tokenRes = await fetch(tokenUrl, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });

  if (!tokenRes.ok) {
    return new Response('Authorization failed: token exchange error', { status: 401 });
  }

  const tokenData = await tokenRes.json() as Record<string, unknown>;

  if (tokenData.error || !tokenData.access_token) {
    return new Response(`Authorization failed: ${tokenData.error_description ?? tokenData.error ?? 'no access token'}`, { status: 401 });
  }

  const accessToken = tokenData.access_token as string;

  // Keystatic reads keystatic-gh-access-token via document.cookie — must NOT be HttpOnly
  const cookieAttributes = [
    `keystatic-gh-access-token=${accessToken}`,
    'Path=/',
    'SameSite=Lax',
    // No Max-Age → session cookie; token is valid until revoked by GitHub
  ].join('; ');

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/keystatic',
      'Set-Cookie': cookieAttributes,
    },
  });
}
