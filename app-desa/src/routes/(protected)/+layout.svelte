<script>
	import Sidebar from '$lib/components/admin/sidebar/sidebar.svelte';
	import TopBar from '$lib/components/admin/top-bar/top-bar.svelte';

	// SIDEBAR (mobile drawer)
	let drawerOpen = false;
</script>

<main class="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
	<div class="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
		<Sidebar />

		<main class="min-h-screen">
			<TopBar />
			<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
