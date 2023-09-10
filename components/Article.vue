<script setup lang="ts">

const { $client } = useNuxtApp();

const { article } = defineProps<{
	article: {
		id: number
		title: string
		description: string
		tags: string[]
		thumbnail: string
		liked?: boolean
	}
}>();

const liked = ref(article.liked ?? true);

watch(liked, async liked => {
	await $client.article[liked ? 'like' : 'unlike'].mutate({
		id: article.id
	});
});
</script>

<template>
	<div class="card w-96 bg-base-200 shadow-xl">
		<figure class="m-0">
			<img :src="article.thumbnail" alt="" />
		</figure>

		<div class="card-body relative">
			<div class="absolute top-8 right-8">
				<Like v-model="liked" />
			</div>

			<NuxtLink :to="`/article/${article.id}`">
				<h2 class="card-title text-left pr-7">
					{{ article.title }}
				</h2>
			</NuxtLink>

			<p class="line-clamp-4 text-left prose" v-html="article.description" />
			<div class="card-actions flex">
				<div class="flex flex-wrap ml-auto gap-1">
					<div v-for="tag of article.tags" class="badge badge-outline badge-accent">{{ tag }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
