"use client";

import Image from "next/image";

import { DitherShader } from "@/components/ui/dither-shader";

type WritingCoverProps = {
  src?: string;
  alt: string;
  useDither?: boolean;
  zoomClassName?: string;
};

export function WritingCover({
  src,
  alt,
  useDither,
  zoomClassName,
}: WritingCoverProps) {
  if (!src) {
    return null;
  }

  if (useDither) {
    return (
      <DitherShader
        src={src}
        gridSize={1}
        ditherMode="bayer"
        colorMode="original"
        brightness={-0.12}
        contrast={1.4}
        primaryColor="#000000"
        secondaryColor="#f5f5f5"
        objectFit="cover"
        className={zoomClassName}
        canvasClassName="h-full w-full"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${zoomClassName ?? ""}`}
      sizes="(min-width: 640px) 112px, 96px"
    />
  );
}
