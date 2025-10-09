<script lang="ts">
	import Button from '$lib/components/shared/button/button.svelte';

	export let row: any;
	export let onEdit: (row: any) => void = () => {};
	export let onDelete: (row: any) => void = () => {};
</script>

<div class="flex justify-end gap-2">
	<Button rounded="md" size="xs" variant="outline" onClick={() => onEdit(row)}>Edit</Button>
	<!-- <button class="rounded-lg border px-2 py-1" on:click={() => onEdit(row)}>Edit</button> -->
	<button class="rounded-lg border px-2 py-1 text-rose-600" on:click={() => onDelete(row)}
		>Hapus</button
	>
</div>
