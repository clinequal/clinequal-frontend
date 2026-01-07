import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const stats = [
  {
    value: "80%+",
    label: "of clinical trials contain systematic bias",
  },
  {
    value: "$17M-$200M",
    label: "cost per protocol modification",
  },
  {
    value: "30%",
    label: "potential cost reduction with bias correction",
  },
];

const biasTypes = [
  {
    name: "Selection Bias",
    description: "Flawed randomization or allocation concealment affecting group assignment",
  },
  {
    name: "Performance Bias",
    description: "Inadequate blinding causing behavioral differences between groups",
  },
  {
    name: "Detection Bias",
    description: "Outcome measurement influenced by knowledge of treatment assignment",
  },
  {
    name: "Attrition Bias",
    description: "Non-random patient withdrawals skewing study results",
  },
  {
    name: "Reporting Bias",
    description: "Selective reporting of statistically significant outcomes only",
  },
];

export function ProblemSection() {
  return (
    <Section background="white" id="problem">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Risk of Bias Threatens Trial Validity
          </h2>
          <p className="text-lg text-slate-600">
            Bias in clinical trials goes beyond demographic underrepresentation. The Cochrane framework identifies five systematic bias types that compromise scientific validity, inflate or deflate treatment effects, and trigger regulatory rejection.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-slate-50"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bias Types */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Five Types of Systematic Bias</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {biasTypes.map((bias) => (
              <div key={bias.name} className="p-4 rounded-lg bg-slate-50 text-center">
                <h4 className="font-semibold text-slate-900 mb-1 text-sm">{bias.name}</h4>
                <p className="text-xs text-slate-500">{bias.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4">Business and Clinical Impact</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">Financial Risk</h4>
              <p className="text-slate-300">
                Protocol modifications due to bias cost $17.3M (Phase I) to $200M (Phase III). Studies with high risk of bias show exaggerated treatment effects that fail to replicate, wasting development investment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Regulatory Scrutiny</h4>
              <p className="text-slate-300">
                FDA and EMA require risk-of-bias assessments aligned with Cochrane methodology. Trials with inadequate randomization, blinding, or selective reporting face rejection or demands for additional studies.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
