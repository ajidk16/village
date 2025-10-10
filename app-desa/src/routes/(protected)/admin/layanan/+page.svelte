<script lang="ts">
	import Badge from '$lib/components/shared/badge/badge.svelte';
	import Button from '$lib/components/shared/button/button.svelte';
	import Card from '$lib/components/shared/card/card.svelte';
	import AksiCell from '$lib/components/shared/data-table/aksi-cell.svelte';
	import DataTable, {
		type AnySvelteComponent,
		type Column
	} from '$lib/components/shared/data-table/data-table.svelte';
	import Drawer from '$lib/components/shared/drawer/Drawer.svelte';
	import type { Field } from '$lib/components/shared/input-generator/input-generator.svelte';
	import InputGenerator from '$lib/components/shared/input-generator/input-generator.svelte';
	import Modal from '$lib/components/shared/modal/modal.svelte';

	type Row = {
		id: string;
		pemohon: string;
		jenis: 'surat-domisili' | 'surat-usaha' | 'ktm' | string;
		tanggal: string; // YYYY-MM-DD
		status: 'menunggu' | 'diproses' | 'selesai' | 'ditolak' | string;
		catatan?: string;
	};

	// @ts-ignore
	function formatDate(d: string) {
		const x = new Date(d);
		return x.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
	}

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

	const fieldInput: Field[] = [
		{
			name: 'pemohon',
			label: 'Pemohon',
			required: true,
			placeholder: 'Nama pemohon',
			colspan: 2
		},
		{
			name: 'jenis',
			label: 'Jenis',
			type: 'select',
			required: true,
			options: [
				{ value: 'surat-domisili', label: 'Surat Domisili' },
				{ value: 'surat-usaha', label: 'Surat Usaha' },
				{ value: 'ktm', label: 'Keterangan Tidak Mampu' }
			],
			colspan: 2
		},
		{ name: 'tanggal', label: 'Tanggal', type: 'date', required: true },
		{
			name: 'status',
			label: 'Status',
			type: 'select',
			options: [
				{ value: 'menunggu', label: 'Menunggu' },
				{ value: 'diproses', label: 'Diproses' },
				{ value: 'selesai', label: 'Selesai' },
				{ value: 'ditolak', label: 'Ditolak' }
			]
		},
		{
			name: 'catatan',
			label: 'Catatan',
			type: 'textarea',
			placeholder: 'Catatan tambahan',
			colspan: 2
		}
	];
</script>

<main>
	<!-- Toolbar -->

	<Card className="mb-6">
		<div class="flex flex-col items-start justify-start gap-4 lg:flex-row lg:justify-between">
			<div class="flex flex-wrap items-center gap-2">
				{#each buttonLeft as item}
					<Button variant={item.variant} onClick={item.onClick}>{item.title}</Button>
				{/each}
			</div>
			<div class="flex flex-wrap items-center gap-2">
				<InputGenerator
					columns={3}
					fields={filterConfig}
					bind:data={filter}
					onChange={handleUpdate}
				/>
			</div>
		</div>
		{#if selected.length > 0}
			<div
				class="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-start lg:justify-end"
			>
				<div class="flex flex-wrap gap-2">
					<Button rounded="xl" size="sm" variant="outline">Proses</Button>
					<Button rounded="xl" size="sm" variant="outline">Selesai</Button>
					<Button rounded="xl" size="sm" variant="danger">Hapus</Button>
				</div>
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
	<Drawer isOpen={showDrawer} onClose={() => (showDrawer = false)} title="Detail Layanan">
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
					<Badge variant="warning">{detail.status}</Badge>
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
	</Drawer>
{/if}

<!-- Modal Form -->
{#if showModal}
	<Modal
		isOpen={showModal}
		onClose={() => (showModal = false)}
		title={editId ? 'Edit Layanan' : 'Layanan Baru'}
	>
		<form class="mt-4 grid grid-cols-1 gap-3 text-sm" on:submit|preventDefault={submitForm}>
			<InputGenerator columns={2} fields={fieldInput} bind:data={form} />
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
	</Modal>
{/if}

<!-- Toast -->
{#if showToast}
	<div class="fixed top-5 right-5 z-50">
		<div class="rounded-xl bg-emerald-600 px-4 py-2 text-white shadow-soft">{toastMsg}</div>
	</div>
{/if}
