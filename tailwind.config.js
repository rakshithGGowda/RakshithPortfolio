/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#68B2A0",
        darkGreen: "#2C6975",
        lightBackground: "#F0F4F3",
        darkBackground: "#22262D",
        darkBlack: "#1a1a2e",
        grayColor: "#22262D",
        yellowColor: "#FFE033",
        accent: "#4ECDC4",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin 25s linear infinite reverse",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "gradient-x": "gradient-x 6s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%": { boxShadow: "0 0 20px rgba(44,105,117,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(104,178,160,0.6), 0 0 80px rgba(44,105,117,0.2)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
