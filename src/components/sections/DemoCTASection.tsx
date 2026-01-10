import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function DemoCTASection() {
  return (
    <Section background="gray">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              See It in Action
            </span>
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Explore bias detection on sample clinical trial datasets. No signup
            required.
          </p>
          <Button size="lg" href="/demo">
            Try the Demo
          </Button>
        </div>
      </Container>
    </Section>
  );
}
