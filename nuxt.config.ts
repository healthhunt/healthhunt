export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/tailwindcss',
		'@sidebase/nuxt-auth',
		'@nuxtjs/eslint-module',
		'@tailvue/nuxt',
	],
	build: {
		transpile: ['trpc-nuxt']
	},
	auth: {
		isEnabled: true,
		origin: process.env.ORIGIN,
		basePath: '/api/auth',
		enableGlobalAppMiddleware: true,
		addDefaultCallbackUrl: true,
		globalMiddlewareOptions: {
			allow404WithoutAuth: true,
			addDefaultCallbackUrl: true
		}
	}
});
