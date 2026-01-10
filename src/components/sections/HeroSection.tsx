import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <Section background="dark" className="relative overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Detect, Quantify, and Correct
            <span className="text-primary"> Clinical Trial Bias</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            The first end-to-end platform for clinical trial bias management. From demographic underrepresentation to methodological flaws, detect issues early and correct them before regulatory submission.
          </p>
        </div>
      </Container>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-primary/20 pointer-events-none" />
    </Section>
  );
}
