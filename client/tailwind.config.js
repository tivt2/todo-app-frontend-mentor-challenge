/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryBlue: "hsl(220, 98%, 61%)",
        primaryRed: "hsl(5,70%, 50%)",
        gradientBlue: "hsl(192, 100%, 67%)",
        gradientPurple: "hsl(280, 87%, 65%)",
        "light-base-100": "hsl(0, 0%, 98%)",
        "light-base-200": "hsl(236, 33%, 92%)",
        "light-base-300": "hsl(233, 11%, 84%)",
        "light-base-400": "hsl(236, 9%, 61%)",
        "light-base-500": "hsl(235, 19%, 35%)",
        "dark-base-hover": "hsl(236, 33%, 92%)",
        "dark-base-100": "hsl(234, 39%, 85%)",
        "dark-base-200": "hsl(234, 11%, 52%)",
        "dark-base-300": "hsl(233, 14%, 35%)",
        "dark-base-400": "hsl(237, 14%, 26%)",
        "dark-base-500": "hsl(235, 24%, 19%)",
        "dark-base-600": "hsl(235, 21%, 11%)",
      },
      screens: {
        brkpt: "576px",
      },
      boxShadow: {
        darkDesktop: "0 30px 30px -5px rgba(0,0,0,0.3)",
        lightDesktop: "0 30px 30px -5px rgba(0,0,0,0.08)",
        darkMobile: "0 30px 30px -10px rgba(0,0,0,0.3)",
        lightMobile: "0 30px 30px -5px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
