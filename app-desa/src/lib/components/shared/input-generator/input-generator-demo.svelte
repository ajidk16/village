<script lang="ts">
	import InputGenerator, { type Field } from "./input-generator.svelte";

	let formData = {};
	const fields: Field[] = [
		{ name: 'nama', label: 'Nama Pemohon', required: true },
		{ name: 'tanggal', label: 'Tanggal', type: 'date' },
		{
			name: 'jenis',
			label: 'Jenis Layanan',
			type: 'select',
			options: [
				{ value: 'domisili', label: 'Surat Domisili' },
				{ value: 'usaha', label: 'Surat Usaha' },
				{ value: 'ktm', label: 'Keterangan Tidak Mampu' }
			]
		},
		{
			name: 'catatan',
			label: 'Catatan',
			type: 'textarea',
			placeholder: 'Tuliskan catatan tambahan'
		}
	];

	function handleUpdate(updated: Record<string, string | number>) {
		formData = updated;
	}

	function handleSubmit() {
		console.log('Data dikirim:', formData);
	}
</script>

<form
	class="max-w-2xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
	on:submit|preventDefault={handleSubmit}
>
	<InputGenerator {fields} bind:data={formData} onChange={handleUpdate} />

	<div class="flex justify-end">
		<button
			type="submit"
			class="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500"
		>
			Simpan
		</button>
	</div>
</form>
