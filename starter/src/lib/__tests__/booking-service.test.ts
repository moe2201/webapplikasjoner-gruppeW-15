import { describe, it, expect, beforeEach } from "vitest";
import { validateBooking , createBooking, listBookings} from "../booking-service";
import {createTestDb, createTestUser, type TestDb} from "@/test/test-db";

const gyldig = { service: "logo-design", date: "2026-12-01", time: "10:30" };

describe("validateBooking", () => {
    it("godtar gyldig input", () => {
        expect(validateBooking(gyldig)).toBeNull();
    });

    it("krever tjeneste", () => {
        expect(validateBooking({ ...gyldig, service: "" })).toBe("Tjeneste må velges");
    });
    it("avviser dato i feil format", () => {
        expect(validateBooking({ ...gyldig, date: "01.12.2026" })).toBe("Ugyldig dato");
    });
    it("avviser tid i feil format", () => {
        expect(validateBooking({ ...gyldig, time: "halv elleve" })).toBe("Ugyldig tid");
    });
});

describe("booking-service", () => {
  let db: TestDb;

  // Kjører før HVER test: ny tom database og én bruker
  beforeEach(async () => {
    db = createTestDb();
    await createTestUser(db, "u1");
  });

  it("createBooking lagrer bookingen på riktig bruker", async () => {
    const booking = await createBooking(db, "u1", gyldig);

    expect(booking.id).toBeTruthy();
    expect(booking.userId).toBe("u1");
    expect(booking.service).toBe("logo-design");
  });

  it("createBooking kaster feil og lagrer ingenting ved ugyldig input", async () => {
    await expect(createBooking(db, "u1", { ...gyldig, date: "" })).rejects.toThrow("Ugyldig dato");
    expect(await listBookings(db, "u1")).toHaveLength(0);
  });

  it("listBookings returnerer tom liste for ny bruker", async () => {
    expect(await listBookings(db, "u1")).toEqual([]);
  });
});