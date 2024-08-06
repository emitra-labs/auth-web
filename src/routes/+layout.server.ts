import { authenticate, type AuthenticateResponse } from '@emitra-labs/auth-kit';
import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	let auth: AuthenticateResponse | undefined = undefined;

	try {
		auth = await authenticate({ apiUrl: env.PUBLIC_API_URL, cookies, url });
	} catch (error) {
		redirect(302, '/sign-in');
	}

	redirect(302, env.PUBLIC_ACCOUNT_URL);
};
