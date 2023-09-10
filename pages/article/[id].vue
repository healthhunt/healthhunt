<script setup lang="ts">
const route = useRoute();
const { $client } = useNuxtApp();

const { pending, data: article } = useLazyAsyncData(() => $client.article.get.query({
	id: parseInt(route.params.id),
}), {
	server: false,
});

// https://nuxt.com/docs/api/composables/use-head
useHead({
	title: article?.title ?? 'Medihacks'
});
</script>

<template>
	<div class="hero min-h-screen">
		<div v-if="pending || !article">
			<span class="loading loading-dots loading-md"></span>
		</div>
		<div v-else class="hero-content flex-col max-w-2xl w-full">
			<span class="prose prose-lg max-w-full">
				<h1> {{ article.title }}</h1>
			</span>
			<img :src="article.thumbnail" class="rounded-lg shadow-2xl object-cover max-h-96 w-full" />
			<div class="prose prose-lg max-w-full" v-html="article.description" />
		</div>
	</div>
</template>
