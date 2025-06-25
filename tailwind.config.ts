import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Optional: add glowing text as utility if you prefer this route
    },
  },
  plugins: [],
};

export default config;