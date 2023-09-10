<!-- Add /profile page to show user's username, password change, and liked articles (at the bottom, in horizontal carousel?) --> 

<script setup lang="ts">
import { TRPCClientError } from '@trpc/client';

const { $client } = useNuxtApp();

const { data: articles, pending: pendingArticles } = useLazyAsyncData(() => $client.article.getLiked.query(), {
	server: false,
});

const { data: user, pending: pendingUser } = useLazyAsyncData(() => $client.user.me.query(), {
	server: false,
});

async function resetPassword() {
	try {
		await $client.user.resetPassword.mutate({
			currentPassword: currentPassword.value,
			newPassword: newPassword.value,
		});

		passwordError.value = undefined;
	} catch (e) {
		if (e instanceof TRPCClientError) {
			switch (e.message) {
				case 'BAD_REQUEST':
					passwordError.value = 'Invalid password provided';
					break;
			}
		}
	}
}

const passwordError = ref<string>();

const currentPassword = ref('');
const newPassword = ref('');
</script>

<template>
	<div class="flex justify-center">
		<div class="grid place-items-center">
			<div class="card bg-base-200 shadow-xl grid grid-cols-3 m-0 p-8 gap-8 w-128">
				<div class="card-body p-0 content-center flex flex-row col-span-2">
					<div>
						<h2 class="card-title h-16">
							<span v-if="pendingUser">loading...</span>
							<span v-else-if="user">{{ user.username }}</span>
						</h2>

						<form @submit.prevent="resetPassword" class="flex flex-col gap-y-2">
							<input v-model="currentPassword" type="password" placeholder="Current Password"
								class="input input-bordered w-full max-w-xs" />

							<div class="form-control w-full max-w-xs">
								<input v-model="newPassword" id="new-password" type="password" placeholder="New Password"
									class="input input-bordered w-full max-w-xs" :class="{ 'input-error': passwordError }" />
								<label v-if="passwordError" class="label">
									<span class="label-text-alt text-error">{{ passwordError }}</span>
								</label>
							</div>

							<button class="btn btn-primary w-11/12" type="submit">Reset Password</button>
							<NuxtLink class="btn btn-primary w-11/12" to="/logout"> Sign Out </NuxtLink>
						</form>
					</div>
				</div>

				<div class="col-span-1 place-self-center">
					<img src="https://placehold.co/128x128" />
				</div>
			</div>

			<div>
				<div class="prose max-w-full py-16">
					<h1>Your saved articles: </h1>
				</div>
				<div v-if="pendingArticles">
					<span class="loading loading-spinner loading-lg"></span>
				</div>
				<div v-else-if="articles">
					<Article v-for="article of articles" :article="article" />
				</div>
			</div>
		</div>
	</div>
</template>