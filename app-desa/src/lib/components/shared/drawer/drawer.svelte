<script lang="ts">
	export let isOpen: boolean = false;
	export let position: 'right' | 'left' | 'top' | 'bottom' = 'right';

	export let onClose: () => void;

	function closeDrawer() {
		if (onClose) onClose();
	}
</script>

{#if isOpen}
	<button
		type="button"
		class="bg-opacity-50 fixed inset-0 z-40 bg-black"
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
		<button
			type="button"
			class="mb-4 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
			on:click={closeDrawer}
		>
			Close
		</button>

		<slot></slot>
	</aside>
{/if}
