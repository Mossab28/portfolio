import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0D1A",
        "forest-900": "#0D1525",
        "forest-700": "#1A3050",
        olive: "#3B6FA0",
        copper: "#2563EB",
        bronze: "#60A5FA",
        sand: "#E2E8F0"
      },
      boxShadow: {
        copper: "0 20px 45px rgba(37, 99, 235, 0.22)",
        ambient: "0 30px 80px rgba(0, 0, 0, 0.42)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(rgba(255,255,255,0.04) 0.5px, transparent 0.5px)"
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    }
  },
  plugins: []
};

export default config;
