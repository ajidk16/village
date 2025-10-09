import { writable } from 'svelte/store';

export type User = {
	token: string;
	user: {
		id: number;
		email: string;
		name: string;
		role: string;
	} | null;
} | null;

function createSessionStore() {
	// Coba muat data dari sessionStorage saat awal
	const stored = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('session') : null;
	const initial: User = stored ? JSON.parse(stored) : null;

	const { subscribe, set, update } = writable<User>(initial);

	// Sinkronkan setiap perubahan store ke sessionStorage
	subscribe((value) => {
		if (typeof sessionStorage !== 'undefined') {
			if (value) {
				sessionStorage.setItem('session', JSON.stringify(value));
			} else {
				sessionStorage.removeItem('session');
			}
		}
	});

	return {
		subscribe,
		set,
		update,
		// tambahan method logout untuk clear session
		clear: () => set(null)
	};
}

export const session = createSessionStore();
