import type { Booking } from "@/db/schema";

export function BookingList({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Mine bookinger</h3>
      </div>

      {bookings.length === 0 ? (
        <p className="p-6 text-slate-500">
          Du har ingen bookinger ennå.{" "}
          <a href="/booking" className="text-purple-700 underline">Book en time</a>
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {bookings.map((b) => (
            <li key={b.id} className="p-6 flex justify-between">
              <span className="font-semibold text-slate-900">{b.service}</span>
              <span className="text-slate-500">{b.date} kl. {b.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}