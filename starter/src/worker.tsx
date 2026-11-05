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

