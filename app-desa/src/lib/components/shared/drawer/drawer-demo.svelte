<script lang="ts">
	import Drawer from './Drawer.svelte';
	let showDrawer = false;
	let drawerPosition: 'right' | 'left' | 'top' | 'bottom' = 'right';

	function openDrawer(pos: typeof drawerPosition) {
		drawerPosition = pos;
		showDrawer = true;
	}

	function handleClose() {
		showDrawer = false;
	}
</script>

<div class="space-x-2 p-4">
	<button class="btn" on:click={() => openDrawer('right')}>Open Right</button>
	<button class="btn" on:click={() => openDrawer('left')}>Open Left</button>
	<button class="btn" on:click={() => openDrawer('top')}>Open Top</button>
	<button class="btn" on:click={() => openDrawer('bottom')}>Open Bottom</button>
</div>

<Drawer bind:isOpen={showDrawer} position={drawerPosition} onClose={handleClose}>
	<h2 class="mb-3 text-xl font-bold">Drawer di {drawerPosition}</h2>
	<p>Ini adalah konten drawer yang bisa berubah sesuai posisi.</p>
</Drawer>
