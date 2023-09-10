// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/tailwindcss',
		'@sidebase/nuxt-auth',
		'@nuxtjs/eslint-module',
	],
	build: {
		transpile: ['trpc-nuxt']
	},
	auth: {
		isEnabled: true,
		origin: 'http://localhost:3000',
		basePath: '/api/auth',
		enableSessionRefreshPeriodically: false,
		enableSessionRefreshOnWindowFocus: true,
		globalAppMiddleware: false,
		defaultProvider: undefined,
		addDefaultCallbackUrl: true,
		globalMiddlewareOptions: {
			allow404WithoutAuth: true,
			addDefaultCallbackUrl: true
		}
	}
});
