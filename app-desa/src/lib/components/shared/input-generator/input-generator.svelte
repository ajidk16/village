<script context="module" lang="ts">
	export type Field = {
		name: string;
		label?: string;
		type?: 'text' | 'number' | 'date' | 'select' | 'textarea';
		placeholder?: string;
		options?: { value: string; label: string }[];
		required?: boolean;
		value?: string | number;
	};
</script>

<script lang="ts">
	export let fields: Field[] = [];
	export let data: Record<string, string | number> = {};
	export let onChange: (updated: Record<string, string | number>) => void = () => {};

	function handleChange(name: string, value: string | number) {
		data = { ...data, [name]: value };
		onChange(data);
	}
</script>

{#each fields as field}
	<div class="flex flex-col">
		<label for={field.name} class="mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">
			{field.label}
			{#if field.required}
				<span class="text-red-500">*</span>
			{/if}
		</label>

		{#if field.type === 'select'}
			<select
				bind:value={data[field.name]}
				on:change={(e) => handleChange(field.name, (e.target as HTMLSelectElement).value)}
				class="rounded-xl border border-slate-300 bg-white py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800"
			>
				<option value="">{field.placeholder}</option>
				{#each field.options || [] as opt}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
		{:else if field.type === 'textarea'}
			<textarea
				bind:value={data[field.name]}
				placeholder={field.placeholder}
				rows="3"
				on:input={(e) => handleChange(field.name, (e.target as HTMLTextAreaElement).value)}
				class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800"
			></textarea>
		{:else}
			<input
				type={field.type || 'text'}
				bind:value={data[field.name]}
				placeholder={field.placeholder}
				on:input={(e) => handleChange(field.name, (e.target as HTMLInputElement).value)}
				class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800"
			/>
		{/if}
	</div>
{/each}
