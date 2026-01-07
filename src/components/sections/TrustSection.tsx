import Image from "next/image";
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
  {
    name: "Politecnico di Milano",
    logo: "/academic_logos/logo_university_Politecnico_Milano_128.png",
    url: "https://www.polimi.it/",
  },
  {
    name: "Università di Napoli Federico II",
    logo: "/academic_logos/logo_university_Federico_II_128.png",
    url: "https://www.unina.it/",
  },
  {
    name: "Luxembourg Institute of Science and Technology",
    logo: "/academic_logos/logo_LIST_128.png",
    url: "https://www.list.lu/",
  },
  {
    name: "Linköping University",
    logo: "/academic_logos/logo_university_Linkoping_University_128.png",
    url: "https://liu.se/",
  },
  {
    name: "University of Luxembourg",
    logo: "/academic_logos/logo_university_Universite_du_Luxembourg_128.png",
    url: "https://uni.lu/",
  },
  {
    name: "KTH Royal Institute of Technology",
    logo: "/academic_logos/logo_university_KTH_Royal_Institute_of_Technology_128.svg",
    url: "https://www.kth.se/",
  },
  {
    name: "Karolinska Institute",
    logo: "/academic_logos/logo_university_Karolinska_Institute_128.png",
    url: "https://ki.se/",
  },
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
            Selected from 495 applicants for Fit4Start Luxembourg. Winner of the US-Italy Hackathon and Startcup Campania Social Impact Prize.
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
            Academic Collaborations
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {collaborators.map((collaborator) => (
              <a
                key={collaborator.name}
                href={collaborator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-70 hover:opacity-100 transition-opacity"
                title={collaborator.name}
              >
                <Image
                  src={collaborator.logo}
                  alt={collaborator.name}
                  width={80}
                  height={80}
                  className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
