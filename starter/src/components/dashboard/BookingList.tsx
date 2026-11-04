"use client";

import { useEffect, useState } from "react";

interface BookingItem {
  id: string;
  service: string;
  date: string;
  time: string;
  status: string;
  price: string;
  name?: string;
}

export function BookingList() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  useEffect(() => {
    // Standard mock-data hvis ingen ekte bookinger finnes ennå
    const defaultBookings: BookingItem[] = [
      {
        id: "1",
        service: "Logo Design",
        date: "15. November 2026",
        time: "10:00",
        status: "Bekreftet",
        price: "1500 kr",
      },
      {
        id: "2",
        service: "Nettside Utvikling",
        date: "22. November 2026",
        time: "12:00",
        status: "Venter på svar",
        price: "5000 kr",
      },
    ];

    const saved = localStorage.getItem("my_bookings");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Kombiner lagrede bookinger med standard-eksemplene hvis ønskelig
      setBookings(parsed.length > 0 ? parsed : defaultBookings);
    } else {
      setBookings(defaultBookings);
    }
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Mine Bookinger</h3>
        <p className="text-sm text-slate-500">Oversikt over dine bestilte tjenester.</p>
      </div>

      <div className="divide-y divide-slate-100">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-slate-900">{booking.service}</h4>
              <p className="text-sm text-slate-500">
                {booking.date} kl. {booking.time}
              </p>
              {booking.name && (
                <p className="text-xs text-slate-400 mt-1">Bestilt av: {booking.name}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  booking.status === "Bekreftet"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {booking.status}
              </span>
              <span className="font-bold text-slate-900">{booking.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}