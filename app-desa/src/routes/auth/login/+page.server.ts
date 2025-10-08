import type { Actions, PageServerLoad } from './$types';
import { api } from '$lib/api';
import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_JWT_COOKIE_NAME } from '$env/static/public';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/dashboard');
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '');
		const password = String(form.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { error: 'Email dan password wajib diisi' });
		}

		const data = await api('/auth/login', {
			method: 'POST',
			body: { email, password }
		});

		const token = data.access_token as string;
		if (!token) return fail(401, { error: 'Token tidak ditemukan' });

		cookies.set(PUBLIC_JWT_COOKIE_NAME, token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: true, // set true untuk https prod
			path: '/',
			maxAge: 60 * 60 * 8
		});

		throw redirect(302, '/dashboard');
	}
};
