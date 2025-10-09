<script>
	import Sidebar from '$lib/components/admin/sidebar/sidebar.svelte';
	import TopBar from '$lib/components/admin/top-bar/top-bar.svelte';

	// SIDEBAR (mobile drawer)
	let drawerOpen = false;
</script>

<!-- <script>
	// Theme
	const root = document.documentElement;
	const storedTheme = localStorage.getItem('theme');
	if (
		storedTheme === 'dark' ||
		(!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
	)
		root.classList.add('dark');
	document.getElementById('themeToggle').addEventListener('click', () => {
		root.classList.toggle('dark');
		localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
	});

	// User menu
	const userBtn = document.getElementById('userBtn');
	const userMenu = document.getElementById('userMenu');
	userBtn.addEventListener('click', () => userMenu.classList.toggle('hidden'));
	document.addEventListener('click', (e) => {
		if (!userBtn.contains(e.target) && !userMenu.contains(e.target))
			userMenu.classList.add('hidden');
	});

	// Drawer
	const openSidebar = document.getElementById('openSidebar');
	const drawer = document.getElementById('drawer');
	const closeDrawer = document.getElementById('closeDrawer');
	const drawerBackdrop = document.getElementById('drawerBackdrop');
	openSidebar.addEventListener('click', () => drawer.classList.remove('hidden'));
	closeDrawer.addEventListener('click', () => drawer.classList.add('hidden'));
	drawerBackdrop.addEventListener('click', () => drawer.classList.add('hidden'));

	// Reveal on scroll
	const obs = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (en.isIntersecting) en.target.classList.add('show');
			});
		},
		{ threshold: 0.2 }
	);
	document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));

	// Charts
	const palette = {
		line: 'rgba(99,102,241,0.9)',
		fill: 'rgba(99,102,241,0.15)',
		sky: 'rgba(56,189,248,0.9)',
		amber: 'rgba(245,158,11,0.9)',
		emerald: 'rgba(16,185,129,0.9)'
	};

	const weeks = Array.from({ length: 8 }, (_, i) => `M${i + 1}`);
	const permohonanCtx = document.getElementById('permohonanChart');
	let permohonanChart = new Chart(permohonanCtx, {
		type: 'line',
		data: {
			labels: weeks,
			datasets: [
				{
					label: 'Permohonan',
					data: [18, 22, 19, 25, 28, 27, 31, 29],
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

	document.getElementById('rangeSelect').addEventListener('change', (e) => {
		const len = Number(e.target.value);
		const labels = Array.from({ length: len }, (_, i) => `M${i + 1}`);
		const base = [
			18, 22, 19, 25, 28, 27, 31, 29, 26, 30, 33, 35, 32, 31, 29, 28, 26, 25, 27, 29, 30, 31, 33, 34
		];
		permohonanChart.data.labels = labels;
		permohonanChart.data.datasets[0].data = base.slice(0, len);
		permohonanChart.update();
	});

	const apbCtx = document.getElementById('apbdesChart');
	new Chart(apbCtx, {
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

	// Year
	document.getElementById('year').textContent = new Date().getFullYear();
</script> -->

<main class="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
	<!-- Layout wrapper -->
	<div class="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Main -->
		<main class="min-h-screen">
			<!-- Topbar -->
			<TopBar />

			<!-- Content -->
			<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<!-- KPIs -->
				<slot />
			</div>

			<footer
				class="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800"
			>
				© <span id="year"></span> Pemerintah Desa Harmoni
			</footer>
		</main>
	</div>
</main>
