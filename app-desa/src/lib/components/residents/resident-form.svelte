<script lang="ts">
	import HouseholdSelect from './household-select.svelte';

	export let values: Record<string, unknown> = {};
	export let errors: Record<string, string> = {};
</script>

<div class="grid gap-4 md:grid-cols-2">
	<div>
		<label for="nik" class="mb-1 block text-sm">NIK <span class="text-red-600">*</span></label>
		<input
			name="nik"
			class="w-full rounded border-gray-300 font-mono"
			maxlength="16"
			value={values.nik ?? ''}
		/>
		{#if errors.nik}<p class="mt-1 text-xs text-red-600">{errors.nik}</p>{/if}
	</div>

	<div>
		<label for="nama" class="mb-1 block text-sm">Nama <span class="text-red-600">*</span></label>
		<input name="nama" class="w-full rounded border-gray-300" value={values.nama ?? ''} />
		{#if errors.nama}<p class="mt-1 text-xs text-red-600">{errors.nama}</p>{/if}
	</div>

	<div>
		<label for="jk" class="mb-1 block text-sm">JK</label>
		<select name="jk" class="w-full rounded border-gray-300">
			<option value="" selected={!values.jk}>Pilih</option>
			<option value="M" selected={values.jk === 'M'}>Laki-laki (M)</option>
			<option value="F" selected={values.jk === 'F'}>Perempuan (F)</option>
		</select>
	</div>

	<div>
		<label for="agama" class="mb-1 block text-sm">Agama</label>
		<select name="agama" class="w-full rounded border-gray-300">
			{#each ['', 'Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] as a}
				<option value={a} selected={(values.agama ?? '') === a}>{a || 'Pilih'}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="pendidikan" class="mb-1 block text-sm">Pendidikan</label>
		<input
			name="pendidikan"
			class="w-full rounded border-gray-300"
			value={values.pendidikan ?? ''}
		/>
	</div>

	<div>
		<label for="pekerjaan" class="mb-1 block text-sm">Pekerjaan</label>
		<input name="pekerjaan" class="w-full rounded border-gray-300" value={values.pekerjaan ?? ''} />
	</div>

	<div class="md:col-span-2">
		<label for="alamat_domisili" class="mb-1 block text-sm">Alamat Domisili</label>
		<input
			name="alamat_domisili"
			class="w-full rounded border-gray-300"
			value={values.alamat_domisili ?? ''}
		/>
	</div>

	<div>
		<label for="tempat_lahir" class="mb-1 block text-sm">Tempat Lahir</label>
		<input
			name="tempat_lahir"
			class="w-full rounded border-gray-300"
			value={values.tempat_lahir ?? ''}
		/>
	</div>

	<div>
		<label for="tgl_lahir" class="mb-1 block text-sm">Tanggal Lahir</label>
		<input
			name="tgl_lahir"
			type="date"
			class="w-full rounded border-gray-300"
			value={values.tgl_lahir ?? ''}
		/>
	</div>

	<div>
		<label for="status_kawin" class="mb-1 block text-sm">Status Kawin</label>
		<select name="status_kawin" class="w-full rounded border-gray-300">
			{#each ['', 'Belum Kawin', 'Kawin', 'Cerai'] as s}
				<option value={s} selected={(values.status_kawin ?? '') === s}>{s || 'Pilih'}</option>
			{/each}
		</select>
	</div>

	<div>
		<!-- <label for="household_id" class="mb-1 block text-sm">Household ID (KK)</label>
		<input
			name="household_id"
			type="number"
			class="w-full rounded border-gray-300"
			value={values.household_id ?? ''}
		/> -->
		<HouseholdSelect name="household_id" value={String(values.household_id) ?? null} />
		{#if errors.household_id}<p class="mt-1 text-xs text-red-600">{errors.household_id}</p>{/if}
	</div>
</div>
