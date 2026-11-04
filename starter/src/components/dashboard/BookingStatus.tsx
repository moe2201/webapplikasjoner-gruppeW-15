export function BookingStatus() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Aktive bookinger</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">2</p>
        <span className="inline-block mt-3 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          Bekreftet
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Under behandling</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">1</p>
        <span className="inline-block mt-3 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
          Venter på svar
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Fullførte turer</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">4</p>
        <span className="inline-block mt-3 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
          Fullført
        </span>
      </div>
    </div>
  );
}