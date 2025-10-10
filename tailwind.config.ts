// tailwind.config.js
module.exports = {
  darkMode: 'class', // This line is crucial
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add other relevant paths
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};