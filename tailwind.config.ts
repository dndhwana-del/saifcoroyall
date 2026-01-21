import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* Royal Gulf Palette */
        gold: {
          DEFAULT: "hsl(42, 55%, 58%)",
          light: "hsl(45, 70%, 70%)",
          dark: "hsl(38, 65%, 45%)",
        },
        bronze: {
          DEFAULT: "hsl(38, 65%, 52%)",
          dark: "hsl(30, 50%, 38%)",
        },
        sand: {
          DEFAULT: "hsl(45, 50%, 93%)",
          dark: "hsl(43, 45%, 88%)",
        },
        espresso: {
          DEFAULT: "hsl(8, 27%, 19%)",
          dark: "hsl(8, 30%, 12%)",
        },
        parchment: "hsl(43, 45%, 91%)",
        cardstock: "hsl(var(--cardstock))",
        bronze: {
          DEFAULT: "hsl(var(--bronze))",
          light: "hsl(var(--bronze-light))",
          dark: "hsl(var(--bronze-dark))",
        },
      },
      fontFamily: {
        royal: ["'Cinzel Decorative'", "'Playfair Display'", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        archway: "50% 50% 0 0 / 20% 20% 0 0",
      },
      boxShadow: {
        royal: "0 4px 20px -2px hsla(42, 55%, 40%, 0.15), 0 8px 40px -4px hsla(8, 27%, 19%, 0.1)",
        gold: "0 4px 30px -4px hsla(42, 55%, 58%, 0.4)",
        soft: "0 2px 12px -2px hsla(8, 27%, 19%, 0.08)",
        archway: "inset 0 0 60px hsla(42, 55%, 58%, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
