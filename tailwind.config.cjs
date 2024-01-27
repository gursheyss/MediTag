/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'dark-grey': '#171717',
				beige: '#FFF7F8'
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			}
		}
	},

	plugins: []
};

module.exports = config;
