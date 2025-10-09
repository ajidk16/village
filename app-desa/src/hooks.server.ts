/* eslint-disable @typescript-eslint/no-unused-expressions */
import { PUBLIC_JWT_COOKIE_NAME } from '$env/static/public';
import { createSyncOnceRunner, falseValue, forEach, trueValue } from '@alova/shared';

import type { Handle } from '@sveltejs/kit';
import type { StatesHook } from 'alova';
import type { SvelteHookExportType } from 'alova/svelte';
import { onDestroy, onMount } from 'svelte';
import { derived, writable } from 'svelte/store';

function decodeJwtPayload(token: string) {
	try {
		const [, payload] = token.split('.');
		return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
	} catch {
		return null;
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(PUBLIC_JWT_COOKIE_NAME) ?? null;
	event.locals.token = token;

	if (token) {
		const p = decodeJwtPayload(token);
		event.locals.user = p
			? { id: p.sub ?? p.id, email: p.email, name: p.name, role: p.role }
			: null;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};

// the svelte predefined hooks
export default {
	name: 'Svelte',
	create: (data) => writable(data),
	dehydrate: (state) => {
		let raw;
		// The function will be executed once when subscribing, and the unsubscribe function will be called immediately after the value is obtained
		state.subscribe((value) => {
			raw = value;
		})();
		return raw;
	},
	update: (newVal, state) => {
		state.set(newVal);
	},
	effectRequest({ handler, removeStates, immediate, watchingStates }) {
		// Remove the corresponding state when the component is unmounted
		onDestroy(removeStates);
		onMount(() => {
			immediate && handler();
		});

		forEach(watchingStates || [], (state, i) => {
			let needEmit = falseValue;
			state.subscribe(() => {
				// Svelte's `writable` will trigger once by default, so when immediate is false, you need to filter out the first trigger call
				needEmit ? handler(i) : (needEmit = trueValue);
			});
		});
	},
	computed: (getter, depList) => derived(depList, getter),
	watch: (states, callback) => {
		let needEmit = falseValue;
		const syncRunner = createSyncOnceRunner();
		states.forEach((state) => {
			state.subscribe(() => {
				syncRunner(() => {
					needEmit ? callback() : (needEmit = trueValue);
				});
			});
		});
	},
	onMounted: (callback) => {
		onMount(callback);
	},
	onUnmounted: (callback) => {
		onDestroy(callback);
	}
} as StatesHook<SvelteHookExportType<unknown>>;
