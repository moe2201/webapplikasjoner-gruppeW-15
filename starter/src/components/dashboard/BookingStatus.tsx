import type { Booking } from "@/db/schema";

export function BookingStatus({ bookings }: { bookings: Booking[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = bookings.filter((b) => b.date >= today).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Totalt</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{bookings.length}</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Kommende</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{upcoming}</p>
      </div>
    </div>
  );
}