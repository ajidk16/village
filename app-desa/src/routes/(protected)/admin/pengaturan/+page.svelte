<script lang="ts">
	// TABS
	type TabKey = 'umum' | 'branding' | 'layanan' | 'role' | 'smtp' | 'keamanan' | 'backup' | 'audit';
	let tab: TabKey = 'umum';
	const tabs: { key: TabKey; label: string }[] = [
		{ key: 'umum', label: 'Umum' },
		{ key: 'branding', label: 'Branding' },
		{ key: 'layanan', label: 'Layanan' },
		{ key: 'role', label: 'Role & Akses' },
		{ key: 'smtp', label: 'Email (SMTP)' },
		{ key: 'keamanan', label: 'Keamanan' },
		{ key: 'backup', label: 'Backup' },
		{ key: 'audit', label: 'Audit Log' }
	];
	// FORM STATE (dummy)
	let info = {
		namaDesa: 'Desa Harmoni',
		kodePos: '12345',
		alamat: 'Jl. Melati No. 1',
		email: 'desa@harmoni.id',
		telepon: '(0721) 123-456',
		jam: 'Senin–Jumat 08.00–15.00'
	};
	let fileLogo: File | null = null;
	let fileFavicon: File | null = null;
	function formatSize(b: number) {
		return b < 1024
			? `${b} B`
			: b < 1024 * 1024
				? `${(b / 1024).toFixed(1)} KB`
				: `${(b / 1024 / 1024).toFixed(1)} MB`;
	}
</script>

