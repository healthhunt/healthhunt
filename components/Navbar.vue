<script setup lang="ts">
const { status } = useAuth();

const links = [
	{
		name: 'Find a Doctor',
		path: '/doctors'
	},
	{
		name: 'Discover Articles',
		path: '/articles'
	},
];
</script>

<template>
	<div class="flex p-6 bg-base-200">
		<div class="navbar w-full">
			<div class="navbar-start">
				<div class="dropdown">
					<label tabindex="0" class="btn btn-ghost lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</label>
					<ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li v-for="link of links">
							<NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
						</li>
					</ul>
				</div>
				<NuxtLink to="/" class="btn btn-ghost normal-case text-xl">HealthSite</NuxtLink>
			</div>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<li v-for="link of links">
						<NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
					</li>
				</ul>
			</div>
			<div class="navbar-end">
				<NuxtLink v-if="status === 'authenticated'" to="/profile">
					<svg class=" h-10 fill-current" viewBox="0 0 24 24">
						<path
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z">
						</path>
					</svg>
				</NuxtLink>
				<NuxtLink v-else to="/login" class="btn btn-primary">
					Log in
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
