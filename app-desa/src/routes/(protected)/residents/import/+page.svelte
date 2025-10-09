<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { api } from '$lib/api';
	import { session } from '$lib/stores/session';

	type formProps = {
		preview: {
			total: number;
			validCount: number;
			invalidCount: number;
			validPayload: number;
			sampleInvalid: {
				errors: number;
			}[];
		};
	};

	export let form: formProps;
	let file: File | null = null;

	const token = $session?.token;

	const handlePreview = async () => {
		if (!file) return;
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch(`${PUBLIC_BACKEND_URL}/residents/import`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			});

			if (res.ok) {
				const data = await res.json();
				form = { preview: data };
			} else {
				console.error('Server error:', res.status, await res.text());
			}
		} catch (error) {
			console.error('Preview error:', error);
		}
	};
</script>

<h1 class="mb-4 text-2xl font-semibold">Import CSV/Excel</h1>

<div>
	<label for="file" class="mb-1 block text-sm">File (.csv, .xlsx, .xls)</label>
	<input
		name="file"
		type="file"
		accept=".csv,.xlsx,.xls"
		onchange={(e: any) => (file = e.target.files?.[0] ?? null)}
		class="w-full rounded border-gray-300"
		required
	/>
	<p class="mt-1 text-xs text-gray-500">
		Kolom minimal: <code>nik</code>, <code>nama</code>. Opsional: <code>jk</code>,
		<code>agama</code>, <code>pendidikan</code>, <code>pekerjaan</code>,
		<code>alamat_domisili</code>, <code>household_id</code>, <code>tempat_lahir</code>,
		<code>tgl_lahir</code>, <code>status_kawin</code>.
	</p>
</div>
<button onclick={handlePreview} class="rounded-lg bg-black px-4 py-2 text-white">Preview</button>

{#if form?.preview}
	<div class="mt-6 space-y-4 rounded-xl bg-white p-5 shadow">
		<h2 class="text-lg font-semibold">Hasil Preview</h2>
		<p>
			Total baris: <b>{form.preview.total}</b> • Valid:
			<b class="text-green-700">{form.preview.validCount}</b>
			• Invalid: <b class="text-red-700">{form.preview.invalidCount}</b>
		</p>

		{#if form.preview.sampleInvalid?.length}
			<details class="text-sm">
				<summary class="cursor-pointer">Lihat contoh invalid (maks 10)</summary>
				<div class="mt-2 overflow-x-auto">
					<table class="min-w-full text-xs">
						<thead
							><tr
								><th class="px-2 py-1 text-left">Row</th><th class="px-2 py-1 text-left">Errors</th
								></tr
							></thead
						>
						<tbody>
							{#each form.preview.sampleInvalid as it, i}
								<tr class="border-t">
									<td class="px-2 py-1">{i + 1}</td>
									<td class="px-2 py-1">
										{#each Object.entries(it.errors || {}) as [k, v]}
											<div><span class="font-medium">{k}</span>: {v}</div>
										{/each}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</details>
		{/if}

		{#if form.preview.validCount > 0}
			<form method="POST" action="?/commit" class="flex items-center gap-3">
				<input type="hidden" name="data" value={form.preview.validPayload} />
				<button class="rounded-lg bg-green-600 px-4 py-2 text-white"
					>Import {form.preview.validCount} data</button
				>
				<a href="/(protected)/residents" class="rounded border px-4 py-2">Batal</a>
			</form>
		{:else}
			<p class="text-sm text-gray-600">Tidak ada baris valid untuk diimpor.</p>
		{/if}
	</div>
{/if}
