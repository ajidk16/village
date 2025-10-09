<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	// CHARTS
	type ChartT = Chart<'line' | 'doughnut', number[], string>;
	let permohonanCanvas: HTMLCanvasElement;
	let apbdesCanvas: HTMLCanvasElement;
	let permohonanChart: ChartT | null = null;
	let apbdesChart: ChartT | null = null;

	const palette = {
		pend: 'rgba(16,185,129,0.9)',
		bel: 'rgba(245,158,11,0.9)',
		fillPend: 'rgba(16,185,129,0.15)',
		fillBel: 'rgba(245,158,11,0.15)',
		line: 'rgba(99,102,241,0.9)'
	};

	let rangeWeeks = 8; // bind ke <select>
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'Mei',
		'Jun',
		'Jul',
		'Agu',
		'Sep',
		'Okt',
		'Nov',
		'Des'
	];
	const pendapatanBulanan = [120, 90, 110, 140, 100, 150, 95, 130, 170, 160, 155, 180];
	const belanjaBulanan = [80, 70, 100, 120, 90, 130, 85, 110, 150, 140, 145, 160];

	function initCharts() {
		// Line chart
		permohonanChart?.destroy();
		permohonanChart = new Chart(permohonanCanvas.getContext('2d')!, {
			type: 'line',
			data: {
				labels: months,
				datasets: [
					{
						label: 'Pendapatan',
						data: pendapatanBulanan,
						borderColor: palette.pend,
						backgroundColor: palette.fillPend,
						fill: true,
						tension: 0.35,
						pointRadius: 2
					},
					{
						label: 'Belanja',
						data: belanjaBulanan,
						borderColor: palette.bel,
						backgroundColor: palette.fillBel,
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
						backgroundColor: [palette.line, palette.bel, palette.pend, 'rgba(59,130,246,.9)']
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
	<!-- Filters & Actions -->
	<div class="flex flex-wrap items-center gap-3">
		<div class="flex items-center gap-2">
			<label class="text-sm">Tahun</label>
			<select
				id="yearSelect"
				class="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
			>
				<option>2023</option>
				<option>2024</option>
				<option selected>2025</option>
			</select>
		</div>
		<div class="flex items-center gap-2">
			<label class="text-sm">Triwulan</label>
			<select
				id="quarterSelect"
				class="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
			>
				<option value="Q1">Q1</option>
				<option value="Q2">Q2</option>
				<option value="Q3">Q3</option>
				<option value="Q4" selected>Q4</option>
			</select>
		</div>
		<div class="ml-auto flex flex-wrap items-center gap-2">
			<button
				id="btnImport"
				class="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
			>
				⬆️ Import (CSV/XLSX)
			</button>
			<button
				id="btnExport"
				class="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
			>
				⬇️ Export
			</button>
			<button
				id="btnTambah"
				class="rounded-xl bg-brand-600 px-4 py-2 text-sm text-white shadow-soft hover:bg-brand-700"
			>
				+ Tambah Transaksi
			</button>
		</div>
	</div>

	<!-- KPI Cards -->
	<div class="mt-8 grid items-stretch gap-6 lg:grid-cols-3">
		<div
			class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="flex items-center justify-between">
				<h3 class="font-semibold">Arus Kas Bulanan</h3>
				<span class="text-sm text-gray-500">2025</span>
			</div>
			<div class="mt-4"><canvas bind:this={permohonanCanvas} height="110"></canvas></div>
		</div>
		<div
			class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
		>
			<h3 class="font-semibold">Komposisi Belanja</h3>
			<div class="mt-4"><canvas bind:this={apbdesCanvas} height="110"></canvas></div>
			<ul class="mt-4 space-y-1 text-sm text-slate-600 dark:text-slate-300">
				<li>Operasional</li>
				<li>Modal</li>
				<li>Pemberdayaan</li>
				<li>Tak Terduga</li>
			</ul>
		</div>
	</div>

	<!-- Table & Side Panel -->
	<section class="mt-8 grid items-start gap-6 lg:grid-cols-3">
		<div
			class="rounded-2xl border border-slate-200 bg-white shadow-soft lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="flex flex-wrap items-center gap-3 p-5">
				<h3 class="mr-auto font-semibold">Daftar Transaksi</h3>
				<div class="flex items-center gap-2 text-sm">
					<select
						id="filterJenis"
						class="rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900"
					>
						<option value="">Semua Jenis</option>
						<option value="pendapatan">Pendapatan</option>
						<option value="belanja">Belanja</option>
					</select>
					<select
						id="filterKategori"
						class="rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900"
					>
						<option value="">Semua Kategori</option>
						<option>Operasional</option>
						<option>Modal</option>
						<option>Pemberdayaan</option>
						<option>Tak Terduga</option>
					</select>
					<label class="relative block">
						<input
							id="searchInput"
							type="text"
							placeholder="Cari nomor/uraian…"
							class="rounded-lg border border-slate-300 bg-white py-1.5 pr-3 pl-8 dark:border-slate-700 dark:bg-slate-900"
						/>
						<svg
							class="absolute top-2 left-2 h-4 w-4 text-slate-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16Z"
							/>
						</svg>
					</label>
				</div>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full text-sm">
					<thead class="border-y border-slate-200 text-left dark:border-slate-800">
						<tr>
							<th class="px-5 py-3">No</th>
							<th class="py-3 pr-5">Tanggal</th>
							<th class="py-3 pr-5">Nomor</th>
							<th class="py-3 pr-5">Uraian</th>
							<th class="py-3 pr-5">Jenis</th>
							<th class="py-3 pr-5">Kategori</th>
							<th class="py-3 pr-5 text-right">Jumlah</th>
							<th class="py-3 pr-5">Aksi</th>
						</tr>
					</thead>
					<tbody id="tbodyTransaksi"></tbody>
				</table>
			</div>
			<div class="flex items-center justify-between p-5 text-sm">
				<div id="pagingInfo" class="text-slate-500"></div>
				<div class="flex items-center gap-2">
					<button
						id="prevPage"
						class="rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-800"
					>
						Sebelumnya
					</button>
					<button
						id="nextPage"
						class="rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-800"
					>
						Berikutnya
					</button>
				</div>
			</div>
		</div>

		<aside
			class="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
		>
			<h3 class="font-semibold">Ringkasan Anggaran</h3>
			<dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
				<div>
					<dt class="text-slate-500">Pendapatan</dt>
					<dd id="sumPendapatan" class="font-semibold">Rp 0</dd>
				</div>
				<div>
					<dt class="text-slate-500">Belanja</dt>
					<dd id="sumBelanja" class="font-semibold">Rp 0</dd>
				</div>
				<div>
					<dt class="text-slate-500">Saldo</dt>
					<dd id="sumSaldo" class="font-semibold">Rp 0</dd>
				</div>
				<div>
					<dt class="text-slate-500">Realisasi</dt>
					<dd id="sumRealisasi" class="font-semibold">74%</dd>
				</div>
			</dl>
			<div class="mt-6">
				<h4 class="text-sm font-medium">Catatan</h4>
				<ul class="mt-2 list-inside list-disc space-y-1 text-xs text-slate-500">
					<li>Gunakan import untuk batch transaksi (CSV/XLSX).</li>
					<li>Export untuk laporan triwulan/tahun.</li>
					<li>Nomor transaksi unik (auto-suggest).</li>
				</ul>
			</div>
		</aside>
	</section>
</main>
