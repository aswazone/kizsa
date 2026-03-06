/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#5CBDE7",
        "primary-dark": "#4BA9D1",
        "primary-light": "#70ace4bf",

        background: "#0F0E17",
        surface: "#1A2E3A",
        "surface-dark": "#0F0E17",
        "surface-light": "#16213E",

        foreground: "#FFFFFE",
        "foreground-muted": "#A7A9BE",
        "foreground-subtle": "#72757E",

        accent: "#FF6B6B",
        "accent-secondary": "#00B894",

        success: "#00B894",
        warning: "#FDCB6E",
        danger: "#FF6B6B",

        border: "#233D46",
        "border-light": "#2E4654",
      },
    },
  },
  plugins: [],
}