/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./utils/**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crystal: "#AEB1D1",
        lightBlueText: "#DEEFFF",
        divider: "#A0A6CF",
        inputBase: "#0A2641",
        buttonPurple: "#C25AFF",
        buttonPink: "#802CFF",
        buttonPurpleBG: "#A143FF",
      },
      backgroundImage: (theme) => ({
        "block-bg": "url('/assets/imgs/Block_Background.jpg')",
        "button-horizontal": `linear-gradient(to right, rgba(255,255,255,0.4), rgba(0,0,0,0.4))`,
        "button-vertical": `linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(0,0,0,0.4))`,
      }),
    },
  },
  plugins: [],
};
