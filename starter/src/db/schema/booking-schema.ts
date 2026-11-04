import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@/lib/id";
import { user } from "./auth-schema";

export const bookings = sqliteTable( "service", {
  id: text("id").primaryKey().$default(() => createId()),
  userId: text("user_id").notNull().references(() => user.id {onDelete: "cascade"}),
  service: text("service").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$default(() => Date.now()), 
});
