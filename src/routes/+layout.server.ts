import { authenticate, type AuthenticateResponse } from '@emitra-labs/auth-kit';
import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const publicPaths = ['/sign-in', '/sign-up'];

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	let auth: AuthenticateResponse | undefined = undefined;

	if (publicPaths.includes(url.pathname)) {
		return {};
	}

	try {
		auth = await authenticate({ apiUrl: env.PUBLIC_API_URL, cookies, url });
	} catch (error) {
		redirect(302, '/sign-in');
	}

	return { ...auth };
};
