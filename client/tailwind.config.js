/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                prime: "#0a0a0a", // Deep Black/Grey
                accent: "#3b82f6", // Neon Blue
                secondary: "#8b5cf6", // Purple
                surface: "#1e293b", // Slate 800
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
