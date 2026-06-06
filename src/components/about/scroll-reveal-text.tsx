"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type RevealImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ScrollRevealTextProps = {
  text: string | string[];
  images?: RevealImage[];
};

type Slot = {
  position: string;
  size: string;
  aspect: string;
  rotate: number;
  y: [number, number];
  fadeIn: [number, number];
};

// Inline grayscale fractal-noise used as printed-paper grain on the Polaroid frames.
const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Four corner slots framing the centered text. Order is meaningful:
// [top-left landscape, bottom-left portrait, top-right portrait, bottom-right landscape].
const SLOTS: Slot[] = [
  {
    position: "left-[2.5%] top-[16%]",
    size: "w-[18vw] max-w-[290px]",
    aspect: "aspect-[7/5]",
    rotate: -4,
    y: [70, -55],
    fadeIn: [0, 0.2],
  },
  {
    position: "left-[6.5%] bottom-[11%]",
    size: "w-[13vw] max-w-[210px]",
    aspect: "aspect-[2/3]",
    rotate: 3.5,
    y: [95, -25],
    fadeIn: [0.05, 0.27],
  },
  {
    position: "right-[5.5%] top-[5%]",
    size: "w-[13vw] max-w-[210px]",
    aspect: "aspect-[3/4]",
    rotate: 4,
    y: [-15, 85],
    fadeIn: [0.025, 0.24],
  },
  {
    position: "right-[2.5%] bottom-[5%]",
    size: "w-[18vw] max-w-[290px]",
    aspect: "aspect-[4/3]",
    rotate: -3,
    y: [55, -80],
    fadeIn: [0.07, 0.3],
  },
];

export function ScrollRevealText({ text, images = [] }: ScrollRevealTextProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const paragraphs = Array.isArray(text) ? text : [text];
  const totalChars = paragraphs
    .flatMap((paragraph) => paragraph.split(" "))
    .reduce((sum, word) => sum + word.length, 0);

  let charsBefore = 0;

  return (
    <>
      <section ref={targetRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {images.slice(0, SLOTS.length).map((image, index) => (
              <FloatingPhoto
                key={image.src}
                progress={scrollYProgress}
                slot={SLOTS[index]}
                image={image}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-3xl translate-y-8 space-y-7 text-center font-display text-[20px] font-[300] leading-[1.45] tracking-tight">
            {paragraphs.map((paragraph, paragraphIndex) => {
              const words = paragraph.split(" ");

              return (
                <p
                  key={paragraphIndex}
                  className="flex flex-wrap justify-center"
                >
                  {words.map((word, wordIndex) => {
                    const wordStart = charsBefore;
                    charsBefore += word.length;

                    return (
                      <span key={wordIndex} className="mr-[0.28em] inline-flex">
                        {word.split("").map((char, charIndex) => {
                          const index = wordStart + charIndex;
                          const start = index / totalChars;
                          const end = (index + 1) / totalChars;

                          return (
                            <Char
                              key={charIndex}
                              progress={scrollYProgress}
                              range={[start, end]}
                            >
                              {char}
                            </Char>
                          );
                        })}
                      </span>
                    );
                  })}
                </p>
              );
            })}
            <p className="mt-24 font-signature text-[79px] leading-none text-white">
              Om
            </p>
          </div>
        </div>
      </section>

      {images.length > 0 ? (
        <section className="px-6 pb-28 pt-2 xl:hidden">
          <div className="mx-auto max-w-xl columns-1 gap-5 sm:max-w-2xl sm:columns-2">
            {images.map((image) => (
              <motion.figure
                key={image.src}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5 break-inside-avoid overflow-hidden rounded-2xl ring-1 ring-white/12 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className="h-auto w-full object-cover"
                />
              </motion.figure>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

function FloatingPhoto({
  progress,
  slot,
  image,
}: {
  progress: MotionValue<number>;
  slot: Slot;
  image: RevealImage;
}) {
  const y = useTransform(progress, [0, 1], slot.y);
  const opacity = useTransform(
    progress,
    [slot.fadeIn[0], slot.fadeIn[1], 1],
    [0, 1, 1],
  );

  // Offset the paper grain per photo so no two frames look identical.
  const grainOffset = `${Math.round(slot.rotate * 17)}px ${Math.round(
    slot.rotate * 11,
  )}px`;

  return (
    <motion.figure
      style={{ y, opacity, rotate: slot.rotate }}
      className={`absolute ${slot.position} ${slot.size}`}
    >
      <div className="relative rounded-[2px] bg-[#f1ece0] p-[6%] pb-[17%] shadow-[0_22px_48px_-16px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-3px_8px_rgba(120,98,60,0.12)] ring-1 ring-black/5">
        {/* Warm uneven aging across the frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2px]"
          style={{
            background:
              "radial-gradient(125% 115% at 28% 8%, rgba(255,253,247,0.6) 0%, transparent 42%), radial-gradient(130% 120% at 85% 100%, rgba(108,86,52,0.16) 0%, transparent 55%)",
          }}
        />
        {/* Grayscale paper grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2px] opacity-[0.3] mix-blend-multiply"
          style={{
            backgroundImage: PAPER_GRAIN,
            backgroundSize: "230px 230px",
            backgroundPosition: grainOffset,
          }}
        />
        <div
          className={`relative ${slot.aspect} overflow-hidden bg-neutral-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="320px"
            className="object-cover"
            style={{ filter: "contrast(1.04) saturate(0.94) sepia(0.07)" }}
          />
          {/* Recessed well — shadow cast inward from the paper opening */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              boxShadow:
                "inset 0 2px 5px rgba(0,0,0,0.22), inset 0 1px 2px rgba(0,0,0,0.14), inset 2px 0 4px rgba(0,0,0,0.08), inset -2px 0 4px rgba(0,0,0,0.08), inset 0 -1px 3px rgba(0,0,0,0.1)",
            }}
          />
          {/* Soft vignette so the print isn't flatly lit */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(115% 95% at 50% 45%, transparent 52%, rgba(20,14,6,0.32) 100%)",
            }}
          />
          {/* Diagonal glossy sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background:
                "linear-gradient(125deg, rgba(255,255,255,0.18) 0%, transparent 28%, transparent 72%, rgba(255,255,255,0.07) 100%)",
            }}
          />
        </div>
      </div>
    </motion.figure>
  );
}

function Char({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ["#525252", "#ffffff"]);

  return <motion.span style={{ color }}>{children}</motion.span>;
}
