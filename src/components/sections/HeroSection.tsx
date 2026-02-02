import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <Section background="dark" className="relative overflow-hidden">
      {/* Layer 0: Background image */}
      <Image
        src="/hero-creation-data.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%] z-0 invert brightness-[0.5] contrast-[1.5] saturate-[0.3] opacity-[0.7]"
      />

      {/* Layer 1: Deep navy overlay */}
      <div className="absolute inset-0 z-[1] bg-[#060e1a]/80 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-primary/10 pointer-events-none" />

      {/* Layer 2: Gradient vignette */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#060e1a]/70 via-primary/5 to-[#060e1a]/80 pointer-events-none" />

      {/* Layer 3: Content */}
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo Icon */}
          <div className="mb-8">
            <Image
              src="/Payoff.svg"
              alt=""
              width={80}
              height={80}
              className="mx-auto brightness-0 invert opacity-80"
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight md:whitespace-nowrap">
            <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">Clinical Trials</span>
            <span className="bg-gradient-to-r from-primary via-primary-light to-white bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(47,128,237,0.4)]"> Without Bias</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            The first end-to-end platform for clinical trial bias management. From demographic underrepresentation to methodological flaws, detect issues early and correct them before regulatory submission.
          </p>
        </div>
      </Container>
    </Section>
  );
}
