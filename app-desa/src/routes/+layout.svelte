<script lang="ts">
	import ToastOutlet from '$lib/components/ui/toast-outlet.svelte';
	import { session } from '$lib/stores/session';
	import '../app.css';

	export let data;

	session.set({
		token: data?.token?.toString() ?? '',
		user: {
			id: data?.user?.id ?? 0,
			email: data?.user?.email ?? '',
			name: data?.user?.name ?? '',
			role: data?.user?.role ?? ''
		}
	});

	const user = data.user;
</script>

<div class="flex min-h-dvh flex-col bg-gray-50 text-gray-900">
	<main>
		<slot />
		<ToastOutlet />
	</main>
</div>
