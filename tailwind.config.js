/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    colors: {
      "transparent": "transparent",
      "current": "currentColor",
      "background": "#F4F4F4",
      "backgroundDark": "#1A1A1A",
      "black": "#000000",
      "lightText": "#FFFFFF",
      "darkText": "#222222",
      "primary": {
        "100": "#C0DAF0",
        "200": "#A0C4E4",
        "300": "#8AB3DC",
        "400": "#7A9FCA",
        "500": "#4A6E97",
        "600": "#204C80",
        "700": "#1A3D6B",
        "800": "#132A4D",
        "900": "#0E1E35"
      },
      "alertRed": {
        "300": "#DFA095",
        "500": "#C76864",
        "700": "#B03A2E"
      },
      "alertGreen": {
        "300": "#A0D0AA",
        "500": "#6BAD73",
        "700": "#2B8A3E"
      }
    },
    extend: {}
  },
  plugins: []
};
