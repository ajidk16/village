import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { get } from 'svelte/store';
import { session } from './stores/session';

export class HttpError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

type Options = {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: unknown;
	fetchImpl?: typeof fetch; // untuk load() browser
};

export async function api(path: string, opts: Options = {}) {
	const { method = 'GET', body, fetchImpl } = opts;
	const ambil = get(session);
	console.log('ambil token', ambil);

	const f = fetchImpl ?? fetch;

	const res = await f(`${PUBLIC_BACKEND_URL}${path}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(ambil ? { Authorization: `Bearer ${ambil?.token}` } : {})
		},
		body: body ? JSON.stringify(body) : undefined
	});

	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new HttpError(res.status, text || `Request failed: ${res.status}`);
	}
	const ct = res.headers.get('content-type');
	if (ct?.includes('application/json')) return res.json();
	return res.text();
}
