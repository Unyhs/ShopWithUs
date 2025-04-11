/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{'my-custom-purple':'#490b3d','my-custom-gold':'#d4a837'}
    },
  },
  plugins: [],
}

