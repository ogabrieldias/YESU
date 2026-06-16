/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        obsidian: "#0d0d0d",
        carbon: "#111111",
        graphite: "#1a1a1a",
        steel: "#8a8a8a",
        chrome: "#c0c0c0",
        electric: "#ff6b00",
        ember: "#ff8c00",
        glow: "rgba(255,107,0,0.2)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["monospace"],
      },
      animation: {
        "marquee": "marquee 25s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundImage: {
        "gradient-electric": "linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)",
        "gradient-dark": "linear-gradient(145deg, #111111, #0d0d0d)",
      },
    },
  },
  plugins: [],
};
