module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0b",
        panel: "#141414",
        accent: "#ff5a1a", // orange accent
        muted: "#9b9b9b"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      }
    },
  },
  plugins: [],
}
