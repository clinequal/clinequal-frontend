import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { DemoCTASection } from "@/components/sections/DemoCTASection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="relative z-30 -mt-[60vh]">
        <ProblemSection />
        <SolutionSection />
        <DemoCTASection />
        <HowItWorksSection />
        <TrustSection />
        <TeamSection />
        <CTASection />
      </div>
    </>
  );
}
