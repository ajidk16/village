<script>
	import Card from './card.svelte';
</script>

<div class="grid gap-6 sm:grid-cols-2">
	<Card title="Statistik Pengajuan" className="fade-up">
		<div class="text-3xl font-bold text-brand-600">128</div>
		<p class="text-sm text-slate-500">Permohonan aktif bulan ini</p>

		<div slot="footer" class="flex justify-between">
			<span>Terakhir diperbarui: 9 Okt 2025</span>
			<button class="rounded-lg border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50">
				Detail
			</button>
		</div>
	</Card>

	<Card title="Penduduk" footerText="Data otomatis diperbarui harian">
		<div class="text-3xl font-bold text-emerald-600">7.214</div>
		<p class="text-sm text-slate-500">Jumlah penduduk terdaftar</p>
	</Card>

	<Card>
		<h3 class="mb-2 text-lg font-semibold">Card tanpa header</h3>
		<p>Isi konten bebas disini</p>
	</Card>
</div>
