import { Navbar } from "@/components/Shared/Navbar";
import { ServiceList } from "@/components/Services/ServiceList";

export function Services() {
    return (
    <>
        <Navbar />
        <main className="mx-auto max-w-4xl px-8 py-24 font-sans">
            <h1 className="text-4xl font-bold text-gray-900">Tjenester</h1>
            <p className="mt-4 text-lg text-slate-600">
                Her er en oversikt over de kreative tjenestene vi tilbyr. Velg en tjeneste for mer informasjon og for å bestille en time.
            </p>
            <ServiceList />
        </main>
        </>
    );
}