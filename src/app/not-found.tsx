import Link from "next/link";

import { TopLeftStatus } from "@/components/layout/top-left-status";
import { TopNav } from "@/components/layout/top-nav";
import { DitheringShader } from "@/components/ui/dithering-shader";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 translate-y-75 scale-y-55 opacity-90">
        <DitheringShader
          shape="wave"
          type="8x8"
          colorBack="#000000"
          colorFront="#FFFFFF"
          pxSize={2.5}
          speed={0.7}
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <TopLeftStatus />
      <TopNav />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl -translate-y-6 flex-col items-center justify-center px-6 text-center sm:px-8">
        <h1 className="font-display text-[42px] leading-[0.98] text-white/95 sm:text-[42px]">
          You&apos;ve wandered too far.
        </h1>
        <p className="font-notes-section mt-4 text-[15px] uppercase tracking-[0.14em] text-white/45">
          404
        </p>
      </main>
    </div>
  );
}
