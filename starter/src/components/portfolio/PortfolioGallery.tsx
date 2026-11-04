import { PortfolioCard } from "./PortfolioCard";

const projects = [
  {
    id: "nova-store",
    title: "Nova E-handelsside",
    category: "Nettside",
    description: "En lynrask nettbutikk med moderne UI/UX, produktkatalog og integrert handlekurv.",
    image: "",
    serviceId: "nettside",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "fitapp",
    title: "FitPulse Treningsapp",
    category: "App Utvikling",
    description: "Full-stack webapplikasjon for sporing av treningsøkter, øvelser og daglig kaloriinntak.",
    image: "",
    serviceId: "app-utvikling",
    tags: ["React", "Node.js", "Database"],
  },
  {
    id: "aurora-brand",
    title: "Aurora Visual Identity",
    category: "Logo Design",
    description: "Helhetlig profilering, logokonsepter og fargepalett for et nordisk designbyrå.",
    image: "",
    serviceId: "logo-design",
    tags: ["Illustrator", "Branding", "Typografi"],
  },
  {
    id: "urban-portraits",
    title: "Urban Arkitektur & Portrett",
    category: "Fotografering",
    description: "Kommersiell bildeserie for arkitektur og urbane moter.",
    image: "",
    serviceId: "fotografering",
    tags: ["Lightroom", "Kommersielt", "On-location"],
  },
];

export function PortfolioGallery() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Sidetittel */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Utvalgte Prosjekter
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Her er et utvalg av digitale løsninger, merkevarer og kreative prosjekter jeg har levert.
        </p>
      </div>

      {/* Prosjektrutenett */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <PortfolioCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}