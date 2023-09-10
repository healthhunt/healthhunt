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

const profile = ref('https://placehold.co/128x128');
const file = ref<HTMLInputElement>();

watch(user, user => {
	if (user?.profile) {
		profile.value = user.profile;
	}
});

function changeProfilePicture(event) {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();

	reader.onload = async (event) => {
		const base64 = event.target.result as string;

		profile.value = base64;

		await $client.user.updateProfile.mutate({
			data: base64,
		});
	};

	reader.readAsDataURL(file);
}
</script>

<template>
	<div class="flex justify-center">
		<div class="grid place-items-center gap-16">
			<div class="card bg-base-200 shadow-xl grid grid-cols-3 m-0 p-8 gap-8 w-128">
				<div class="card-body p-0 content-center gap-8 col-span-2">
					<h2 class="card-title">
						<span v-if="pendingUser">Hey there!</span>
						<span v-else-if="user">Hello, {{ user.username }}! Welcome to your profile.</span>
					</h2>

					<form @submit.prevent="resetPassword" class="grid gap-y-2">
						<h2>
							Reset your password?
						</h2>

						<input v-model="currentPassword" type="password" placeholder="Current Password"
							class="input input-bordered w-full max-w-xs" />

						<div class="form-control w-full max-w-xs">
							<input v-model="newPassword" id="new-password" type="password" placeholder="New Password"
								class="input input-bordered w-full max-w-xs" :class="{ 'input-error': passwordError }" />
							<label v-if="passwordError" class="label">
								<span class="label-text-alt text-error">{{ passwordError }}</span>
							</label>
						</div>

						<div class="flex flex-row flex-wrap gap-1">
							<button class="btn btn-primary" type="submit">Reset Password</button>
							<NuxtLink class="btn btn-error" to="/logout"> Sign Out </NuxtLink>
						</div>
					</form>
				</div>

				<div class="col-span-1 place-self-center ">
					<input type="file" class="hidden" ref="file" @click="changeProfilePicture" />
					<button @click="file?.click();">
						<img :src="profile" class="rounded-full object-cover h-48 2-48 lg:h-64 lg:w-64" />
					</button>
				</div>
			</div>

			<div v-if="!articles || articles.length">
				<div v-if="pendingArticles">
					<span class="loading loading-spinner loading-lg"></span>
				</div>
				<div v-else-if="articles" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					<Article v-for="article of articles" :article="article" />
				</div>
			</div>
		</div>
	</div>
</template>