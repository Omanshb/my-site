const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/omanshb",
  github: "https://github.com/omanshb",
  x: "https://x.com/bainslaomansh",
  instagram: "https://www.instagram.com/omansh.b/",
  cal: "https://cal.com/omansh-bainsla/chat",
  gmail:
    "https://mail.google.com/mail/?view=cm&fs=1&to=omansh.bainsla@gmail.com",
} as const;

const ITEMS = [
  { label: "Meeting", href: SOCIAL.cal },
  { label: "Email", href: SOCIAL.gmail },
  { label: "LinkedIn", href: SOCIAL.linkedin },
  { label: "Github", href: SOCIAL.github },
  { label: "X", href: SOCIAL.x },
  { label: "Instagram", href: SOCIAL.instagram },
] as const;

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-white/85 ${className}`}
      aria-label="Social links"
    >
      {ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/55 decoration-[1.5px] underline-offset-4 transition-all duration-300 ease-out hover:text-white hover:decoration-white focus-visible:text-white focus-visible:decoration-white focus-visible:outline-none"
          aria-label={item.label}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
