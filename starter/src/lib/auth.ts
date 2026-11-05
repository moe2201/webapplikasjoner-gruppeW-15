import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "cloudflare:workers";
import { db } from "@/db";
import { user, session, account, verification } from "@/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "sqlite", schema: { user, session, account, verification } }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
    },
});