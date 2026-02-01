import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const stats = [
  {
    value: "80%+",
    label: "of clinical trials contain systematic bias",
  },
  {
    value: "~$0.5M",
    label: "cost per Phase III trial amendment due to bias",
  },
  {
    value: "30%",
    label: "potential cost reduction with bias correction",
  },
];

const biasTypes = [
  {
    name: "Demographic Bias",
    description:
      "Underrepresentation of women, elderly, children, and ethnic minorities in trial populations",
  },
  {
    name: "Selection Bias",
    description:
      "Flawed randomization or allocation concealment affecting group assignment",
  },
  {
    name: "Performance Bias",
    description:
      "Inadequate blinding causing behavioral differences between groups",
  },
  {
    name: "Detection Bias",
    description:
      "Outcome measurement influenced by knowledge of treatment assignment",
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
            Bias Threatens Trial Validity
          </h2>
          <p className="text-lg text-slate-600">
            From demographic underrepresentation to methodological flaws, bias compromises scientific validity, distorts treatment effects, and triggers regulatory rejection. Most issues remain invisible until submission—when it's too late.
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
          <h3 className="text-xl font-semibold text-center mb-8">
            Types of Bias We Detect
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {biasTypes.map((bias, index) => (
              <div
                key={bias.name}
                className="p-6 rounded-xl bg-slate-50 border-l-4 border-primary hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      {bias.name}
                    </h4>
                    <p className="text-slate-600 text-sm">{bias.description}</p>
                  </div>
                </div>
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
                Clinical trials cost $17M (Phase I) to $200M (Phase III) on average. Bias-driven trial amendments add further costs, and studies with high risk of bias show exaggerated treatment effects that fail to replicate, wasting development investment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Regulatory Scrutiny</h4>
              <p className="text-slate-300">
                FDA and EMA increasingly require documented evidence of representative enrollment and robust methodology. Trials with inadequate randomization, poor blinding, or unrepresentative populations face rejection.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
