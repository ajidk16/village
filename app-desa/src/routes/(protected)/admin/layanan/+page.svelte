<script lang="ts">
	import Badge from '$lib/components/shared/badge/badge.svelte';
	import Button from '$lib/components/shared/button/button.svelte';
	import Card from '$lib/components/shared/card/card.svelte';
	import AksiCell from '$lib/components/shared/data-table/aksi-cell.svelte';
	import DataTable, {
		type AnySvelteComponent,
		type Column
	} from '$lib/components/shared/data-table/data-table.svelte';
	import type { Field } from '$lib/components/shared/input-generator/input-generator.svelte';
	import InputGenerator from '$lib/components/shared/input-generator/input-generator.svelte';

	type Row = {
		id: string;
		pemohon: string;
		jenis: 'surat-domisili' | 'surat-usaha' | 'ktm' | string;
		tanggal: string; // YYYY-MM-DD
		status: 'menunggu' | 'diproses' | 'selesai' | 'ditolak' | string;
		catatan?: string;
	};
	function cap(s: any) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
	// @ts-ignore
	function formatDate(d: string) {
		const x = new Date(d);
		return x.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
	}

	// @ts-ignore
	const statusBadge = (s) =>
		// @ts-ignore
		({
			menunggu: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
			diproses: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
			selesai: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
			ditolak: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
		})[s] || '';

	let dataLayanan: Row[] = [
		{
			id: '1',
			pemohon: 'Andi Wijaya',
			jenis: 'surat-domisili',
			tanggal: '2025-10-09',
			status: 'menunggu',
			catatan: 'Baru pindah RT 03'
		},
		{
			id: '2',
			pemohon: 'Siti Rahma',
			jenis: 'surat-usaha',
			tanggal: '2025-10-09',
			status: 'diproses',
			catatan: 'Usaha warung'
		},
		{
			id: '3',
			pemohon: 'Budi Santoso',
			jenis: 'ktm',
			tanggal: '2025-10-08',
			status: 'selesai',
			catatan: 'Lampiran lengkap'
		},
		{
			id: '4',
			pemohon: 'Rina Oktavia',
			jenis: 'surat-domisili',
			tanggal: '2025-10-07',
			status: 'menunggu',
			catatan: ''
		},
		{
			id: '5',
			pemohon: 'Dodi Maulana',
			jenis: 'surat-usaha',
			tanggal: '2025-10-06',
			status: 'ditolak',
			catatan: 'Data tidak valid'
		},
		{
			id: '6',
			pemohon: 'Fajar Hidayat',
			jenis: 'ktm',
			tanggal: '2025-10-06',
			status: 'diproses',
			catatan: 'Verifikasi RT'
		},
		{
			id: '7',
			pemohon: 'Lestari Putri',
			jenis: 'surat-usaha',
			tanggal: '2025-10-05',
			status: 'selesai',
			catatan: ''
		},
		{
			id: '8',
			pemohon: 'Rahmat',
			jenis: 'surat-domisili',
			tanggal: '2025-10-04',
			status: 'menunggu',
			catatan: ''
		},
		{
			id: '9',
			pemohon: 'Nina',
			jenis: 'ktm',
			tanggal: '2025-10-03',
			status: 'diproses',
			catatan: ''
		},
		{
			id: '10',
			pemohon: 'Bagas',
			jenis: 'surat-usaha',
			tanggal: '2025-10-02',
			status: 'selesai',
			catatan: ''
		},
		{
			id: '11',
			pemohon: 'Tari',
			jenis: 'surat-domisili',
			tanggal: '2025-10-02',
			status: 'menunggu',
			catatan: ''
		}
	];

	let showDrawer = false;
	let detail: any = null;
	function openDetail(id: string) {
		detail = dataLayanan.find((x) => x.id === id) ?? null;
		showDrawer = !!detail;
	}

	// MODAL FORM (CREATE/EDIT)
	let showModal = false;
	let editId: string | null = null;
	let form: Row = {
		id: '',
		pemohon: '',
		jenis: 'surat-domisili',
		tanggal: new Date().toISOString().slice(0, 10),
		status: 'menunggu',
		catatan: ''
	};
	function newRow() {
		editId = null;
		form = {
			id: '',
			pemohon: '',
			jenis: 'surat-domisili',
			tanggal: new Date().toISOString().slice(0, 10),
			status: 'menunggu',
			catatan: ''
		};
		showModal = true;
	}
	function openEdit(id: string) {
		const r = dataLayanan.find((x) => x.id === id);
		if (!r) return;
		editId = id;
		form = { ...r };
		showModal = true;
	}
	function submitForm() {
		if (!form.pemohon || !form.jenis || !form.tanggal) return;
		if (editId) {
			dataLayanan = dataLayanan.map((x) => (x.id === editId ? { ...x, ...form, id: editId } : x));
		} else {
			const nextNum = Math.max(...dataLayanan.map((d) => Number(d.id.split('-')[1] || 0))) + 1;
			const nid = `A-${nextNum}`;
			dataLayanan = [{ ...form, id: nid, catatan: form.catatan || '' }, ...dataLayanan];
		}
		showModal = false;
		toast('Tersimpan!');
	}
	function deleteRow(id: string) {
		dataLayanan = dataLayanan.filter((x) => x.id !== id);
		toast('Dihapus 1 data');
		showDrawer = false;
	}

	// TOAST
	let toastMsg = '';
	let showToast = false;
	let toastTimer: any;
	function toast(msg: string) {
		toastMsg = msg;
		showToast = true;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (showToast = false), 1500);
	}

	function toCsv(rows: (string | number)[][]) {
		return rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n');
	}

	function exportCsv() {
		const rows = [
			['id', 'pemohon', 'jenis', 'tanggal', 'status', 'catatan'],
			...dataLayanan.map((r) => [r.id, r.pemohon, r.jenis, r.tanggal, r.status, r.catatan ?? ''])
		];
		const blob = new Blob([toCsv(rows)], { type: 'text/csv' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'layanan.csv';
		a.click();
	}

	// --- DATATABLE ---

	const columns: Column<Row>[] = [
		{ key: 'id', header: 'No', sortable: true },
		{ key: 'pemohon', header: 'Pemohon', sortable: true },
		{ key: 'jenis', header: 'Jenis', sortable: true },
		{ key: 'tanggal', header: 'Tanggal', sortable: true, align: 'center' },
		{ key: 'status', header: 'Status', sortable: true },
		{
			key: 'aksi',
			header: 'Aksi',
			component: AksiCell as unknown as AnySvelteComponent,
			componentProps: (row) => ({
				onEdit: () => openEdit(row.id),
				// onDelete: () => openEdit(row.id),
				onPreview: () => openDetail(row.id)
			})
		}
	];

	function onSort(e: CustomEvent) {
		const { sortBy, sortDir } = e.detail; // lakukan fetch ke server jika serverMode=true
		console.log('sort:', sortBy, sortDir);
	}
	function onPage(e: CustomEvent) {
		const { page, pageSize } = e.detail; // lakukan fetch ke server jika serverMode=true
		console.log('page:', page, pageSize);
	}

	let selected: number[] = [];
	function onSelect(e: CustomEvent) {
		selected = Array.isArray(e.detail.ids) ? e.detail.ids.map(Number) : [Number(e.detail.ids)];
		console.log('selected ids:', selected);
	}

	// --- FILTERS ---
	let filter = {};
	const filterConfig: Field[] = [
		{
			name: 'dusun',
			type: 'select',
			placeholder: 'Semua Status',
			options: [
				{ value: 'menunggu', label: 'Menunggu' },
				{ value: 'diproses', label: 'Diproses' },
				{ value: 'selesai', label: 'Selesai' },
				{ value: 'ditolak', label: 'Ditolak' }
			]
		},
		{
			name: 'rt',
			type: 'select',
			placeholder: 'Semua Jenis',
			options: [
				{ value: 'surat-domisili', label: 'Surat Domisili' },
				{ value: 'surat-usaha', label: 'Surat Usaha' },
				{ value: 'ktm', label: 'Keterangan Tidak Mampu' }
			]
		},
		{
			name: 'date',
			type: 'date'
		}
	];

	const handleUpdate = (updated: Record<string, string | number>) => {
		filter = updated;
	};

	const buttonLeft = [
		{
			title: 'Layanan Baru',
			variant: 'primary',
			onClick: () => newRow()
		},
		{
			title: 'Import CSV',
			variant: 'outline',
			onClick: () => {}
		},
		{
			title: 'Export CSV',
			variant: 'outline',
			onClick: () => exportCsv()
		}
	];
</script>

<main>
	<!-- Toolbar -->

	<Card className="mb-6">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				{#each buttonLeft as item}
					<Button variant={item.variant} onClick={item.onClick}>{item.title}</Button>
				{/each}
			</div>
			<div class="flex gap-2">
				<InputGenerator fields={filterConfig} bind:data={filter} onChange={handleUpdate} />
			</div>
		</div>
		{#if selected.length > 0}
			<div class="flex flex-col items-start justify-end mt-4 gap-2 md:flex-row md:items-center">
				<Button rounded="xl" size="sm" variant="outline">Proses</Button>
				<Button rounded="xl" size="sm" variant="outline">Selesai</Button>
				<Button rounded="xl" size="sm" variant="danger">Hapus</Button>
			</div>
		{/if}
	</Card>

	<!-- Table & Bulk -->
	<DataTable
		{columns}
		data={dataLayanan}
		selectable
		searchable
		stickyHeader
		pageSizeOptions={[5, 10, 25]}
		on:sort={onSort}
		on:page={onPage}
		on:select={onSelect}
	/>
</main>

<!-- Drawer Detail -->
{#if showDrawer && detail}
	<div class="fixed inset-0 z-50">
		<aside
			class="absolute top-0 right-0 bottom-0 w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="flex items-center justify-between">
				<h3 class="font-semibold">Detail Layanan</h3>
				<button
					class="h-8 w-8 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-800"
					on:click={() => (showDrawer = false)}>✕</button
				>
			</div>
			<div class="mt-4 space-y-3 text-sm">
				<div class="grid grid-cols-3 gap-2">
					<div class="text-slate-500">ID</div>
					<div class="col-span-2 font-medium">{detail.id}</div>
					<div class="text-slate-500">Pemohon</div>
					<div class="col-span-2">{detail.pemohon}</div>
					<div class="text-slate-500">Jenis</div>
					<div class="col-span-2">{detail.jenis}</div>
					<div class="text-slate-500">Tanggal</div>
					<div class="col-span-2">{formatDate(detail.tanggal)}</div>
					<div class="text-slate-500">Status</div>
					<div class="col-span-2">
						<span class={`rounded-full px-2 py-0.5 text-xs ${statusBadge(detail.status)}`}
							>{cap(detail.status)}</span
						>
					</div>
					<div class="text-slate-500">Catatan</div>
					<div class="col-span-2">{detail.catatan || '-'}</div>
				</div>
				<div class="mt-4 flex gap-2">
					<button
						class="rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-800"
						on:click={() => openEdit(detail.id)}>Edit</button
					>
					<button
						class="rounded-lg border border-rose-300 px-3 py-1.5 text-rose-600"
						on:click={() => deleteRow(detail.id)}>Hapus</button
					>
				</div>
			</div>
		</aside>
	</div>
{/if}

<!-- Modal Form -->
{#if showModal}
	<div class="fixed inset-0 z-50">
		<div class="absolute inset-0 bg-black/30" on:click={() => (showModal = false)} />
		<div
			class="relative mx-auto mt-24 max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="flex items-center justify-between">
				<h3 class="font-semibold">{editId ? 'Edit Layanan' : 'Layanan Baru'}</h3>
				<button
					class="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-800"
					on:click={() => (showModal = false)}>✕</button
				>
			</div>
			<form class="mt-4 grid grid-cols-1 gap-3 text-sm" on:submit|preventDefault={submitForm}>
				<div>
					<label class="mb-1 block">Pemohon</label>
					<input
						bind:value={form.pemohon}
						required
						class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
						placeholder="Nama pemohon"
					/>
				</div>
				<div class="grid gap-3 sm:grid-cols-2">
					<div>
						<label class="mb-1 block">Jenis</label>
						<select
							bind:value={form.jenis}
							required
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
						>
							<option value="surat-domisili">Surat Domisili</option>
							<option value="surat-usaha">Surat Usaha</option>
							<option value="ktm">Keterangan Tidak Mampu</option>
						</select>
					</div>
					<div>
						<label class="mb-1 block">Tanggal</label>
						<input
							type="date"
							bind:value={form.tanggal}
							required
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
						/>
					</div>
				</div>
				<div>
					<label class="mb-1 block">Status</label>
					<select
						bind:value={form.status}
						class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
					>
						<option value="menunggu">Menunggu</option>
						<option value="diproses">Diproses</option>
						<option value="selesai">Selesai</option>
						<option value="ditolak">Ditolak</option>
					</select>
				</div>
				<div>
					<label class="mb-1 block">Catatan</label>
					<textarea
						rows="3"
						bind:value={form.catatan}
						class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
						placeholder="Catatan tambahan"
					></textarea>
				</div>
				<div class="mt-2 flex items-center justify-end gap-2">
					<button
						type="button"
						on:click={() => (showModal = false)}
						class="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-800">Batal</button
					>
					<button
						type="submit"
						class="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Simpan</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Toast -->
{#if showToast}
	<div class="fixed top-5 right-5 z-50">
		<div class="rounded-xl bg-emerald-600 px-4 py-2 text-white shadow-soft">{toastMsg}</div>
	</div>
{/if}
