/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        romantic: ["Great Vibes", "cursive"], // Fancy Romantic Font for Headlines
        modern: ["Poppins", "sans-serif"], // Clean & Modern Font for Body
        stylish: ["Lora", "serif"], // Elegant Font for Buttons & CTA
        smooth: ["Raleway", "sans-serif"], // Light & Stylish Font for Secondary Text
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["valentine"],
  },
};
