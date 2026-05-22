import { DitheringShader } from "@/components/ui/dithering-shader";

export default function DemoOne() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <DitheringShader
        shape="wave"
        type="8x8"
        colorBack="#001122"
        colorFront="#ff0088"
        pxSize={3}
        speed={0.6}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
      <span className="pointer-events-none absolute z-10 whitespace-pre-wrap text-center text-7xl leading-none font-semibold tracking-tighter text-white">
        Wave
      </span>
    </div>
  );
}
