export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  icon: string;
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="text-4xl">{service.icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-slate-600">{service.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{service.durationMinutes} min</span>
        <span className="text-base font-bold text-purple-700">
          fra {service.price} kr
        </span>
      </div>
      <a
        href={`/booking?service=${service.id}`}
        className="mt-6 rounded-lg bg-purple-700 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-purple-800"
      >
        Bestill
      </a>
    </div>
  );
}