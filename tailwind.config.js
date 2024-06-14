/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				pl1: {
					200: "#B6D6E2",
					400: "#4085A0",
					600: "#32687D",
				},
				pl2: {
					200: "#E6AC73",
					400: "#BF7B30",
					600: "#835221",
				},
				ego: "#FFAFCC",
				moon: "#F8F4E3",
				night: {
					100: "#ADADAD",
					200: "#999999",
					300: "#858585",
					400: "#707070",
					500: "#5C5C5C",
					600: "#474747",
					700: "#333333",
					800: "#1F1F1F",
					900: "#0A0A0A",
				},
			},
		},
	},
	plugins: [],
};
