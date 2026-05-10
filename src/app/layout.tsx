import type { Metadata } from "next";
import { displayFont, heroFont, navFont, sansFont } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Omansh Bainsla",
    template: "%s · Omansh Bainsla",
  },
  description: "Software engineer based in San Francisco, CA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/media/images/cityskyline.jpeg" />
      </head>
      <body
        className={`${sansFont.variable} ${displayFont.variable} ${heroFont.variable} ${navFont.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
