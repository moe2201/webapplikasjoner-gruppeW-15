import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    bookings: r.many.bookings({ from: r.user.id, to: r.bookings.userId }),
  },
  bookings: {
    user: r.one.user({ from: r.bookings.userId, to: r.user.id, optional: false })
  },
}));

export type Relations = typeof relations;
