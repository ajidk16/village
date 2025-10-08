import { PUBLIC_JWT_COOKIE_NAME } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

function decodeJwtPayload(token: string) {
	try {
		const [, payload] = token.split('.');
		return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
	} catch {
		return null;
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(PUBLIC_JWT_COOKIE_NAME) ?? null;
	event.locals.token = token;

	if (token) {
		const p = decodeJwtPayload(token);
		event.locals.user = p
			? { id: p.sub ?? p.id, email: p.email, name: p.name, role: p.role }
			: null;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
