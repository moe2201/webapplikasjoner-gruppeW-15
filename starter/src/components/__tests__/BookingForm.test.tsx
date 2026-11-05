// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const createBookingAction = vi.fn();
vi.mock("@/app/actions/booking-actions", () => ({
  createBookingAction: (...args: unknown[]) => createBookingAction(...args),
}));

import { BookingForm } from "../booking/BookingForm";

describe("BookingForm", () => {
  it("knappen er deaktivert uten tidspunkt", () => {
    render(<BookingForm selectedDate="2026-12-01" />);

    expect(screen.getByRole("button", { name: "Bekreft booking" })).toBeDisabled();
  });

  it("knappen er deaktivert uten dato, selv med tidspunkt", async () => {
    render(<BookingForm selectedDate="" />);
    await userEvent.click(screen.getByRole("button", { name: "10:30" }));

    expect(screen.getByRole("button", { name: "Bekreft booking" })).toBeDisabled();
  });

  it("sender valgt tjeneste, dato og tid til server action", async () => {
    // Later som serveren svarer med en feil, så vi slipper å navigere bort
    createBookingAction.mockRejectedValueOnce(new Error("Ikke logget inn"));
    render(<BookingForm selectedDate="2026-12-01" />);

    await userEvent.selectOptions(screen.getByLabelText("Valgt tjeneste"), "nettside");
    await userEvent.click(screen.getByRole("button", { name: "10:30" }));
    await userEvent.click(screen.getByRole("button", { name: "Bekreft booking" }));

    // Ble action-en kalt med riktige data?
    expect(createBookingAction).toHaveBeenCalledWith({
      service: "nettside",
      date: "2026-12-01",
      time: "10:30",
    });
    // Vises feilen fra serveren for brukeren?
    expect(await screen.findByText("Ikke logget inn")).toBeInTheDocument();
  });
});