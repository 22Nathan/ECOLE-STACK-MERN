/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* eerie black  #1b1f24 */ 'awa-1': 'rgba(27, 31, 36, 1)',
				/* white        #ffffff */ 'awa-2': 'rgba(255, 255, 255, 1)',
				/* aquamarine   #89f7bd */ 'awa-3': 'rgba(137, 247, 189, 1)',
				/* purple       #a77bf3 */ 'awa-4': 'rgba(167, 123, 243, 1)',
				/* dark purple  #2b2344 */ 'awa-5': 'rgba(43, 35, 68, 1)',
      }
    },
  },
  plugins: [],
}

