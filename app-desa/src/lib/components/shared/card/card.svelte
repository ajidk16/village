<script lang="ts">
	export let title: string | null = null;
	export let footerText: string | null = null;
	export let className = '';
</script>

<div
	class={`rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900 ${className}`}
>
	{#if title}
		<div
			class="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800"
		>
			<h3 class="font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
			<slot name="header-action" />
		</div>
	{/if}

	<div class="p-5">
		<slot />
	</div>

	{#if footerText || $$slots.footer}
		<div
			class="border-t border-slate-200 px-5 py-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400"
		>
			{#if $$slots.footer}
				<slot name="footer" />
			{:else if footerText}
				{footerText}
			{/if}
		</div>
	{/if}
</div>
