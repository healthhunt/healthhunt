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
		<figure><img :src="article.thumbnail" alt="" class="object-cover" /></figure>
		<div class="card-body">
			<NuxtLink :to="`/article/${article.id}`">
				<h2 class="card-title">
					{{ article.title }}
				</h2>
			</NuxtLink>
			<p class="line-clamp-4 text-left prose" v-html="article.description" />
			<div class="card-actions flex">
				<Like v-model="liked" />
				<div class="flex flex-wrap ml-auto gap-1">
					<div v-for="tag of article.tags" class="badge badge-outline">{{ tag }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
