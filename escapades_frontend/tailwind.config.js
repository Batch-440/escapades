/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "60px",
      },
    },
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   // due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
  //   preflight: false,
  // },
};
