<script context="module" lang="ts">
	type Align = 'left' | 'center' | 'right';
	import type { SvelteComponent } from 'svelte';
	export type AnySvelteComponent = typeof SvelteComponent<any>;

	export type Column<T = any> = {
		key: keyof T | string; // field path, supports dot e.g. 'user.name'
		header: string; // column header label
		width?: string; // Tailwind width e.g. 'w-40'
		align?: Align; // text alignment
		sortable?: boolean; // enable sort
		visible?: boolean; // column visibility
		render?: (row: T) => any; // custom cell renderer
		component?: AnySvelteComponent;
		componentProps?: (row: T) => Record<string, any>;
	};
</script>

<script lang="ts">
	import { ChevronDown, ChevronUp, Search } from '@lucide/svelte';

	import { createEventDispatcher, onMount } from 'svelte';
	export let data: any[] = [];
	export let columns: Column[] = [];
	export let pageSizeOptions: number[] = [10, 25, 50];
	export let serverMode = false;
	export let rowKey: (row: any, idx: number) => string = (r, i) => String(r?.id ?? i);
	export let striped = true;
	export let stickyHeader = true;
	export let searchable = true;
	export let selectable = false;

	const dispatch = createEventDispatcher();

	// --- STATE ---
	let q = '';
	let page = 1;
	let pageSize = pageSizeOptions[0] ?? 10;
	let sortBy: string | null = null;
	let sortDir: 'asc' | 'desc' = 'asc';
	let visibleCols: Column[] = [];
	let selected = new Set<string>();

	onMount(() => {
		visibleCols = columns.map((c) => ({ ...c, visible: c.visible !== false }));
	});

	// --- HELPERS ---
	function get(obj: any, path: string | number) {
		if (typeof path !== 'string') return obj?.[path];
		return path.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), obj);
	}
	function cmp(a: any, b: any) {
		if (a == null && b == null) return 0;
		if (a == null) return -1;
		if (b == null) return 1;
		if (typeof a === 'number' && typeof b === 'number') return a - b;
		return String(a).localeCompare(String(b), 'id');
	}

	// --- CLIENT DERIVED DATA ---
	$: base = serverMode
		? data
		: data.filter((r) => {
				if (!q) return true;
				const str = JSON.stringify(r).toLowerCase();
				return str.includes(q.toLowerCase());
			});
	$: sorted =
		serverMode || !sortBy
			? base
			: [...base].sort((a, b) => {
					const aa = get(a, sortBy!);
					const bb = get(b, sortBy!);
					const res = cmp(aa, bb);
					return sortDir === 'asc' ? res : -res;
				});
	$: total = sorted.length;
	$: pageStart = (page - 1) * pageSize;
	$: pageEnd = Math.min(pageStart + pageSize, total);
	$: pageRows = serverMode ? data : sorted.slice(pageStart, pageEnd);

	// --- ACTIONS ---
	function toggleSort(key: string) {
		if (!key) return;
		if (sortBy === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = key;
			sortDir = 'asc';
		}
		if (serverMode) dispatch('sort', { sortBy, sortDir });
	}
	function gotoPrev() {
		if (page > 1) {
			page -= 1;
			if (serverMode) dispatch('page', { page, pageSize });
		}
	}
	function gotoNext() {
		const max = Math.max(1, Math.ceil(total / pageSize));
		if (page < max) {
			page += 1;
			if (serverMode) dispatch('page', { page, pageSize });
		}
	}
	function changePageSize(n: number) {
		pageSize = n;
		page = 1;
		if (serverMode) dispatch('page', { page, pageSize });
	}
	function resetToFirst() {
		page = 1;
		if (serverMode) dispatch('page', { page, pageSize });
	}

	// Selection

	function toggleAll(checked: boolean) {
		if (!selectable) return;
		if (checked) {
			selected = new Set(pageRows.map((r, i) => rowKey(r, i)));
		} else {
			selected = new Set();
		}
		dispatch('select', { ids: Array.from(selected) });
	}
	function toggleRow(id: string, checked: boolean) {
		if (checked) selected.add(id);
		else selected.delete(id);
		dispatch('select', { ids: Array.from(selected) });
	}
	$: allChecked =
		selectable && pageRows.length > 0 && pageRows.every((r, i) => selected.has(rowKey(r, i)));

	// expose method (optional) via dispatch for parent to clear selection
	export function clearSelection() {
		selected.clear();
	}
</script>

<div
	class="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
