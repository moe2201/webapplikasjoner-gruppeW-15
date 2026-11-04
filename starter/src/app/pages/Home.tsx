import { Navbar } from "@/components/Shared/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryList } from "@/components/home/CategoryList";
export function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-8 py-24 font-sans">
        <h1 className="text-center text-4xl font-bold text-gray-900">Velkommen til vår bookingportal</h1>
        <HeroSection />
        <CategoryList />
      </main>
    </>
  );
}
