import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: "HOME", page: "home" },
  { label: "MENU", page: "menu" },
  { label: "GALLERY", page: "gallery" },
  { label: "REVIEWS", page: "reviews" },
  { label: "CONTACT", page: "contact" },
];

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 dark-glass border-b border-white/5"
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("home")}
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/knight-logo-transparent.dim_80x80.png"
              alt="Spartan Knight"
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="font-display text-gold text-lg font-bold leading-tight">
                SPARTAN
              </div>
              <div className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
                CAFETERIA
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`text-xs tracking-[0.2em] font-medium transition-colors ${
                  currentPage === link.page
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`nav.${link.page}.link`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+9108445605336">
              <Button
                className="gold-gradient text-background font-bold text-xs tracking-widest px-6 hover:opacity-90 transition-opacity"
                data-ocid="nav.book_table.button"
              >
                BOOK TABLE
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.mobile.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden dark-glass border-t border-white/5 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => {
                navigate(link.page);
                setMobileOpen(false);
              }}
              className={`block w-full text-left text-sm tracking-[0.15em] py-2 ${
                currentPage === link.page
                  ? "text-gold"
                  : "text-muted-foreground"
              }`}
              data-ocid={`nav.mobile.${link.page}.link`}
            >
              {link.label}
            </button>
          ))}
          <a href="tel:+9108445605336" className="block">
            <Button className="gold-gradient text-background font-bold text-xs tracking-widest w-full">
              BOOK TABLE
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
}
