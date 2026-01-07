import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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
            Equitable Clinical Trials
            <span className="text-primary"> Start with Better Data</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {/* TODO: Refine with pharma-web-copywriter */}
            Clinequal detects and corrects bias in clinical trial datasets,
            ensuring your research represents all patient populations fairly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="#contact">
              Request a Demo
            </Button>
            <Button size="lg" variant="outline" href="#solution">
              Learn More
            </Button>
          </div>
        </div>
      </Container>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-primary/20 pointer-events-none" />
    </Section>
  );
}
