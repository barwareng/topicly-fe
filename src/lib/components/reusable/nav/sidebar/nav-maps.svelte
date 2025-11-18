<script lang="ts">
	import { resolve } from '$app/paths';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { getAllMaps } from '$lib/remote-functions/map.remote';
	import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import GroupIcon from '@lucide/svelte/icons/group';
	import LinkIcon from '@lucide/svelte/icons/link';
	import StarOffIcon from '@lucide/svelte/icons/star-off';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import * as Empty from '$lib/components/ui/empty/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	// import FolderCodeIcon from '@tabler/icons-svelte/icons/folder-code';
	const sidebar = useSidebar();
	let maps = $derived(await getAllMaps());
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
	<Sidebar.GroupLabel>Maps</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#if maps.items.length}
			{#each maps.items as item (item.id)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props })}
							<a href={resolve(`/maps/${item.id}`)} title={item.name} {...props}>
								<!-- <span>{item.emoji}</span> -->
								<span>{item.name}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuAction showOnHover {...props}>
									<EllipsisIcon />
									<span class="sr-only">More</span>
								</Sidebar.MenuAction>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							class="w-56 rounded-lg"
							side={sidebar.isMobile ? 'bottom' : 'right'}
							align={sidebar.isMobile ? 'end' : 'start'}
						>
							<DropdownMenu.Item>
								<StarOffIcon class="text-muted-foreground" />
								<span>Remove from Favorites</span>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<LinkIcon class="text-muted-foreground" />
								<span>Copy Link</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<ArrowUpRightIcon class="text-muted-foreground" />
								<span>Open in New Tab</span>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<Trash2Icon class="text-muted-foreground" />
								<span>Delete</span>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Sidebar.MenuItem>
			{/each}
			{#if maps.totalItems > maps.items.length}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton class="text-sidebar-foreground/70">
						<EllipsisIcon />
						<span>More</span>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/if}
		{:else}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<GroupIcon />
					</Empty.Media>
					<Empty.Title>No Maps Yet</Empty.Title>
					<Empty.Description>
						You haven't created any maps yet. Get started by creating your first map.
					</Empty.Description>
				</Empty.Header>
				
				<Button variant="link" class="text-muted-foreground" size="sm">
					<a href="#/">
						Learn More <ArrowUpRightIcon class="inline" />
					</a>
				</Button>
			</Empty.Root>
		{/if}
	</Sidebar.Menu>
</Sidebar.Group>
