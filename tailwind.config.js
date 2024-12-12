/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      maxWidth: {
        "w-540": "540px",
        "w-1280": "1280px",
        "w-1390": "1390px",
      },
      backgroundColor: {
        "bg-footer": "#BCCCDC",
        "bg-modal": "#A2D2DF",
        "bg-form": "#EEEEEE",
      },
      fontSize: {
        "fs-30": "30px",
      },
      width: {
        "w-540": "540px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
