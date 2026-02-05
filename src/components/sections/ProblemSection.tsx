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

export function ProblemSection() {
  return (
    <Section background="white" id="problem" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-dark to-primary-light dark:from-slate-300 dark:to-primary-light bg-clip-text text-transparent">
            Bias Threatens Trial Validity
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            From demographic underrepresentation to methodological flaws, bias compromises scientific validity, distorts treatment effects, and triggers regulatory rejection. Most issues remain invisible until submission—when it&apos;s too late.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-slate-600 dark:text-slate-300">{stat.label}</p>
            </div>
          ))}
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
