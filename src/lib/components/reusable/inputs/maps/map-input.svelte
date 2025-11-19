<script lang="ts">
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import CountriesDropdown from './countries-dropdown.svelte';
	import { createMap } from '$lib/remote-functions/map.remote';
	import { toast } from 'svelte-sonner';
	let loading = $state(false);
	let selectedCountry = $state({ country: 'Worldwide', flag: '', code: '' });
</script>

<form
	{...createMap.enhance(async ({ form, data, submit }) => {
		try {
			loading = true;
			if (selectedCountry.country !== 'Worldwide') {
				createMap.fields.country.set(selectedCountry.country);
			}
			console.log('Submitting form with country:', createMap.fields.allIssues());
			await submit();
			form.reset();

			toast.success('Hold tight! Your map is being created.',{
				description: 'This may take a few moments. Your map will appear in your dashboard once ready.'
			});
		} catch (error) {
			toast.error('Oh no! Something went wrong');
		}
		finally {
			loading = false;
		}
	})}
	class="grid w-full max-w-3xl gap-6"
>
	<InputGroup.Root>
		<InputGroup.Textarea placeholder="What niche do you want to explore?" {...createMap.fields.niche.as('text')}/>
		<InputGroup.Addon align="block-end">
			<InputGroup.Button variant="outline" class="rounded-full" size="icon-xs">
				<PlusIcon />
			</InputGroup.Button>
			<CountriesDropdown bind:selectedCountry />
			<InputGroup.Text class="ml-auto">2 Credits</InputGroup.Text>
			<Separator orientation="vertical" class="h-4!" />
			<InputGroup.Button variant="default" type="submit" class="rounded-full" size="icon-xs" disabled={loading}>
				<ArrowUpIcon />
				<span class="sr-only">Generate</span>
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
</form>
