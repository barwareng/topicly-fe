// /api/checkout/+server.ts
import { dev } from '$app/environment';
import { POLAR_ACCESS_TOKEN, POLAR_SUCCESS_URL } from '$env/static/private';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { Checkout } from '@polar-sh/sveltekit';

export const GET = Checkout({
	accessToken: POLAR_ACCESS_TOKEN,
	successUrl: POLAR_SUCCESS_URL,
	returnUrl: `${PUBLIC_BASE_URL}/start`, // An optional URL which renders a back-button in the Checkout
	server: dev ? 'sandbox' : 'production', // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
	theme: 'dark' // Enforces the theme - System-preferred theme will be set if left omitted
});
