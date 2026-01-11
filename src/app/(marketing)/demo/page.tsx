import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { DemoApp } from "@/components/demo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo | Clinequal",
  description:
    "Try Clinequal's bias detection platform on sample clinical trial datasets.",
};

export default function DemoPage() {
  return (
    <Section background="white" className="min-h-screen">
      <Container>
        <DemoApp />
      </Container>
    </Section>
  );
}
