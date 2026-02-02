import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Detect Bias",
    description: "Automated scanning for demographic imbalances (gender, age, ethnicity) and methodological issues: randomization flaws, blinding gaps, attrition patterns, and reporting inconsistencies.",
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
    description: "Regulatory-ready documentation for EMA/FDA submission, aligned with Cochrane methodology. Full audit trails, 24+ languages, GDPR and MDR compliance built in.",
  },
];

export function HowItWorksSection() {
  return (
    <Section background="white" id="how-it-works" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#1a3a6b] to-primary bg-clip-text text-transparent">
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
              className="relative p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Step number */}
              <div className="text-5xl font-bold bg-gradient-to-br from-primary/25 to-primary/5 bg-clip-text text-transparent group-hover:from-primary/40 group-hover:to-primary/15 transition-all mb-2">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.description}</p>

              {/* Connector arrow (desktop, except last in row) */}
              {index % 3 !== 2 && index !== steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 w-6 items-center justify-center">
                  <svg className="w-4 h-4 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
