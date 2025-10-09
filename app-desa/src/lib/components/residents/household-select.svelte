<script lang="ts">
	import { householdStore } from '$lib/stores/households/index.js';
	import { onMount } from 'svelte';

	export let name = 'household_id';
	export let value: string | null = null;

	let label = '';
	let options: Array<{ id: string; label: string }> = [];
	let typing = '';
	let loading = false;
	let timer: any;

	// Subscribe to household store
	$: households = $householdStore.items || [];

	// Set initial label berdasarkan value yang ada
	$: if (value && households.length > 0 && !label) {
		const found = households.find((h) => h.id.toString() === value);
		if (found) {
			label = `${found.no_kk} - ${found.alamat}`;
			typing = label;
		}
	}

	onMount(async () => {
		await householdStore.fetchAll();
	});

	function searchHouseholds(query: string) {
		if (!query.trim()) {
			options = [];
			return;
		}

		const filtered = households
			.filter(
				(h) =>
					h.no_kk.toLowerCase().includes(query.toLowerCase()) ||
					h.alamat.toLowerCase().includes(query.toLowerCase())
			)
			.map((h) => ({
				id: h.id.toString(),
				label: `${h.no_kk} - ${h.alamat}`
			}))
			.slice(0, 10); // Limit to 10 results

		options = filtered;
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		typing = target.value;

		// Clear selected value if typing doesn't match
		if (typing !== label) {
			value = null;
			label = '';
		}

		// Debounce search
		clearTimeout(timer);
		timer = setTimeout(() => {
			searchHouseholds(typing);
		}, 300);
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
		on:input={handleInput}
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
