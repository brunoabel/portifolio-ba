/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#050505",     // fundo absoluto
        surface: "#0D0D0F",  // painéis, cards
        line: "rgba(255,255,255,0.08)",
        accent: "#FFFFFF",
        muted: "#8A8A8E",
      },
      fontFamily: {
        // troque pelas fontes que você licenciar/hospedar:
        // Neue Montreal / General Sans / Aeonik no lugar de "display"
        display: ["'General Sans'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 16px rgba(255,255,255,0.06)",
        "glow-md": "0 0 32px rgba(255,255,255,0.10)",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
