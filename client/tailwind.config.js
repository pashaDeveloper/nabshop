/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 60px rgba(32, 155, 208, 0.4)',
      },
      colors: {
        primary: "#ed1945",  
        secondary: "#f43f5e",
        lightbg: "#f5f3f3",
        darkbg: "#222124",
        darkCard: "#111820",
        darkSecondary: "#f43f5e",
        headingColor: "#2e2e2e",
        cartNumBg: "#e80013",
        textColor: "#515151",
        cardOverlay: "rgba(256, 256, 256, 0.4)",
        btnOverlay: "rgba(255, 255, 255, 0.8)",
        lightGray: "#9ca0ab",
        containerbg: "rgba(255, 131, 0, 0.04)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
      },
      fontFamily: {
        nozha: ['Nozha'],
      },
      borderRadius: {
        DEFAULT: "5px",
        primary: "1.5rem",
        secondary: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
