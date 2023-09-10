<script setup lang="ts">
defineProps<{
	article: {
		title: string
		description: string
		tags: string[]
		thumbnail: string
	}
}>();
</script>

<template>
	<div class="card w-96 bg-base-100 shadow-xl">
		<figure><img :src="article.thumbnail" alt="" class="object-cover" /></figure>
		<div class="card-body">
			<h2 class="card-title">
				{{ article.title }}
			</h2>
			<p class="line-clamp-4">
				{{ article.description }}
			</p>
			<div class="card-actions flex">
				<Like />
				<div class="flex flex-wrap ml-auto gap-1">
					<div v-for="tag of article.tags" class="badge badge-outline">{{ tag }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
