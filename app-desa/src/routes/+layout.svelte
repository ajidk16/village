<script lang="ts">
	import ToastOutlet from '$lib/components/ui/toast-outlet.svelte';
	import '../app.css';

	export let data;
	const user = data.user;
</script>

<div class="flex min-h-dvh flex-col bg-gray-50 text-gray-900">
	<nav class="border-b bg-white">
		<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
			<a href="/" class="font-semibold">Aplikasi Desa</a>
			<div class="flex gap-4 text-sm">
				{#if user}
					<a href="/dashboard">Dashboard</a>
					<a href="/residents" class="opacity-90 hover:opacity-100">Residents</a>
					<form method="POST" action="/api/auth/logout" on:submit>
						<button class="text-red-600">Logout</button>
					</form>
				{:else}
					<a href="/auth/login">Login</a>
				{/if}
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-5xl flex-1 px-4 py-6">
		<slot />
		<ToastOutlet />
	</main>
</div>
