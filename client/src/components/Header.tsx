import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <img
            src="/logo-khamci.png"
            alt="KHAMCI VOYAGES - Agence de Voyages Guinée"
            className="h-12 md:h-16 w-auto"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-bold gradient-text">KHAMCI VOYAGES</h1>
            <p className="text-xs text-gray-600">Agence de Voyages</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("services")}
            className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("team-building")}
            className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
          >
            Team Building
          </button>
          <button
            onClick={() => scrollToSection("guinea")}
            className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
          >
            Découvrir
          </button>
          <a
            href="tel:+224611145892"
            className="flex items-center gap-1.5 text-[#0D1B3E] hover:text-[#FF6B35] transition-colors font-semibold text-sm border border-[#0D1B3E] hover:border-[#FF6B35] rounded-full px-3 py-1.5"
          >
            <Phone size={14} className="shrink-0" />
            <span>+224 611 145 892</span>
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-cta"
          >
            Demander un Devis
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("services")}
              className="text-left text-gray-700 hover:text-orange-500 transition-colors font-medium py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("team-building")}
              className="text-left text-gray-700 hover:text-orange-500 transition-colors font-medium py-2"
            >
              Team Building
            </button>
            <button
              onClick={() => scrollToSection("guinea")}
              className="text-left text-gray-700 hover:text-orange-500 transition-colors font-medium py-2"
            >
              Découvrir la Guinée
            </button>
            <a
              href="tel:+224611145892"
              className="flex items-center justify-center gap-2 bg-[#0D1B3E] text-white rounded-lg py-3 font-semibold hover:bg-[#1a3a6e] transition-colors"
            >
              <Phone size={16} />
              <span>Appeler : +224 611 145 892</span>
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-cta w-full"
            >
              Demander un Devis
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
