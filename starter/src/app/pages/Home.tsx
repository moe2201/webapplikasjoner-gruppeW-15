import { Navbar } from "@/components/Shared/Navbar";

export function Home() {
  return (
    <>
      <Navbar />
      <main className="font-sans">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center bg-white px-8 py-24 text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Velkommen til Booking Portal
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Oppdag kreative tjenester, utforsk tidligere arbeid og bestill timer direkte.
          </p>
          <a
            href="/services"
            className="mt-8 inline-block rounded-lg bg-purple-700 px-8 py-4 text-white font-medium hover:bg-purple-800 transition-colors"
          >
            Utforsk tjenester
          </a>
        </section>

        {/* How it works */}
        <section className="bg-gray-50 px-8 py-20">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Hvordan fungerer det?
          </h2>
          <p className="mt-2 text-center text-slate-600">
            Tre enkle steg for å komme i gang
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-700 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Utforsk tjenester</h3>
              <p className="mt-2 text-slate-600">
                Se hva som tilbys og finn tjenesten som passer deg.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-700 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Velg tid</h3>
              <p className="mt-2 text-slate-600">
                Velg en dato og tid som passer deg i kalenderen.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-700 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Bestill</h3>
              <p className="mt-2 text-slate-600">
                Send inn bestillingen og få bekreftelse med en gang.
              </p>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="bg-white px-8 py-20">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Tjenester
          </h2>
          <p className="mt-2 text-center text-slate-600">
            Her er noen av tjenestene som tilbys
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl">🎨</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Logo Design</h3>
              <p className="mt-2 text-slate-600">Profesjonell logo designet for din bedrift.</p>
              <p className="mt-4 font-bold text-purple-700">fra 1500 kr</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl">🌐</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Nettside</h3>
              <p className="mt-2 text-slate-600">Moderne og rask nettside tilpasset dine behov.</p>
              <p className="mt-4 font-bold text-purple-700">fra 5000 kr</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl">📱</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">App Utvikling</h3>
              <p className="mt-2 text-slate-600">iOS og Android app utviklet fra bunnen av.</p>
              <p className="mt-4 font-bold text-purple-700">fra 15000 kr</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a
              href="/services"
              className="inline-block rounded-lg border-2 border-purple-700 px-8 py-3 text-purple-700 font-medium hover:bg-purple-700 hover:text-white transition-colors"
            >
              Se alle tjenester
            </a>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-purple-700 px-8 py-20 text-center">
          <h2 className="text-3xl font-bold text-white">
            Klar til å komme i gang?
          </h2>
          <p className="mt-4 text-purple-200">
            Bestill en time i dag og vi tar kontakt med deg.
          </p>
          <a
            href="/booking"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-4 text-purple-700 font-bold hover:bg-gray-100 transition-colors"
          >
            Bestill nå
          </a>
        </section>

      </main>
    </>
  );
}