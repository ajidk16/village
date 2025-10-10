<script lang="ts">
	import Badge from '$lib/components/shared/badge/badge.svelte';
	import Button from '$lib/components/shared/button/button.svelte';
	import Card from '$lib/components/shared/card/card.svelte';
	import AksiCell from '$lib/components/shared/data-table/aksi-cell.svelte';
	import type {
		AnySvelteComponent,
		Column
	} from '$lib/components/shared/data-table/data-table.svelte';
	import DataTable from '$lib/components/shared/data-table/data-table.svelte';
	import Drawer from '$lib/components/shared/drawer/Drawer.svelte';
	import type { Field } from '$lib/components/shared/input-generator/input-generator.svelte';
	import InputGenerator from '$lib/components/shared/input-generator/input-generator.svelte';
	import Modal from '$lib/components/shared/modal/modal.svelte';

	export let data;

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
		tgl_lahir: string;
		usia: string;
		dusun: string;
		status: string;
		pekerjaan: string;
		rt_rw: string;
	};

	type InputPendidikan = {
		nik: string;
		nama: string;
		jk: string;
		agama: string;
		pendidikan: string;
		pekerjaan: string;
		tempat_lahir: string;
		tgl_lahir: string;
		status: string;
		alamat_domisili: string;
		household_id: string;
	};

	const columns: Column<Row>[] = [
		{
			key: 'nik',
			header: 'NIK',
			sortable: true
		},
		{
			key: 'nama',
			header: 'Nama',
			sortable: true
		},
		{
			key: 'jk',
			header: 'Jenis Kelamin',
			sortable: true,
			align: 'center'
		},
		{
			key: 'tempat_lahir',
			header: 'Tempat Lahir',
			sortable: true,
			render: (val) => (val ? val.tempat_lahir : '-')
		},
		{
			key: 'usia',
			header: 'Usia',
			sortable: true,
			align: 'center'
		},
		{
			key: 'dusun',
			header: 'Dusun',
			sortable: true
		},
		{
			key: 'rt_rw',
			header: 'RT/RW',
			sortable: true,
			align: 'center'
		},
		{
			key: 'pekerjaan',
			header: 'Pekerjaan',
			sortable: true
		},
		{
			key: 'status',
			header: 'Status Kawin',
			sortable: true
		},
		{
			key: 'aksi',
			header: 'Aksi',
			align: 'center',
			visible: true,
			component: AksiCell as unknown as AnySvelteComponent,
			componentProps: (row) => ({
				edit: true,
				onEdit: () => openEdit(row.id),
				remove: true,
				onDelete: () => deleteRow(Number(row.id))
			})
		}
	];

	function onSort(e: CustomEvent) {
		const { sortBy, sortDir } = e.detail; // lakukan fetch ke server jika serverMode=true
		// console.log('sort:', sortBy, sortDir);
	}
	function onPage(e: CustomEvent) {
		const { page, pageSize } = e.detail; // lakukan fetch ke server jika serverMode=true
		// console.log('page:', page, pageSize);
	}

	let selected: number[] = [];
	function onSelect(e: CustomEvent) {
		selected = Array.isArray(e.detail.ids) ? e.detail.ids.map(Number) : [Number(e.detail.ids)];
		// console.log('selected ids:', selected);
	}

	let showDrawer = false;
	let detail: any = null;
	function openDetail(id: number) {
		detail = data.items.find((x) => x.id === id) ?? null;
		showDrawer = !!detail;
	}

	// MODAL FORM (CREATE/EDIT)
	let showModal = false;
	let editId: string | null = null;
	let form: InputPendidikan = {
		nik: '',
		nama: '',
		jk: '',
		agama: '',
		pendidikan: '',
		pekerjaan: '',
		tempat_lahir: '',
		tgl_lahir: '',
		status: '',
		alamat_domisili: '',
		household_id: ''
	};
	function newRow() {
		editId = null;
		form = {
			nik: '',
			nama: '',
			jk: '',
			agama: '',
			pendidikan: '',
			pekerjaan: '',
			tempat_lahir: '',
			tgl_lahir: '',
			status: '',
			alamat_domisili: '',
			household_id: ''
		};
		showModal = true;
	}
	function openEdit(id: string) {
		const r = data.items.find((x) => x.id === Number(id));
		if (!r) return;
		editId = id;
		form = {
			nik: r.nik ?? '',
			nama: r.nama ?? '',
			jk: r.jk ?? '',
			agama: r.agama?.toLowerCase() ?? '',
			pendidikan: r.pendidikan?.toLowerCase() ?? '',
			pekerjaan: r.pekerjaan?.toLowerCase() ?? '',
			tempat_lahir: r.tempat_lahir ?? '',
			tgl_lahir: r.tgl_lahir ?? '',
			status: r.status?.toLowerCase() ?? '',
			alamat_domisili: r.alamat_domisili ?? '',
			household_id: String(r.household_id) ?? ''
		};
		showModal = true;
	}
	function submitForm() {
		// if (!form.pemohon || !form.jenis || !form.tanggal) return;
		// if (editId) {
		// 	data.items = data.items.map((x) => (x.id === editId ? { ...x, ...form, id: editId } : x));
		// } else {
		// 	const nextNum = Math.max(...data.items.map((d) => Number(d.id.split('-')[1] || 0))) + 1;
		// 	const nid = `A-${nextNum}`;
		// 	data.items = [{ ...form, id: nid, catatan: form.catatan || '' }, ...data.items];
		// }
		showModal = false;
		// toast('Tersimpan!');
	}
	function deleteRow(id: number) {
		data.items = data.items.filter((x) => x.id !== id);
		// console.log('Dihapus 1 data.items', id);
		// toast('Dihapus 1 data.items');
		showDrawer = false;
	}

	const fieldInput: Field[] = [
		{
			name: 'nik',
			label: 'NIK',
			required: true,
			placeholder: 'Masukkan NIK 16 digit'
		},
		{
			name: 'nama',
			label: 'Nama Lengkap',
			required: true,
			placeholder: 'Masukkan nama lengkap'
		},
		{
			name: 'jk',
			label: 'Jenis Kelamin',
			type: 'select',
			placeholder: 'Pilih jenis kelamin',
			options: [
				{ value: 'M', label: 'Laki-laki' },
				{ value: 'F', label: 'Perempuan' }
			]
		},
		{
			name: 'agama',
			label: 'Agama',
			type: 'select',
			placeholder: 'Pilih agama',
			options: [
				{ value: 'islam', label: 'Islam' },
				{ value: 'kristen', label: 'Kristen' },
				{ value: 'katolik', label: 'Katolik' },
				{ value: 'hindu', label: 'Hindu' },
				{ value: 'buddha', label: 'Buddha' },
				{ value: 'lainnya', label: 'Lainnya' }
			]
		},
		{
			name: 'pendidikan',
			label: 'Pendidikan',
			type: 'select',
			placeholder: 'Pilih pendidikan',
			options: [
				{ value: 'sd', label: 'SD' },
				{ value: 'smp', label: 'SMP' },
				{ value: 'sma', label: 'SMA' },
				{ value: 'diploma', label: 'Diploma' },
				{ value: 'sarjana', label: 'Sarjana' },
				{ value: 'lainnya', label: 'Lainnya' }
			]
		},
		{
			name: 'pekerjaan',
			label: 'Pekerjaan',
			placeholder: 'Masukkan pekerjaan',
			type: 'select',
			options: [
				{ value: 'karyawan', label: 'Karyawan' },
				{ value: 'wiraswasta', label: 'Wiraswasta' },
				{ value: 'pns', label: 'PNS' },
				{ value: 'guru', label: 'Guru' },
				{ value: 'mahasiswa', label: 'Mahasiswa' },
				{ value: 'lainnya', label: 'Lainnya' }
			]
		},
		{
			name: 'tempat_lahir',
			label: 'Tempat Lahir',
			placeholder: 'Masukkan tempat lahir',
			type: 'text'
		},
		{
			name: 'tanggal_lahir',
			label: 'Tanggal Lahir',
			type: 'date'
		},
		{
			name: 'status_kawin',
			label: 'Status Kawin',
			type: 'select',
			placeholder: 'Pilih status kawin',
			options: [
				{ value: 'kawin', label: 'Kawin' },
				{ value: 'belum_kawin', label: 'Belum Kawin' },
				{ value: 'cerai_hidup', label: 'Cerai Hidup' },
				{ value: 'cerai_mati', label: 'Cerai Mati' }
			]
		},
		{
			name: 'household_id',
			label: 'ID Keluarga',
			placeholder: 'Masukkan ID Keluarga',
			type: 'select',
			options: [
				{ value: '001', label: '001' },
				{ value: '002', label: '002' },
				{ value: '003', label: '003' }
			]
		},
		{
			name: 'alamat_domisili',
			label: 'Alamat',
			placeholder: 'Masukkan alamat_domisili',
			type: 'textarea',
			colspan: 2
		}
	];
