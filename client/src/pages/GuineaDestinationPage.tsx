import { useState, useEffect, useMemo } from "react";
import { Link, useRoute } from "wouter";
import { MapPin, Clock, Sun, Users, Check, X, ArrowRight, ZoomIn } from "lucide-react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import QuickQuoteModal from "@/components/QuickQuoteModal";
import NotFound from "@/pages/NotFound";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { guineaDestinations, getGuineaDestination } from "@/data/guineaDestinations";
import type { GuineaDestination } from "@/data/guineaDestinations";

/**
 * GuineaDestinationPage — template unique des pages /guinee/:slug
 * Le contenu vient de client/src/data/guineaDestinations.ts : ajouter une
 * destination ne demande aucune modification de ce fichier.
 */

export default function GuineaDestinationPage() {
  const [, params] = useRoute("/guinee/:slug");
  const destination = params?.slug ? getGuineaDestination(params.slug) : undefined;

  if (!destination) return <NotFound />;

  return <DestinationView key={destination.slug} destination={destination} />;
}

function DestinationView({ destination }: { destination: GuineaDestination }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  usePageMetadata(
    useMemo(
      () => ({
        title: `${destination.name} — Tourisme en Guinée | Khamci Voyages`,
        description: destination.tagline,
        ogTitle: `${destination.name} — Tourisme en Guinée`,
        ogDescription: destination.tagline,
        canonicalUrl: `https://khamci-voyages.com/guinee/${destination.slug}`,
        ogUrl: `https://khamci-voyages.com/guinee/${destination.slug}`,
      }),
      [destination],
    ),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [destination.slug]);

  const others = guineaDestinations.filter((d) => d.slug !== destination.slug);

  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? i : (i - 1 + destination.gallery.length) % destination.gallery.length,
        );
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? i : (i + 1) % destination.gallery.length));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, destination.gallery.length]);

  const practicalItems = [
    { icon: MapPin, label: "Accès", value: destination.practical.access },
    { icon: Clock, label: "Durée conseillée", value: destination.practical.duration },
    { icon: Sun, label: "Meilleure saison", value: destination.practical.bestSeason },
    { icon: Users, label: "Idéal pour", value: destination.practical.goodFor },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <HeaderNav />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] md:h-[60vh] w-full overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-purple-600">
        <img
          src={destination.heroImage}
          alt={`${destination.name} — ${destination.tagline}`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="relative h-full container flex flex-col items-center justify-center text-center px-4">
          <span className="text-5xl md:text-6xl mb-4" aria-hidden="true">
            {destination.icon}
          </span>
          <h1 className="heading-display text-white drop-shadow-lg">{destination.name}</h1>
          <p className="mt-3 text-lg md:text-xl text-white/90 max-w-2xl">
            {destination.tagline}
          </p>
          <span className="mt-5 inline-block px-4 py-1.5 rounded-full bg-orange-500/90 text-white text-sm font-semibold">
            {destination.benefit}
          </span>

          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="mt-6 text-xs md:text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <span className="mx-2">›</span>
            <Link href="/#guinea" className="hover:text-white transition-colors">
              Guinée
            </Link>
            <span className="mx-2">›</span>
            <span className="text-white/90">{destination.name}</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 md:py-20">
        <div className="container max-w-3xl space-y-6">
          {destination.intro.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Points forts */}
      <section className="py-14 md:py-20 section-gradient-warm">
        <div className="container">
          <h2 className="heading-lg gradient-text text-center mb-10">
            Les incontournables
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {destination.highlights.map((highlight) => (
              <div key={highlight.title} className="service-card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activités */}
      <section className="py-14 md:py-20">
        <div className="container">
          <h2 className="heading-lg gradient-text text-center mb-10">
            Activités sur place
          </h2>
          <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {destination.activities.map((activity) => (
              <li
                key={activity}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900 text-sm font-medium text-orange-800 dark:text-orange-200"
              >
                <Check size={16} className="text-orange-500 shrink-0" aria-hidden="true" />
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="py-14 md:py-20 section-gradient-cool">
        <div className="container">
          <h2 className="heading-lg gradient-text text-center mb-10">
            Infos pratiques
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {practicalItems.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700"
              >
                <Icon className="w-6 h-6 text-orange-500 mb-3" aria-hidden="true" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="py-14 md:py-20">
        <div className="container">
          <h2 className="heading-lg gradient-text text-center mb-10">
            {destination.name} en images
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {destination.gallery.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative h-56 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-gradient-to-br from-orange-400 to-purple-600"
                aria-label={`Agrandir : ${image.title}`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                  <p className="text-white text-sm font-medium leading-tight">
                    {image.title}
                  </p>
                  <span className="mt-2 flex items-center gap-1 text-white/80 text-xs">
                    <ZoomIn size={12} aria-hidden="true" />
                    Agrandir
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA devis */}
      <section className="py-14 md:py-20 section-gradient-warm">
        <div className="container max-w-3xl text-center">
          <h2 className="heading-lg gradient-text mb-4">
            Envie de découvrir {destination.name} ?
          </h2>
          <p className="text-body text-gray-600 dark:text-gray-300 mb-8">
            Nos conseillers construisent votre séjour sur mesure : transport, hébergement,
            activités. Réponse sous 24h, gratuit et sans engagement.
          </p>
          <button onClick={() => setIsQuoteModalOpen(true)} className="btn-cta">
            Demander un devis personnalisé
          </button>

          {destination.teamBuildingLink && (
            <div className="mt-12 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Vous êtes une entreprise ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {destination.name} accueille aussi vos team buildings et séminaires.
              </p>
              <Link
                href="/team-building"
                className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                Découvrir notre offre team building
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Navigation croisée */}
      <section className="py-14 md:py-20">
        <div className="container">
          <h2 className="heading-lg gradient-text text-center mb-10">Découvrez aussi</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/guinee/${other.slug}`}
                className="service-card block text-center"
              >
                <span className="text-3xl" aria-hidden="true">
                  {other.icon}
                </span>
                <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">
                  {other.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {other.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox galerie */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
          <div
            className="max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={destination.gallery[lightboxIndex].src}
              alt={destination.gallery[lightboxIndex].title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <p className="text-white/90 text-base text-center">
              {destination.gallery[lightboxIndex].title}
            </p>
          </div>
        </div>
      )}

      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source={`destination-${destination.name}`}
      />
    </div>
  );
}
