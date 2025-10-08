<script lang="ts">
	import ResidentForm from '$lib/components/residents/resident-form.svelte';

	export let data;
	export let form;

	const values = form?.values ?? data.values.data ?? {};
	const errors = form?.errors ?? {};
</script>

<h1 class="mb-4 text-2xl font-semibold">Edit Penduduk</h1>

<form method="POST" class="space-y-4 rounded-xl bg-white p-5 shadow">
	{#if errors.form}<p class="text-sm text-red-600">{errors.form}</p>{/if}

	<ResidentForm {values} {errors} />

	<div class="flex items-center gap-2 pt-2">
		<button class="rounded-lg bg-black px-4 py-2 text-white">Perbarui</button>
		<a href="/residents" class="rounded border px-4 py-2">Kembali</a>
	</div>
</form>
