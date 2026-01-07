import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Detect Bias",
    description: "Automated scanning across all five Cochrane domains: selection bias in randomization, performance bias from blinding gaps, detection bias in outcome assessment, attrition patterns, and reporting inconsistencies.",
  },
  {
    number: "02",
    title: "Quantify Impact",
    description: "Fairness metrics measure the magnitude and statistical significance of each bias type. Visualizations show how bias may inflate or deflate treatment effect estimates.",
  },
  {
    number: "03",
    title: "Explain Root Causes",
    description: "Explainable AI traces bias to specific protocol decisions: allocation methods, blinding procedures, outcome definitions, dropout patterns, or selective reporting practices.",
  },
  {
    number: "04",
    title: "Correct Datasets",
    description: "Evidence-based correction strategies: statistical weighting, sensitivity analyses, imputation methods for missing data, and recommendations for protocol amendments.",
  },
  {
    number: "05",
    title: "Simulate Scenarios",
    description: "What-if modeling: 'How do results change if we adjust for attrition bias?' or 'What if allocation concealment was improved?' Test corrections before implementation.",
  },
  {
    number: "06",
    title: "Generate Reports",
    description: "Cochrane-aligned risk-of-bias reports ready for EMA/FDA submission. Full audit trails, 24+ languages, GDPR and MDR compliance built in.",
  },
];

export function HowItWorksSection() {
  return (
    <Section background="white" id="how-it-works">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Dataset Upload to Regulatory Submission
          </h2>
          <p className="text-lg text-slate-600">
            Six integrated modules transform biased trial data into defensible, representative datasets with full documentation for submission.
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
