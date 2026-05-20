"use client";

import { useState } from "react";

import { BackgroundReadingGradient } from "@/components/home/background-reading-gradient";
import HomeDitherBackground from "@/components/home/home-dither-background";
import { HomeHero } from "@/components/home/home-hero";
import { SocialLinks } from "@/components/layout/social-links";
import { TopNav } from "@/components/layout/top-nav";

export default function HomePage() {
  const [isDitherReady, setIsDitherReady] = useState(false);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isDitherReady ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <HomeDitherBackground onReady={() => setIsDitherReady(true)} />
      <BackgroundReadingGradient />
      <SocialLinks />
      <TopNav />
      <HomeHero />
    </div>
  );
}
