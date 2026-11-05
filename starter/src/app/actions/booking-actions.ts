"use server";

import { requestInfo } from "rwsdk/worker";
import { db } from "@/db";
import { createBooking, listBookings, type BookingInput } from "@/lib/booking-service";

export async function createBookingAction(input: BookingInput) {
    const {ctx} = requestInfo;
    //autorisasjon: skjekker serveren ikke bare nett siden
    if (!ctx.user) throw new Error("Ikke logget inn");
    return createBooking(db, ctx.user.id, input);
}

