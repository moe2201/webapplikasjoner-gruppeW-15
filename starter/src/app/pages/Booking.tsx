import { Navbar } from "@/components/Shared/Navbar";
export function Booking() {

    return (
        <>
        <Navbar />
        <main className="mx-auto max-w-4xl px-8 py-24 font-sans">
            <h1 className="text-4xl font-bold text-gray-900">Booking</h1>
            <p className="mt-4 text-lg text-slate-600">
                Her kan du bestille en time for våre kreative tjenester. Fyll ut skjemaet nedenfor for å reservere din plass.
            </p>
        </main>
        </>
    );
}