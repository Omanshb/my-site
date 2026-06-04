"use client";

import { useEffect, useState } from "react";

import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import { DotLoader } from "@/components/ui/dot-loader";

const pongFrames = [
  [14, 7, 0, 8, 6, 13, 20],
  [14, 7, 13, 20, 16, 27, 21],
  [14, 20, 27, 21, 34, 24, 28],
  [27, 21, 34, 28, 41, 32, 35],
  [34, 28, 41, 35, 48, 40, 42],
  [34, 28, 41, 35, 48, 42, 46],
  [34, 28, 41, 35, 48, 42, 38],
  [34, 28, 41, 35, 48, 30, 21],
  [34, 28, 41, 48, 21, 22, 14],
  [34, 28, 41, 21, 14, 16, 27],
  [34, 28, 21, 14, 10, 20, 27],
  [28, 21, 14, 4, 13, 20, 27],
  [28, 21, 14, 12, 6, 13, 20],
  [28, 21, 14, 6, 13, 20, 11],
  [28, 21, 14, 6, 13, 20, 10],
  [14, 6, 13, 20, 9, 7, 21],
];

type MediaPhotoGalleryProps = {
  images: string[];
};

export function MediaPhotoGallery({ images }: MediaPhotoGalleryProps) {
  const [isGalleryReady, setIsGalleryReady] = useState(false);
  const [hasMinimumLoadTimePassed, setHasMinimumLoadTimePassed] =
    useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setHasMinimumLoadTimePassed(true);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, []);

  const shouldHideLoader = isGalleryReady && hasMinimumLoadTimePassed;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <InfiniteGallery
        images={images.map((src, index) => ({
          src,
          alt: `Photo collection image ${index + 1}`,
        }))}
        speed={1.15}
        zSpacing={3.2}
        visibleCount={26}
        className="h-screen w-full overflow-hidden bg-black"
        onReady={() => setIsGalleryReady(true)}
        fadeSettings={{
          fadeIn: { start: 0.04, end: 0.2 },
          fadeOut: { start: 0.42, end: 0.44 },
        }}
        blurSettings={{
          blurIn: { start: 0.0, end: 0.1 },
          blurOut: { start: 0.41, end: 0.44 },
          maxBlur: 6,
        }}
      />
      <div
        className={`pointer-events-none absolute inset-0 grid place-items-center bg-black transition-opacity duration-500 ${
          shouldHideLoader ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={shouldHideLoader}
      >
        <DotLoader
          frames={pongFrames}
          duration={90}
          dotClassName="bg-white/15 [&.active]:bg-white"
        />
      </div>
    </div>
  );
}
