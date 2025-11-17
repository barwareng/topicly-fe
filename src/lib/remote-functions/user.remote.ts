import { form, getRequestEvent } from '$app/server';
import { usersSchema } from '$lib/schemas/user.schema';
import { redirect } from '@sveltejs/kit';
// import { Collections } from '$lib/constants/collections';

export const sendOtp = form(usersSchema.pick({ email: true }), async (data) => {
	const { locals, cookies } = await getRequestEvent();
	try {
		const { otpId } = await locals.pb.send('/api/send-otp-email', {
			method: 'POST',
			body: JSON.stringify({ email: data.email })
		});
		console.log('OTP sent result:', otpId);
		cookies.set('otpId', otpId, { path: '/' });
		redirect(303, '/verify-otp');
	} catch (error) {
		return { success: false, message: 'Failed to send OTP. Please try again.' };
	}
});
