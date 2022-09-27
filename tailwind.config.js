/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-purple": "#D78BFF",
        "theme-blue": "#76D3FF",
        "theme-yellow": "#FFFA9D",
        "theme-orange": "#FFBD74"
      },
      fontFamily: {
        outfitBold: "Outfit-Bold",
        outfitMedium: "Outfit-Medium",
        outfitRegular: "Outfit-Regular",
        outfitSemiBold: "Outfit-SemiBold",
      },
      animation: {
        "bubble-up": "bubbleUp 0.9s linear alternate",
      },
      keyframes: {
        bubbleUp: {
          "0%" : {
              width: "1em",
              height: "1em"
          },
          "25%" : {
              width: "2.5em",
              height: "2.5em"
          },
          "75%" : {
              width: "1em",
              height: "1em"
          },
          "100%" : {
              width: "2em",
              height: "2em"
          }
      },
      }
    },
  },
  plugins: [],
}
