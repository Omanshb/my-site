import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Your Name",
    template: "%s · Your Name",
  },
  description: "Personal website — projects, writing, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
