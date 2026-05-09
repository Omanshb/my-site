"use client";

import { DitherShader } from "@/components/ui/dither-shader";

export default function HomeDitherBackground() {
  return (
    <div className="fixed inset-0" aria-hidden>
      <DitherShader
        src="/media/images/cityskyline.jpeg"
        gridSize={3}
        ditherMode="bayer"
        colorMode="original"
        brightness={-0.12}
        contrast={1.4}
        primaryColor="#000000"
        secondaryColor="#f5f5f5"
        objectFit="cover"
        className="h-full w-full"
      />
    </div>
  );
}
