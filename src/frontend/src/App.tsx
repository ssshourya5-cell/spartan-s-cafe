import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import Navbar from "./components/Navbar";
import ReviewsSection from "./components/ReviewsSection";

export type Page = "home" | "menu" | "gallery" | "reviews" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main
        className={`transition-all duration-300 ${
          isTransitioning
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        {currentPage === "home" && <HeroSection navigate={navigate} />}
        {currentPage === "menu" && <MenuSection />}
        {currentPage === "gallery" && <GallerySection />}
        {currentPage === "reviews" && <ReviewsSection />}
        {currentPage === "contact" && <ContactSection />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
