<script lang="ts">
	import ActionCell from '$lib/components/admin/penduduk/action-cell.svelte';
	import type { AnySvelteComponent, Column } from './data-table.svelte';
	import DataTable from './data-table.svelte';

	type Row = { id: string; pemohon: string; jenis: string; tanggal: string; status: string };

	const columns: Column<Row>[] = [
		{ key: 'pemohon', header: 'Pemohon', sortable: true },
		{ key: 'jenis', header: 'Jenis', sortable: true },
		{ key: 'tanggal', header: 'Tanggal', sortable: true, align: 'center' },
		{
			key: 'status',
			header: 'Status',
			sortable: true,
			render: (r) =>
				`<span class="px-2 py-0.5 rounded-full text-xs ${
					r.status === 'menunggu'
						? 'bg-amber-100 text-amber-700'
						: r.status === 'diproses'
							? 'bg-sky-100 text-sky-700'
							: r.status === 'selesai'
								? 'bg-emerald-100 text-emerald-700'
								: 'bg-rose-100 text-rose-700'
				}">${r.status}</span>`
		},
		{
			key: 'aksi',
			header: 'Aksi',
			align: 'center',
			visible: true,
			component: ActionCell as unknown as AnySvelteComponent,
			componentProps: (row) => ({
				onEdit: () => console.log('raaawww', row),
				onDelete: () => console.log('delete', row)
			})
		}
	];

	let rows: Row[] = [
		{
			id: 'A-1',
			pemohon: 'Andi',
			jenis: 'surat-domisili',
			tanggal: '2025-10-09',
			status: 'menunggu'
		},
		{ id: 'A-2', pemohon: 'Siti', jenis: 'surat-usaha', tanggal: '2025-10-09', status: 'diproses' },
		{ id: 'A-3', pemohon: 'Budi', jenis: 'ktm', tanggal: '2025-10-08', status: 'selesai' },
		{ id: 'A-4', pemohon: 'Rina', jenis: 'ktm', tanggal: '2025-10-07', status: 'ditolak' },
		{
			id: 'A-5',
			pemohon: 'Agus',
			jenis: 'surat-domisili',
			tanggal: '2025-10-06',
			status: 'selesai'
		},
		{ id: 'A-6', pemohon: 'Dewi', jenis: 'surat-usaha', tanggal: '2025-10-05', status: 'diproses' },
		{ id: 'A-7', pemohon: 'Eka', jenis: 'ktm', tanggal: '2025-10-04', status: 'menunggu' },
		{
			id: 'A-8',
			pemohon: 'Fajar',
			jenis: 'surat-domisili',
			tanggal: '2025-10-03',
			status: 'selesai'
		},
		{ id: 'A-9', pemohon: 'Gina', jenis: 'surat-usaha', tanggal: '2025-10-02', status: 'ditolak' },
		{ id: 'A-10', pemohon: 'Hadi', jenis: 'ktm', tanggal: '2025-10-01', status: 'diproses' },
		{
			id: 'A-11',
			pemohon: 'Intan',
			jenis: 'surat-domisili',
			tanggal: '2025-09-30',
			status: 'selesai'
		},
		{ id: 'A-12', pemohon: 'Joko', jenis: 'surat-usaha', tanggal: '2025-09-29', status: 'menunggu' }
	];

	function onSort(e: CustomEvent) {
		const { sortBy, sortDir } = e.detail; // lakukan fetch ke server jika serverMode=true
		console.log('sort:', sortBy, sortDir);
	}
	function onPage(e: CustomEvent) {
		const { page, pageSize } = e.detail; // lakukan fetch ke server jika serverMode=true
		console.log('page:', page, pageSize);
	}
	function onSelect(e: CustomEvent) {
		console.log('selected ids:', e.detail.ids);
	}
</script>

<DataTable
	{columns}
	data={rows}
	selectable
	searchable
	stickyHeader
	on:sort={onSort}
	on:page={onPage}
	on:select={onSelect}
/>
