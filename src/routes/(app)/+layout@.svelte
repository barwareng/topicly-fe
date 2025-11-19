<script lang="ts">
	import AppSidebar from '$lib/components/reusable/nav/sidebar/app-sidebar.svelte';
	// import NavActions from '$lib/components/nav-actions.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { LayoutProps } from './start/$types';

	let { data, children }: LayoutProps = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<Sidebar.Trigger />
		<div class="flex flex-1 flex-col gap-4 px-4">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
