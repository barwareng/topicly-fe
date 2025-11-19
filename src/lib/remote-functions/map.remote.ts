import { form, getRequestEvent, query } from '$app/server';
import { usersSchema } from '$lib/schemas/user.schema';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod/v4';
// import { Collections } from '$lib/constants/collections';

export const createMap = form(
	z.object({
		niche: z.string(),
		country: z.string().optional(),
		language: z.string().optional().default('English'),
		type: z.enum(['news', 'blogs', 'forums']).optional().default('news')
	}),
	async (data) => {
		const { locals } = await getRequestEvent();
		try {
			console.log('Creating map with data:', data);
			const res = await locals.pb.send('/api/maps/new', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			// console.log('Map creation result:', res);
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
