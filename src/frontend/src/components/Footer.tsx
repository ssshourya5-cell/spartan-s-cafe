import { Clock, MapPin, Phone } from "lucide-react";
import type { Page } from "../App";

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer.panel">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">⚔️</span>
              <div>
                <div className="font-display text-2xl text-gold font-black leading-tight">
                  SPARTAN CAFETERIA
                </div>
                <div className="text-xs text-muted-foreground tracking-[0.3em]">
                  WE ARE PROUD TO BE SPARTANS
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A unique dining experience blending warrior spirit with culinary
              excellence. Come, feast like a Spartan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.3em] text-gold uppercase font-semibold mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {(
                ["home", "menu", "gallery", "reviews", "contact"] as Page[]
              ).map((page) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => navigate(page)}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors capitalize"
                    data-ocid={`footer.${page}.link`}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.3em] text-gold uppercase font-semibold mb-4">
              Find Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Goula Road, Haripur Bhandeo, Uttarakhand 263142
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <a
                  href="tel:+9108445605336"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  +91-08445605336
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gold flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  10:00 AM – 9:30 PM Daily
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {year} Spartan Cafeteria. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
