/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkish: '#1E1E1E',
        lightbg: '#E9E9E9',
        darkbrown: '#171614',
        light: {
          highlight: '#ccc0b8', // Light theme palette
          header: 'white',
          footer: 'white',
          dashbg: '#f5f5f5',
          basic: '#f1f1f1',
          basic2: '#e8e8e8',
        },
        dark: {
          highlight: '#ccc0b8', // Dark theme palette
          header: '#161616',
          footer: '#161616',
          dashbg: '#1a1a1a',
          basic: '#141414',
          basic2: '#2c2c2c',
        },
      },
    },
  },
  plugins: [],
}
