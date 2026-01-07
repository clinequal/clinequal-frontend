import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const achievements = [
  {
    title: "That's a Hackathon! Winner",
    event: "US-Italy Hackathon for Innovative Business Ideas",
    location: "Naples",
    date: "July 2025",
  },
  {
    title: "Social Impact Prize",
    event: "Startcup Campania",
    location: "5th Place Overall",
    date: "October 2025",
  },
  {
    title: "National Pitch",
    event: "Premio Nazionale Innovazione",
    location: "Ferrara",
    date: "December 2025",
  },
  {
    title: "Fit4Start Finalist",
    event: "Luxembourg Accelerator Program",
    location: "Luxembourg",
    date: "2025",
  },
];

const collaborators = [
  { name: "Politecnico di Milano", short: "PoliMi" },
  { name: "Università di Napoli Federico II", short: "UniNA" },
  { name: "Luxembourg Institute of Science and Technology", short: "LIST" },
  { name: "Linköping University", short: "LiU" },
  { name: "University of Luxembourg", short: "Uni.lu" },
  { name: "KTH Royal Institute of Technology", short: "KTH" },
  { name: "Karolinska Institute", short: "KI" },
];

export function TrustSection() {
  return (
    <Section background="dark" id="trust">
      <Container>
        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Recognition & Achievements
          </h2>
          <p className="text-lg text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Validated by leading innovation programs across Europe and the US.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="p-6 rounded-xl bg-slate-800 border border-slate-700"
              >
                <div className="text-primary font-semibold text-sm mb-2">
                  {achievement.date}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {achievement.title}
                </h3>
                <p className="text-slate-400 text-sm">{achievement.event}</p>
                <p className="text-slate-500 text-sm">{achievement.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborators */}
        <div>
          <h3 className="text-xl font-semibold text-center mb-8 text-slate-300">
            Research Collaborators
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.short}
                className="text-center group"
                title={collaborator.name}
              >
                {/* TODO: Replace with actual university logos */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  <span className="text-xs md:text-sm font-semibold">
                    {collaborator.short}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500 max-w-[100px] mx-auto hidden md:block">
                  {collaborator.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
