import React from "react";

interface BookingCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  // Henter dagens dato i formatet DD-MM-YYYY for standard input
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-2">Velg dato</h3>
      <p className="text-sm text-slate-500 mb-4">Velg hvilken dag du ønsker å gjennomføre bookingen.</p>
      
      <input
        type="date"
        min={today}
        value={selectedDate}
        onChange={(e) => onSelectDate(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
      />
    </div>
  );
}