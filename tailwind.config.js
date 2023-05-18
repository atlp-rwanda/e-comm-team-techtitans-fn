/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        primarydark: "#222222",
        secondary: "#7A89E9",
        textprimary: "#ffffff",
        accent: "#78909C",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      fontSize: {
        "sm": "0.75rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};
