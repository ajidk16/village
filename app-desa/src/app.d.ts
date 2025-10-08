// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	declare namespace App {
		interface Locals {
			user: {
				id: number;
				email: string;
				name?: string;
				role?: 'admin' | 'operator' | 'warga';
			} | null;
			token: string | null;
		}
	}
}

export { App };
