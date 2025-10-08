<script lang="ts">
	import { toast, type ToastItem } from '$lib/stores/toast';
	let items: ToastItem[] = [];
</script>

<div class="fixed top-3 right-3 z-50 space-y-2">
	{#each items as t (t.id)}
		<div
			class="max-w-[480px] min-w-[240px] rounded-lg px-4 py-2 text-sm shadow
                {t.kind === 'success' ? 'bg-green-600 text-white' : ''}
                {t.kind === 'error' ? 'bg-red-600 text-white' : ''}
                {t.kind === 'info' ? 'bg-gray-800 text-white' : ''}"
		>
			<div class="flex items-start gap-3">
				<div class="font-medium capitalize">{t.kind}</div>
				<div class="flex-1">{t.text}</div>
				<button class="opacity-80 hover:opacity-100" on:click={() => toast.remove(t.id)}>✕</button>
			</div>
		</div>
	{/each}
</div>
