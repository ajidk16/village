<script lang="ts">
	// ---- Props ----
	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | string = 'primary';
	export let size: 'icon' | 'xs' | 'sm' | 'md' | 'lg' = 'md';
	export let loading = false;
	export let disabled = false;
	export let block = false; // full width
	export let rounded: 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'xl';

	// Button vs Link
	export let as: 'button' | 'a' = 'button';
	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let onClick: (e: MouseEvent) => void = () => {};
	export let className: string = '';

	// Aksesibilitas
	export let ariaLabel: string | undefined = undefined;

	// Util: merge classes Tailwind
	function cn(...classes: Array<string | false | null | undefined>) {
		return classes.filter(Boolean).join(' ');
	}

	const base =
		'inline-flex items-center justify-center gap-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';

	const variants: Record<typeof variant, string> = {
		primary:
			'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500 dark:bg-brand-600 dark:hover:bg-brand-700',
		secondary:
			'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white',
		outline:
			'border border-slate-300 text-slate-800 hover:bg-slate-50 focus:ring-slate-400 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800',
		ghost:
			'text-slate-700 hover:bg-slate-100 focus:ring-slate-400 dark:text-slate-200 dark:hover:bg-slate-800',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
	};

	const sizes: Record<typeof size, string> = {
		icon: 'w-8 h-8 p-0',
		xs: 'text-xs px-2 py-1',
		sm: 'text-sm px-3 py-1.5',
		md: 'text-sm px-4 py-2',
		lg: 'text-base px-5 py-2.5'
	};

	const roundings: Record<typeof rounded, string> = {
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		full: 'rounded-full'
	};

	$: classes = cn(
		base,
		variants[variant],
		sizes[size],
		roundings[rounded],
		'cursor-pointer',
		block && 'w-full',
		loading && 'cursor-progress',
		className
	);

	// agar atribut HTML lain bisa diteruskan
	export let rel: string | undefined = undefined;
	export let target: string | undefined = undefined;
</script>

{#if as === 'a'}
	<a
		{href}
		class={classes}
		aria-label={ariaLabel}
		aria-busy={loading}
		aria-disabled={disabled || loading}
		{rel}
		{target}
		on:click|preventDefault={(e) => {
			if (disabled || loading) return;
			// Hapus preventDefault bila mau native link
			if (href) window.location.href = href;
		}}
	>
		<slot name="icon" />
		<slot />
		<slot name="icon-right" />
	</a>
{:else}
	<button
		{type}
		class={classes}
		disabled={disabled || loading}
		aria-label={ariaLabel}
		aria-busy={loading}
		on:click={onClick}
	>
		<!-- Spinner kecil saat loading -->
		{#if loading}
			<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
				<path class="opacity-75" d="M4 12a8 8 0 018-8" stroke-width="4" stroke-linecap="round"
				></path>
			</svg>
		{/if}
		<slot name="icon" />
		<slot />
		<slot name="icon-right" />
	</button>
{/if}
