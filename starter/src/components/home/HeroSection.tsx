export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 text-center text-white shadow-xl sm:px-12">
      <div className="relative z-10 mx-auto max-w-2xl">
        <span className="mb-4 inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-400 border border-purple-500/20">
          Velkommen til Booking Portal
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Bestill kreative tjenester med noen få klikk
        </h1>
        <p className="mt-6 text-lg text-slate-300 leading-relaxed">
          Utforsk våre profesjonelle tjenester, se tidligere arbeid i porteføljen og book en tid direkte i kalenderen.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/services"
            className="rounded-xl bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 transition"
          >
            Utforsk tjenester
          </a>
          <a
            href="/portfolio"
            className="rounded-xl bg-slate-800 px-8 py-3.5 text-sm font-semibold text-white border border-slate-700 hover:bg-slate-700 transition"
          >
            Se portefølje
          </a>
        </div>
      </div>
    </div>
  );
}