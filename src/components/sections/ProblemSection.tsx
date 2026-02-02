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
    <Section background="white" id="problem" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#1a3a6b] to-primary bg-clip-text text-transparent">
            Bias Threatens Trial Validity
          </h2>
          <p className="text-lg text-slate-600">
            From demographic underrepresentation to methodological flaws, bias compromises scientific validity, distorts treatment effects, and triggers regulatory rejection. Most issues remain invisible until submission—when it&apos;s too late.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="problem-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#problem-grid)" />
            </svg>
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />

          <div className="relative">
            <h3 className="text-2xl font-bold mb-6">Business and Clinical Impact</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-semibold text-primary mb-2">Financial Risk</h4>
                <p className="text-slate-300">
                  Clinical trials cost $17M (Phase I) to $200M (Phase III) on average. Bias-driven trial amendments add further costs, and studies with high risk of bias show exaggerated treatment effects that fail to replicate, wasting development investment.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-semibold text-primary mb-2">Regulatory Scrutiny</h4>
                <p className="text-slate-300">
                  FDA and EMA increasingly require documented evidence of representative enrollment and robust methodology. Trials with inadequate randomization, poor blinding, or unrepresentative populations face rejection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
