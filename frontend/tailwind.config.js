/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          base: "#0f1117",
          surface: "#161a24",
          soft: "#f6f3ed",
          gold: "#c7a86b",
          goldDark: "#9f7b3f",
          muted: "#9aa0ae"
        }
      },
      boxShadow: {
        soft: "0 10px 35px rgba(15, 17, 23, 0.12)",
        card: "0 14px 40px rgba(15, 17, 23, 0.15)"
      },
      borderRadius: {
        card: "1.25rem"
      },
      backgroundImage: {
        "gold-glow":
          "radial-gradient(circle at 20% 20%, rgba(199, 168, 107, 0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(199, 168, 107, 0.1), transparent 30%)"
      }
    }
  },
  plugins: []
};
