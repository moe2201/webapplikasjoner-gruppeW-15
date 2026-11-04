"use client"

import { Navbar } from "@/components/Shared/Navbar"
import { BookingForm } from "@/components/booking/BookingForm"
import { BookingCalendar } from "@/components/booking/BookingCalendar"
import { useState } from "react"

export function Booking() {
    const [selectedDate, setSelectedDate] = useState("")

    return (
        <>
        <Navbar />
        <main className="mx-auto max-w-4xl px-8 py-24 font-sans">
            <h1 className="text-4xl font-bold text-gray-900">Booking</h1>
            <p className="mt-4 text-lg text-slate-600">
                Her kan du bestille en time for våre kreative tjenester. Fyll ut skjemaet nedenfor for å reservere din plass.
            </p>
            <div className="mt-12">
                <BookingCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            </div>
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">Fyll ut skjemaet for å bestille</h2>
                <BookingForm selectedDate={selectedDate} />
            </div>     
        </main>
        </>
    );
}