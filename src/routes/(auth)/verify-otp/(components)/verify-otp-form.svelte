<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { verifyOtp } from '$lib/remote-functions/user.remote';
	import type { ComponentProps } from 'svelte';
	let { ...restProps }: ComponentProps<typeof Card.Root> = $props();
</script>

<Card.Root {...restProps}>
	<Card.Header class="text-center">
		<Card.Title class="text-xl">Enter verification code</Card.Title>
		<Card.Description>We sent a 8-digit code to your email.</Card.Description>
	</Card.Header>
	<Card.Content class="min-w-fit">
		<form {...verifyOtp} class="min-w-fit">
			<Field.Group>
				<Field.Field>
					<Field.Label for="otp" class="sr-only">Verification code</Field.Label>
					<InputOTP.Root maxlength={6} id="otp" required name="otp">
						{#snippet children({ cells })}
							<InputOTP.Group
								class="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border"
							>
								{#each cells as cell (cell)}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
						{/snippet}
					</InputOTP.Root>
					<Field.Description class="text-center">
						Enter the 8-digit code sent to your email.
					</Field.Description>
				</Field.Field>
				<Button type="submit">Verify</Button>
				<!-- <Field.Description class="text-center">
          Didn't receive the code? <a href="#/">Resend</a>
        </Field.Description> -->
			</Field.Group>
		</form>
	</Card.Content>
</Card.Root>
