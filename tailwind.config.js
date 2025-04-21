export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ffffff",
          light: "#6C49FF",
          dark: "#2E0FC2",
        },
        secondary: {
          DEFAULT: "#707EAE",
          light: "#A3AED0",
          dark: "#4D5875",
        },
        background: "#F4F7FE",
        success: {
          DEFAULT: "#05CD99",
          light: "#1CE7B4",
          dark: "#039D76",
        },
        warning: {
          DEFAULT: "#FFCE20",
          light: "#FFD947",
          dark: "#CC9D00",
        },
        error: {
          DEFAULT: "#FF5252",
          light: "#FF7575",
          dark: "#CC2929",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        "card-2": "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
      },
    },
  },
  plugins: [],
};
