/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    mode: 'jit',
    theme: {
        extend: {
            fontFamily: {
                'nunito': ['Nunito, sans-serif;'],
            },
        },
    },
    plugins: [],
};
