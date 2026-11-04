import { Service } from "./ServiceCard";

interface ServiceDetailsProps {
  service: Service;
  onBookNow?: (serviceId: string) => void;
}

export function ServiceDetails({ service, onBookNow }: ServiceDetailsProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Ikon / Kategori */}
      <div className="text-4xl">{service.icon}</div>
      <h2 className="mt-3 text-3xl font-bold text-slate-900">{service.name}</h2>

      {/* Detaljer: Pris og Varighet */}
      <div className="mt-6 flex flex-wrap gap-6 border-y border-slate-100 py-4">
        <div>
          <span className="block text-xs font-medium uppercase tracking-wider text-slate-400">
            Pris
          </span>
          <span className="text-2xl font-bold text-purple-700">fra {service.price} kr</span>
        </div>
        <div className="border-l border-slate-200 pl-6">
          <span className="block text-xs font-medium uppercase tracking-wider text-slate-400">
            Varighet
          </span>
          <span className="text-2xl font-bold text-slate-900">{service.durationMinutes} min</span>
        </div>
      </div>

      {/* Beskrivelse */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900">Om tjenesten</h3>
        <p className="mt-2 text-base leading-relaxed text-slate-600">
          {service.description}
        </p>
      </div>

      {/* Hva som inngår */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900">Hva inngår i pakken?</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Inkluderer innledende samtale og planlegging
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Inntil 2 runder med revidering/justering
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Leveranse i alle nødvendige filformater
          </li>
        </ul>
      </div>

      {/* Booking-knapp */}
      <div className="mt-8 flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
        <a
          href={`/booking?service=${service.id}`}
          className="rounded-lg bg-purple-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-800"
        >
          Bestill nå
        </a>
      </div>
    </div>
  );
}