import { writable } from 'svelte/store';

export type ToastKind = 'success' | 'error' | 'info';
export type ToastItem = { id: number; kind: ToastKind; text: string; timeout?: number };

const store = writable<ToastItem[]>([]);
let seed = 1;

export const toast = {
	subscribe: store.subscribe,
	push(kind: ToastKind, text: string, timeout = 3000) {
		const id = seed++;
		store.update((a) => [...a, { id, kind, text, timeout }]);
		if (timeout !== 0) setTimeout(() => toast.remove(id), timeout);
	},
	success(text: string, t = 3000) {
		toast.push('success', text, t);
	},
	error(text: string, t = 3000) {
		toast.push('error', text, t);
	},
	info(text: string, t = 3000) {
		toast.push('info', text, t);
	},
	remove(id: number) {
		store.update((a) => a.filter((x) => x.id !== id));
	}
};
