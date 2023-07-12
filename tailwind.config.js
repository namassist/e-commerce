/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#131313",
          secondary: "#D5E68D",
          accent: "#37cdbe",
          neutral: "#3d4451",
          error: "#6B0504",
          "base-100": "#ffffff",
        },
      },
      "light",
      "cupcake",
    ],
  },
};
