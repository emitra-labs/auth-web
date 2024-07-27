/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@emitra-labs/ui/dist/**/*.{js,svelte}'
	],
	theme: {
		extend: {}
	},
	plugins: [],
	presets: [require('@emitra-labs/ui/preset.cjs')]
};
