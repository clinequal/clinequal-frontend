import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const achievements = [
  {
    title: "That's a Hackathon! Winner",
    event: "US-Italy Hackathon for Innovative Business Ideas",
    location: "Naples",
    date: "July 2025",
    linkedinPost:
      "https://www.linkedin.com/posts/andreadegiorgio_thats-hackathon-and-this-is-our-winning-activity-7348789859928449026-rts9",
  },
  {
    title: "Social Impact Prize",
    event: "Startcup Campania",
    location: "5th Place Overall",
    date: "October 2025",
    linkedinPost:
      "https://www.linkedin.com/posts/clinequal_we-welcomed-with-great-pleasure-our-5th-place-activity-7387808342166958080-7u85",
  },
  {
    title: "National Pitch",
    event: "Premio Nazionale Innovazione",
    location: "Ferrara",
    date: "December 2025",
    linkedinPost:
      "https://www.linkedin.com/posts/clinequal_pni2025-clinequal-rethain-activity-7403720042640650240-qU6M",
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
    <Section background="dark" id="trust" className="relative overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="trust-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trust-grid)" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
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
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="text-primary font-semibold text-sm mb-2">
                  {achievement.date}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {achievement.title}
                </h3>
                <p className="text-slate-400 text-sm">{achievement.event}</p>
                <p className="text-slate-500 text-sm">{achievement.location}</p>
                {achievement.linkedinPost && (
                  <a
                    href={achievement.linkedinPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:text-primary-light transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    View post
                  </a>
                )}
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
                className="block opacity-60 hover:opacity-100 hover:-translate-y-1 transition-all duration-300"
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
