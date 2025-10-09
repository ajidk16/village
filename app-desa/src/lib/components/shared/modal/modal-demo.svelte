<script lang="ts">
	import Button from '../button/button.svelte';
	import Modal from './modal.svelte';
	let showModal = false;

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
</script>

<Button size="sm" onClick={openModal}>Open Modal</Button>

<Modal isOpen={showModal} onClose={closeModal} title="Contoh Modal Dinamis">
	<p>Ini isi modal yang dapat disesuaikan menggunakan slot.</p>
	<button
		class="mt-4 rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
		on:click={closeModal}
	>
		Close from inside
	</button>
</Modal>
