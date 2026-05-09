/**
 * Darkens the right side of the viewport so copy stays readable over the dither image.
 * Sits above the background, below UI (z-10). `pointer-events-none` so it never blocks clicks.
 */
export function BackgroundReadingGradient() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden
      style={{
        background:
          "linear-gradient(to right, transparent 0%, transparent 32%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.8) 78%, rgba(0, 0, 0, 0.99) 100%)",
      }}
    />
  );
}
