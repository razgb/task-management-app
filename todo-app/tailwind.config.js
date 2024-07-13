/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heading: "var(--heading)",
        headingSub: "var(--heading-sub)",
        text: "var(--text)",

        primaryBg: "var(--primary-bg)",
        secondaryBgStrong: "var(--secondary-bg-strong)",
        secondaryBg: "var(--secondary-bg)",
        secondaryBgWeak: "var(--secondary-bg-weak)",
        // accentBg: "var(--accent-bg)",
        // accentBgWeak: "var(--accent-bg-weak)",

        iconBg: "var(--icon-bg)",
        iconBgStrong: "var(--icon-bg-strong)",
        iconBgStrongest: "var(--icon-bg-strongest)",
        iconStroke: "var(--icon-stroke)",

        btnBg: "var(--btn-bg)",
        btnHover: "var(--btn-hover)",
        btnActive: "var(--btn-active)",

        progress: "var(--progress)",
        progressText: "var(--progress-text)",
        progressBtn: "var(--progress-btn)",
        progressIcon: "var(--progress-icon)",

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
    },
  },
  plugins: [],
};
