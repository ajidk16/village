<script>
	import { page } from '$app/stores';
	import { data } from '$lib/utils/sidebar';

	$: currentPath = $page.url.pathname;
</script>

<aside
	id="sidebar"
	class="top-0 hidden h-screen flex-col overflow-y-auto border-r border-slate-200 bg-white/80 backdrop-blur md:flex lg:sticky lg:block lg:h-screen dark:border-slate-800 dark:bg-slate-900/80"
>
	<div class="flex items-center gap-3 p-4">
		<div
			class="grid h-10 w-10 place-content-center rounded-xl bg-brand-600 font-bold text-white shadow-soft"
		>
			DH
		</div>
		<div>
			<div class="font-semibold">Desa Harmoni</div>
			<div class="text-xs text-slate-500">Smart Village</div>
		</div>
	</div>
	<nav class="flex-1 px-2 py-3 text-sm">
		{#each data as item}
			<a
				class="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200 {currentPath ===
				item.href
					? 'bg-brand-100 font-medium text-brand-700 dark:bg-brand-900/20 dark:text-brand-300'
					: 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}"
				href={item.href}
			>
				{item.icon}
				{item.name}
			</a>
		{/each}
	</nav>
	<div class="p-4">
		<div class="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
			<div class="text-xs text-slate-500">Versi Aplikasi</div>
			<div class="font-medium">v1.0.0</div>
		</div>
	</div>
</aside>
