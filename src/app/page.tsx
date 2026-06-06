"use client";

import { useState } from "react";

import { BackgroundReadingGradient } from "@/components/home/background-reading-gradient";
import HomeDitherBackground from "@/components/home/home-dither-background";
import { HomeHero } from "@/components/home/home-hero";
import { useHomeFixedLayout } from "@/components/home/use-home-fixed-layout";
import { TopLeftStatus } from "@/components/layout/top-left-status";
import { TopNav } from "@/components/layout/top-nav";

export default function HomePage() {
  const [isDitherReady, setIsDitherReady] = useState(false);
  const useFixedLayout = useHomeFixedLayout();

  return (
    <div
      className={`transition-opacity duration-300 ${
        isDitherReady ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <HomeDitherBackground
        useFixedLayout={useFixedLayout}
        onReady={() => setIsDitherReady(true)}
      />
      {useFixedLayout ? <BackgroundReadingGradient /> : null}
      <HomeHero useFixedLayout={useFixedLayout} />
      {/* Scroll region that reveals the fixed city after the black text screen. */}
      {!useFixedLayout ? (
        <div className="relative h-[100svh]" aria-hidden />
      ) : null}
      <TopLeftStatus />
      <TopNav />
    </div>
  );
}
