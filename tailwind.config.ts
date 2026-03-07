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
        obsidian: "#0B0E0B",
        "forest-900": "#111A13",
        "forest-700": "#2E4830",
        olive: "#6C7F56",
        copper: "#9C6A3F",
        bronze: "#B78A59",
        sand: "#EDE8DD"
      },
      boxShadow: {
        copper: "0 20px 45px rgba(156, 106, 63, 0.22)",
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
