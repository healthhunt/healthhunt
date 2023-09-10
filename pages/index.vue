<script setup lang="ts">
import type { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '~/server/trpc/routers';

const { $client } = useNuxtApp();

async function getArticles() {
	const data = await $client.article.getRecommended.query({
		text: content.value,
	});

	articles.value = data;
}

const content = ref('');
const articles = ref<inferRouterOutputs<AppRouter>['article']['getRecommended']>();
</script>

<template>
	<div class="grid place-items-center justify-center">
		<div class="hero-content text-center">
			<form class="prose flex flex-col gap-6 items-center" v-if="!articles" @submit.prevent="getArticles">
				<h1> How are you feeling? </h1>
				<textarea v-model="content" class="textarea textarea-bordered resize-none w-96 h-32"></textarea>
				<button class="btn btn-primary w-6/12" type="submit">Submit</button>
			</form>

			<div v-else class="prose max-w-full py-16">
				<h1>Your tailored articles are in!</h1>

				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					<Article v-for="article of articles" :article="article" />
				</div>
			</div>
		</div>
	</div>
</template>
