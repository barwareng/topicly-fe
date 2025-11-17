<script lang="ts">
	import TopiclyLogo from "$lib/components/icons/topicly-logo.svelte";
	import VerifyOtpForm from "./(components)/verify-otp-form.svelte";
</script>
<svelte:head><title>Verify OTP - Topicly</title></svelte:head>
<div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
	<div class="flex w-full max-w-sm flex-col gap-6">
		<a href="/" class="flex items-center gap-2 self-center font-medium">
			
			<TopiclyLogo/>
		</a>
		<VerifyOtpForm />
	</div>
</div>
