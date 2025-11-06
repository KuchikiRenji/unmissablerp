/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6A00",
          black: "#000000"
        },
        accent: {
          blue1: "#1F4BBE",
          blue2: "#4F98C0",
          blue3: "#21327B"
        },
        muted: "#BDC1D6"
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui"]
      },
      borderRadius: {
        card: "12px",
        pill: "9999px"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)",
        glow: "0 0 0 4px rgba(255,106,0,0.25)"
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(120deg, rgba(255,106,0,0.65), rgba(31,75,190,0.65))",
        "gradient-brand": "linear-gradient(90deg, #FF6A00, #4F98C0)",
        "gradient-deep": "linear-gradient(90deg, #21327B, #1F4BBE)"
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".focus-ring": {
          outline: "none",
          boxShadow: "0 0 0 3px rgba(255,106,0,0.5)"
        }
      });
    }
  ]
};


