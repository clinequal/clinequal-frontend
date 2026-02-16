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

        {/* Cost of Late Discovery */}
        <div className="mb-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Cost of Late Discovery</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">What it costs when bias is caught at submission vs. during the trial</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Late Discovery */}
              <div className="p-5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-red-800 dark:text-red-300">At FDA/EMA Review</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Post-hoc analyses</span>
                    <span className="font-medium text-slate-900 dark:text-slate-50">$200K - $500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Advisory committee prep</span>
                    <span className="font-medium text-slate-900 dark:text-slate-50">$500K - $1.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Delay costs (12-18 mo)</span>
                    <span className="font-medium text-slate-900 dark:text-slate-50">$1M - $3M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Bridging study (if required)</span>
                    <span className="font-medium text-slate-900 dark:text-slate-50">$3M - $8M</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-red-200 dark:border-red-800 flex justify-between">
                    <span className="font-semibold text-red-800 dark:text-red-300">Total potential cost</span>
                    <span className="font-bold text-red-800 dark:text-red-300">$2M - $10M+</span>
                  </div>
                </div>
              </div>

              {/* Early Detection */}
              <div className="p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-green-800 dark:text-green-300">During Trial (Clinequal)</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Protocol adjustment</span>
                    <span className="font-medium text-slate-900 dark:text-slate-50">$50K - $150K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Targeted re-enrollment</span>
                    <span className="font-medium text-slate-900 dark:text-slate-50">$100K - $300K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Retention interventions</span>
                    <span className="font-medium text-slate-900 dark:text-slate-50">$50K - $200K</span>
                  </div>
                  <div className="flex justify-between text-slate-400 dark:text-slate-500">
                    <span>Bridging study</span>
                    <span>Avoided</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-green-200 dark:border-green-800 flex justify-between">
                    <span className="font-semibold text-green-800 dark:text-green-300">Total typical cost</span>
                    <span className="font-bold text-green-800 dark:text-green-300">$200K - $650K</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
              Estimates based on Phase II/III trials. Actual costs vary by therapeutic area, trial size, and regulatory jurisdiction.
            </p>
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
