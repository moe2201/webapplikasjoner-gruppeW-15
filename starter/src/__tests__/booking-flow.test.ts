import { describe, it, expect } from "vitest";
import { eq } from "drizzle-orm";
import { createBooking, listBookings } from "@/lib/booking-service";
import { user } from "@/db/schema";
import { createTestDb, createTestUser } from "@/test/test-db";

describe("hovedflyt: lag booking og se den igjen", () => {
  it("brukeren ser sin egen booking, men ikke andres", async () => {
    const db = createTestDb();
    await createTestUser(db, "anna");
    await createTestUser(db, "bjorn");

    // Anna lager to bookinger, Bjørn lager én
    await createBooking(db, "anna", { service: "nettside", date: "2026-12-01", time: "09:00" });
    await createBooking(db, "anna", { service: "logo-design", date: "2026-12-02", time: "13:00" });
    await createBooking(db, "bjorn", { service: "fotografering", date: "2026-12-03", time: "10:30" });

    // Hver av dem henter bookingene sine
    const annas = await listBookings(db, "anna");
    const bjorns = await listBookings(db, "bjorn");

    // Anna ser sine to, og bare sine
    expect(annas).toHaveLength(2);
    expect(annas.map((b) => b.service).sort()).toEqual(["logo-design", "nettside"]);
    expect(annas.every((b) => b.userId === "anna")).toBe(true);

    // Bjørn ser bare sin ene
    expect(bjorns).toHaveLength(1);
    expect(bjorns[0].service).toBe("fotografering");
  });

  it("bookingene forsvinner når brukeren slettes (cascade)", async () => {
    const db = createTestDb();
    await createTestUser(db, "anna");
    await createBooking(db, "anna", { service: "nettside", date: "2026-12-01", time: "09:00" });

    // Sletter brukeren
    await db.delete(user).where(eq(user.id, "anna"));

    // onDelete: "cascade" i skjemaet skal ha fjernet bookingen også
    expect(await listBookings(db, "anna")).toHaveLength(0);
  });
});