import { Geist } from "next/font/google";
import localFont from "next/font/local";

export const sansFont = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const displayFont = localFont({
  src: [
    {
      path: "../../public/fonts/lastik/lastik-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/lastik/lastik-regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