<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Tabs -->
	<div class="flex gap-2 overflow-x-auto pb-2">
		{#each tabs as t}
			<button
				class={`rounded-xl border px-4 py-2 dark:border-slate-800 ${tab === t.key ? 'border-slate-200 bg-brand-600/10 text-brand-700 dark:text-brand-300' : 'border-slate-200'}`}
				on:click={() => (tab = t.key)}
			>
				{t.label}
			</button>
		{/each}
	</div>

	<!-- Panels -->
	{#if tab === 'umum'}
		<section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
			>
				<h2 class="text-lg font-semibold">Informasi Desa</h2>
				<form class="mt-4 grid gap-4 text-sm sm:grid-cols-2" on:submit|preventDefault>
					<div>
						<label class="mb-1 block">Nama Desa</label>
						<input
							bind:value={info.namaDesa}
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="Desa Harmoni"
						/>
					</div>
					<div>
						<label class="mb-1 block">Kode Pos</label>
						<input
							bind:value={info.kodePos}
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="12345"
						/>
					</div>
					<div class="sm:col-span-2">
						<label class="mb-1 block">Alamat</label>
						<input
							bind:value={info.alamat}
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="Jl. Melati No. 1"
						/>
					</div>
					<div>
						<label class="mb-1 block">Email</label>
						<input
							type="email"
							bind:value={info.email}
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="desa@harmoni.id"
						/>
					</div>
					<div>
						<label class="mb-1 block">Telepon</label>
						<input
							type="tel"
							bind:value={info.telepon}
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="(0721) 123-456"
						/>
					</div>
					<div class="sm:col-span-2">
						<label class="mb-1 block">Jam Pelayanan</label>
						<input
							bind:value={info.jam}
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="Senin–Jumat 08.00–15.00"
						/>
					</div>
					<div class="flex gap-3 sm:col-span-2">
						<button
							type="submit"
							class="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Simpan</button
						>
						<button
							type="reset"
							class="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-800"
							>Reset</button
						>
					</div>
				</form>
			</div>

			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
			>
				<h3 class="font-semibold">Logo & Favicon</h3>
				<div class="mt-4 space-y-3 text-sm">
					<label class="block">Unggah Logo</label>
					<label
						class="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700"
					>
						<span class="text-slate-500">Tarik file ke sini atau klik untuk pilih</span>
						<input
							type="file"
							class="hidden"
							accept="image/*"
							on:change={(e) =>
								(fileLogo = (e.currentTarget as HTMLInputElement).files?.[0] ?? null)}
						/>
					</label>
					{#if fileLogo}
						<div class="text-xs text-slate-500">
							Selected: {fileLogo.name} • {formatSize(fileLogo.size)}
						</div>
					{/if}
					<label class="block">Unggah Favicon</label>
					<label
						class="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700"
					>
						<span class="text-slate-500">.ico / .png</span>
						<input
							type="file"
							class="hidden"
							accept="image/*"
							on:change={(e) =>
								(fileFavicon = (e.currentTarget as HTMLInputElement).files?.[0] ?? null)}
						/>
					</label>
					{#if fileFavicon}
						<div class="text-xs text-slate-500">
							Selected: {fileFavicon.name} • {formatSize(fileFavicon.size)}
						</div>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	{#if tab === 'branding'}
		<section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
			>
				<h2 class="text-lg font-semibold">Warna & Tema</h2>
				<div class="mt-4 grid gap-4 text-sm sm:grid-cols-3">
					<div>
						<label class="mb-1 block">Primary</label>
						<input
							type="color"
							value="#6366f1"
							class="h-10 w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800"
						/>
					</div>
					<div>
						<label class="mb-1 block">Secondary</label>
						<input
							type="color"
							value="#10b981"
							class="h-10 w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800"
						/>
					</div>
					<div>
						<label class="mb-1 block">Accent</label>
						<input
							type="color"
							value="#f59e0b"
							class="h-10 w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800"
						/>
					</div>
					<div class="sm:col-span-3">
						<label class="mt-2 inline-flex items-center gap-2">
							<input
								type="checkbox"
								class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
								checked
							/>
							<span>Aktifkan mode gelap otomatis</span>
						</label>
					</div>
					<div class="mt-2 flex gap-3 sm:col-span-3">
						<button class="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
							>Simpan</button
						>
						<button class="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-800"
							>Reset</button
						>
					</div>
				</div>
			</div>
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
			>
				<h3 class="font-semibold">Pratinjau</h3>
				<div class="mt-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
					<div class="h-10 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
					<div class="mt-3 grid grid-cols-3 gap-3">
						<div class="h-20 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
						<div class="h-20 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
						<div class="h-20 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
					</div>
				</div>
			</div>
		</section>
	{/if}

	{#if tab === 'layanan'}
		<section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
			>
				<h2 class="text-lg font-semibold">Modul Layanan</h2>
				<div class="mt-4 grid gap-4 text-sm sm:grid-cols-2">
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Surat Pengantar</div>
							<div class="text-xs text-slate-500">Domisili, usaha, RT/RW, dll.</div>
						</div>
						<input type="checkbox" class="h-5 w-10 rounded-full" checked />
					</label>
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Pelaporan Warga</div>
							<div class="text-xs text-slate-500">Aduan & aspirasi</div>
						</div>
						<input type="checkbox" class="h-5 w-10 rounded-full" checked />
					</label>
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Data Kependudukan</div>
							<div class="text-xs text-slate-500">KK, KTP, statistik</div>
						</div>
						<input type="checkbox" class="h-5 w-10 rounded-full" checked />
					</label>
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Transparansi Dana</div>
							<div class="text-xs text-slate-500">APBDes, proyek</div>
						</div>
						<input type="checkbox" class="h-5 w-10 rounded-full" />
					</label>
				</div>
				<div class="mt-4 flex gap-3">
					<button class="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
						>Simpan</button
					>
					<button class="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-800"
						>Reset</button
					>
				</div>
			</div>
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
			>
				<h3 class="font-semibold">Urutan Menu</h3>
				<ol class="mt-3 space-y-2 text-sm">
					<li class="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
						Beranda
					</li>
					<li class="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
						Layanan
					</li>
					<li class="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">Berita</li>
					<li class="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">Profil</li>
				</ol>
			</div>
		</section>
	{/if}

	{#if tab === 'role'}
		<section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
			>
				<h2 class="text-lg font-semibold">Role & Akses</h2>
				<div class="mt-4 overflow-x-auto text-sm">
					<table class="min-w-full">
						<thead class="border-y border-slate-200 text-left text-xs dark:border-slate-800">
							<tr>
								<th class="py-2 pr-4">Role</th>
								<th class="py-2 pr-4">Layanan</th>
								<th class="py-2 pr-4">Penduduk</th>
								<th class="py-2 pr-4">Keuangan</th>
								<th class="py-2 pr-4">Berita</th>
								<th class="py-2 pr-4">Pengaturan</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-slate-100 dark:border-slate-800">
								<td class="py-2 pr-4">Admin</td>
								<td class="py-2 pr-4"><input type="checkbox" checked /></td>
								<td class="py-2 pr-4"><input type="checkbox" checked /></td>
								<td class="py-2 pr-4"><input type="checkbox" checked /></td>
								<td class="py-2 pr-4"><input type="checkbox" checked /></td>
								<td class="py-2 pr-4"><input type="checkbox" checked /></td>
							</tr>
							<tr class="border-b border-slate-100 dark:border-slate-800">
								<td class="py-2 pr-4">Operator</td>
								<td class="py-2 pr-4"><input type="checkbox" checked /></td>
								<td class="py-2 pr-4"><input type="checkbox" checked /></td>
								<td class="py-2 pr-4"><input type="checkbox" /></td>
								<td class="py-2 pr-4"><input type="checkbox" /></td>
								<td class="py-2 pr-4"><input type="checkbox" /></td>
							</tr>
							<tr>
								<td class="py-2 pr-4">Warga</td>
								<td class="py-2 pr-4"><input type="checkbox" checked /></td>
								<td class="py-2 pr-4"><input type="checkbox" /></td>
								<td class="py-2 pr-4"><input type="checkbox" /></td>
								<td class="py-2 pr-4"><input type="checkbox" /></td>
								<td class="py-2 pr-4"><input type="checkbox" /></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="mt-4 flex gap-3">
					<button class="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
						>Simpan</button
					>
					<button class="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-800"
						>Reset</button
					>
				</div>
			</div>
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
			>
				<h3 class="font-semibold">Tambah Role</h3>
				<div class="mt-3 space-y-3 text-sm">
					<input
						placeholder="Nama role"
						class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
					/>
					<button class="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-800"
						>+ Tambah</button
					>
				</div>
			</div>
		</section>
	{/if}

	{#if tab === 'smtp'}
		<section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
			>
				<h2 class="text-lg font-semibold">Pengaturan Email (SMTP)</h2>
				<form class="mt-4 grid gap-4 text-sm sm:grid-cols-2" on:submit|preventDefault>
					<div>
						<label class="mb-1 block">Host</label>
						<input
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="smtp.mailtrap.io"
						/>
					</div>
					<div>
						<label class="mb-1 block">Port</label>
						<input
							type="number"
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="587"
						/>
					</div>
					<div>
						<label class="mb-1 block">Username</label>
						<input
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
						/>
					</div>
					<div>
						<label class="mb-1 block">Password</label>
						<input
							type="password"
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
						/>
					</div>
					<div class="sm:col-span-2">
						<label class="mb-1 block">From (Email)</label>
						<input
							type="email"
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="no-reply@harmoni.id"
						/>
					</div>
					<div class="flex gap-3 sm:col-span-2">
						<button
							type="submit"
							class="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Simpan</button
						>
						<button
							type="button"
							class="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-800"
							>Kirim Email Tes</button
						>
					</div>
				</form>
			</div>
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
			>
				<h3 class="font-semibold">Status</h3>
				<ul class="mt-3 space-y-2 text-sm">
					<li>Terhubung: <span class="text-emerald-600">Ya</span></li>
					<li>Enkripsi: TLS</li>
				</ul>
			</div>
		</section>
	{/if}

	{#if tab === 'keamanan'}
		<section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
			>
				<h2 class="text-lg font-semibold">Keamanan</h2>
				<div class="mt-4 grid gap-4 text-sm sm:grid-cols-2">
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Aktifkan 2FA</div>
							<div class="text-xs text-slate-500">Google Authenticator / OTP</div>
						</div>
						<input type="checkbox" class="h-5 w-10 rounded-full" />
					</label>
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Batas Login Gagal</div>
							<div class="text-xs text-slate-500">Blokir sementara</div>
						</div>
						<select
							class="rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-800"
						>
							<option>3x</option>
							<option selected>5x</option>
							<option>7x</option>
						</select>
					</label>
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 sm:col-span-2 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Whitelist IP Admin</div>
							<div class="text-xs text-slate-500">Pisahkan koma</div>
						</div>
						<input
							class="w-1/2 rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
							placeholder="123.123.123.1, 10.0.0.1"
						/>
					</label>
					<div class="flex gap-3 sm:col-span-2">
						<button class="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
							>Simpan</button
						>
						<button class="rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-800"
							>Reset</button
						>
					</div>
				</div>
			</div>
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
			>
				<h3 class="font-semibold">Sesi Aktif</h3>
				<ul class="mt-3 space-y-2 text-sm">
					<li>
						Chrome • MacOS • IP 123.45.67.89 <button class="ml-2 rounded border px-2 py-1 text-xs"
							>Logout</button
						>
					</li>
					<li>
						Safari • iPhone • IP 123.45.67.90 <button class="ml-2 rounded border px-2 py-1 text-xs"
							>Logout</button
						>
					</li>
				</ul>
			</div>
		</section>
	{/if}

	{#if tab === 'backup'}
		<section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
			>
				<h2 class="text-lg font-semibold">Backup & Restore</h2>
				<div class="mt-4 grid gap-4 text-sm sm:grid-cols-2">
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Jadwal Backup</div>
							<div class="text-xs text-slate-500">Waktu server</div>
						</div>
						<select
							class="rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-800"
						>
							<option>Harian</option>
							<option selected>Mingguan</option>
							<option>Bulanan</option>
						</select>
					</label>
					<label
						class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800"
					>
						<div>
							<div class="font-medium">Penyimpanan</div>
							<div class="text-xs text-slate-500">Local / S3 / GDrive</div>
						</div>
						<select
							class="rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-800"
						>
							<option selected>Local</option>
							<option>Amazon S3</option>
							<option>Google Drive</option>
						</select>
					</label>
				</div>
				<div class="mt-4 flex gap-3">
					<button class="rounded-xl border px-4 py-2">Backup Sekarang</button>
					<button class="rounded-xl border px-4 py-2">Unggah File Restore</button>
				</div>
			</div>
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
			>
				<h3 class="font-semibold">Histori Backup</h3>
				<ul class="mt-3 space-y-2 text-sm">
					<li>
						09 Okt 2025 • 08:30 • 32MB <button class="ml-2 rounded border px-2 py-1 text-xs"
							>Unduh</button
						>
					</li>
					<li>
						02 Okt 2025 • 08:30 • 31MB <button class="ml-2 rounded border px-2 py-1 text-xs"
							>Unduh</button
						>
					</li>
				</ul>
			</div>
		</section>
	{/if}

	{#if tab === 'audit'}
		<section class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
			>
				<h2 class="text-lg font-semibold">Audit Log</h2>
				<div class="mt-4 overflow-x-auto text-sm">
					<table class="min-w-full">
						<thead class="border-y border-slate-200 text-left text-xs dark:border-slate-800">
							<tr>
								<th class="py-2 pr-4">Waktu</th>
								<th class="py-2 pr-4">Pengguna</th>
								<th class="py-2 pr-4">Aksi</th>
								<th class="py-2 pr-4">Detail</th>
								<th class="py-2 pr-4">IP</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-slate-100 dark:border-slate-800">
								<td class="py-2 pr-4">09 Okt 2025 • 09:05</td>
								<td class="py-2 pr-4">admin</td>
								<td class="py-2 pr-4">UPDATE</td>
								<td class="py-2 pr-4">Ubah jam pelayanan</td>
								<td class="py-2 pr-4">123.45.67.89</td>
							</tr>
							<tr>
								<td class="py-2 pr-4">09 Okt 2025 • 08:40</td>
								<td class="py-2 pr-4">dodi</td>
								<td class="py-2 pr-4">CREATE</td>
								<td class="py-2 pr-4">Tambah role operator</td>
								<td class="py-2 pr-4">123.45.67.90</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
			>
				<h3 class="font-semibold">Filter</h3>
				<div class="mt-3 space-y-3 text-sm">
					<input
						placeholder="Cari pengguna/aksi"
						class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
					/>
					<select
						class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
					>
						<option>Semua</option>
						<option>CREATE</option>
						<option>UPDATE</option>
						<option>DELETE</option>
					</select>
					<button class="rounded-xl border px-4 py-2">Terapkan</button>
				</div>
			</div>
		</section>
	{/if}
</main>
