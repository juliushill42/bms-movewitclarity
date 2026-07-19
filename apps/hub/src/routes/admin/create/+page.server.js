import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const password = data.get('password');
    const subdomain = data.get('subdomain')?.toString().toLowerCase().trim();
    const company = data.get('company');
    const name = data.get('name');

    if (password !== 'Clarity2026!') {
      return fail(403, { error: 'Invalid Administration Passphrase Check.', incorrect: true });
    }
    if (!subdomain || !company || !name) {
      return fail(400, { error: 'Validation breakdown. Essential fields missing.' });
    }

    const targetUrl = `https://${subdomain}.movingwithclarity.com`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&color=e6c687&bgcolor=030303&data=${encodeURIComponent(targetUrl)}`;

    return { success: true, company, targetUrl, qrCodeUrl };
  }
};
