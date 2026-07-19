/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const host = event.url.hostname;
  const parts = host.split('.');
  
  let subdomain = null;
  if (parts.length > 2 && parts[0] !== 'www') {
    subdomain = parts[0];
  }

  event.locals.tenant = subdomain;
  return await resolve(event);
}
