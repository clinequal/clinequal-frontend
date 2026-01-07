import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

// TODO: Update with actual team data and photos
const team = [
  {
    name: "Team Member 1",
    role: "AI/ML Lead",
    expertise: "Machine Learning & Data Science",
    linkedin: "#",
  },
  {
    name: "Team Member 2",
    role: "Software Lead",
    expertise: "Software Engineering & Architecture",
    linkedin: "#",
  },
  {
    name: "Team Member 3",
    role: "Regulatory Lead",
    expertise: "Clinical Trials & Regulatory Affairs",
    linkedin: "#",
  },
  {
    name: "Team Member 4",
    role: "Design Lead",
    expertise: "Product Design & UX",
    linkedin: "#",
  },
  {
    name: "Team Member 5",
    role: "Finance Lead",
    expertise: "Finance & Business Development",
    linkedin: "#",
  },
];

export function TeamSection() {
  return (
    <Section background="white" id="team">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-lg text-slate-600">
            {/* TODO: Refine with pharma-web-copywriter */}
            A multidisciplinary team combining expertise in AI, clinical research,
            regulatory affairs, and software engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              {/* Photo placeholder */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-slate-100 border-2 border-slate-200 group-hover:border-primary transition-colors flex items-center justify-center">
                {/* TODO: Replace with actual photos */}
                <svg
                  className="w-12 h-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">{member.name}</h3>
              <p className="text-primary text-sm font-medium">{member.role}</p>
              <p className="text-slate-500 text-xs mt-1">{member.expertise}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-slate-400 hover:text-primary transition-colors"
                aria-label={`${member.name} LinkedIn`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
