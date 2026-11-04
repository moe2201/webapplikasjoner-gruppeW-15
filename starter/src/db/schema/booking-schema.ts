import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@/lib/id";
import { user } from "./user-schema";

export const service = sqliteTable( "service", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
});

export const bookings = sqliteTable("bookings", {
    id: text("id").primaryKey().$default(() => createId()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    serviceId: text("service_id").notNull().references(() => service.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
    time: text("time").notNull(),
    notes: text("notes"),
    status: text("status", {enum: ["pending", "confirmed", "cancelled"]}).notNull().default("pending"),
    createdAt: integer("created_at" , { mode: "timestamp" }).notNull().$default(() => Date.now()),
}, (t) => [index("idx_bookings_user_id").on(t.userId)]);

export type Booking = typeof bookings.$inferSelect;