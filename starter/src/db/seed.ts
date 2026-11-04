import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { bookings } from "./schema";

export const seedData = async  (env: Env) => {
  const db = drizzle(env.DB);
  await db.delete(bookings);
  console.log("Seeding ferdig!");
};

export default defineScript(async ({ env }) => {
  await seedData(env);
  return Response.json({ success: true });
});