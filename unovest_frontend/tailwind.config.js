import { trackForMutations } from "@reduxjs/toolkit/dist/immutableStateInvariantMiddleware";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        slg: "991px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1920px",
      },
      // content: {
      //   'checked_svg': 'url("/icons/link.svg")',
      // },
      backgroundColor: {
        "menu-bar-bg": "rgba(220, 220, 220, 0.10)",
        "desk-green": "rgba(188, 251, 228, 1)",
      },
      backgroundImage: {
        // 'mob-primary-gradient': " radial-gradient(203.82% 246.31% at 149.17% -96%, #9891AD 0%, #538096 13.34%, #131529 71.53%)",
        "mob-home-card-gradient":
          "linear-gradient(180deg, rgba(154, 154, 154, 0.20) 0.49%, rgba(154, 154, 154, 0.10) 99.66%)",
        "mob-primary-gradient":
          " radial-gradient(203.82% 209.31% at -1.83% -96%, #9891AD 0%, #538096 13.34%, #131529 71.53%)",
        "start-quiz-gradient":
          "radial-gradient(203.82% 203.31% at 97.17% -96%, #9891AD 0%, #538096 13.34%, #131529 71.53%)",
        "primary-gradient":
          " radial-gradient(523.2% 150.83% at 45.58% -25.49%, #9891AD 0%, #538096 22.18%, #3C566E 48.5%, #131529 89.23%)",
        "secondary-gradient":
          "radial-gradient(circle, rgba(152,145,173,1) 0%, rgba(83,128,150,1) 7%, rgba(60,86,110,1) 21%, rgba(19,21,41,1) 80%)",
        "get-start-gradient":
          "radial-gradient(203.82% 246.31% at 149.17% -96%, #9891AD 0%, #538096 43.14%, #2D4054 71.99%, #131529 91.11%)",
        "get-start-gradient-center":
          "radial-gradient(171.82% 234.31% at 64.17% -122%, #9891AD 0%, #538096 43.14%, #2D4054 71.99%, #131529 91.11%)",
        "congratulation-bg-gradiant":
          "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.25) 74.48%, rgba(255, 255, 255, 0.00) 100%)",
        // 'question-Card-gradiant': "linear-gradient(199deg, rgb(24 33 50 / 32%) 28.7%, rgb(24 34 51 / 66%) 65.07%);",
        "question-Card-gradiant":
          " linear-gradient(184deg, rgba(24, 33, 50, 0.20) 2.7%, rgba(24, 34, 51, 0.20) 96.07%)",
        "question-number-gradiant":
          "linear-gradient(108.12deg, #FFFFFF 14.09%, rgba(255, 255, 255, 0) 107.18%)",
        "all-goals-gradiant":
          "radial-gradient(203.82% 246.31% at 149.17% -96%, #9891AD 0%, #538096 43.14%, #2D4054 71.99%, #131529 91.11%)",
        "card-gradiant":
          "radial-gradient(203.82% 154.31% at 68.17% -47%, #9891AD 0%, #538096 43.14%, #2D4054 71.99%, #131529 91.11%)",
        "result-gradiant":
          " radial-gradient(145.42% 664.97% at 129.74% 136.67%, #9891AD 0%, #538096 22.18%, #3C566E 37.79%, #131529 89.23%)",
        "tranperent-gradiant":
          "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0))",

        "desk-main-bg":
          "radial-gradient(67.33% 85% at 52.78% 12.44%, #9891AD 0%, #538096 22.18%, #3C566E 42.75%, #131529 89.23%)",
        "mob-main-bg":
          "radial-gradient(203.82% 246.31% at 149.17% -96%, #9891AD 0%, #538096 37.25%, #131529 71.53%)",
        "mob-congratulation":
          "radial-gradient(203.82% 246.31% at 149.17% -96%, #9891AD 0%, #538096 37.25%, #131529 71.53%)",
        "coming-soon-bg":
          "radial-gradient(664.97% 145.42% at 136.67% 129.74%, rgb(152, 145, 173) 0%, rgb(83, 128, 150) 22.18%, rgb(60, 86, 110) 37.79%, rgb(19, 21, 41) 89.23%)",
        "myMoneyPath-gradient":
          "radial-gradient(100.2% 150.83% at 110.58% 110.51%, #9891AD 0%, #538096 22.18%, #3C566E 48.5%, #131529 89.23%)",
      },
      colors: {
        "dark-blue": "#0F3A4D",
        "accent-light-blue": "#4196BA",
        "accent-bright-green": "#67EAB3",
        "accent-green": "#BCFBE4",
        "grey-0": "#DCDCDC",
        "grey-1": "#EFEFEF",
        "grey-2": "#ECECEC",
        "grey-3": "#B5B5B5",
        "grey-4": "#676767",
        "grey-5": "#43525D",
        "grey-6": "#384151",
        "desk-purple": "#B0C3F5",
        "desk-purple-1": "rgba(176, 195, 245, 0.2)",
        "desk-light-blue-1": "rgb(180, 218, 246)",
        "desk-text-grey-3": "rgba(181, 181, 181, 1)",
        "light-blue-1": "#B7C3D8",
        "desk-light-blue-2": "#B4DAF6",
        aqua: "#A1FBF6",
        "blue-grey": "#435066",
        orange: "#FF9356",
        "blue-grey": "rgba(67, 80, 102, 1)",
        "desk-green": "rgba(188, 251, 228, 1)",
        "orange-1": "#EC8D59",
        "grey-0-opacity": "rgba(220, 220, 220, 0.1)",
        "accent-green-opacity": "rgba(188, 251, 228,0.45)",
        "dark-blue-gray": "#232E41",
      },
      fontFamily: {
        // arial: ['Arial', 'sans'],
        Montserrat: ["Montserrat", "sans-serif"],
        Work_Sans: ["WorkSans", "sans-serif"],
      },
      container: {
        center: true,
      },
      boxShadow: {
        "highlight-card": "rgba(139, 192, 217, 0.50) 0px 0px 20px 0px",
        "icon-flip": "rgba(60, 86, 110, 1) 0px 0px 12px 1px",
      },
      keyframes: {
        "fade-in-effect": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "spin-one-effect": {
          "0%": { transform: "rotate(-90deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        "grow-out-effect": {
          "0%": {
            transform: "scale(0)",
            backgroundColor: "transparent",
            shadow: "none",
          },
          "100%": { transform: "scale(1)", shadow: "2px 2px 5px black" },
        },
        "spin-meter-effect": {
          "0%": { transform: "rotate(-90deg)" },
          "50%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-90deg)" },
        },
      },
      animation: {
        "grow-out": "grow-out-effect 0.5s linear",
        "fade-in": "fade-in-effect 3s linear",
        "spin-one": "spin-one-effect 1s linear",
        "spin-meter": "spin-meter-effect 4s linear",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
