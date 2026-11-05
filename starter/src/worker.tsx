import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { auth } from "@/lib/auth";
import { Home } from "@/app/pages/Home";
import { Services } from "@/app/pages/Services";
import { Portfolio } from "@/app/pages/Portfolio";
import { Booking } from "@/app/pages/Booking";
import { Dashboard } from "@/app/pages/Dashboard";
import { Login } from "@/app/pages/Login";
import { db } from "@/db";
import {listBookings } from "@/lib/booking-service";

export type AppContext = {
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

  // Stopper forespørslen og sender til /login hvis ingen er logget inn
  const requireAuth = ({ctx}: {ctx: AppContext}) => {
    if (!ctx.user) {
      throw new Response(null, {
        status: 302,
        headers: { Location: "/login" }
      });
    }
};

const app = defineApp([
  setCommonHeaders(),

  async ({ctx, request }) => {
    const session = await auth.api.getSession({headers: request.headers});
    ctx.user = session?.user;
  },
  route("/api/auth/*", ({ request }) => auth.handler(request)),
  route("/api/status", () => Response.json({ status: "ok" })),
  route("/api/bookings", async ({ctx, request}) => {
    if (request.method === "GET") {
      return Response.json( {error: "Method not allowed" }, { status: 405 });
    }
    if (!ctx.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const bookings = await listBookings(db, ctx.user.id);
    return Response.json(bookings, { status: 200 });
  }),

  render(Document, [
    route("/", Home),
    route("/services", Services),
    route("/portfolio", Portfolio),
    route("/login", Login),
    route("/booking", [requireAuth, Booking]),
    route("/dashboard", [requireAuth, Dashboard]),
  ]),
]);

export default {fetch: app.fetch};