>
	<!-- Toolbar -->
	<div class="flex justify-between border-b border-slate-300 px-4 py-3 dark:border-slate-800">
		{#if searchable}
			<label class="flex items-center gap-x-2 rounded-xl border border-slate-300 pr-3 outline-none">
				<input
					type="text"
					placeholder="Cari…"
					bind:value={q}
					on:input={resetToFirst}
					class="w-64 rounded-xl border border-none bg-white py-1.5 outline-none active:outline-none dark:border-slate-700 dark:bg-slate-800"
				/>
				<Search size={16} />
			</label>
		{/if}

		<div class="ml-auto flex items-center gap-2">
			<select
				class="w-full rounded-lg border border-slate-300 bg-white py-1.5 sm:w-auto dark:border-slate-700 dark:bg-slate-800"
				bind:value={pageSize}
				on:change={(e) => changePageSize(Number((e.target as HTMLSelectElement).value))}
			>
				{#each pageSizeOptions as n}
					<option value={n}>{n}</option>
				{/each}
			</select>

			<div class="relative">
				<details class="group">
					<summary
						class="cursor-pointer list-none rounded-lg border border-slate-200 px-3 py-1.5 select-none dark:border-slate-800"
						>Kolom</summary
					>
					<div
						class="absolute right-0 z-10 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-[0_12px_30px_-12px_rgba(0,0,0,.25)] dark:border-slate-800 dark:bg-slate-900"
					>
						{#each visibleCols as c, i}
							<label class="flex items-center gap-2 py-1">
								<input type="checkbox" bind:checked={c.visible} />
								<span>{c.header}</span>
							</label>
						{/each}
					</div>
				</details>
			</div>
		</div>

		<!-- Footer / Pagination -->
	</div>
	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="min-w-full text-sm">
			<thead
				class={`border-y border-slate-200 text-left dark:border-slate-800 ${stickyHeader ? 'sticky top-0 bg-white/70 backdrop-blur dark:bg-slate-900/70' : ''}`}
			>
				<tr>
					{#if selectable}
						<th class="w-10 px-4 py-3">
							<input
								type="checkbox"
								class="h-4 w-4 cursor-pointer"
								bind:checked={allChecked}
								on:change={(e) => toggleAll((e.target as HTMLInputElement).checked)}
							/>
						</th>
					{/if}
					{#each visibleCols.filter((c) => c.visible) as c}
						<th class={`py-3 pr-5 ${c.width ?? ''}`}>
							<button
								class="inline-flex cursor-pointer items-center gap-1"
								on:click={() => c.sortable && toggleSort(String(c.key))}
							>
								<span>{c.header}</span>
								{#if c.sortable}
									{#if sortBy === c.key && sortDir === 'asc'}
										<ChevronUp size={16} />
									{:else if sortBy === c.key && sortDir === 'desc'}
										<ChevronDown size={16} />
									{/if}
								{/if}
							</button>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#if pageRows.length === 0}
					<tr
						><td
							colspan={visibleCols.filter((c) => c.visible).length + (selectable ? 1 : 0)}
							class="px-5 py-6 text-center text-slate-500">Tidak ada data</td
						></tr
					>
				{:else}
					{#each pageRows as r, i}
						<tr
							class={`${striped && i % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-900/40' : ''} border-b border-slate-100 dark:border-slate-800`}
						>
							{#if selectable}
								<td class="px-4 py-3">
									<input
										type="checkbox"
										class="h-4 w-4 cursor-pointer"
										checked={selected.has(rowKey(r, i))}
										on:change={(e) =>
											toggleRow(rowKey(r, i), (e.target as HTMLInputElement).checked)}
									/>
								</td>
							{/if}
							{#each visibleCols.filter((c) => c.visible) as c}
								<td
									class={`py-3 pr-5 ${c.align === 'center' ? 'text-center' : c.align === 'right' ? 'text-right' : 'text-left'}`}
								>
									{#if c.component}
										<svelte:component
											this={c.component}
											row={r}
											{...c.componentProps ? c.componentProps(r) : {}}
										/>
									{:else if c.render}
										{@html c.render(r)}
									{:else}
										{get(r, String(c.key))}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
	<div
		class="flex flex-wrap items-center gap-3 border-t border-slate-200 px-4 py-3 text-sm dark:border-slate-800"
	>
		<div>
			Menampilkan {total ? pageStart + 1 : 0}–{serverMode
				? Math.min(page * pageSize, total || data.length)
				: pageEnd} dari {total}
		</div>
		<div class="ml-auto flex items-center gap-2">
			<button
				class="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40 dark:border-slate-800"
				on:click={gotoPrev}
				disabled={page === 1}>Sebelumnya</button
			>
			<button
				class="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40 dark:border-slate-800"
				on:click={gotoNext}
				disabled={pageEnd >= total}>Berikutnya</button
			>
		</div>
	</div>
</div>

<style>
	:global(.brand-scroll)::-webkit-scrollbar {
		height: 8px;
	}
	:global(.brand-scroll)::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 9999px;
	}
</style>
