interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  serviceId: string;
  tags: string[];
}

interface PortfolioCardProps {
  project: Project;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        {/* Topplinje med ikon og kategori */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl p-3 bg-slate-50 rounded-xl border border-slate-100">
            {project.image}
          </span>
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
            {project.category}
          </span>
        </div>

        {/* Tittel og beskrivelse */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition">
          {project.title}
        </h3>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Teknologimerker (Tags) */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Handlingsknapp */}
      <div className="mt-8 pt-4 border-t border-slate-100">
        <a
          href={`/booking?service=${project.serviceId}`}
          className="flex items-center justify-center w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white hover:bg-purple-700 transition shadow-sm"
        >
          Bestill lignende tjeneste →
        </a>
      </div>
    </div>
  );
}