import { form, getRequestEvent, query } from '$app/server';
import { usersSchema } from '$lib/schemas/user.schema';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod/v4';
// import { Collections } from '$lib/constants/collections';

export const createMap = form(
	z.object({
		niche: z.string()
	}),
	async (data) => {
		const { locals, cookies } = await getRequestEvent();
		try {
			const res = await locals.pb.send('/api/maps/new', {
				method: 'POST',
				body: JSON.stringify({
					niche: data.niche,
					country: 'USA',
					language: 'English',
					type: 'news'
				})
			});
			console.log('Map creation result:', res);
			await getAllMaps().refresh();
			// return { success: true, message: 'Map created successfully.' };
			redirect(303, `/maps/${res.id}`);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			return { success: false, message: 'Failed to create map. Please try again.' };
		}
	}
);

export const getAllMaps = query(async () => {
	const { locals } = await getRequestEvent();
	const res = await locals.pb
		.collection('maps')
		.getList(1, 10, { filter: `user = "${locals.user.id}"`, sort: '-created' });
	// console.log('Fetched maps:', res);
	return res;
});
