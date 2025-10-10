<script context="module" lang="ts">
	export type Field = {
		name: string;
		label?: string;
		type?: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'email' | 'tel' | 'password';
		placeholder?: string;
		options?: { value: string; label: string }[];
		required?: boolean;
		disabled?: boolean;
		value?: string | number;
		colspan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
		className?: string; // untuk custom styling tambahan
	};
</script>

<script lang="ts">
	export let fields: Field[] = [];
	export let data: Record<string, string | number> = {};
	export let onChange: (updated: Record<string, string | number>) => void = () => {};
	export let columns: 1 | 2 | 3 | 4 | 5 | 6 = 1;

	function handleChange(name: string, value: string | number) {
		data = { ...data, [name]: value };
		onChange(data);
	}
	function cn(...classes: Array<string | false | null | undefined>) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<!-- Grid utama responsif: 1 kolom di mobile, 2-6 kolom di tablet/desktop -->
<div
	class={cn(
		'grid gap-3 sm:gap-4',
		'grid-cols-1', // mobile: 1 kolom
		columns === 1 && 'sm:grid-cols-1',
		columns === 2 && 'sm:grid-cols-2',
		columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
		columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
		columns === 5 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
		columns === 6 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
	)}
>
	{#each fields as field}
		<div 
			class={cn(
				'flex flex-col',
				field.colspan === 2 && 'sm:col-span-2',
				field.colspan === 3 && 'sm:col-span-2 lg:col-span-3',
				field.colspan === 4 && 'sm:col-span-2 lg:col-span-4',
				field.colspan === 5 && 'sm:col-span-2 lg:col-span-3 xl:col-span-5',
				field.colspan === 6 && 'sm:col-span-2 lg:col-span-3 xl:col-span-6',
				field.colspan === 'full' && 'col-span-full',
				field.className
			)}
		>
			<label 
				for={field.name} 
				class="block text-sm font-medium text-slate-700 dark:text-slate-200 capitalize"
			>
				{field.label}
				{#if field.required}
					<span class="text-red-500 ml-1">*</span>
				{/if}
			</label>

			{#if field.type === 'select'}
				<select
					bind:value={data[field.name]}
					disabled={field.disabled}
					on:change={(e) => handleChange(field.name, (e.target as HTMLSelectElement).value)}
					class={cn(
						'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
						'text-sm text-slate-900 placeholder:text-slate-500',
						'transition-all duration-200 ease-in-out',
						'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
						'hover:border-slate-400',
						'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
						'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
						'dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
						'dark:hover:border-slate-500 dark:disabled:bg-slate-700'
					)}
				>
					<option value="">{field.placeholder || `Pilih ${field.label}`}</option>
					{#each field.options || [] as opt}
						<option value={opt.value}>{opt.label}</option>
					{/each}
				</select>
			{:else if field.type === 'textarea'}
				<textarea
					bind:value={data[field.name]}
					disabled={field.disabled}
					placeholder={field.placeholder}
					rows="3"
					on:input={(e) => handleChange(field.name, (e.target as HTMLTextAreaElement).value)}
					class={cn(
						'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
						'text-sm text-slate-900 placeholder:text-slate-500',
						'transition-all duration-200 ease-in-out resize-vertical',
						'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
						'hover:border-slate-400',
						'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
						'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
						'dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
						'dark:hover:border-slate-500 dark:disabled:bg-slate-700'
					)}
				></textarea>
			{:else}
				<input
					type={field.type || 'text'}
					bind:value={data[field.name]}
					disabled={field.disabled}
					placeholder={field.placeholder}
					on:input={(e) => handleChange(field.name, (e.target as HTMLInputElement).value)}
					class={cn(
						'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
						'text-sm text-slate-900 placeholder:text-slate-500',
						'transition-all duration-200 ease-in-out',
						'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
						'hover:border-slate-400',
						'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
						'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
						'dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
						'dark:hover:border-slate-500 dark:disabled:bg-slate-700'
					)}
				/>
			{/if}
		</div>
	{/each}
</div>
