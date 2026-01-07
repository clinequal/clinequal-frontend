import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <Section background="primary" id="contact">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ensure Equitable Trials?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            {/* TODO: Refine with pharma-web-copywriter */}
            Join leading pharmaceutical companies and CROs in building more
            representative clinical research.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              href="mailto:contact@clinequal.com"
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              href="https://www.linkedin.com/company/clinequal/"
            >
              Follow on LinkedIn
            </Button>
          </div>

          <p className="mt-8 text-white/60 text-sm">
            Or email us directly at{" "}
            <a
              href="mailto:contact@clinequal.com"
              className="underline hover:text-white"
            >
              contact@clinequal.com
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
