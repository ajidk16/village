<script lang="ts">
	import { ChevronDown, ChevronUp } from '@lucide/svelte';

	export let items: { id: string | number; label: string }[] = [];
	export let onSelect: (item: { id: string | number; label: string }) => void;
	export let placeholder: string = 'Select an option';

	let isOpen = false;
	let selectedLabel = placeholder;

	function toggle() {
		isOpen = !isOpen;
	}

	function selectItem(item: { id: string | number; label: string }) {
		selectedLabel = item.label;
		isOpen = false;
		if (onSelect) onSelect(item);
	}

	function close() {
		isOpen = false;
	}

	function clickOutside(node: HTMLElement, callback: () => void) {
		function handleClick(event: MouseEvent) {
			if (!node.contains(event.target as Node)) {
				callback();
			}
		}

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div use:clickOutside={close} class="relative inline-block text-left">
	<button
		type="button"
		class="inline-flex w-48 justify-between rounded-xl border border-gray-300 bg-white px-2 py-1.5 shadow-sm hover:bg-gray-50"
		aria-haspopup="true"
		aria-expanded={isOpen}
		on:click={toggle}
	>
		{selectedLabel}
		{#if isOpen}
			<ChevronUp size={24} />
		{:else}
			<ChevronDown size={24} />
		{/if}
		<!-- <EllipsisVertical size={16} /> -->
	</button>

	{#if isOpen}
		<ul
			class="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
			role="menu"
			tabindex="-1"
		>
			{#each items as item (item.id)}
				<li
					role="menuitem"
					class="cursor-pointer px-4 py-2 hover:bg-gray-50 hover:text-black"
					on:click={() => selectItem(item)}
					tabindex="0"
					on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectItem(item)}
				>
					{item.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
