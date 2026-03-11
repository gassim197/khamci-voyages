import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Billetterie", href: "/services/billetterie" },
  { label: "Réservation d'hôtel", href: "/services/hotel" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href === "/#contact") {
      if (location === "/") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#contact";
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <nav className="container flex items-center justify-between py-3">
        {/* Logo officiel */}
        <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
          <img
            src="/logo-khamci-officiel.png"
            alt="KHAMCI VOYAGES - Agence de Voyages Guinée"
            className="h-14 md:h-16 w-auto"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-bold gradient-text leading-tight">KHAMCI VOYAGES</h1>
            <p className="text-xs text-gray-500 font-medium">Agence de Voyages — Conakry, Guinée</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            link.href === "/#contact" ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium text-sm"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-[#FF6B35] font-semibold"
                    : "text-gray-700 hover:text-[#FF6B35]"
                }`}
              >
                {link.label}
              </Link>
            )
          ))}

          <a
            href="tel:+224611145892"
            className="flex items-center gap-1.5 text-[#0D1B3E] hover:text-[#FF6B35] transition-colors font-semibold text-sm border border-[#0D1B3E] hover:border-[#FF6B35] rounded-full px-3 py-1.5"
          >
            <Phone size={14} className="shrink-0" />
            <span>+224 611 145 892</span>
          </a>
          <button
            onClick={() => handleNavClick("/#contact")}
            className="btn-cta text-sm"
          >
            Demander un Devis
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container py-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              link.href === "/#contact" ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-gray-700 hover:text-[#FF6B35] transition-colors font-medium py-2.5 border-b border-gray-100"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-gray-700 hover:text-[#FF6B35] transition-colors font-medium py-2.5 border-b border-gray-100 block"
                >
                  {link.label}
                </Link>
              )
            ))}
            <a
              href="tel:+224611145892"
              className="flex items-center justify-center gap-2 bg-[#0D1B3E] text-white rounded-lg py-3 font-semibold hover:bg-[#1a3a6e] transition-colors mt-2"
            >
              <Phone size={16} />
              <span>Appeler : +224 611 145 892</span>
            </a>
            <button
              onClick={() => handleNavClick("/#contact")}
              className="btn-cta w-full mt-1"
            >
              Demander un Devis
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
