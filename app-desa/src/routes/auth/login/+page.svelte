<script lang="ts">
	export let form;
</script>

<div class="grid min-h-dvh place-items-center">
	<form method="POST" class="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow">
		<h1 class="text-xl font-semibold">Masuk</h1>
		{#if form?.error}<p class="text-sm text-red-600">{form.error}</p>{/if}
		<div>
			<label for="email" class="block text-sm">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				class="mt-1 w-full rounded border-gray-300"
				required
			/>
		</div>
		<div>
			<label for="password" class="block text-sm">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				class="mt-1 w-full rounded border-gray-300"
				required
			/>
		</div>
		<button type="submit" class="w-full rounded-lg bg-black py-2 text-white"> Masuk </button>
	</form>
</div>
