<script setup lang="ts">
import type { Doctor } from '~/server/models';

defineProps<{
	doctor: Doctor
}>();

</script>

<template>
	<div class="card w-96 bg-base-300 shadow-xl">
		<figure><img :src="`/images/${doctor.id}.jpg`" alt="Portrait" /></figure>
		<div class="card-body grid gap-3">
			<span>
				<h2 class="card-title text-2xl font-bold">{{ doctor.name }}</h2>
				<p>{{ doctor.location }}</p>
			</span>
			<h3 class="text-lg">{{ doctor.description }}</h3>
		</div>
		<div class="card-actions p-6">
			<div class="rating">
				<input type="radio" :name="`rating-${doctor.id}`" class="mask mask-star" />
				<input type="radio" :name="`rating-${doctor.id}`" class="mask mask-star" checked />
				<input type="radio" :name="`rating-${doctor.id}`" class="mask mask-star" />
				<input type="radio" :name="`rating-${doctor.id}`" class="mask mask-star" />
				<input type="radio" :name="`rating-${doctor.id}`" class="mask mask-star" />
			</div>
			<p class="ml-auto">{{ doctor.phone }}</p>
		</div>
	</div>
</template>
