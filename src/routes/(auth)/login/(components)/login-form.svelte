<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { FieldGroup, Field, FieldLabel, FieldDescription } from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { sendOtp } from '$lib/remote-functions/user.remote';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const id = $props.id();
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Welcome to Topicly</Card.Title>
		</Card.Header>
		<Card.Content>
			<form {...sendOtp}>
				<FieldGroup>
					<Field>
						<FieldLabel class="font-semibold">Enter your email address</FieldLabel>
						<Input {...sendOtp.fields.email.as('email')} placeholder="email@example.com" required />
						<FieldDescription class="text-center">
							If you don't have an account, one will be created for you.
						</FieldDescription>
					</Field>
					<Field>
						<Button type="submit">Send me login code</Button>
					</Field>
				</FieldGroup>
			</form>
		</Card.Content>
	</Card.Root>
	<FieldDescription class="px-6 text-center">
		By clicking continue, you agree to our <a href="##">Terms of Service</a>
		and <a href="##">Privacy Policy</a>.
	</FieldDescription>
</div>
