import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
  content: [
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '640px', // 기본값 유지
      md: '768px', // 기본값 유지
      lg: '1024px', // 1024px 기준
      xl: '1400px', // 1400px 기준
      '2xl': '1920px', // 1920px 기준
    },
    maxWidth: {
      screen: '1920px', // 최대 width 설정
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default withMT(config);