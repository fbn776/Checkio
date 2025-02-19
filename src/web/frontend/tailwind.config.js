/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#64aad5'
                },
            }
        }
    },
    plugins: [],
};
