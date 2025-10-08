<script lang="ts">
	import { api } from '$lib/api';
	import type { PageData } from '../../../routes/$types';

	export let name = 'household_id';
	export let value: string | null = null;

	let label = '';
	let options: Array<{ id: string; label: string }> = [];
	let typing = '';
	let loading = false;
	let timer: any;

	// fetch opsi
	async function search(q: string) {
		loading = true;
		try {
			const res = await api(`/household?q=${encodeURIComponent(q)}`, {
				method: 'GET'
				// token:
			});
			const json = await res.json();

			const arr = Array.isArray(json) ? json : (json.data ?? []);
			options = arr.map((x: any) => ({
				id: String(x.id),
				label: x.nama_kepala_keluarga ?? x.head_name ?? x.label ?? `KK #${x.id}`
			}));
		} catch {
			options = [];
		} finally {
			loading = false;
		}
	}

	function onInput(e: Event) {
		typing = (e.target as HTMLInputElement).value;
		clearTimeout(timer);
		timer = setTimeout(() => search(typing), 250);
	}

	function pick(o: { id: string; label: string }) {
		value = o.id;
		label = o.label;
		typing = o.label;
		options = [];
	}
</script>

<div class="relative">
	<label for="household_id" class="mb-1 block text-sm">Household (KK)</label>
	<input
		class="w-full rounded border-gray-300"
		placeholder="Cari KK (nama/no)"
		value={typing || label}
		on:input={onInput}
	/>
	{#if loading}
		<div class="absolute top-2.5 right-3 text-xs opacity-70">memuat…</div>
	{/if}
	{#if options.length > 0}
		<div class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded border bg-white shadow">
			{#each options as o}
				<button
					type="button"
					class="w-full px-3 py-2 text-left hover:bg-gray-50"
					on:click={() => pick(o)}
				>
					{o.label} <span class="opacity-60">#{o.id}</span>
				</button>
			{/each}
		</div>
	{/if}

	<!-- nilai yang dikirim ke action -->
	<input type="hidden" {name} value={value ?? ''} />
</div>
