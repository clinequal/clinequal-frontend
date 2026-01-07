import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo | Clinequal",
  description:
    "Try Clinequal's bias detection platform on sample clinical trial datasets.",
};

export default function DemoPage() {
  return (
    <Section background="white" className="min-h-[60vh] flex items-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Demo Coming Soon
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            We&apos;re building an interactive demo where you can explore bias
            detection on sample clinical trial datasets. Check back soon.
          </p>
          <Button variant="outline" href="/">
            Back to Home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
