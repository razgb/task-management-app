/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heading: "var(--heading)",
        headingSub: "var(--heading-sub)",
        text: "var(--text)",
        textWeak: "var(--text-weak)",
        textPlaceholder: "var(--text-placeholder)",
        textContrast: "var(--text-contrast)",
        textWeakContrast: "var(--text-weak-contrast)",

        testing: "#443344",

        primary: {
          100: "var(--primary-100)",
        },

        primaryBg: "var(--primary-bg)",

        secondary: {
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
        },

        experimental: {
          100: "var(--experimental-100)",
          300: "var(--experimental-300)",
          500: "var(--experimental-500)",
          700: "var(--experimental-700)",
          900: "var(--experimental-900)",
        },

        accent: {
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          500: "var(--accent-500)",
          700: "var(--accent-700)",
          900: "var(--accent-900)",
        },

        secondaryBgStrong: "var(--secondary-bg-strong)",
        secondaryBg: "var(--secondary-bg)",
        secondaryBgWeak: "var(--secondary-bg-weak)",

        scrollbar: "var(--scrollbar)",
        checkbox: "var(--checkbox)",
        focusOutline: "var(--focus-outline)",

        iconBg: "var(--icon-bg)",
        iconBgStrong: "var(--icon-bg-strong)",
        iconBgStrongest: "var(--icon-bg-strongest)",
        iconStroke: "var(--icon-stroke)",

        btnBg: "var(--btn-bg)",
        btnHover: "var(--btn-hover)",
        btnActive: "var(--btn-active)",

        mainButtonBg: "var(--main-button-bg)",
        mainButtonBgHover: "var(--main-button-bg-hover)",
        mainButtonBgActive: "var(--main-button-bg-active)",

        progress: "var(--progress)",
        progressText: "var(--progress-text)",
        progressBtn: "var(--progress-btn)",
        progressIcon: "var(--progress-icon)",

        loadingBar: "var(--loadingbar)",

        success: "var(--success)",
        successText: "var(--success-text)",
        successBtn: "var(--success-btn)",
        successIcon: "var(--success-icon)",

        error: "var(--error)",
        errorText: "var(--error-text)",
        errorBtn: "var(--error-btn)",
        errorIcon: "var(--error-icon)",

        link: "var(--link)",
        linkHover: "var(--link-hover)",
        linkActive: "var(--link-active)",

        inputBg: "var(--input-bg)",
        inputBorder: "var(--input-border)",
        inputFocus: "var(--input-focus)",

        cardBg: "var(--card-bg)",
        cardBorder: "var(--card-border)",
      },
      animation: {
        wave: "wave 1.25s linear infinite",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
