<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { data } from '$lib/utils/sidebar';
	import Button from '$lib/components/shared/button/button.svelte';
	import { Menu, X } from '@lucide/svelte';
	import { size } from 'zod';

	$: currentPath = $page.url.pathname;

	// THEME
	const THEME_KEY = 'theme';
	let isDark = false;
	function applyTheme() {
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
	}
	onMount(() => {
		const stored = localStorage.getItem(THEME_KEY);
		isDark =
			stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
		applyTheme();
	});
	function toggleTheme() {
		isDark = !isDark;
		applyTheme();
	}

	// SIDEBAR (mobile drawer)
	let drawerOpen = false;

	// USER MENU
	let userMenuOpen = false;
	function toggleUserMenu() {
		userMenuOpen = !userMenuOpen;
	}
	function onDocClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		// close menu if clicking outside any [data-user-menu]
		if (!target.closest('[data-user-menu]')) userMenuOpen = false;
	}
	onMount(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('click', onDocClick);
		}
	});
	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', onDocClick);
		}
	});

	// REVEAL ON SCROLL (as action)
	function reveal(node: HTMLElement, threshold = 0.2) {
		node.classList.add('fade-up');
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) node.classList.add('show');
				});
			},
			{ threshold }
		);
		io.observe(node);
		return {
			destroy() {
				io.disconnect();
			}
		};
	}
</script>

<header
	class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
		<Button
			rounded="md"
			size="icon"
			onClick={() => (drawerOpen = true)}
			className="lg:hidden"
			variant="outline"
		>
			<Menu size={16} />
		</Button>
		<h1 class="text-lg font-semibold capitalize">{currentPath.split('/')[2]}</h1>
		<div class="ml-auto flex items-center gap-3">
			<div class="hidden md:block">
				<label class="relative block">
					<input
						type="text"
						placeholder="Cari…"
						class="w-72 rounded-xl border border-slate-300 bg-white py-2 pr-3 pl-9 outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800"
					/>
					<svg
						class="absolute top-2.5 left-2.5 h-5 w-5 text-slate-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16Z"
						/></svg
					>
				</label>
			</div>
			<button
				class="rounded-lg border border-slate-200 p-2 dark:border-slate-800"
				aria-label="Toggle tema"
				on:click={toggleTheme}>🌓</button
			>
			<div class="relative" data-user-menu>
				<button
					class="flex items-center gap-2 rounded-lg border border-slate-200 p-2 dark:border-slate-800"
					on:click={toggleUserMenu}
				>
					<div class="h-8 w-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700"></div>
					<span class="hidden text-sm sm:block">Admin</span>
				</button>
				{#if userMenuOpen}
					<div
						class="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white py-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
					>
						<a
							class="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
							href="/profil">Profil</a
						>
						<a
							class="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
							href="/pengaturan">Pengaturan</a
						>
						<a
							class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
							href="/logout">Keluar</a
						>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>

<!-- Drawer Sidebar (mobile) -->
{#if drawerOpen}
	<div class="fixed inset-0 z-50">
		<div
			class="absolute inset-0 bg-black/30"
			role="button"
			tabindex="0"
			on:click={() => (drawerOpen = false)}
			on:keydown={(e) => (e.key === 'Enter' || e.key === ' ' ? (drawerOpen = false) : null)}
		></div>

		<aside
			class="absolute top-0 bottom-0 left-0 w-72 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div
						class="grid h-9 w-9 place-content-center rounded-xl bg-brand-600 font-bold text-white"
					>
						DH
					</div>
					<span class="font-semibold">Desa Harmoni</span>
				</div>

				<Button
					rounded="md"
					size="icon"
					onClick={() => (drawerOpen = false)}
					className="lg:hidden"
					variant="outline"
				>
					<X size={16} />
				</Button>
			</div>
			<nav class="mt-4 space-y-1 text-sm">
				{#each data as item}
					<a
						class="block rounded-xl px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
						href={item.href}
						on:click={() => (drawerOpen = false)}>{item.icon} {item.name}</a
					>
				{/each}
			</nav>
		</aside>
	</div>
{/if}
