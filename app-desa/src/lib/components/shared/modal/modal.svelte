<script lang="ts">
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
		class="bg-opacity-50 fixed inset-0 z-40 bg-black"
		on:click={closeDrawer}
		aria-label="Close modal overlay"
	></button>

	<section
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
	>
		<div class="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
			<h2 id="modal-title" class="mb-4 text-xl font-bold">{title}</h2>

			<button
				type="button"
				class="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
				on:click={closeDrawer}
				aria-label="Close modal"
			>
				&#10005;
			</button>

			<slot></slot>
		</div>
	</section>
{/if}
