import { Alex_Brush, Geist, IBM_Plex_Mono, Inter_Tight } from "next/font/google";
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

export const heroFont = localFont({
  src: [
    {
      path: "../../public/fonts/lastik/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-hero",
  display: "swap",
});

export const navFont = Inter_Tight({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-nav",
  display: "swap",
});

export const notesSectionFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-notes-section",
  display: "swap",
});

export const signatureFont = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});
