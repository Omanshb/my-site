import Image from "next/image";

const AFFILIATION_ROWS: { name: string; href: string }[][] = [
  [
    { name: "NLP + X Lab", href: "https://cocoxu.github.io/" },
    { name: "Startup Exchange", href: "https://www.startup.exchange/" },
  ],
  [
    { name: "GT Investments Committee", href: "https://www.gtsfinvestments.com/" },
    { name: "Data Science at GT", href: "https://datasciencegt.org/" },
  ],
];

export function EducationCard() {
  return (
    <div className="group grid items-center gap-10 px-5 md:grid-cols-[1fr_auto] md:gap-14">
      <div className="order-2 md:order-1">
        <p className="font-notes-section text-[11.5px] uppercase tracking-[0.12em] text-white/50">
          2023 – 2026
        </p>

        <h3 className="mt-3 -ml-[0.5px] font-display text-[28px] leading-tight text-white/90 sm:text-[32px]">
          Georgia Institute of Technology
        </h3>

        <p className="mt-2 text-[15px] text-white/70">
          B.S. Computer Science · Highest Honors
        </p>
        <p className="mt-1 text-[14px] text-white/50">
          Concentration in Systems Architecture &amp; Intelligence
        </p>

        <div className="mt-6">
          <div className="-ml-0.5 flex flex-col gap-2">
            {AFFILIATION_ROWS.map((row, rowIndex) => (
              <ul key={rowIndex} className="flex flex-wrap gap-2">
                {row.map((affiliation) => (
                  <li key={affiliation.name}>
                    <a
                      href={affiliation.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block rounded-full border border-white/12 px-3 py-1 text-[12.5px] text-white/65 transition-colors duration-200 hover:border-white/25 hover:text-white/90"
                    >
                      {affiliation.name}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="order-1 flex justify-center md:order-2 md:justify-end">
        <div className="relative h-52 w-52 sm:h-64 sm:w-64">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-110 rounded-full bg-[radial-gradient(circle_at_center,rgba(38,82,140,0.45),transparent_70%)] blur-2xl"
          />
          <Image
            src="/logos/GT.png"
            alt="Georgia Institute of Technology seal"
            fill
            sizes="(min-width: 640px) 256px, 208px"
            className="-translate-x-1 -translate-y-2 scale-[1.03] object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
