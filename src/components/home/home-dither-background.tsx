"use client";

import { DitherShader } from "@/components/ui/dither-shader";

interface HomeDitherBackgroundProps {
  onReady?: () => void;
}

export default function HomeDitherBackground({
  onReady,
}: HomeDitherBackgroundProps) {
  return (
    <div className="fixed inset-0 overflow-hidden" aria-hidden>
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
        onReady={() => {
          onReady?.();
        }}
      />
    </div>
  );
}
