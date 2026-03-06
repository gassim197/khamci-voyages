import { useState } from "react";
import { Menu, X } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/khamci-logo.png"
            alt="KHAMCI VOYAGES"
            className="h-12 w-auto"
          />
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold gradient-text">KHAMCI VOYAGES</h1>
            <p className="text-xs text-gray-600">Agence de Voyages</p>
          </div>
        </div>

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
