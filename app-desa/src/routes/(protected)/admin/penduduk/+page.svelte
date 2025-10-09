<script lang="ts">
	import ActionCell from '$lib/components/admin/penduduk/action-cell.svelte';
	import Button from '$lib/components/shared/button/button.svelte';
	import Card from '$lib/components/shared/card/card.svelte';
	import AksiCell from '$lib/components/shared/data-table/aksi-cell.svelte';
	import DataTableDemo from '$lib/components/shared/data-table/data-table-demo.svelte';
	import type {
		AnySvelteComponent,
		Column
	} from '$lib/components/shared/data-table/data-table.svelte';
	import DataTable from '$lib/components/shared/data-table/data-table.svelte';
	import DrawerDemo from '$lib/components/shared/drawer/drawer-demo.svelte';
	import DropdownDemo from '$lib/components/shared/dropdown/dropdown-demo.svelte';
	import type { Field } from '$lib/components/shared/input-generator/input-generator.svelte';
	import InputGenerator from '$lib/components/shared/input-generator/input-generator.svelte';
	import ModalDemo from '$lib/components/shared/modal/modal-demo.svelte';
	import type { SvelteComponent } from 'svelte';

	// --- FILTERS ---
	let filter = {};
	const filterConfig: Field[] = [
		{
			name: 'dusun',
			label: 'dusun',
			type: 'select',
			placeholder: 'Pilih dusun',
			options: [
				{ value: '001', label: '001' },
				{ value: '001', label: '001' }
			]
		},
		{
			name: 'rt',
			label: 'RT',
			type: 'select',
			placeholder: 'Pilih RT',
			options: [
				{ value: '001', label: '001' },
				{ value: '002', label: '002' },
				{ value: '003', label: '003' },
				{ value: '004', label: '004' }
			]
		},
		{
			name: 'jk',
			label: 'jenis kelamin',
			type: 'select',
			placeholder: 'Pilih jenis kelamin',
			options: [
				{ value: '001', label: '001' },
				{ value: '002', label: '002' },
				{ value: '003', label: '003' },
				{ value: '004', label: '004' }
			]
		},
		{
			name: 'status',
			label: 'status kawin',
			type: 'select',
			placeholder: 'Pilih status kawin',
			options: [
				{ value: '001', label: '001' },
				{ value: '002', label: '002' },
				{ value: '003', label: '003' },
				{ value: '004', label: '004' }
			]
		},
		{
			name: 'usia_min',
			label: 'Usia (>=)',
			type: 'select',
			placeholder: 'Pilih usia minimal',
			options: [
				{ value: '001', label: '001' },
				{ value: '002', label: '002' },
				{ value: '003', label: '003' },
				{ value: '004', label: '004' }
			]
		},
		{
			name: 'usia_max',
			label: 'Usia (<=)',
			type: 'select',
			placeholder: 'Pilih usia maksimal',
			options: [
				{ value: '001', label: '001' },
				{ value: '002', label: '002' },
				{ value: '003', label: '003' },
				{ value: '004', label: '004' }
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
		{ key: 'nik', header: 'NIK', sortable: true },
		{ key: 'nama', header: 'Nama', sortable: true },
		{ key: 'jk', header: 'Jenis Kelamin', sortable: true, align: 'center' },
		{ key: 'tempat_lahir', header: 'Tempat Lahir', sortable: true },
		{ key: 'usia', header: 'Usia', sortable: true, align: 'center' },
		{ key: 'dusun', header: 'Dusun', sortable: true },
		{ key: 'rt_rw', header: 'RT/RW', sortable: true, align: 'center' },
		{ key: 'pekerjaan', header: 'Pekerjaan', sortable: true },
		{ key: 'status', header: 'Status Kawin', sortable: true },
		{
			key: 'aksi',
			header: 'Aksi',
			align: 'center',
			visible: true,
			component: AksiCell as unknown as AnySvelteComponent,
			componentProps: (row) => ({
				onEdit: () => console.log('raaawww', row),
				onDelete: () => console.log('delete', row)
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
	function onSelect(e: CustomEvent) {
		console.log('selected ids:', e.detail.ids);
	}
</script>

<main>
	<!-- <DrawerDemo />
	<DropdownDemo />
	<ModalDemo /> -->
	<!-- Filters & bulk actions -->
	<Card title="Filters & Bulk Actions" className="mb-6">
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
			<InputGenerator fields={filterConfig} bind:data={filter} onChange={handleUpdate} />
		</div>
		<div class="mt-3 flex flex-wrap gap-2">
			<Button>Terapkan</Button>
			<Button type="button" variant="outline">Reset</Button>

			<div class="ml-auto flex gap-2">
				<Button type="button" variant="outline">Import CSV</Button>
				<Button>Export CSV</Button>
				<Button type="button" variant="danger">Hapus Terpilih</Button>
			</div>
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
