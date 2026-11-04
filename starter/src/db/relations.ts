// Relations v2, som er måten Drizzle v1 gjør det på.
//
// Alle relasjoner defineres i ETT kall, ikke per tabell med `relations()` slik
// det var i 0.x. `fields`/`references` heter nå `from`/`to`.
//
// Det er dette objektet som gjør at
// `db.query.tasks.findFirst({ with: { user: true } })` virker. Det sendes til
// `drizzle(..., { relations })` i ./index.ts.
import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    bookings: r.many.bookings({ from: r.user.id, to: r.booking.userId }),
  },
  bookings: {
    user: r.one.users({ from: r.booking.userId, to: r.user.id, optional: false }),
    service: r.one.services({ from: r.booking.serviceId, to: r.service.id, optional: false })
  },
}));

export type Relations = typeof relations;
