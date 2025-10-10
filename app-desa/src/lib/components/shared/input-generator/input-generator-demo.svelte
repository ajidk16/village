<script lang="ts">
	import InputGenerator, { type Field } from "./input-generator.svelte";

	let formData = {};
	let formData2 = {};
	
	// Demo 1: Form layanan desa (2 kolom)
	const fields: Field[] = [
		{ name: 'nama', label: 'Nama Pemohon', required: true, placeholder: 'Masukkan nama lengkap' },
		{ name: 'nik', label: 'NIK', type: 'text', placeholder: 'Masukkan NIK 16 digit' },
		{ name: 'tanggal', label: 'Tanggal Pengajuan', type: 'date' },
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
			placeholder: 'Tuliskan catatan tambahan',
			colspan: 'full'
		}
	];

	// Demo 2: Form pendaftaran lengkap (3 kolom)
	const fieldsComprehensive: Field[] = [
		// Row 1: Data pribadi
		{ name: 'namaDepan', label: 'Nama Depan', required: true, placeholder: 'Nama depan' },
		{ name: 'namaBelakang', label: 'Nama Belakang', placeholder: 'Nama belakang' },
		{ name: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
		
		// Row 2: Kontak dan identitas
		{ name: 'telepon', label: 'No. Telepon', type: 'tel', placeholder: '08123456789' },
		{ 
			name: 'jenisKelamin', 
			label: 'Jenis Kelamin', 
			type: 'select',
			options: [
				{ value: 'L', label: 'Laki-laki' },
				{ value: 'P', label: 'Perempuan' }
			]
		},
		{ name: 'tanggalLahir', label: 'Tanggal Lahir', type: 'date' },

		// Row 3: Alamat (full width)
		{
			name: 'alamat',
			label: 'Alamat Lengkap',
			type: 'textarea',
			placeholder: 'Jl. Contoh No. 123, RT/RW 001/002',
			colspan: 'full'
		},

		// Row 4: Lokasi (2 kolom + 1 kolom)
		{
			name: 'kota',
			label: 'Kota/Kabupaten',
			type: 'select',
			colspan: 2,
			options: [
				{ value: 'jakarta', label: 'Jakarta' },
				{ value: 'bandung', label: 'Bandung' },
				{ value: 'surabaya', label: 'Surabaya' }
			]
		},
		{ name: 'kodePos', label: 'Kode Pos', placeholder: '12345' }
	];

	function handleUpdate(updated: Record<string, string | number>) {
		formData = updated;
	}

	function handleUpdate2(updated: Record<string, string | number>) {
		formData2 = updated;
	}

	function handleSubmit() {
		console.log('Data layanan dikirim:', formData);
	}

	function handleSubmit2() {
		console.log('Data pendaftaran dikirim:', formData2);
	}

	function resetForm1() {
		formData = {};
	}

	function resetForm2() {
		formData2 = {};
	}
</script>

<div class="space-y-8 p-4">
	<!-- Header -->
	<div class="text-center">
		<h1 class="text-3xl font-bold text-slate-800 dark:text-slate-200">
			InputGenerator Demo - Responsive
		</h1>
		<p class="mt-2 text-slate-600 dark:text-slate-400">
			Demonstrasi komponen form generator yang responsive dengan berbagai layout
		</p>
	</div>

	<!-- Demo 1: Form Layanan Desa (2 kolom) -->
	<div class="space-y-4">
		<h2 class="text-xl font-semibold text-slate-800 dark:text-slate-200">
			Demo 1: Form Layanan Desa (2 Kolom)
		</h2>
		
		<form
			class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
			on:submit|preventDefault={handleSubmit}
		>
			<InputGenerator 
				{fields} 
				bind:data={formData} 
				onChange={handleUpdate} 
				columns={2}
			/>

			<div class="mt-6 flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
				<button
					type="submit"
					class="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
				>
					Submit Layanan
				</button>
				<button
					type="button"
					on:click={resetForm1}
					class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 sm:w-auto"
				>
					Reset
				</button>
			</div>
		</form>

		<!-- Data Preview 1 -->
		<div class="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
			<h3 class="mb-2 font-medium text-slate-800 dark:text-slate-200">Data Form 1:</h3>
			<pre class="text-sm text-slate-600 dark:text-slate-400">{JSON.stringify(formData, null, 2)}</pre>
		</div>
	</div>

	<!-- Demo 2: Form Pendaftaran Lengkap (3 kolom) -->
	<div class="space-y-4">
		<h2 class="text-xl font-semibold text-slate-800 dark:text-slate-200">
			Demo 2: Form Pendaftaran Lengkap (3 Kolom)
		</h2>
		
		<form
			class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
			on:submit|preventDefault={handleSubmit2}
		>
			<InputGenerator 
				fields={fieldsComprehensive} 
				bind:data={formData2} 
				onChange={handleUpdate2} 
				columns={3}
			/>

			<div class="mt-6 flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
				<button
					type="submit"
					class="w-full rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
				>
					Submit Pendaftaran
				</button>
				<button
					type="button"
					on:click={resetForm2}
					class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 sm:w-auto"
				>
					Reset
				</button>
			</div>
		</form>

		<!-- Data Preview 2 -->
		<div class="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
			<h3 class="mb-2 font-medium text-slate-800 dark:text-slate-200">Data Form 2:</h3>
			<pre class="text-sm text-slate-600 dark:text-slate-400">{JSON.stringify(formData2, null, 2)}</pre>
		</div>
	</div>

	<!-- Responsive Info -->
	<div class="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
		<h3 class="mb-3 text-lg font-semibold text-blue-800 dark:text-blue-200">
			Fitur Responsiveness:
		</h3>
		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<h4 class="font-medium text-blue-700 dark:text-blue-300">Layout Grid:</h4>
				<ul class="mt-1 space-y-1 text-sm text-blue-600 dark:text-blue-400">
					<li>• Mobile: 1 kolom (stack vertikal)</li>
					<li>• Tablet: 2 kolom</li>
					<li>• Desktop: 2-3 kolom sesuai setting</li>
				</ul>
			</div>
			<div>
				<h4 class="font-medium text-blue-700 dark:text-blue-300">Field Types:</h4>
				<ul class="mt-1 space-y-1 text-sm text-blue-600 dark:text-blue-400">
					<li>• Text, Email, Tel, Date</li>
					<li>• Select dropdown</li>
					<li>• Textarea dengan resize</li>
					<li>• Colspan untuk field lebar</li>
				</ul>
			</div>
			<div>
				<h4 class="font-medium text-blue-700 dark:text-blue-300">Button Layout:</h4>
				<ul class="mt-1 space-y-1 text-sm text-blue-600 dark:text-blue-400">
					<li>• Stack vertikal di mobile</li>
					<li>• Horizontal di desktop</li>
					<li>• Full width di mobile</li>
				</ul>
			</div>
			<div>
				<h4 class="font-medium text-blue-700 dark:text-blue-300">Styling:</h4>
				<ul class="mt-1 space-y-1 text-sm text-blue-600 dark:text-blue-400">
					<li>• Focus states & hover effects</li>
					<li>• Dark mode support</li>
					<li>• Smooth transitions</li>
					<li>• Disabled state support</li>
				</ul>
			</div>
		</div>
	</div>
</div>
