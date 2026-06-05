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
  text: string;
  images?: RevealImage[];
};

type Slot = {
  position: string;
  size: string;
  aspect: string;
  rotate: number;
  y: [number, number];
  fade: [number, number];
};

// Four corner slots framing the centered text. Order is meaningful:
// [top-left landscape, bottom-left portrait, top-right portrait, bottom-right landscape].
const SLOTS: Slot[] = [
  {
    position: "left-[2.5%] top-[13%]",
    size: "w-[16vw] max-w-[255px]",
    aspect: "aspect-[7/5]",
    rotate: -4,
    y: [70, -55],
    fade: [0, 0.12],
  },
  {
    position: "left-[6.5%] bottom-[11%]",
    size: "w-[11.5vw] max-w-[185px]",
    aspect: "aspect-[2/3]",
    rotate: 3.5,
    y: [95, -25],
    fade: [0.06, 0.2],
  },
  {
    position: "right-[5.5%] top-[10%]",
    size: "w-[11.5vw] max-w-[185px]",
    aspect: "aspect-[3/4]",
    rotate: 4,
    y: [-35, 85],
    fade: [0.03, 0.17],
  },
  {
    position: "right-[2.5%] bottom-[12%]",
    size: "w-[16vw] max-w-[255px]",
    aspect: "aspect-[4/3]",
    rotate: -3,
    y: [55, -80],
    fade: [0.09, 0.22],
  },
];

export function ScrollRevealText({ text, images = [] }: ScrollRevealTextProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const words = text.split(" ");
  const totalChars = words.reduce((sum, word) => sum + word.length, 0);

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

          <p className="relative z-10 flex max-w-2xl flex-wrap justify-center text-center font-display text-[40px] font-[300] leading-[1.35] tracking-tight">
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
  const opacity = useTransform(progress, slot.fade, [0, 1]);

  return (
    <motion.figure
      style={{ y, opacity, rotate: slot.rotate }}
      className={`absolute ${slot.position} ${slot.size}`}
    >
      <div
        className={`relative ${slot.aspect} overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)]`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="255px"
          className="object-cover"
        />
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
