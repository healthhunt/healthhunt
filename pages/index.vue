<script setup lang="ts">
definePageMeta({ auth: false });
</script>

<template>
	<div class="hero min-h-screen">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Welcome to HealthHunt</h1>
				<p class="py-6">We're working hard to provide you with accurate and reputable articles and doctors.</p>
				<NuxtLink to="/articles" class="btn btn-primary"> Get Started </NuxtLink>
			</div>
		</div>
	</div>

	<div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0"><svg xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 180" preserveAspectRatio="none" class="fill-primary w-full block relative max-h-32">
			<path
				d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V180H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z">
			</path>
		</svg>
	</div>
</template>