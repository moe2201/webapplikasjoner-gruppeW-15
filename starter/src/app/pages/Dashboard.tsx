import { Navbar } from "@/components/Shared/Navbar";
import { BookingStatus } from "@/components/dashboard/BookingStatus";
import { BookingList } from "@/components/dashboard/BookingList";

export function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 font-sans">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashbord</h1>
        <BookingStatus />
        <BookingList />
      </main>
    </>
  );
}