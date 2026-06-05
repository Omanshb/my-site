import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

type Experience = {
  company: string;
  role: string;
  description: string;
  dates: string;
  href: string;
  logo: string;
  logoType: "vector" | "image";
  hoverBg: string;
  hoverFg: string;
  hoverFgDim: string;
};

const EXPERIENCES: Experience[] = [
  {
    company: "Mercor",
    role: "Member of Technical Staff",
    description: "RL environments, post-training, and synthetic data",
    dates: "June 2026 – Present",
    href: "https://www.mercor.com/",
    logo: "/logos/Mercor.png",
    logoType: "vector",
    hoverBg: "#261540",
    hoverFg: "#f1ebff",
    hoverFgDim: "rgba(241,235,255,0.66)",
  },
  {
    company: "Triage",
    role: "Founding Engineer",
    description:
      "Code review, guardrails, and observability for enterprise AI agents",
    dates: "January 2026 – April 2026",
    href: "https://www.triage-sec.com/",
    logo: "/logos/triage.jpeg",
    logoType: "image",
    hoverBg: "#fcfbf7",
    hoverFg: "#1c1a17",
    hoverFgDim: "rgba(28,26,23,0.62)",
  },
  {
    company: "Salesforce",
    role: "Software Engineering Intern",
    description: "Agent evaluation and benchmarking",
    dates: "April 2025 – August 2025",
    href: "https://www.salesforce.com/",
    logo: "/logos/salesforce.png",
    logoType: "vector",
    hoverBg: "#00a1e0",
    hoverFg: "#ffffff",
    hoverFgDim: "rgba(255,255,255,0.8)",
  },
  {
    company: "CCC Intelligent Solutions",
    role: "ML Engineering Intern",
    description: "Production data pipelines and inference",
    dates: "January 2025 – May 2025",
    href: "https://www.cccis.com/",
    logo: "/logos/CCCIS.jpg",
    logoType: "image",
    hoverBg: "#042c4f",
    hoverFg: "#eef4ff",
    hoverFgDim: "rgba(238,244,255,0.66)",
  },
  {
    company: "Qualys",
    role: "Software Engineering Intern",
    description: "Post-training infrastructure",
    dates: "May 2024 – August 2024",
    href: "https://www.qualys.com/",
    logo: "/logos/Qualys.png",
    logoType: "vector",
    hoverBg: "#ed2e26",
    hoverFg: "#ffffff",
    hoverFgDim: "rgba(255,255,255,0.8)",
  },
  {
    company: "Bardeen",
    role: "AI Solutions Engineer",
    description: "Browser workflow automation agents",
    dates: "February 2024 – May 2024",
    href: "https://www.bardeen.ai/",
    logo: "/logos/Bardeen.png",
    logoType: "vector",
    hoverBg: "linear-gradient(120deg, #c73f58 0%, #c07f48 50%, #7848b5 100%)",
    hoverFg: "#ffffff",
    hoverFgDim: "rgba(255,255,255,0.8)",
  },
  {
    company: "Salt & Straw",
    role: "Ice Cream Scooper",
    description: "Making the community happy",
    dates: "August 2022 – July 2023",
    href: "https://saltandstraw.com/",
    logo: "/logos/SAS.jpeg",
    logoType: "image",
    hoverBg: "#ffffff",
    hoverFg: "#1c1a17",
    hoverFgDim: "rgba(28,26,23,0.62)",
  },
  {
    company: "UC Santa Cruz",
    role: "Research Intern",
    description: "Neuromorphic computing and spiking neural networks",
    dates: "May 2022 – September 2022",
    href: "https://sip.ucsc.edu/2022-research-projects/",
    logo: "/logos/UCSC.jpeg",
    logoType: "image",
    hoverBg: "#00406e",
    hoverFg: "#eef3ff",
    hoverFgDim: "rgba(238,243,255,0.68)",
  },
];

function Logo({ experience }: { experience: Experience }) {
  if (experience.logoType === "vector") {
    return (
      <div className="relative h-14 w-14 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
        <Image
          src={experience.logo}
          alt={`${experience.company} logo`}
          fill
          sizes="56px"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
      <Image
        src={experience.logo}
        alt={`${experience.company} logo`}
        fill
        sizes="56px"
        className="object-cover"
      />
    </div>
  );
}

export function ExperienceRows() {
  return (
    <ul className="divide-y divide-white/10">
      {EXPERIENCES.map((experience) => (
        <li
          key={experience.company}
          className="group relative isolate"
          style={
            {
              "--hover-fg": experience.hoverFg,
              "--hover-fg-dim": experience.hoverFgDim,
            } as CSSProperties
          }
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:opacity-100"
            style={{ background: experience.hoverBg }}
          />
          <Link
            href={experience.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${experience.company} — ${experience.role} (opens in a new tab)`}
            className="flex items-center gap-5 px-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Logo experience={experience} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <p className="font-notes-section text-[11px] uppercase tracking-[0.12em] text-white/50 transition-colors duration-500 group-hover:text-[var(--hover-fg-dim)]">
                  {experience.role}
                </p>
                <p className="shrink-0 font-notes-section text-[11.5px] uppercase tracking-[0.12em] text-white/50 transition-colors duration-500 group-hover:text-[var(--hover-fg-dim)]">
                  {experience.dates}
                </p>
              </div>
              <h3 className="mt-2 font-display text-[26px] leading-tight text-white/90 transition-colors duration-500 group-hover:text-[var(--hover-fg)]">
                {experience.company}
              </h3>
              <p className="mt-1.5 text-[14px] text-white/45 transition-colors duration-500 group-hover:text-[var(--hover-fg-dim)]">
                {experience.description}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
