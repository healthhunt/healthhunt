<script setup lang="ts">
const { status } = useAuth();
</script>

<template>
	<div class="w-full border border-b-[1] border-base-100 shadow-xl py-6 flex justify-center px-8">

		<div class="flex w-full max-w-[75em]">

			<NuxtLink to="/">
				<h1 class="font-bold text-4xl">
					Health<span class="text-primary">Site</span>
				</h1>
			</NuxtLink>

			<div class="ml-auto">
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
