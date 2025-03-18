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
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        slow: "cubic-bezier(.405, 0, .025, 1)",
        "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)",
      },
    },
  },
  animation: {
    fadeIn: "fadeIn 0.5s ease-in",
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["black"],
  },
};
