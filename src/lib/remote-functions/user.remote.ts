import { form, getRequestEvent } from '$app/server';
import { usersSchema } from '$lib/schemas/user.schema';
import { redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
// import { Collections } from '$lib/constants/collections';

export const sendOtp = form(usersSchema.pick({ email: true }), async (data) => {
	const { locals, cookies } = await getRequestEvent();
	try {
		await locals.pb.collection('users').getOne(`email="${data.email}"`);

		const { otpId } = await locals.pb.collection('users').requestOTP(data.email);
		console.log('OTP sent result:', otpId);
		cookies.set('otpId', otpId, { path: '/' });
		redirect(303, '/verify-otp');
	} catch (error) {
		if (error instanceof ClientResponseError) {
			console.log('ClientResponseError:', error);
			if (error.status === 404) {
				// User not found, create a new user
				console.log('User not found, creating new user');
				const password = crypto.randomUUID();
				await locals.pb.collection('users').create({
					email: data.email,
					password,
					passwordConfirm: password
				});
				const { otpId } = await locals.pb.collection('users').requestOTP(data.email);
				cookies.set('otpId', otpId, { path: '/' });
				redirect(303, '/verify-otp');
			}
		}
	}
});
