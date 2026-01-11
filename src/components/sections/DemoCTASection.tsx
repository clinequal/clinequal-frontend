import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function DemoCTASection() {
  return (
    <Section background="white" className="overflow-hidden">
      <Container>
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -mx-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Content card */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700/50">
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />

            <div className="relative max-w-2xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Interactive Demo
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                See It in Action
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Explore bias detection on sample clinical trial datasets. No signup
                required.
              </p>

              {/* Demo preview mockup */}
              <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 h-5 bg-slate-700/50 rounded text-xs text-slate-500 flex items-center px-2">
                    clinequal.com/demo
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 bg-slate-700/30 rounded flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-16 bg-slate-700/30 rounded flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-16 bg-slate-700/30 rounded flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <Button size="lg" href="/demo" className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                Try the Demo
              </Button>

              <p className="mt-4 text-sm text-slate-500">
                2 sample trials • ~2 min walkthrough
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
