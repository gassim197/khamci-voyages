import { Target, Eye, Heart, Users, Award, Handshake, CheckCircle, Phone, Mail, MapPin, Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";

const PARTNERS = [
  "SOGEFEL", "Métal Plus", "Direction Générale des Impôts", "ANAIM",
  "EIFFAGE", "Ministère de la Pêche", "Guinée Gaz", "MRJF",
  "Ministère de l'Enseignement Technique", "Groupe Notre Vision", "CB BLACK GOLD",
];

const OBJECTIVES = [
  "Faciliter l'accès aux voyages en proposant des billets d'avion à des tarifs compétitifs et accessibles à toutes les catégories de voyageurs.",
  "Soutenir les entreprises dans l'organisation de leurs déplacements professionnels à l'international grâce à des services sur mesure.",
  "Encourager le tourisme local et international en mettant en avant les destinations touristiques guinéennes.",
  "Offrir une expérience client de qualité à travers un accompagnement personnalisé et des services fiables.",
  "Devenir un acteur majeur du secteur du voyage en Guinée et en Afrique de l'Ouest.",
];

const SERVICES = [
  { icon: "✈️", title: "Billetterie aérienne", desc: "Réservation et vente de billets d'avion à destination du monde entier." },
  { icon: "🏨", title: "Réservation d'hôtels", desc: "Accès à un large choix d'hébergements, en Guinée et à l'étranger." },
  { icon: "🚗", title: "Location de voiture", desc: "Mise à disposition de véhicules pour les particuliers et les entreprises." },
  { icon: "🌍", title: "Tourisme local & international", desc: "Organisation de circuits touristiques pour découvrir la Guinée et d'autres destinations." },
  { icon: "🕌", title: "Hadj & Oumra", desc: "Accompagnement des pèlerins dans l'organisation de leur voyage vers les lieux saints." },
  { icon: "🛂", title: "Accompagnement aéroportuaire", desc: "Assistance personnalisée aux voyageurs pour simplifier les formalités avant et après leur vol." },
];

const WHY_PARTNER = [
  "Un accompagnement personnalisé pour vos besoins en billetterie et logistique de voyage.",
  "Une gestion efficace des déplacements de vos équipes, avec une prise en charge complète.",
  "Une réduction des coûts grâce à nos offres sur mesure et nos négociations avec les compagnies aériennes et hôtelières.",
  "Une agence dynamique et réactive, toujours disponible pour répondre à vos demandes.",
];

// Photos de l'inauguration du nouveau siège
const INAUGURATION_PHOTOS = [
  {
    url: "/inauguration/cover-equipe.jpg",
    caption: "L'équipe KHAMCI VOYAGES lors de l'inauguration du nouveau siège",
    isCover: true,
  },
  {
    url: "/inauguration/photo-01.jpg",
    caption: "Rencontre avec les invités lors de l'inauguration",
  },
  {
    url: "/inauguration/photo-02.jpg",
    caption: "Moment de convivialité avec les partenaires",
  },
  {
    url: "/inauguration/photo-03.jpg",
    caption: "Accueil des invités au nouveau siège",
  },
  {
    url: "/inauguration/photo-04.jpg",
    caption: "L'équipe avec les partenaires et invités",
  },
  {
    url: "/inauguration/photo-05.jpg",
    caption: "Échanges avec les clients lors de l'inauguration",
  },
  {
    url: "/inauguration/photo-06.jpg",
    caption: "Rencontres et partages lors de l'événement",
  },
  {
    url: "/inauguration/photo-07.jpg",
    caption: "Ambiance chaleureuse lors de l'inauguration",
  },
  {
    url: "/inauguration/photo-08.jpg",
    caption: "La directrice générale lors de la cérémonie",
  },
  {
    url: "/inauguration/photo-09.jpg",
    caption: "Cérémonie d'inauguration du nouveau siège",
  },
  {
    url: "/inauguration/photo-10.jpg",
    caption: "Inauguration en présence des partenaires et clients",
  },
  {
    url: "/inauguration/photo-11.jpg",
    caption: "Discours lors de la cérémonie d'inauguration",
  },
];

function Lightbox({ photos, initialIndex, onClose }: { photos: typeof INAUGURATION_PHOTOS; initialIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
      >
        <X size={24} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
      >
        <ChevronLeft size={28} />
      </button>
      <div className="max-w-4xl max-h-[85vh] mx-16" onClick={e => e.stopPropagation()}>
        <img
          src={photos[current].url}
          alt={photos[current].caption}
          className="max-w-full max-h-[75vh] object-contain rounded-xl"
        />
        <p className="text-white/80 text-center mt-3 text-sm">{photos[current].caption}</p>
        <p className="text-white/50 text-center text-xs mt-1">{current + 1} / {photos.length}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

export default function APropos() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero avec photo couverture équipe en veste */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="/inauguration/cover-equipe.jpg"
          alt="Équipe KHAMCI VOYAGES"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/90 via-[#0D1B3E]/50 to-transparent" />
        <div className="relative h-full flex items-end pb-12">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#FF6B35] p-3 rounded-xl">
                <Users size={28} className="text-white" />
              </div>
              <span className="text-orange-300 font-semibold uppercase tracking-wide text-sm">Qui sommes-nous</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              À propos de<br />
              <span className="text-[#FF6B35]">KHAMCI VOYAGES</span>
            </h1>
            <p className="text-gray-200 text-lg max-w-2xl">
              Créée en 2021 en République de Guinée — votre partenaire de confiance pour tous vos voyages.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-[#0D1B3E] mb-6">Notre histoire</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                KHAMCI VOYAGES SARL a été fondée avec une vision claire : rendre les services de voyage
                accessibles à tous les usagers, en proposant des offres adaptées et des facilités de paiement.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Nous savons à quel point le déplacement est stratégique pour les entreprises et les professionnels.
                C'est pourquoi nous nous positionnons comme un <strong>partenaire fiable et réactif</strong>,
                prêt à simplifier l'organisation des voyages d'affaires et personnels en garantissant
                efficacité, flexibilité et coût optimisé.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                À travers des tarifs défiant toute concurrence, nous nous engageons à rendre chacune
                des étapes de votre voyage mémorable.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl p-8 border border-orange-100">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/logo-khamci-officiel.png"
                  alt="KHAMCI VOYAGES"
                  className="h-32 w-auto"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-black text-[#FF6B35]">2021</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Année de création</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-black text-[#FF6B35]">+10</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Partenaires institutionnels</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-black text-[#FF6B35]">6</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Services proposés</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-black text-[#FF6B35]">24h</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Délai de réponse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fondatrice & Directrice Générale */}
      <section className="py-16 bg-gradient-to-br from-[#0D1B3E] to-[#1a3a6e] text-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-orange-300 font-semibold uppercase tracking-wide text-sm">Leadership</span>
            <h2 className="text-3xl font-black mt-2">La fondatrice</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="shrink-0">
              <img
                src="/inauguration/fondatrice.jpg"
                alt="Kadija Diaka Cissé - Fondatrice et Directrice Générale de KHAMCI VOYAGES"
                className="w-52 h-64 object-cover object-top rounded-2xl shadow-2xl border-2 border-white/20"
              />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-1">Kadija Diaka Cissé</h3>
              <p className="text-orange-300 font-semibold mb-1">Fondatrice &amp; Directrice Générale</p>
              <p className="text-white/60 text-sm mb-5">KHAMCI VOYAGES SARL — Conakry, Guinée</p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Femme d'affaires engagée et visionnaire, Kadija Diaka Cissé a fondé KHAMCI VOYAGES en 2021
                avec une ambition claire : rendre les services de voyage accessibles à tous les Guinéens,
                particuliers comme entreprises, à des tarifs compétitifs et avec un accompagnement de qualité.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Animée par la conviction que la mobilité est un levier essentiel du développement économique
                et personnel, elle a bâti une agence réactive et humaine, fondée sur trois valeurs fondamentales :
                <strong className="text-white"> rapidité, efficacité et engagement</strong>.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Sous sa direction, KHAMCI VOYAGES s'est imposée comme un acteur de référence dans le secteur
                du voyage en Guinée, au service des particuliers, des entreprises partenaires et des pèlerins
                pour le Hadj et l'Oumra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Target className="text-[#FF6B35]" size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0D1B3E] mb-4">Notre Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                Devenir la <strong>référence en matière de voyages en Guinée et en Afrique</strong>,
                en facilitant l'accès aux services de voyage et en accompagnant les particuliers
                et les professionnels dans tous leurs déplacements.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mt-3">
                Être reconnue pour notre professionnalisme, la qualité de notre service client
                et notre engagement à offrir les meilleures solutions de voyage adaptées aux besoins de chacun.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Heart className="text-[#0D1B3E]" size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0D1B3E] mb-4">Notre Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-3">
                Simplifier l'organisation des voyages en offrant des services accessibles, flexibles et de qualité.
              </p>
              <ul className="space-y-2">
                {[
                  "Réduire les barrières financières et logistiques liées aux déplacements",
                  "Accompagner nos clients à chaque étape de leur voyage",
                  "Favoriser le développement du tourisme guinéen",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Eye className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0D1B3E] mb-4">Nos Objectifs</h3>
              <ul className="space-y-2">
                {OBJECTIVES.slice(0, 4).map(obj => (
                  <li key={obj} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                    {obj.split(".")[0]}.
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie Inauguration */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-6xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Camera className="text-[#FF6B35]" size={28} />
              <h2 className="text-3xl font-black text-[#0D1B3E]">Inauguration du nouveau siège</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Retour en images sur l'inauguration de notre nouveau siège à Conakry, un moment fort
              partagé avec nos partenaires, clients et proches.
            </p>
          </div>

          {/* Grille de photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {INAUGURATION_PHOTOS.map((photo, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
                style={{ aspectRatio: index === 0 ? "auto" : "1" }}
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ minHeight: index === 0 ? "300px" : "140px" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <Camera size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {photo.isCover && (
                  <div className="absolute bottom-3 left-3 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Notre équipe
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Cliquez sur une photo pour l'agrandir
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Nos propositions de services</h2>
            <p className="text-gray-500 dark:text-gray-400">Une gamme complète pour tous vos besoins de voyage</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SERVICES.map(service => (
              <div key={service.title} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-white dark:bg-gray-900 hover:border-orange-200 hover:bg-orange-50 transition-all">
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h3 className="font-bold text-[#0D1B3E] mb-1">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Tarifs */}
      <section className="py-16 bg-gradient-to-br from-[#0D1B3E] to-[#1a3a6e] text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-black mb-4">Nos tarifs</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Nous proposons des formules adaptées aux besoins de nos clients, avec des options flexibles
            pour les particuliers comme pour les entreprises.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "🏢", title: "Entreprises", desc: "Formules spécifiques pour les entreprises et les voyageurs fréquents avec suivi dédié." },
              { icon: "🎯", title: "Tarifs promotionnels", desc: "Offres spéciales sur certaines destinations et périodes de l'année." },
              { icon: "💳", title: "Facilités de paiement", desc: "Possibilité d'échelonner le règlement de vos billets d'avion selon vos besoins." },
            ].map(item => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Handshake className="text-[#FF6B35]" size={28} />
              <h2 className="text-3xl font-black text-[#0D1B3E]">Nos partenaires</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400">Ils nous font confiance pour leurs déplacements professionnels</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {PARTNERS.map(partner => (
              <span key={partner} className="bg-gray-50 dark:bg-gray-950 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-16 bg-orange-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <Award className="text-[#FF6B35] mx-auto mb-3" size={32} />
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Pourquoi choisir KHAMCI VOYAGES ?</h2>
            <p className="text-gray-500 dark:text-gray-400">En collaborant avec nous, vous optez pour un service haut de gamme</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {WHY_PARTNER.map(reason => (
              <div key={reason} className="flex items-start gap-3 bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-orange-100">
                <CheckCircle className="text-[#FF6B35] shrink-0 mt-0.5" size={20} />
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-black text-[#0D1B3E] mb-4">Contactez-nous</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Notre équipe est disponible pour répondre à toutes vos questions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="tel:+224611145892" className="flex items-center justify-center gap-2 bg-[#0D1B3E] text-white rounded-xl px-6 py-3.5 font-semibold hover:bg-[#1a3a6e] transition-colors">
              <Phone size={18} /> +224 611 145 892
            </a>
            <a href="mailto:khamcivoyages@gmail.com" className="flex items-center justify-center gap-2 border-2 border-[#0D1B3E] text-[#0D1B3E] rounded-xl px-6 py-3.5 font-semibold hover:bg-gray-50 dark:bg-gray-950 transition-colors">
              <Mail size={18} /> khamcivoyages@gmail.com
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-8">
            <MapPin size={16} className="text-[#FF6B35]" />
            <span>Conakry, République de Guinée</span>
          </div>
          <Link href="/#contact" className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity">
            Demander un Service →
          </Link>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={INAUGURATION_PHOTOS}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
