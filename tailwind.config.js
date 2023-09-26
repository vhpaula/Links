/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    extend: {
        fontFamily: {
            custom: ["Space Grotesk", "sans"], // 'custom' é o nome que você pode usar nas classes CSS
        },
    },
};
