<svelte:options accessors={true} />

<script context="module" lang="ts">
	export type Variant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
	export type Tone = 'solid' | 'soft' | 'outline' | 'ghost';
	export type Size = 'xs' | 'sm' | 'md';
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let variant: Variant = 'neutral';
	export let tone: Tone = 'soft';
	export let size: Size = 'sm';
	export let roundedFull = true; // badge pill by default
	export let href: string | null = null; // jika diisi, badge menjadi <a>
	export let dismissible = false; // tampilkan tombol close
	export let className = '';

	const dispatch = createEventDispatcher<{ close: void }>();

	const sizeCls: Record<Size, string> = {
		xs: 'text-[10px] px-1.5 py-0.5',
		sm: 'text-xs px-2 py-0.5',
		md: 'text-sm px-2.5 py-1'
	};

	// peta warna (ringkas, gunakan palet Tailwind)
	const solid: Record<Variant, string> = {
		neutral: 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900',
		brand: 'bg-brand-600 text-white',
		success: 'bg-emerald-600 text-white',
		warning: 'bg-amber-500 text-slate-900',
		danger: 'bg-rose-600 text-white',
		info: 'bg-sky-600 text-white'
	};
	const soft: Record<Variant, string> = {
		neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-200',
		brand: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
		success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
		warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
		danger: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
		info: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
	};
	const outline: Record<Variant, string> = {
		neutral: 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200',
		brand: 'border border-brand-500 text-brand-700 dark:text-brand-300',
		success: 'border border-emerald-500 text-emerald-700 dark:text-emerald-300',
		warning: 'border border-amber-500 text-amber-700 dark:text-amber-300',
		danger: 'border border-rose-500 text-rose-700 dark:text-rose-300',
		info: 'border border-sky-500 text-sky-700 dark:text-sky-300'
	};
	const ghost: Record<Variant, string> = {
		neutral: 'text-slate-700 dark:text-slate-200',
		brand: 'text-brand-700 dark:text-brand-300',
		success: 'text-emerald-700 dark:text-emerald-300',
		warning: 'text-amber-700 dark:text-amber-300',
		danger: 'text-rose-700 dark:text-rose-300',
		info: 'text-sky-700 dark:text-sky-300'
	};

	function toneClass(t: Tone, v: Variant) {
		return t === 'solid'
			? solid[v]
			: t === 'outline'
				? outline[v]
				: t === 'ghost'
					? ghost[v]
					: soft[v];
	}
</script>

{#if href}
	<a
		{href}
		class={`inline-flex items-center gap-1.5 font-medium capitalize ${sizeCls[size]} ${toneClass(tone, variant)} ${roundedFull ? 'rounded-full' : 'rounded-md'} ${className}`}
	>
		<!-- slot icon kiri -->
		<slot name="left" />
		<slot />
		<slot name="right" />
		{#if dismissible}
			<button
				type="button"
				class="p-0.5/ -mr-1 ml-0.5 rounded [@media(hover:hover)]:hover:bg-black/10"
				aria-label="Tutup badge"
				on:click|stopPropagation={() => dispatch('close')}
			>
				✕
			</button>
		{/if}
	</a>
{:else}
	<span
		class={`inline-flex items-center gap-1.5 font-medium capitalize ${sizeCls[size]} ${toneClass(tone, variant)} ${roundedFull ? 'rounded-full' : 'rounded-md'} ${className}`}
		role="status"
	>
		<slot name="left" />
		<slot />
		<slot name="right" />
		{#if dismissible}
			<button
				type="button"
				class="-mr-1 ml-0.5 rounded p-0.5 [@media(hover:hover)]:hover:bg-black/10"
				aria-label="Tutup badge"
				on:click={() => dispatch('close')}
			>
				✕
			</button>
		{/if}
	</span>
{/if}
