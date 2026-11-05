import { eq, desc } from "drizzle-orm";
import type { DB } from "@/db";
import { bookings } from "@/db/schema";

export type BookingInput = { 
    service : string;
    date : string;
    time : string;
};

//Hjelpefunksjon: returnerer en feilmelding eller bull hvis alt er ok
export function validateBooking(input: BookingInput): string | null {
    if (!input.service) { return "Tjeneste må velges"; }
    if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) { return "Ugyldig dato"; }
    if (!input.time || !/^\d{2}:\d{2}$/.test(input.time)) { return "Ugyldig tid"; }
    return null;
}

export async function createBooking(db: DB, userId: string, input: BookingInput) {
    const error = validateBooking(input);
    if (error) throw new Error(error);
    const [row] = await db.insert(bookings).values({
        ...input,
        userId,
    }).returning();
    return row;
}

export async function listBookings(db: DB, userId: string) {
    return db .select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.createdAt));
}