<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { createMap } from '$lib/remote-functions/map.remote';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head><title>Generate New Map - Topicly</title></svelte:head>

<div class="flex h-full max-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
	<form {...createMap} class="flex w-full max-w-3xl flex-col items-center">
		<h1 class="text-2xl font-medium">Create a new map</h1>
		<Input {...createMap.fields.niche.as('text')}
			class="mt-4 mb-6 w-full rounded-full py-6"
			placeholder="What niche or topic are you interested in?"
		/>
		<Button type="submit">Generate Map</Button>
	</form>
</div>
