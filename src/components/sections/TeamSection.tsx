import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const team = [
  {
    name: "Andrea de Giorgio",
    role: "CEO",
    expertise: "PhD Industrial Engineering (KTH), 10+ years AI/ML, serial entrepreneur",
    linkedin: "https://www.linkedin.com/in/andreadegiorgio/",
    image: "/team/andrea.jpeg",
  },
  {
    name: "Felicia Burtscher",
    role: "CPO",
    expertise: "MSc Bioinformatics (Imperial), MBA, 10+ years healthcare data science",
    linkedin: "https://www.linkedin.com/in/felicia-burtscher/",
    image: "/team/felicia.jpeg",
  },
  {
    name: "Nicola Luigi Bragazzi",
    role: "CSO",
    expertise: "MD, PhD, 1,000+ publications, top 2% most cited scientists, Cochrane Reviewer",
    linkedin: "https://www.linkedin.com/in/nicola-luigi-bragazzi-a3920049/",
    image: null,
  },
  {
    name: "Pasquale Junior Montò",
    role: "CTO",
    expertise: "BSc Computer Science, technical architect of the Clinequal platform",
    linkedin: "https://www.linkedin.com/in/pasqjr/",
    image: "/team/pasquale.jpeg",
  },
  {
    name: "Enrico De Cupertinis",
    role: "CCO",
    expertise: "Doctor in Design for Community, branding & digital marketing expert",
    linkedin: "https://www.linkedin.com/in/enrico-de-cupertinis-b7a4b71ba/",
    image: "/team/enrico.PNG",
  },
  {
    name: "Eleonora Di Napoli",
    role: "CFO",
    expertise: "Master's Economics, Management & Sustainability, ESG specialist",
    linkedin: "https://www.linkedin.com/in/eleonora-di-napoli-4b1b57254/",
    image: "/team/eleonora.jpeg",
  },
];

export function TeamSection() {
  return (
    <Section background="gray" id="team" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-dark to-primary-light dark:from-slate-300 dark:to-primary-light bg-clip-text text-transparent">Leadership Team</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Expertise spanning AI/ML, bioinformatics, healthcare data science, software engineering, and regulatory compliance. Advised by scientists in the top 2% most cited globally.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="text-center group bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
            >
              {/* Photo */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 overflow-hidden relative">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={`object-cover ${member.name === "Enrico De Cupertinis" ? "object-top" : ""}`}
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-sm">{member.name}</h3>
              <p className="text-primary text-sm font-medium">{member.role}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">{member.expertise}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-slate-400 hover:text-primary transition-colors"
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
