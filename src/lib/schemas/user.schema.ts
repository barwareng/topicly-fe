import { z } from 'zod/v4';
export const usersSchema = z.object({
	id: z.string(),
	email: z.email(),
	created: z.string(),
	updated: z.string()
});
