import type { RequestHandler } from './$types';
import { api } from '$lib/api';
import { PUBLIC_JWT_COOKIE_NAME } from '$env/static/public';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = await request.json();

	// panggil API login ke backend
	const data = await api('/auth/login', {
		method: 'POST',
		body: { email, password }
	});

    console.log('data login', data);
    return

	// asumsikan backend balikin { token, user }

	const token = data.token as string;

	cookies.set(PUBLIC_JWT_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		secure: true, // true kalau pakai https
		maxAge: 60 * 60 * 1 // 1 jam
	});

	return new Response(JSON.stringify({ ok: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
