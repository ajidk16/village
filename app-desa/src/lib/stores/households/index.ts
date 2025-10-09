import { api } from '$lib/api';
import { get, writable } from 'svelte/store';
import { session } from '../session';

export interface Household {
	id: number;
	no_kk: string;
	alamat: string;
	rt: string;
	rw: string;
	dusun: string;
	createdAt: string;
	updatedAt: string;
}

export interface HouseholdResponse {
	message: string;
	items: Household[];
	page: number;
	limit: number;
	total: number;
}

const initialState: HouseholdResponse = {
	message: '',
	items: [],
	page: 1,
	limit: 0,
	total: 0
};

const householdStoreInstance = () => {
	const { subscribe, set, update } = writable<HouseholdResponse>(initialState);

	const user = get(session);

	return {
		subscribe,
		fetchAll: async (): Promise<void> => {
			const res = await api('/households', { token: user?.token });
			set(res);
		},
		setHouseholds: (households: Household[]): void => {
			set({
				message: '',
				items: households,
				page: 1,
				limit: households.length,
				total: households.length
			});
		},
		addHousehold: (household: Household): void => {
			update((state) => {
				const newItems = [...state.items, household];
				return {
					...state,
					items: newItems,
					limit: newItems.length,
					total: state.total + 1
				};
			});
		},
		clear: (): void => set(initialState)
	};
};

export const householdStore = householdStoreInstance();
