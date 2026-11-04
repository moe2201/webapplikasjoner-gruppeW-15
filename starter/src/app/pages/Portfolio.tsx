import { Navbar } from "@/components/Shared/Navbar";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
export function Portfolio() {
    return (
        <>
        <Navbar />
        <main className="mx-auto max-w-4xl px-8 py-24 font-sans">
            <h1 className="text-4xl font-bold text-gray-900">Portfolio</h1>
        <PortfolioGallery />
        </main>
        
        </>
    );
}