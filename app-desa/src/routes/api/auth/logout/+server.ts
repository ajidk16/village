import { PUBLIC_JWT_COOKIE_NAME } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { session } from '$lib/stores/session';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete(PUBLIC_JWT_COOKIE_NAME, { path: '/' });
	session.clear();
	return redirect(302, '/auth/login');
};
