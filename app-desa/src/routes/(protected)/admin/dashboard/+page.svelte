<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	// export let data;
	// console.log(data);

	// CHARTS
	type ChartT = Chart<'line' | 'doughnut', number[], string>;
	let permohonanCanvas: HTMLCanvasElement;
	let apbdesCanvas: HTMLCanvasElement;
	let permohonanChart: ChartT | null = null;
	let apbdesChart: ChartT | null = null;

	const palette = {
		line: 'rgba(99,102,241,0.9)',
		fill: 'rgba(99,102,241,0.15)',
		sky: 'rgba(56,189,248,0.9)',
		amber: 'rgba(245,158,11,0.9)',
		emerald: 'rgba(16,185,129,0.9)'
	} as const;

	let rangeWeeks = 8; // bind ke <select>
	function weeksLabels(n: number) {
		return Array.from({ length: n }, (_, i) => `M${i + 1}`);
	}
	const baseSeries = [
		18, 22, 19, 25, 28, 27, 31, 29, 26, 30, 33, 35, 32, 31, 29, 28, 26, 25, 27, 29, 30, 31, 33, 34
	];

	function initCharts() {
		// Line chart
		permohonanChart?.destroy();
		permohonanChart = new Chart(permohonanCanvas.getContext('2d')!, {
			type: 'line',
			data: {
				labels: weeksLabels(rangeWeeks),
				datasets: [
					{
						label: 'Permohonan',
						data: baseSeries.slice(0, rangeWeeks),
						borderColor: palette.line,
						backgroundColor: palette.fill,
						fill: true,
						tension: 0.35,
						pointRadius: 2
					}
				]
			},
			options: {
				plugins: { legend: { display: false } },
				scales: {
					x: { grid: { display: false } },
					y: { beginAtZero: true, ticks: { stepSize: 10 } }
				}
			}
		});

		// Doughnut chart
		apbdesChart?.destroy();
		apbdesChart = new Chart(apbdesCanvas.getContext('2d')!, {
			type: 'doughnut',
			data: {
				labels: ['Operasional', 'Modal', 'Pemberdayaan', 'Tak Terduga'],
				datasets: [
					{
						data: [45, 30, 20, 5],
						backgroundColor: [palette.sky, palette.line, palette.emerald, palette.amber]
					}
				]
			},
			options: { plugins: { legend: { position: 'bottom' } } }
		});
	}

	onMount(() => {
		initCharts();
	});
</script>

<main>
	<!-- KPIs -->
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		<div
			class="fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="text-xs text-slate-500">Penduduk</div>
			<div class="mt-1 flex items-end justify-between">
				<div class="text-2xl font-bold">7.214</div>
				<span
					class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
					>+2.1%</span
				>
			</div>
		</div>
		<div
			class="fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="text-xs text-slate-500">Permohonan Aktif</div>
			<div class="mt-1 flex items-end justify-between">
				<div class="text-2xl font-bold">128</div>
				<span
					class="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
					>+14</span
				>
			</div>
		</div>
		<div
			class="fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="text-xs text-slate-500">Realisasi APBDes</div>
			<div class="mt-1 flex items-end justify-between">
				<div class="text-2xl font-bold">72%</div>
				<span
					class="rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
					>Q4</span
				>
			</div>
		</div>
		<div
			class="fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="text-xs text-slate-500">Kepuasan Warga</div>
			<div class="mt-1 flex items-end justify-between">
				<div class="text-2xl font-bold">4.6/5</div>
				<span
					class="rounded-full bg-fuchsia-100 px-2 py-0.5 text-xs text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300"
					>Survey</span
				>
			</div>
		</div>
	</div>

	<!-- Charts -->
	<div class="mt-8 grid items-stretch gap-6 lg:grid-cols-3">
		<div
			class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="flex items-center justify-between">
				<h3 class="font-semibold">Permohonan Per Minggu</h3>
				<select
					class="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-800"
					bind:value={rangeWeeks}
					on:change={() => initCharts()}
				>
					<option value={8}>8 minggu</option>
					<option value={12}>12 minggu</option>
					<option value={24}>24 minggu</option>
				</select>
			</div>
			<div class="mt-4"><canvas bind:this={permohonanCanvas} height="110"></canvas></div>
		</div>
		<div
			class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
		>
			<h3 class="font-semibold">Komposisi APBDes</h3>
			<div class="mt-4"><canvas bind:this={apbdesCanvas} height="110"></canvas></div>
			<ul class="mt-4 space-y-1 text-sm text-slate-600 dark:text-slate-300">
				<li>Belanja Operasional</li>
				<li>Belanja Modal</li>
				<li>Pemberdayaan</li>
				<li>Tak Terduga</li>
			</ul>
		</div>
	</div>

	<!-- Table + Activity -->
	<div class="mt-8 grid items-start gap-6 lg:grid-cols-3">
		<div
			class="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="flex items-center justify-between p-5">
				<h3 class="font-semibold">Pengajuan Terbaru</h3>
				<button
					class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
					>Lihat Semua</button
				>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full text-sm">
					<thead class="border-y border-slate-200 text-left dark:border-slate-800">
						<tr>
							<th class="px-5 py-3">No</th>
							<th class="py-3 pr-5">Pemohon</th>
							<th class="py-3 pr-5">Jenis Layanan</th>
							<th class="py-3 pr-5">Tanggal</th>
							<th class="py-3 pr-5">Status</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-slate-100 dark:border-slate-800">
							<td class="px-5 py-3">1</td>
							<td class="py-3 pr-5">Andi Wijaya</td>
							<td class="py-3 pr-5">Surat Domisili</td>
							<td class="py-3 pr-5">09 Okt 2025</td>
							<td class="py-3 pr-5"
								><span
									class="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
									>Menunggu</span
								></td
							>
						</tr>
						<tr class="border-b border-slate-100 dark:border-slate-800">
							<td class="px-5 py-3">2</td>
							<td class="py-3 pr-5">Siti Rahma</td>
							<td class="py-3 pr-5">Surat Usaha</td>
							<td class="py-3 pr-5">09 Okt 2025</td>
							<td class="py-3 pr-5"
								><span
									class="rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
									>Diproses</span
								></td
							>
						</tr>
						<tr>
							<td class="px-5 py-3">3</td>
							<td class="py-3 pr-5">Budi Santoso</td>
							<td class="py-3 pr-5">Keterangan Tidak Mampu</td>
							<td class="py-3 pr-5">08 Okt 2025</td>
							<td class="py-3 pr-5"
								><span
									class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
									>Selesai</span
								></td
							>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div
			class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
		>
			<h3 class="font-semibold">Aktivitas</h3>
			<ol class="mt-4 space-y-4 text-sm">
				<li class="flex gap-3">
					<span class="mt-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
					<div>
						<div class="font-medium">Permohonan #A-9821 selesai</div>
						<div class="text-xs text-slate-500">09 Okt 2025 • Operator: Rina</div>
					</div>
				</li>
				<li class="flex gap-3">
					<span class="mt-1.5 h-2 w-2 rounded-full bg-sky-500"></span>
					<div>
						<div class="font-medium">Tambah data penduduk (5)</div>
						<div class="text-xs text-slate-500">09 Okt 2025 • Admin: Dodi</div>
					</div>
				</li>
				<li class="flex gap-3">
					<span class="mt-1.5 h-2 w-2 rounded-full bg-amber-500"></span>
					<div>
						<div class="font-medium">Update pagu APBDes 2025</div>
						<div class="text-xs text-slate-500">08 Okt 2025 • Bendahara</div>
					</div>
				</li>
			</ol>
		</div>
	</div>
</main>
