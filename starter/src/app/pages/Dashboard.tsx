import type { RequestInfo } from "rwsdk/worker";
import { db } from "@/db";
import { listBookings } from "@/lib/booking-service";
import { Navbar } from "@/components/Shared/Navbar";
import { BookingStatus} from "@/components/dashboard/BookingStatus";
import { BookingList } from "@/components/dashboard/BookingList";

export async function Dashboard({ctx }: RequestInfo) {
  const bookings = await listBookings(db, ctx.user!.id);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard Hei, {ctx.user!.name}!</h1>
        <BookingStatus bookings={bookings} />
        <BookingList bookings={bookings} />
      </main>
    </>
  );
}
