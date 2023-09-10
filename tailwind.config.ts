import themes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config}*/
const config = {
	plugins: [
		require('daisyui'),
		require('@tailwindcss/typography')
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
