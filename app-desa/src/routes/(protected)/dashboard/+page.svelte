<script lang="ts">
	export let data;
</script>

<h1 class="mb-4 text-2xl font-semibold">Dashboard</h1>
<p class="mb-6 text-sm text-gray-600">
	Halo, {data?.user?.name ?? data?.user?.email} ({data?.user?.role})
</p>

<div class="grid grid-cols-2 gap-4">
	<div class="rounded-xl bg-white p-4 shadow">
		<div class="text-sm text-gray-500">Total Penduduk</div>
		<div class="text-2xl font-bold">{data?.summary?.residents}</div>
	</div>
	<div class="rounded-xl bg-white p-4 shadow">
		<div class="text-sm text-gray-500">Total KK</div>
		<div class="text-2xl font-bold">{data?.summary?.households}</div>
	</div>
</div>
