<script lang="ts">
	import type { PageProps } from './$types';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	let { data }: PageProps = $props();
    $inspect(data.map.data);
</script>

<header class="flex h-14 shrink-0 items-center gap-2">
	<div class="flex flex-1 items-center gap-2 px-3">
		<!-- <Sidebar.Trigger /> -->
		<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Page class="line-clamp-1 capitalize">{data.map.name}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
	<div class="ml-auto px-3">
		<!-- <NavActions /> -->
	</div>
</header>
