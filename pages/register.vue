<script setup lang="ts">
// use querystring
const route = useRoute();

definePageMeta({
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: '/',
	}
});

const { signIn } = useAuth();

const username = ref('');
const password = ref('');

const errorMessage = ref(route.query.error === 'CredentialsSignin' ? 'Username already exists.' : undefined);

async function register() {
	const { error, url } = await signIn('credentials', {
		username: username.value,
		password: password.value,
		register: 'true',
		redirect: false,
		callbackUrl: route.query.callbackUrl === null
			? undefined : Array.isArray(route.query.callbackUrl) ? route.query.callbackUrl[0]!
				: route.query.callbackUrl,
	});

	if (error) {
		errorMessage.value = 'Username already exists.';
	} else {
		errorMessage.value = undefined;

		return navigateTo(url, { external: true });
	}
}
</script>

<template>
	<div class="grid justify-center gap-4">
		<div class="alert alert-error max-w-md" v-if="errorMessage">
			<span>{{ errorMessage }}</span>
		</div>

		<div class="prose">
			<h1 class="text-center">Sign up</h1>
		</div>

		<form @submit.prevent="register" class="max-w-md flex flex-col gap-2">
			<div class="form-control w-full">
				<label class="label">
					<span class="label-text">Username</span>
				</label>
				<input type="text" required v-model="username" placeholder="medihacks" class="input input-bordered w-full" />
			</div>
			<div class="form-control w-full">
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<input type="password" required v-model="password" placeholder="●●●●●●●●" class="input input-bordered w-full" />
			</div>

			<button type="submit" class="btn btn-success place-self-end">Create account</button>
		</form>

		<nuxt-link to="/login" class="text-center">
			<p>Have an account? <span class="underline">Log in instead</span>.</p>
		</nuxt-link>
	</div>
</template>
