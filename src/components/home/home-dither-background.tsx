"use client";

import { DitherShader } from "@/components/ui/dither-shader";

interface HomeDitherBackgroundProps {
  useFixedLayout?: boolean;
  onReady?: () => void;
}

const DESKTOP_OBJECT_POSITION = "35% 58%";
const MOBILE_OBJECT_POSITION = "32% 80%";

export default function HomeDitherBackground({
  useFixedLayout = false,
  onReady,
}: HomeDitherBackgroundProps) {
  const objectPosition = useFixedLayout
    ? DESKTOP_OBJECT_POSITION
    : MOBILE_OBJECT_POSITION;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
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
        objectPosition={objectPosition}
        className="h-full w-full"
        onReady={() => {
          onReady?.();
        }}
      />
    </div>
  );
}
