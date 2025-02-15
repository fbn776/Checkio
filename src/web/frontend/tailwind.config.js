/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
    	extend: {
    		colors: {
				primary: '#081627',
				secondary: '#009be5',
    		}
    	}
    },
    plugins: [],
};
