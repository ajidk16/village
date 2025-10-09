<script lang="ts">
	import Badge from '$lib/components/shared/badge/badge.svelte';
	import Button from '$lib/components/shared/button/button.svelte';
	import Card from '$lib/components/shared/card/card.svelte';
	import AksiCell from '$lib/components/shared/data-table/aksi-cell.svelte';
	import DataTable, {
		type AnySvelteComponent,
		type Column
	} from '$lib/components/shared/data-table/data-table.svelte';
	import InputGenerator, {
		type Field
	} from '$lib/components/shared/input-generator/input-generator.svelte';

	// --- FILTERS ---
	let filter = {};
	const filterConfig: Field[] = [
		{
			name: 'dusun',
			type: 'select',
			placeholder: 'Semua Status',
			options: [
				{ value: 'draft', label: 'Draft' },
				{ value: 'published', label: 'Published' },
				{ value: 'archived', label: 'Archived' }
			]
		},
		{
			name: 'rt',
			type: 'select',
			placeholder: 'Semua Kategori',
			options: [
				{ value: 'news', label: 'News' },
				{ value: 'event', label: 'Event' },
				{ value: 'announcement', label: 'Announcement' }
			]
		}
	];

	const handleUpdate = (updated: Record<string, string | number>) => {
		filter = updated;
	};

	// --- DATATABLE ---
	type Row = {
		id: string;
		nik: string;
		nama: string;
		jk: string;
		tempat_lahir: string;
		usia: string;
		dusun: string;
		status: string;
		pekerjaan: string;
		rt_rw: string;
	};
	const columns: Column<Row>[] = [
		{ key: 'nik', header: 'Judul', sortable: true },
		{ key: 'nama', header: 'Kategori', sortable: true },
		{ key: 'jk', header: 'Penulis', sortable: true, align: 'center' },
		{ key: 'tempat_lahir', header: 'Diperbarui', sortable: true },
		{
			key: 'status',
			header: 'Status',
			sortable: true,
			component: Badge as unknown as AnySvelteComponent,
			componentProps: (r) => ({
				variant: r.status === 'Kawin' ? 'brand' : r.status === 'Belum Kawin' && 'success',
				className: 'w-10 h-10'
			})
		},
		{
			key: 'aksi',
			header: 'Aksi',
			component: AksiCell as unknown as AnySvelteComponent,
			componentProps: (row) => ({
				onEdit: () => console.log('raaawww', row),
				onDelete: () => console.log('delete', row),
				onPreview: () => console.log('preview', row)
			})
		}
	];

	let data: Row[] = [
		{
			id: '1',
			nik: '1234567890123456',
			nama: 'Andi',
			jk: 'L',
			tempat_lahir: 'Jakarta',
			usia: '30',
			dusun: '001',
			status: 'Kawin',
			pekerjaan: 'Karyawan',
			rt_rw: '001/002'
		},
		{
			id: '2',
			nik: '2345678901234567',
			nama: 'Siti',
			jk: 'P',
			tempat_lahir: 'Bandung',
			usia: '25',
			dusun: '002',
			status: 'Belum Kawin',
			pekerjaan: 'Mahasiswa',
			rt_rw: '002/003'
		},
		{
			id: '3',
			nik: '3456789012345678',
			nama: 'Budi',
			jk: 'L',
			tempat_lahir: 'Surabaya',
			usia: '40',
			dusun: '001',
			status: 'Kawin',
			pekerjaan: 'Wiraswasta',
			rt_rw: '001/002'
		},
		{
			id: '4',
			nik: '4567890123456789',
			nama: 'Rina',
			jk: 'P',
			tempat_lahir: 'Medan',
			usia: '35',
			dusun: '003',
			status: 'Kawin',
			pekerjaan: 'PNS',
			rt_rw: '003/004'
		},
		{
			id: '5',
			nik: '5678901234567890',
			nama: 'Agus',
			jk: 'L',
			tempat_lahir: 'Yogyakarta',
			usia: '28',
			dusun: '002',
			status: 'Belum Kawin',
			pekerjaan: 'Freelancer',
			rt_rw: '002/003'
		},
		{
			id: '6',
			nik: '6789012345678901',
			nama: 'Dewi',
			jk: 'P',
			tempat_lahir: 'Semarang',
			usia: '32',
			dusun: '001',
			status: 'Kawin',
			pekerjaan: 'Guru',
			rt_rw: '001/002'
		}
	]; // data dari server

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
</script>

<main>
	<Card className="mb-6">
		<div
			class="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
		>
			<section><Button size="sm">Tulis Berita</Button></section>
			<section class="flex flex-col items-start justify-center gap-2 md:flex-row md:items-center">
				{#if selected.length > 0}
					<Button rounded="xl" size="sm" variant="outline">Terbitkan</Button>
					<Button rounded="xl" size="sm" variant="outline">Arsipkan</Button>
					<Button rounded="xl" size="sm" variant="danger">Hapus</Button>
				{/if}
				<InputGenerator fields={filterConfig} bind:data={filter} onChange={handleUpdate} />
			</section>
		</div>
	</Card>
	<DataTable
		{columns}
		{data}
		selectable
		searchable
		stickyHeader
		pageSizeOptions={[5, 10, 25]}
		on:sort={onSort}
		on:page={onPage}
		on:select={onSelect}
	/>
</main>
