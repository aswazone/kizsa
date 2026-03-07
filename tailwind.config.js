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

        background: "#0E1317",
        surface: "#1A242E",
        "surface-dark": "#0E1317",
        "surface-light": "#182933",

        foreground: "#FFFFFE",
        "foreground-muted": "#A7B9BE",
        "foreground-subtle": "#727A7E",

        accent: "#FF6B6B",
        "accent-secondary": "#00B894",

        success: "#00B894",
        warning: "#FDCB6E",
        danger: "#FF6B6B",

        border: "#233D46",
        "border-light": "#2E4954",
      },
    },
  },
  plugins: [],
}