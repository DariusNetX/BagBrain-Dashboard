import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bagbrain: {
          background: "#0f0f0f",
          accent: "#FFD700",
          glow: "#00F0FF",
          brain: "#FF4ECD",
          cta: "#7C3AED",
        },
        baggold: '#facc15',
        brainblue: '#7dd3fc',
        vaultpurple: '#a855f7',
        chaosred: '#ef4444',
      },
      fontFamily: {
        display: ["'Bungee'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;