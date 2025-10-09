import { api } from '$lib/api';
import type { PageServerLoad } from './$types';
import { PUBLIC_JWT_COOKIE_NAME } from '$env/static/public';

export const load: PageServerLoad = async ({ locals, cookies, fetch }) => {
    // User sudah diverifikasi di hooks.server.ts, tidak perlu redirect manual
    
    // Ambil token dari cookies
    const token = cookies.get(PUBLIC_JWT_COOKIE_NAME);
    
    // Contoh ambil ringkasan dari backend
    let summary = { residents: 23, households: 0 };

    try {
        if (token) {
            summary = await api('/stats/summary', { 
                token, 
                fetchImpl: fetch 
            });
        }
    } catch (error) {
        console.error('Failed to fetch summary:', error);
        // biarkan summary default
    }

    return {
        user: locals.user,
        summary
    };
};
