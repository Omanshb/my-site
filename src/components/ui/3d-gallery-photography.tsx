"use client";

import type React from "react";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type NormalizedImageItem = { src: string; alt?: string };
type ImageItem = string | NormalizedImageItem;

type FadeSettings = {
  fadeIn: {
    start: number;
    end: number;
  };
  fadeOut: {
    start: number;
    end: number;
  };
};

type BlurSettings = {
  blurIn: {
    start: number;
    end: number;
  };
  blurOut: {
    start: number;
    end: number;
  };
  maxBlur: number;
};

type InfiniteGalleryProps = {
  images: ImageItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
};

type PlaneData = {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
};

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 10.5;
const MAX_VERTICAL_OFFSET = 9.75;
const BASE_IMAGE_SIZE = 2.75;

const createClothMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      varying vec2 vUv;

      void main() {
        vUv = uv;

        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;

        pos.z -= (curve + clothEffect);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(map, vUv);

        if (blurAmount > 0.0) {
          vec2 texelSize = vec2(1.0 / 512.0);
          vec4 blurred = vec4(0.0);
          float total = 0.0;

          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }

          color = blurred / total;
        }

        float curveHighlight = abs(scrollForce) * 0.005;
        color.rgb += vec3(curveHighlight);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });

function ImagePlane({
  texture,
  position,
  scale,
  material,
  onSelect,
  isInteractive,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.ShaderMaterial;
  onSelect?: () => void;
  isInteractive: boolean;
}) {
  useEffect(() => {
    material.uniforms.map.value = texture;
  }, [material, texture]);

  return (
    <mesh
      position={position}
      scale={scale}
      material={material}
      onClick={
        isInteractive
          ? (event) => {
              event.stopPropagation();
              onSelect?.();
            }
          : undefined
      }
    >
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

function GalleryScene({
  images,
  speed = 1,
  zSpacing = 3,
  visibleCount = 12,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4, end: 0.43 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
  onLoad,
  onImageSelect,
}: Omit<InfiniteGalleryProps, "className" | "style"> & {
  onImageSelect?: (image: NormalizedImageItem) => void;
}) {
  const { gl } = useThree();
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const lastInteraction = useRef(Date.now());
  const touchY = useRef<number | null>(null);

  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === "string" ? { src: img, alt: "" } : img,
      ),
    [images],
  );

  const textures = useTexture(normalizedImages.map((img) => img.src));
  const textureList = Array.isArray(textures) ? textures : [textures];

  useEffect(() => {
    // useTexture suspends until every texture is decoded, so reaching this
    // effect means the scene is ready. Wait two frames so the first painted
    // frame is on-screen before we tell the parent to fade us in.
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => onLoad?.());
    });

    return () => cancelAnimationFrame(frame);
  }, [onLoad]);

  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount],
  );

  const spatialPositions = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, i) => {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      const horizontalRadius = 1.15 + (i % 4) * 0.7;
      const verticalRadius = 0.9 + ((i + 2) % 5) * 0.42;

      return {
        x:
          (Math.sin(horizontalAngle) *
            horizontalRadius *
            MAX_HORIZONTAL_OFFSET) /
          3.4,
        y:
          (Math.cos(verticalAngle) * verticalRadius * MAX_VERTICAL_OFFSET) /
          3.8,
      };
    });
  }, [visibleCount]);

  const totalImages = normalizedImages.length;
  const depthRange = Math.max(DEFAULT_DEPTH_RANGE, visibleCount * zSpacing);

  const planesData = useRef<PlaneData[]>(
    Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: ((depthRange / visibleCount) * i) % depthRange,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    })),
  );

  useEffect(() => {
    planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }));
  }, [depthRange, spatialPositions, totalImages, visibleCount]);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      setScrollVelocity((prev) => prev + event.deltaY * 0.01 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    },
    [speed],
  );

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (event.touches.length !== 1) return;
    touchY.current = event.touches[0].clientY;
    setAutoPlay(false);
    lastInteraction.current = Date.now();
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (touchY.current === null || event.touches.length !== 1) return;
      event.preventDefault();
      const currentY = event.touches[0].clientY;
      const deltaY = touchY.current - currentY;
      touchY.current = currentY;
      setScrollVelocity((prev) => prev + deltaY * 0.05 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    },
    [speed],
  );

  const handleTouchEnd = useCallback(() => {
    touchY.current = null;
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        setScrollVelocity((prev) => prev - 2 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        setScrollVelocity((prev) => prev + 2 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      }
    },
    [speed],
  );

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    gl,
    handleKeyDown,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() - lastInteraction.current > 3000) {
        setAutoPlay(true);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => materials.forEach((material) => material.dispose());
  }, [materials]);

  useFrame((state, delta) => {
    // When the tab is backgrounded the render loop pauses; the first frame on
    // return arrives with a huge delta. Clamp it so the gallery can't lurch
    // forward through dozens of photos in a single frame.
    const dt = Math.min(delta, 0.05);

    if (autoPlay) {
      setScrollVelocity((prev) => prev + 0.3 * dt);
    }

    setScrollVelocity((prev) => prev * 0.95);

    const time = state.clock.getElapsedTime();
    materials.forEach((material) => {
      material.uniforms.time.value = time;
      material.uniforms.scrollForce.value = scrollVelocity;
    });

    const imageAdvance =
      totalImages > 0 ? visibleCount % totalImages || totalImages : 0;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocity * dt * 10;
      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (newZ >= depthRange) {
        wrapsForward = Math.floor(newZ / depthRange);
        newZ -= depthRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / depthRange);
        newZ += depthRange * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
        plane.imageIndex =
          (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      }

      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % depthRange) + depthRange) % depthRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;

      const normalizedPosition = plane.z / depthRange;
      let opacity = 1;

      if (
        normalizedPosition >= fadeSettings.fadeIn.start &&
        normalizedPosition <= fadeSettings.fadeIn.end
      ) {
        opacity =
          (normalizedPosition - fadeSettings.fadeIn.start) /
          (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
      } else if (normalizedPosition < fadeSettings.fadeIn.start) {
        opacity = 0;
      } else if (
        normalizedPosition >= fadeSettings.fadeOut.start &&
        normalizedPosition <= fadeSettings.fadeOut.end
      ) {
        opacity =
          1 -
          (normalizedPosition - fadeSettings.fadeOut.start) /
            (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
      } else if (normalizedPosition > fadeSettings.fadeOut.end) {
        opacity = 0;
      }

      let blur = 0;

      if (
        normalizedPosition >= blurSettings.blurIn.start &&
        normalizedPosition <= blurSettings.blurIn.end
      ) {
        blur =
          blurSettings.maxBlur *
          (1 -
            (normalizedPosition - blurSettings.blurIn.start) /
              (blurSettings.blurIn.end - blurSettings.blurIn.start));
      } else if (normalizedPosition < blurSettings.blurIn.start) {
        blur = blurSettings.maxBlur;
      } else if (
        normalizedPosition >= blurSettings.blurOut.start &&
        normalizedPosition <= blurSettings.blurOut.end
      ) {
        blur =
          blurSettings.maxBlur *
          ((normalizedPosition - blurSettings.blurOut.start) /
            (blurSettings.blurOut.end - blurSettings.blurOut.start));
      } else if (normalizedPosition > blurSettings.blurOut.end) {
        blur = blurSettings.maxBlur;
      }

      const material = materials[i];
      material.uniforms.opacity.value = Math.max(0, Math.min(1, opacity));
      material.uniforms.blurAmount.value = Math.max(
        0,
        Math.min(blurSettings.maxBlur, blur),
      );
    });
  });

  if (normalizedImages.length === 0) return null;

  return (
    <>
      {planesData.current.map((plane, i) => {
        const texture = textureList[plane.imageIndex];
        const material = materials[i];

        if (!texture || !material) return null;

        const worldZ = plane.z - depthRange / 2;
        const galleryImage = normalizedImages[plane.imageIndex];
        const normalizedPosition = plane.z / depthRange;
        const isInteractive =
          normalizedPosition >= fadeSettings.fadeIn.end &&
          normalizedPosition <= fadeSettings.fadeOut.start;
        const image = texture.image as
          | { width?: number; height?: number }
          | undefined;
        const aspect =
          image?.width && image?.height ? image.width / image.height : 1;
        const scale: [number, number, number] =
          aspect > 1
            ? [BASE_IMAGE_SIZE * aspect, BASE_IMAGE_SIZE, 1]
            : [BASE_IMAGE_SIZE, BASE_IMAGE_SIZE / aspect, 1];

        return (
          <ImagePlane
            key={plane.index}
            texture={texture}
            position={[plane.x, plane.y, worldZ]}
            scale={scale}
            material={material}
            isInteractive={isInteractive}
            onSelect={
              galleryImage ? () => onImageSelect?.(galleryImage) : undefined
            }
          />
        );
      })}
    </>
  );
}

function FallbackGallery({ onLoad }: { onLoad?: () => void }) {
  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  return <div className="h-full w-full bg-black" />;
}

export default function InfiniteGallery({
  images,
  className = "h-screen w-full",
  style,
  speed = 1,
  zSpacing = 3,
  visibleCount = 12,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4, end: 0.43 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
  onLoad,
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState<NormalizedImageItem | null>(null);

  const closeSelectedImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSelectedImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeSelectedImage, selectedImage]);

  if (!webglSupported) {
    return (
      <div className={className} style={style}>
        <FallbackGallery onLoad={onLoad} />
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <GalleryScene
            images={images}
            speed={speed}
            zSpacing={zSpacing}
            visibleCount={visibleCount}
            fadeSettings={fadeSettings}
            blurSettings={blurSettings}
            onLoad={onLoad}
            onImageSelect={setSelectedImage}
          />
        </Suspense>
      </Canvas>
      {selectedImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery photo"
          onClick={closeSelectedImage}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-sm font-medium text-white/90 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            onClick={closeSelectedImage}
            aria-label="Close expanded photo"
          >
            Close
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage.src}
            alt={selectedImage.alt || "Expanded gallery photo"}
            className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl shadow-black/60"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
}
