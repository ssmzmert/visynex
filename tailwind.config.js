/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#0B0E14",
        steel: "#151A22",
        slate: "#1E2633",
        mist: "#A7B2C5",
        electric: "#3FB4FF",
        electricDark: "#1B6AFF",
        line: "#233044"
      },
      boxShadow: {
        glow: "0 0 40px rgba(63, 180, 255, 0.25)",
        card: "0 20px 60px rgba(4, 10, 22, 0.55)"
      },
      backgroundImage: {
        "radial-deck": "radial-gradient(1200px circle at 15% 10%, rgba(63, 180, 255, 0.18), transparent 55%), radial-gradient(900px circle at 90% 20%, rgba(27, 106, 255, 0.18), transparent 50%), radial-gradient(800px circle at 40% 90%, rgba(22, 255, 200, 0.10), transparent 55%)",
        "grid": "linear-gradient(rgba(63, 180, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(63, 180, 255, 0.08) 1px, transparent 1px)"
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-plex)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"]
      }
    }
  },
  plugins: []
};
