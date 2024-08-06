import axios from 'axios';
import type { RequestHandler } from "./$types";
import { env } from '$env/dynamic/public';
import { json } from '@sveltejs/kit';
import { setAuthCookies, type SignInResponse } from '@emitra-labs/auth-kit'

export const POST: RequestHandler = async ({ cookies, request, url }) => {
  const data: { email: string, password: string } = await request.json();

  let signInResponse: SignInResponse | undefined = undefined;
  
  try {
    const res = await axios.post(env.PUBLIC_API_URL + '/identity/auth/sign-in', data);
    signInResponse = res.data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      return json({ error: err.response.data.error }, { status: err.response.status });
    } else {
      return json({ error: err.message }, { status: 500 });
    }
  }

  if (!signInResponse) {
    return json({ error: 'Unknown error' }, { status: 500 });
  }

  setAuthCookies({ cookies, url, ...signInResponse });

  return json({ success: true });
}
