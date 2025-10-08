<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { toast } from '$lib/stores/toast.js';

	export let data;

	const agama = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];
	const limit = [10, 25, 50, 100];

	const u = new URL($page.url);
	const s = u.searchParams;

	const currentParams = {
		q: s.get('q'),
		jk: s.get('jk'),
		agama: s.get('agama'),
		limit: s.get('limit'),
		sort: s.get('sort'),
		order: s.get('order'),
		page: s.get('page')
	};

	function buildQuery(next: Record<string, string | number | undefined | null>) {
		if (!browser) return '';

		for (const [k, v] of Object.entries(next)) {
			if (v === undefined || v === null) {
				(currentParams as any)[k] = '';
			} else {
				(currentParams as any)[k] = String(v);
			}
		}

		if (
			'q' in next ||
			'sort' in next ||
			'order' in next ||
			'limit' in next ||
			'jk' in next ||
			'agama' in next
		) {
			currentParams.page = '1';
		}

		s.forEach((_, key) => s.delete(key));

		for (const [k, v] of Object.entries(currentParams)) {
			if (v !== null) {
				s.set(k, v);
			}
		}

		return u.toString();
	}

	// toggle sort saat header diklik
	function sortBy(col: string) {
		if (!browser) return;
		const params = new URLSearchParams($page.url.search);
		const current = params.get('sort');
		const order = params.get('order') ?? 'asc';
		const nextOrder = current === col ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
		location.href = buildQuery({ sort: col, order: nextOrder });
	}

	const params = new URLSearchParams($page.url.search);
	const q0 = params.get('q') ?? '';
	const sort0 = params.get('sort') ?? '';
	const order0 = params.get('order') ?? 'asc';
	const limit0 = Number(params.get('limit') ?? '10');
	const fJk0 = params.get('jk') ?? '';
	const fAgama0 = params.get('agama') ?? '';

	onMount(() => {
		const p = new URLSearchParams(location.search);
		const t = p.get('toast');
		if (t === 'deleted') toast.success('Data berhasil dihapus');
		if (t === 'saved') toast.success('Data berhasil disimpan');
		if (t === 'updated') toast.success('Data berhasil diperbarui');
	});

	function confirmDelete(e: Event, nama: string) {
		if (!confirm(`Hapus data penduduk "${nama}"? Tindakan ini tidak dapat dibatalkan.`)) {
			e.preventDefault();
		}
	}
</script>

<h1 class="mb-4 text-2xl font-semibold">Residents</h1>
<div class="mb-3">
	<a
		href="/residents/new"
		class="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
	>
		+ Tambah Penduduk
	</a>
</div>

