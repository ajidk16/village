<script lang="ts">
	import { X } from '@lucide/svelte';
	import Button from '../button/button.svelte';

	export let isOpen: boolean = false;
	export let position: 'right' | 'left' | 'top' | 'bottom' = 'right';
	export let title: string = '';

	export let onClose: () => void;

	function closeDrawer() {
		if (onClose) onClose();
	}
</script>

{#if isOpen}
	<button
		type="button"
		class="bg-opacity-50 opacity-80 fixed inset-0 z-40 bg-black"
		on:click={closeDrawer}
		aria-label="Close drawer overlay"
	></button>

	<aside
		class={`fixed z-50 overflow-auto bg-white p-4 shadow-lg
      ${position === 'right' ? 'top-0 right-0 h-full w-80' : ''}
      ${position === 'left' ? 'top-0 left-0 h-full w-80' : ''}
      ${position === 'top' ? 'top-0 left-0 h-60 w-full' : ''}
      ${position === 'bottom' ? 'bottom-0 left-0 h-60 w-full' : ''}
    `}
	>
		<div class="mb-2 flex items-center justify-between">
			<h2 class="text-lg font-semibold text-slate-800 dark:text-slate-200">
				{title}
			</h2>

			<Button rounded="md" size="icon" onClick={closeDrawer} variant="outline">
				<X size={16} />
			</Button>
		</div>

		<slot></slot>
	</aside>
{/if}
