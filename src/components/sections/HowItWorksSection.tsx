import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Detect",
    description: "Upload your trial data and our AI identifies potential biases across demographics, geography, and more.",
  },
  {
    number: "02",
    title: "Quantify",
    description: "See exactly how significant each bias is and its potential impact on your trial outcomes.",
  },
  {
    number: "03",
    title: "Explain",
    description: "Understand the root causes of bias with clear explanations your team and regulators can understand.",
  },
  {
    number: "04",
    title: "Correct",
    description: "Apply statistical corrections and get recommendations for addressing enrollment gaps.",
  },
  {
    number: "05",
    title: "Simulate",
    description: "Model how corrections will affect your trial outcomes before making changes.",
  },
  {
    number: "06",
    title: "Report",
    description: "Generate comprehensive reports ready for regulatory submissions and stakeholder review.",
  },
];

export function HowItWorksSection() {
  return (
    <Section background="white" id="how-it-works">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Clinequal Process
          </h2>
          <p className="text-lg text-slate-600">
            {/* TODO: Refine with pharma-web-copywriter */}
            Six steps from raw data to regulatory-ready documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
            >
              {/* Step number */}
              <div className="text-5xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors mb-2">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>

              {/* Connector line (except last in row) */}
              {index % 3 !== 2 && index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-200" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
