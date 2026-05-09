import { BackgroundReadingGradient } from "@/components/background-reading-gradient";
import { HomeHero } from "@/components/home-hero";
import { SocialLinks } from "@/components/social-links";
import HomeDitherBackground from "@/components/ui/home-dither-background";

export default function HomePage() {
  return (
    <>
      <HomeDitherBackground />
      <BackgroundReadingGradient />
      <SocialLinks />
      <HomeHero />
    </>
  );
}
