"use client";

import { useState, useEffect, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { TimeSlotPicker } from "./TimeSlotPicker";

interface BookingFormProps {
  selectedDate: string;
}

export function BookingForm({ selectedDate }: BookingFormProps) {
  const [service, setService] = useState("logo-design");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Henter automatisk tjeneste fra URL-en hvis brukeren kom fra "Bestill"-knappen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam) {
      setService(serviceParam);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 1. Lagre bookingen i localStorage
    const formattedService =
      service === "logo-design"
        ? "Logo Design"
        : service === "nettside"
        ? "Nettside Utvikling"
        : service === "app-utvikling"
        ? "App Utvikling"
        : "Fotografering";

    const newBooking = {
      id: Date.now().toString(),
      service: formattedService,
      date: selectedDate || "Ikke valgt dato",
      time: time || "10:00",
      status: "Venter på svar",
      price:
        service === "logo-design"
          ? "1500 kr"
          : service === "nettside"
          ? "5000 kr"
          : service === "app-utvikling"
          ? "15000 kr"
          : "2000 kr",
      name: name,
      email: email,
      notes: notes,
    };

    const existing = JSON.parse(localStorage.getItem("my_bookings") || "[]");
    localStorage.setItem("my_bookings", JSON.stringify([newBooking, ...existing]));

    // 2. Send e-post via EmailJS
    const templateParams = {
      to_name: name,
      to_email: email,
      service: formattedService,
      date: selectedDate,
      time: time,
      notes: notes,
    };

    emailjs
      .send(
        "service_lfxt18e",
        "template_cadxhl4",
        templateParams,
        "JVLbFppTEmkvjc7oa"
      )
      .then(
        (response) => {
          console.log("E-post sendt vellykket!", response.status, response.text);
        },
        (err) => {
          console.error("Feil ved sending av e-post:", err);
        }
      );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h4 className="font-bold text-slate-900">E-postbekreftelse sendt</h4>
              <p className="text-xs text-slate-500">Til: {email}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
            Vellykket
          </span>
        </div>

        <div className="space-y-3 text-slate-700 text-sm bg-slate-50 p-5 rounded-xl border border-slate-100">
          <p>
            <strong className="text-slate-900">Emne:</strong> Bekreftelse på din booking
          </p>
          <hr className="border-slate-200 my-2" />
          <p>
            Hei <strong>{name}</strong>!
          </p>
          <p>
            Takk for din bestilling. Vi har mottatt din forespørsel for{" "}
            <strong className="text-purple-700">{service}</strong>.
          </p>
          <p>
            Tidspunkt for møte:{" "}
            <strong>
              {selectedDate} kl. {time}
            </strong>
          </p>
          {notes && (
            <p className="text-slate-600">
              <em>Dine kommentarer: &quot;{notes}&quot;</em>
            </p>
          )}
          <p className="text-slate-500 italic pt-2">Vi gleder oss til samarbeidet!</p>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 w-full rounded-lg bg-purple-700 py-3 text-sm font-medium text-white hover:bg-purple-800 transition shadow"
        >
          Gjør en ny booking
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Reserver din tid</h3>

      {/* Valg av tjeneste */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Valgt tjeneste
        </label>
        <select
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

      {/* Tidspunkt-velger */}
      <div className="mb-6">
        <TimeSlotPicker selectedTime={time} onSelectTime={setTime} />
      </div>

      {/* Navn og E-post */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Fullt navn
          </label>
          <input
            type="text"
            required
            placeholder="Ola Nordmann"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-800 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            E-post
          </label>
          <input
            type="email"
            required
            placeholder="ola@eksempel.no"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-800 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Notat */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Kommentar / Notat (valgfritt)
        </label>
        <textarea
          rows={3}
          placeholder="Fortell kort om hva du ønsker..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-800 focus:border-purple-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={!time || !selectedDate}
        className={`w-full rounded-lg py-3 font-medium text-white transition ${
          !time || !selectedDate
            ? "bg-slate-300 cursor-not-allowed"
            : "bg-purple-700 hover:bg-purple-800 shadow"
        }`}
      >
        Bekreft booking
      </button>
    </form>
  );
}