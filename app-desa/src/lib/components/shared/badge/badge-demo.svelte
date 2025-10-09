<script>
	import Badge from './badge.svelte';
</script>

<div class="space-y-6 p-6">
	<h1 class="text-lg font-semibold">Badge Playground</h1>

	<div class="flex flex-wrap gap-3">
		<Badge>Neutral</Badge>
		<Badge variant="brand">Brand</Badge>
		<Badge variant="success">Sukses</Badge>
		<Badge variant="warning">Peringatan</Badge>
		<Badge variant="danger">Bahaya</Badge>
		<Badge variant="info">Info</Badge>
	</div>

	<div class="flex flex-wrap gap-3">
		<Badge tone="solid" variant="brand">Solid</Badge>
		<Badge tone="outline" variant="brand">Outline</Badge>
		<Badge tone="ghost" variant="brand">Ghost</Badge>
		<Badge tone="soft" variant="brand">Soft</Badge>
	</div>

	<div class="flex flex-wrap items-center gap-3">
		<Badge size="xs" variant="success">XS</Badge>
		<Badge size="sm" variant="success">SM</Badge>
		<Badge size="md" variant="success">MD</Badge>
	</div>

	<div class="flex flex-wrap items-center gap-3">
		<Badge variant="warning" roundedFull={false}>Rounded MD</Badge>
		<Badge variant="brand" href="#">Link Badge</Badge>
		<!-- {#if !closed}
			<Badge variant="danger" dismissible on:close={() => (closed = true)}>Dismissible</Badge>
		{/if} -->
	</div>

	<div class="flex flex-wrap items-center gap-3">
		<Badge variant="info">
			<span slot="left">ℹ️</span>
			Dengan ikon kiri
		</Badge>
		<Badge variant="success">
			Dengan ikon kanan
			<span slot="right">✅</span>
		</Badge>
	</div>
</div>
