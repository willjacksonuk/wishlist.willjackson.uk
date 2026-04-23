export const prerender = false;

// Override Keystatic's login handler to request the public_repo scope.
// Without it, the token cannot commit to the repo (GraphQL createCommitOnBranch
// requires public_repo scope).
export async function GET({ request }: { request: Request }) {
  const reqUrl = new URL(request.url);
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response('Missing KEYSTATIC_GITHUB_CLIENT_ID', { status: 500 });
  }

  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('scope', 'public_repo');
  authUrl.searchParams.set('redirect_uri', `${reqUrl.origin}/api/keystatic/github/oauth/callback`);

  return new Response(null, {
    status: 302,
    headers: { Location: authUrl.toString() },
  });
}
