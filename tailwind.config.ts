import themes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config}*/
const config = {
	plugins: [
		require('daisyui'),
		require('@tailwindcss/typography')
	],
	content: [
		'node_modules/tailvue/dist/tailvue.es.js',
	],
	daisyui: {
		themes: [
			{
				light: {
					...themes['[data-theme=light]'],
				}
			},
			{
				dark: {
					...themes['[data-theme=dark]'],
				}
			}
		]
	}
};

module.exports = config;
