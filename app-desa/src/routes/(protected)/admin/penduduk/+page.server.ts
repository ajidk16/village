/* eslint-disable prefer-const */
import type { PageServerLoad } from './$types';
import { api } from '$lib/api';
import { fail, redirect, type Actions } from '@sveltejs/kit';

type Resident = {
	id: number;
	household_id?: number | null;
	nik: string;
	nama: string;
	jk?: 'M' | 'F' | string | null;
	tempat_lahir: string;
	tgl_lahir: string;
	status: string;
	agama?: string | null;
	pendidikan?: string | null;
	pekerjaan?: string | null;
	alamat_domisili?: string | null;
	updated_at?: string | null;
};

type ResidentsResponse =
	| { items: Resident[]; page: number; limit: number; total: number }
	| Resident[];

export const load: PageServerLoad = async ({ url, fetch }) => {
	// forward semua query apa adanya
	const qs = url.searchParams.toString();
	const path = `/residents${qs ? `?${qs}` : ''}`;

	let page = Number(url.searchParams.get('page') || 1);
	let limit = Number(url.searchParams.get('limit') || 10);

	try {
		const res = (await api(path, { fetchImpl: fetch })) as ResidentsResponse;

		if (Array.isArray(res)) {
			return {
				items: res,
				page,
				limit,
				total: res.length
			};
		} else {
			return {
				items: res.items,
				page: res.page ?? page,
				limit: res.limit ?? limit,
				total: res.total ?? res.items.length
			};
		}
	} catch (err) {
		console.log('gagal fetch residents', err);
		return { items: [] as Resident[], page, limit, total: 0 };
	}
};

export const actions: Actions = {
	delete: async ({ request, url }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			await api(`/residents/${id}`, { method: 'DELETE' });
			const qs = new URLSearchParams(url.searchParams);
			qs.set('toast', 'deleted');
			throw redirect(303, `/(protected)/residents?${qs.toString()}`);
		} catch {
			return fail(400, { error: 'Gagal menghapus' });
		}
	},
	'delete-many': async ({ request, locals, url }) => {
		if (locals.user?.role !== 'admin')
			return fail(403, { error: 'Hanya admin yang bisa menghapus' });

		const form = await request.formData();
		const ids = form
			.getAll('ids')
			.map((v) => Number(String(v)))
			.filter((n) => Number.isFinite(n));

		if (ids.length === 0) return fail(400, { error: 'Tidak ada data dipilih' });

		let okCount = 0;
		for (const id of ids) {
			const res = await api(`/residents/${id}`, { method: 'DELETE' });
			if (res.ok) okCount++;
		}

		if (okCount === 0) return fail(400, { error: 'Semua penghapusan gagal' });

		const qs = new URLSearchParams(url.searchParams);
		qs.set('toast', `deleted-${okCount}`);
		throw redirect(303, `/(protected)/residents?${qs.toString()}`);
	}
};
