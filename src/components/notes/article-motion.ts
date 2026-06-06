export const blurEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const REVEAL_TOTAL = 3;
export const REVEAL_DURATION = 0.8;

export const revealHidden = { opacity: 0, filter: "blur(10px)" };
export const revealVisible = { opacity: 1, filter: "blur(0px)" };

type RevealOptions = {
  start?: number;
  total?: number;
  duration?: number;
};

export function revealTransition(
  index: number,
  count: number,
  { start = 0, total = REVEAL_TOTAL, duration = REVEAL_DURATION }: RevealOptions = {},
) {
  const spread = Math.max(total - start - duration, 0);
  const delay = count > 1 ? start + (spread * index) / (count - 1) : start;
  return { duration, ease: blurEase, delay };
}

export const revealItemVariants = {
  hidden: revealHidden,
  visible: {
    ...revealVisible,
    transition: { duration: REVEAL_DURATION, ease: blurEase },
  },
};
