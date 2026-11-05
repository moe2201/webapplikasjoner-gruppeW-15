import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { relations } from "@/db/relations";
import { user } from "@/db/schema";

// Mappa med migrasjonene. Vitest kjøres fra starter-mappa.
const MIGRATIONS = join(process.cwd(), "drizzle/migrations");

// Lager en ny, tom database i minnet med alle tabellene
export function createTestDb() {
  const client = new Database(":memory:");
  client.pragma("foreign_keys = ON");

  // Kjører hver migration.sql, akkurat som wrangler gjør mot D1
  for (const folder of readdirSync(MIGRATIONS).sort()) {
    const sql = readFileSync(join(MIGRATIONS, folder, "migration.sql"), "utf8");
    for (const statement of sql.split("--> statement-breakpoint")) {
      if (statement.trim()) client.exec(statement);
    }
  }

  return drizzle({ client, relations });
}

export type TestDb = ReturnType<typeof createTestDb>;

// Bookinger må ha en bruker (fremmednøkkel), så vi lager en direkte
export async function createTestUser(db: TestDb, id: string) {
  const now = new Date();
  await db.insert(user).values({
    id,
    name: `Bruker ${id}`,
    email: `${id}@test.no`,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}