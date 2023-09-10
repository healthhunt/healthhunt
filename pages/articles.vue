<script setup lang="ts">
import type { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '~/server/trpc/routers';

const { $client } = useNuxtApp();
const loading = ref(false);

async function getArticles() {
	loading.value = true;

	const data = await $client.article.getRecommended.query({
		text: content.value,
	});

	articles.value = data;
	loading.value = false;
}

const content = ref('');
const articles = ref<inferRouterOutputs<AppRouter>['article']['getRecommended']>();
</script>

<template>
	<div class="grid place-items-center justify-center">
		<div class="hero-content text-center">
			<div v-if="loading">
				<span class="loading loading-dots loading-lg"></span>
			</div>
			<form class="prose flex flex-col gap-6 items-center" v-else-if="!articles" @submit.prevent="getArticles">
				<h1>How are you feeling right now?</h1>
				<textarea v-model="content" class="textarea textarea-bordered resize-none w-full h-32"
					placeholder="I'm feeling..."></textarea>
				<button class="btn btn-primary w-full" type="submit">Find Articles</button>
			</form>
			<div v-else>
				<div class="prose max-w-full py-16">
					<h1>Your tailored articles are in!</h1>
					<button @click="articles = undefined" class="btn btn-primary">Search again</button>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					<Article v-for="article of articles" :article="article" />
				</div>
			</div>
		</div>
	</div>
</template>
