/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundImage: {
        "custom-radial":
          "radial-gradient(126% 88% at 50% 50%, #2d3941 0%, #1e2a2e 100%)",
      },
      fontFamily: {
        clash: ["Clash Display"],
      },
      animation: {
        downMove: "downMove 20s linear infinite",
        upMove: "upMove 20s linear infinite",
        leftMove: "leftMove 20s linear infinite",
        rightMove: "rightMove 20s linear infinite",
      },
      keyframes: {
        downMove: {
          "0%": {
            "-webkit-transform": "translateY(-50%)",
            transform: "translateY(-50%)",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
        },
        upMove: {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
          "100%": {
            "-webkit-transform": "translateY(-50%)",
            transform: "translateY(-50%)",
          },
        },
        leftMove: {
          "0%": {
            "-webkit-transform": "translateX(-50%)",
            transform: "translateX(-50%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        rightMove: {
          "0%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
          "100%": {
            "-webkit-transform": "translateX(-50%)",
            transform: "translateX(-50%)",
          },
        },
      },
    },
  },
  plugins: [],
}
