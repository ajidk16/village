<script lang="ts">
	import Button from '$lib/components/shared/button/button.svelte';
	import { Edit, Edit2, EyeIcon, SquarePen, Trash2 } from '@lucide/svelte';

	export let row: any;
	export let onEdit: (row: any) => void = () => {};
	export let onDelete: (row: any) => void = () => {};
	export let onPreview: (row: any) => void = () => {};
</script>

<div class="flex justify-start gap-2">
	<Button
		as="button"
		loading={false}
		size="icon"
		rounded="md"
		variant="secondary"
		onClick={() => onPreview(row)}><EyeIcon size={16} /></Button
	>
	<Button
		as="button"
		loading={false}
		rounded="md"
		size="icon"
		variant="outline"
		onClick={() => onEdit(row)}><SquarePen size={16} /></Button
	>
	<Button
		as="button"
		loading={false}
		size="icon"
		rounded="md"
		variant="outline"
		onClick={() => onDelete(row)}><Trash2 color="red" size="16" /></Button
	>
</div>