<!-- Toolbar: Search + Filters + Page size -->
<form method="GET" class="mb-4 grid gap-3 rounded-xl bg-white p-4 shadow md:grid-cols-6">
	<div class="md:col-span-2">
		<label for="search" class="mb-1 block text-sm">Cari (nama/NIK/alamat)</label>
		<input
			name="q"
			type="search"
			class="w-full rounded border-gray-300"
			placeholder="ketik lalu Enter"
			value={q0}
		/>
	</div>

	<div>
		<label for="jk" class="mb-1 block text-sm">JK</label>
		<select name="jk" class="w-full rounded border-gray-300">
			<option value="" selected={fJk0 === ''}>Semua</option>
			<option value="M" selected={fJk0 === 'M'}>Laki-laki (M)</option>
			<option value="F" selected={fJk0 === 'F'}>Perempuan (F)</option>
		</select>
	</div>

	<div>
		<label for="agama" class="mb-1 block text-sm">Agama</label>
		<select name="agama" class="w-full rounded border-gray-300">
			<option value="" selected={fAgama0 === ''}>Semua</option>
			{#each agama as a}
				<option value={a} selected={fAgama0 === a}>{a}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="limit" class="mb-1 block text-sm">Tampilan / halaman</label>
		<select name="limit" class="w-full rounded border-gray-300">
			{#each limit as l}
				<option value={l} selected={limit0 === l}>{l}</option>
			{/each}
		</select>
	</div>

	<div class="self-end">
		<button class="rounded-lg bg-black px-4 py-2 text-white">Terapkan</button>
	</div>

	<!-- keep existing sort/order in the form -->
	<input type="hidden" name="sort" value={sort0} />
	<input type="hidden" name="order" value={order0} />
</form>

<!-- Tabel -->
<div class="overflow-x-auto rounded-xl bg-white shadow">
	<table class="min-w-full text-sm">
		<thead class="bg-gray-50 text-gray-700">
			<tr>
				<th class="px-3 py-2 text-left">#</th>
				<th class="cursor-pointer px-3 py-2 text-left" on:click={() => sortBy('nik')}>
					NIK {sort0 === 'nik' ? (order0 === 'asc' ? '↑' : '↓') : ''}
				</th>
				<th class="cursor-pointer px-3 py-2 text-left" on:click={() => sortBy('nama')}>
					Nama {sort0 === 'nama' ? (order0 === 'asc' ? '↑' : '↓') : ''}
				</th>
				<th class="cursor-pointer px-3 py-2 text-left" on:click={() => sortBy('jk')}>
					JK {sort0 === 'jk' ? (order0 === 'asc' ? '↑' : '↓') : ''}
				</th>
				<th class="cursor-pointer px-3 py-2 text-left" on:click={() => sortBy('agama')}>
					Agama {sort0 === 'agama' ? (order0 === 'asc' ? '↑' : '↓') : ''}
				</th>
				<th class="cursor-pointer px-3 py-2 text-left" on:click={() => sortBy('pendidikan')}>
					Pendidikan {sort0 === 'pendidikan' ? (order0 === 'asc' ? '↑' : '↓') : ''}
				</th>
				<th class="cursor-pointer px-3 py-2 text-left" on:click={() => sortBy('pekerjaan')}>
					Pekerjaan {sort0 === 'pekerjaan' ? (order0 === 'asc' ? '↑' : '↓') : ''}
				</th>
				<th class="px-3 py-2 text-left">Alamat</th>
				<th class="px-3 py-2 text-left">Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#if data?.items?.length === 0}
				<tr>
					<td colspan="9" class="px-3 py-6 text-center text-gray-500">Tidak ada data</td>
				</tr>
			{:else}
				{#each data?.items as r, i}
					<tr class="border-t">
						<td class="px-3 py-2">{(data?.page - 1) * data?.limit + i + 1}</td>
						<td class="px-3 py-2 font-mono">{r.nik}</td>
						<td class="px-3 py-2">{r.nama}</td>
						<td class="px-3 py-2">{r.jk ?? '-'}</td>
						<td class="px-3 py-2">{r.agama ?? '-'}</td>
						<td class="px-3 py-2">{r.pendidikan ?? '-'}</td>
						<td class="px-3 py-2">{r.pekerjaan ?? '-'}</td>
						<td class="px-3 py-2">{r.alamat_domisili ?? '-'}</td>
						<td class="px-3 py-2">
							<a class="text-blue-600 hover:underline" href={`/residents/${r.id}/edit`}>Edit</a>
							<form
								method="POST"
								action="?/delete"
								class="inline"
								on:submit={(e) => confirmDelete(e, r.nama)}
							>
								<input type="hidden" name="id" value={r.id} />
								<button class="text-red-600 hover:underline">Hapus</button>
							</form>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<!-- Pagination -->
{#if data?.total > 0}
	<div class="mt-4 flex items-center justify-between text-sm">
		<div>
			Menampilkan
			<strong>{(data?.page - 1) * data?.limit + 1}</strong>
			–
			<strong>{Math.min(data?.page * data?.limit, data?.total)}</strong>
			dari <strong>{data?.total}</strong>
		</div>

		<div class="flex gap-2">
			{#if data?.page > 1}
				<a class="rounded border px-3 py-1" href={buildQuery({ page: data?.page - 1 })}
					>Sebelumnya</a
				>
			{:else}
				<span class="cursor-not-allowed rounded border px-3 py-1 opacity-50">Sebelumnya</span>
			{/if}

			{#each Array.from( { length: Math.max(1, Math.ceil(data?.total / data?.limit)) } ).slice(0, 7) as _, idx}
				{#if data?.page === idx + 1}
					<span class="rounded border bg-black px-3 py-1 text-white">{idx + 1}</span>
				{:else}
					<a class="rounded border px-3 py-1" href={buildQuery({ page: idx + 1 })}>{idx + 1}</a>
				{/if}
			{/each}

			{#if data?.page * data?.limit < data?.total}
				<a class="rounded border px-3 py-1" href={buildQuery({ page: data?.page + 1 })}
					>Berikutnya</a
				>
			{:else}
				<span class="cursor-not-allowed rounded border px-3 py-1 opacity-50">Berikutnya</span>
			{/if}
		</div>
	</div>
{/if}
