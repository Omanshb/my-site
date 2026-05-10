"use client";

import { useState } from "react";

import { BackgroundReadingGradient } from "@/components/background-reading-gradient";
import { HomeHero } from "@/components/home-hero";
import { SocialLinks } from "@/components/social-links";
import { TopNav } from "@/components/top-nav";
import HomeDitherBackground from "@/components/ui/home-dither-background";

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
