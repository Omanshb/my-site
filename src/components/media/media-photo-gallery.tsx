"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";

import InfiniteGallery from "@/components/ui/3d-gallery-photography";

type MediaPhotoGalleryProps = {
  images: string[];
};

export function MediaPhotoGallery({ images }: MediaPhotoGalleryProps) {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <motion.div
      className="h-screen w-full bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <InfiniteGallery
        images={images.map((src, index) => ({
          src,
          alt: `Photo collection image ${index + 1}`,
        }))}
        speed={1.15}
        zSpacing={3.2}
        visibleCount={26}
        className="h-screen w-full overflow-hidden bg-black"
        fadeSettings={{
          fadeIn: { start: 0.04, end: 0.2 },
          fadeOut: { start: 0.42, end: 0.44 },
        }}
        blurSettings={{
          blurIn: { start: 0.0, end: 0.1 },
          blurOut: { start: 0.41, end: 0.44 },
          maxBlur: 6,
        }}
        onLoad={handleLoad}
      />
    </motion.div>
  );
}
