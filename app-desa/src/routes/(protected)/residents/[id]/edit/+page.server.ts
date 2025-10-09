import type { Actions, PageServerLoad } from './$types';
import { api, HttpError } from '$lib/api';
import { fail, error, redirect } from '@sveltejs/kit';
import { residentInput } from '$lib/schemas/resident';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		const item = await api(`/residents/${params.id}`, { token: locals.token });

		if (item?.tgl_lahir) {
			const d = new Date(item.tgl_lahir);
			if (!Number.isNaN(d.getTime())) {
				item.tgl_lahir = d.toISOString().slice(0, 10);
			}
		}

		return { values: item };
	} catch {
		throw error(404, 'Data tidak ditemukan');
	}
};

function formToObj(form: FormData) {
	const obj: Record<string, unknown> = {};
	for (const [k, v] of form.entries()) obj[k] = typeof v === 'string' ? v.trim() : v;
	return obj;
}

export const actions: Actions = {
	default: async ({ request, locals, params, url }) => {
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
			await api(`/residents/${params.id}`, {
				method: 'PUT',
				body: parsed.data,
				token: locals.token
			});
		} catch (err: unknown) {
			if (err instanceof HttpError && err.status === 500) {
				return fail(500, { errors: { nik: 'NIK sudah terdaftar' }, values: raw });
			}
			return fail(400, { errors: { form: 'Gagal memperbarui. Coba lagi.' }, values: raw });
		}

		const qs = new URLSearchParams(url.searchParams);
		qs.set('toast', 'updated');
		throw redirect(303, `/residents?${qs.toString()}`);
	}
};
