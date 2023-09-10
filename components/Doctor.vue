<script setup lang="ts">
import type { Doctor } from '~/server/models';

defineProps<{
	doctor: Doctor
}>();

</script>

// https://daisyui.com/components/rating/
<template>
	<div class="card w-96 bg-base-100 shadow-xl">
		<figure><img src="https://thispers6ondoesnotexist.com/" alt="Shoes" /></figure>
		<div class="card-body">
			<h2 class="card-title">{{ doctor.name }}</h2>
			<p>{{ doctor.description }}</p>
			<p>{{ doctor.phone }}</p>
			<div class="rating">
				<input type="radio" name="rating-1" class="mask mask-star" />
				<input type="radio" name="rating-1" class="mask mask-star" checked />
				<input type="radio" name="rating-1" class="mask mask-star" />
				<input type="radio" name="rating-1" class="mask mask-star" />
				<input type="radio" name="rating-1" class="mask mask-star" />
			</div>
		</div>
	</div>
</template>