</script>

<main>
	<!-- Filters & bulk actions -->
	<Card title="Filters & Bulk Actions" className="mb-4 sm:mb-6">
		<div class="space-y-4">
			<!-- Filter Form - Responsive Grid -->
			<InputGenerator
				fields={filterConfig}
				bind:data={filter}
				onChange={handleUpdate}
				columns={3}
			/>

			<!-- Action Buttons - Responsive Layout -->
			<div
				class="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
			>
				<!-- Filter Actions -->
				<div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
					<Button className="w-full sm:w-auto">Terapkan</Button>
					<Button type="button" variant="outline" className="w-full sm:w-auto">Reset</Button>
				</div>

				<!-- Bulk Actions -->
				<div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
					<Button type="button" variant="outline" className="w-full sm:w-auto">Import CSV</Button>
					<Button className="w-full sm:w-auto">Export CSV</Button>
				</div>
			</div>
		</div>
	</Card>

	<Card className="mb-6">
		<div class="flex justify-between">
			<Button onClick={() => (showModal = true)}>Tambah Penduduk</Button>
			{#if selected.length > 0}
				<Button type="button" variant="danger" className="w-full sm:w-auto"
					>Hapus Terpilih ({selected.length})</Button
				>
			{/if}
		</div>
	</Card>

	<DataTable
		{columns}
		data={data.items}
		selectable
		searchable
		stickyHeader
		serverMode={true}
		pageSizeOptions={[5, 10, 25]}
		on:sort={onSort}
		on:page={onPage}
		on:select={onSelect}
	/>
</main>

<!-- Drawer Detail -->
{#if showDrawer && detail}
	<Drawer isOpen={showDrawer} onClose={() => (showDrawer = false)} title="Detail Penduduk">
		<div class="mt-4 space-y-3 text-sm">
			<div class="grid grid-cols-3 gap-2">
				<div class="text-slate-500">ID</div>
				<div class="col-span-2 font-medium">{detail.id}</div>
				<div class="text-slate-500">Pemohon</div>
				<div class="col-span-2">{detail.pemohon}</div>
				<div class="text-slate-500">Jenis</div>
				<div class="col-span-2">{detail.jenis}</div>
				<div class="text-slate-500">Tanggal</div>
				<div class="col-span-2">{detail.tanggal}</div>
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
		title={editId ? 'Edit Penduduk' : 'Penduduk Baru'}
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
