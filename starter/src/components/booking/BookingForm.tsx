"use client";

import { useState, useEffect, FormEvent } from "react";
import { createBookingAction } from "@/app/actions/booking-actions";
import { TimeSlotPicker } from "./TimeSlotPicker";


interface BookingFormProps {
  selectedDate: string;
}


export function BookingForm({ selectedDate }: BookingFormProps) {
  const [service, setService] = useState("logo-design");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Henter automatisk tjeneste fra URL-en hvis brukeren kom fra "Bestill"-knappen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam) {
      setService(serviceParam);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createBookingAction({ service, date: selectedDate, time });
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "En feil oppsto ved innsending av bookingen.");
      setLoading(false);
    }
  };

  const disabled = !time || !selectedDate || loading;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Reserver din tid</h3>

      <div className="mb-4">
        <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
          Valgt tjeneste
        </label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-800 focus:border-purple-500 focus:outline-none"
        >
          <option value="logo-design">Logo Design (fra 1500 kr)</option>
          <option value="nettside">Nettside (fra 5000 kr)</option>
          <option value="app-utvikling">App Utvikling (fra 15000 kr)</option>
          <option value="fotografering">Fotografering (fra 2000 kr)</option>
        </select>
      </div>


      <div className="mb-6">
        <TimeSlotPicker selectedTime={time} onSelectTime={setTime} />
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={disabled}
        className={
          disabled
            ? "w-full cursor-not-allowed rounded-lg bg-slate-300 py-3 font-medium text-white transition"
            : "w-full rounded-lg bg-purple-700 py-3 font-medium text-white shadow transition hover:bg-purple-800"
        }
      >
        {loading ? "Lagrer..." : "Bekreft booking"}
      </button>
    </form>
  );
}