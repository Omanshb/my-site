import type { ReactNode } from "react";

function CredentialRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-white/10">
      <div className="grid gap-x-8 gap-y-4 px-5 py-9 sm:grid-cols-[200px_1fr]">
        <p className="font-notes-section text-[11px] uppercase tracking-[0.12em] text-white/50">
          {label}
        </p>
        <div>{children}</div>
      </div>
    </div>
  );
}

const FELLOWSHIPS = [
  "Palantir Fellowship",
  "YC Startup School",
  "Millennium Fellows",
];

const HONORS = [
  "USACO Platinum",
  "AIME",
  "USAPhO",
  "2× USATF Nationals Qualifier",
];

export function Credentials() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 pb-32 pt-4">
      <div className="border-t border-white/10">
        <CredentialRow label="Education">
          <h3 className="font-display text-[22px] leading-tight text-white/90">
            Georgia Tech
          </h3>
          <p className="mt-1 text-[14px] text-white/55">
            B.S. Computer Science
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/45">
            Startup Exchange · GT Investments Committee · Data Science @ GT
          </p>
        </CredentialRow>

        <CredentialRow label="Fellowships & Programs">
          <ul className="space-y-2.5">
            {FELLOWSHIPS.map((item) => (
              <li
                key={item}
                className="font-display text-[18px] leading-snug text-white/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </CredentialRow>

        <CredentialRow label="Honors & Awards">
          <ul className="space-y-2.5">
            {HONORS.map((item) => (
              <li
                key={item}
                className="font-display text-[18px] leading-snug text-white/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </CredentialRow>
      </div>
    </section>
  );
}
