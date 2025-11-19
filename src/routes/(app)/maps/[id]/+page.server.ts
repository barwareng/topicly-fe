import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	return {
		map: await locals.pb.collection('maps').getOne(params.id)
	};
}) satisfies PageServerLoad;
