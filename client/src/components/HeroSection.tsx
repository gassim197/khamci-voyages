export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/hero-airplane-sunset-64duN9FBfa4CZjHNXpHzzz.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container z-10 text-white max-w-2xl">
        <div className="animate-fade-in-up">
          <h1 className="heading-display mb-4 leading-tight">
            Explorez le Monde<br />
            <span className="gradient-text">Avec Confiance</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
            KHAMCI VOYAGES vous accompagne dans chaque étape de votre voyage.
            Rapidité, fiabilité et expertise locale pour une expérience inoubliable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-cta"
            >
              Demander un Devis
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="btn-cta-secondary bg-white text-orange-500 border-white"
            >
              Découvrir nos Services
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
