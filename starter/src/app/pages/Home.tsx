import { Navbar } from "@/components/Shared/Navbar";

export function Home() {
  const now = new Date().toLocaleString("no-NO");
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl p-8 font-sans">

        <section className="text-center">
          <h1 className="text-3xl font-bold">Velkommen til Booking Portal</h1>
          <p className="mt-2 text-slate-600">
            Oppdag kreative tjenester, utforsk tidligere arbeid og bestill timer direkte.
          </p>

          <a href="/services" className="mt-8 inline-block rounded-lg bg-purple-700 px-6 py-3 text-white hover:bg-purple-800">
            Utforsk tjenester
          </a>
        </section>
      </main>
    </>
  );
}
