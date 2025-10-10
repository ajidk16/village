<script lang="ts">
	import Button from '$lib/components/shared/button/button.svelte';
	import { EyeIcon, SquarePen, Trash2 } from '@lucide/svelte';

	export let row: any;
	export let edit: boolean = false;
	export let preview: boolean = false;
	export let remove: boolean = false;

	export let onEdit: (row: any) => void = () => {};
	export let onDelete: (row: any) => void = () => {};
	export let onPreview: (row: any) => void = () => {};
</script>

<div class="flex justify-start gap-2">
	{#if preview}
		<Button
			as="button"
			loading={false}
			size="icon"
			rounded="md"
			variant="secondary"
			onClick={() => onPreview(row)}><EyeIcon size={16} /></Button
		>
	{/if}
	{#if edit}
		<Button
			as="button"
			loading={false}
			size="icon"
			rounded="md"
			variant="outline"
			onClick={() => onEdit(row)}><SquarePen size={16} /></Button
		>
	{/if}
	{#if remove}
		<Button
			as="button"
			loading={false}
			rounded="md"
			size="icon"
			variant="danger"
			onClick={() => onDelete(row)}><Trash2 size={16} /></Button
		>
	{/if}
</div>
