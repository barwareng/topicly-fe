<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import * as InputGroup from '$lib/components/ui/input-group';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import { countryList } from '$lib/constants/countries';
	let {selectedCountry=$bindable()}:{selectedCountry: { country: string; flag: string, code: string }} = $props();
	let countries = $state(countryList);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<InputGroup.Button
				{...props}
				variant="ghost"
				class="flex items-center gap-x-1 rounded-full"
			>
				{#if selectedCountry.flag}
					<img src={selectedCountry.flag} alt={selectedCountry.country} class="size-4" />
				{:else}
					<GlobeIcon />
				{/if}
				{selectedCountry.country}
			</InputGroup.Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content side="top" align="start" class="relative max-h-96 [--radius:0.95rem]">
		<div class="sticky top-0 z-10 bg-background">
			<Input
				placeholder="Search country..."
				class="mb-2 rounded-md ring-0! outline-0! "
				oninput={(e) => {
					const query = (e.target as HTMLInputElement).value.toLowerCase();
					countries = countryList.filter((c) =>
						c.country.toLowerCase().includes(query.toLowerCase())
					);
				}}
			/>
		</div>
		{#each countries as country (country.country)}
			<DropdownMenu.Item
				onclick={() => (selectedCountry = country)}
				class="flex items-center gap-x-1 hover:bg-accent!"
			>
				<img src={country.flag} alt={country.code} class="size-3" />
				{country.country}</DropdownMenu.Item
			>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
