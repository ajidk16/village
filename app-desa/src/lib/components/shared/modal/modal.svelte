<script lang="ts">
	import { X } from '@lucide/svelte';
	import Button from '../button/button.svelte';

	export let isOpen: boolean;
	export let onClose: () => void;
	export let title: string = 'Modal Title';

	function closeDrawer() {
		if (onClose) onClose();
	}
</script>

{#if isOpen}
	<button
		type="button"
		class="bg-opacity-50 fixed inset-0 z-40 bg-black opacity-80"
		on:click={closeDrawer}
		aria-label="Close modal overlay"
	></button>

	<section
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
	>
		<div
			class="relative max-h-[80svh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
		>
			<div class="mb-2 flex items-center justify-between">
				<h2 id="modal-title" class="text-xl font-bold">{title}</h2>
				<Button rounded="md" size="icon" onClick={closeDrawer} variant="outline">
					<X size={16} />
				</Button>
			</div>

			<slot></slot>
		</div>
	</section>
{/if}
