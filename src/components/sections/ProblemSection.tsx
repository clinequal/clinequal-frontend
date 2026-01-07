import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const stats = [
  {
    value: "80%+",
    label: "of clinical trials have biased datasets",
  },
  {
    value: "75%",
    label: "of participants are white in US trials",
  },
  {
    value: "$2.6B",
    label: "average cost of bringing a drug to market",
  },
];

export function ProblemSection() {
  return (
    <Section background="white" id="problem">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Bias Problem in Clinical Trials
          </h2>
          <p className="text-lg text-slate-600">
            {/* TODO: Refine with pharma-web-copywriter */}
            Clinical trial data often fails to represent the diversity of real-world
            patient populations. This leads to treatments that may not work
            equally well for everyone—and regulatory scrutiny that can delay
            approvals.
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

        {/* Impact */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4">Why This Matters</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">For Patients</h4>
              <p className="text-slate-300">
                Underrepresented populations may receive treatments that weren&apos;t
                properly tested for their demographic, leading to adverse effects
                or reduced efficacy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">For Sponsors</h4>
              <p className="text-slate-300">
                FDA and EMA increasingly require diversity data. Bias in your
                trial can mean delays, additional studies, or failed approvals.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
