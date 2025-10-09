<script lang="ts">
	import { session } from '$lib/stores/session.js';

	export let form;
	export let data;

	session.set({
		token: data?.token?.toString() ?? '',
		user: {
			id: data?.user?.id ?? 0,
			email: data?.user?.email ?? '',
			name: data?.user?.name ?? '',
			role: data?.user?.role ?? ''
		}
	});
</script>

<main
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-500/10 via-white to-brand-700/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
>
	<div
		class="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
	>
		<div class="mb-8 text-center">
			<div
				class="mx-auto grid h-16 w-16 place-content-center rounded-2xl bg-brand-600 text-2xl font-bold text-white shadow-md"
			>
				DH
			</div>
			<h1 class="mt-3 text-2xl font-semibold text-slate-800 dark:text-slate-100">
				Portal Desa Harmoni
			</h1>
			<p class="mt-1 text-sm text-slate-500">Masuk untuk melanjutkan</p>
		</div>

		<form method="POST" class="space-y-5">
			<div>
				<label for="email" class="text-sm font-medium text-slate-700 dark:text-slate-300"
					>Email</label
				>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="nama@email.com"
					required
					class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
				/>
			</div>

			<div>
				<label for="password" class="text-sm font-medium text-slate-700 dark:text-slate-300"
					>Kata Sandi</label
				>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="••••••••"
					required
					class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
				/>
			</div>

			<div class="flex items-center justify-between text-sm">
				<label class="flex items-center gap-2">
					<input
						type="checkbox"
						class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
					/>
					<span class="text-slate-600 dark:text-slate-300">Ingat saya</span>
				</label>
				<a href="#" class="text-brand-600 hover:underline">Lupa sandi?</a>
			</div>

			<button
				type="submit"
				class="w-full rounded-xl bg-brand-600 py-2.5 font-medium text-white shadow-md transition hover:bg-brand-700"
				>Masuk</button
			>

			<p class="text-center text-sm text-slate-500 dark:text-slate-400">
				Belum punya akun? <a href="#" class="text-brand-600 hover:underline">Daftar</a>
			</p>
		</form>
	</div>
</main>
