import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { BiasScrollSection } from "@/components/sections/BiasScrollSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { DemoCTASection } from "@/components/sections/DemoCTASection";
import { TrustSection } from "@/components/sections/TrustSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="relative z-30 -mt-[60vh]">
        <ProblemSection />
        <BiasScrollSection />
        <SolutionSection />
        <DemoCTASection />
        <TrustSection />
        <TeamSection />
        <CTASection />
      </div>
    </>
  );
}
