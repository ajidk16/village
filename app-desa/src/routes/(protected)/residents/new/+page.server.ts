import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { api, HttpError } from '$lib/api';
import { residentInput } from '$lib/schemas/resident';

export const load: PageServerLoad = async () => {
	return { values: {} };
};

function formToObj(form: FormData) {
	const obj: Record<string, unknown> = {};
	for (const [k, v] of form.entries()) obj[k] = typeof v === 'string' ? v.trim() : v;
	return obj;
}

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const form = await request.formData();
		const raw = formToObj(form);

		const parsed = residentInput.safeParse(raw);
		if (!parsed.success) {
			const errors: Record<string, string> = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path.join('.') || 'form';
				errors[key] = issue.message;
			}
			return fail(400, { errors, values: raw });
		}

		try {
			await api('/residents', {
				method: 'POST',
				body: parsed.data,
				token: locals.token
			});
		} catch (err) {
			console.log(err);
			if (err instanceof HttpError && err.status === 500) {
				return fail(500, { errors: { nik: 'NIK sudah terdaftar' }, values: err });
			}
			return fail(400, { errors: { form: 'Gagal memperbarui. Coba lagi.' }, values: raw });
		}

		const qs = new URLSearchParams(url.searchParams);
		qs.set('toast', 'saved');
		throw redirect(303, `/residents?${qs.toString()}`);
	}
};
