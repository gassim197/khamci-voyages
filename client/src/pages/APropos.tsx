import { Target, Eye, Heart, Users, Award, Handshake, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

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

export default function APropos() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0D1B3E] to-[#1a3a6e] text-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FF6B35] p-3 rounded-xl">
              <Users size={28} className="text-white" />
            </div>
            <span className="text-orange-300 font-semibold uppercase tracking-wide text-sm">Qui sommes-nous</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            À propos de<br />
            <span className="text-[#FF6B35]">KHAMCI VOYAGES</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
            Créée en 2021 en République de Guinée, KHAMCI VOYAGES SARL est une agence de voyages née
            de la volonté d'offrir aux entreprises guinéennes et aux particuliers des solutions efficaces
            pour organiser leurs déplacements nationaux et internationaux à moindre coût.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-[#0D1B3E] mb-6">Notre histoire</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                KHAMCI VOYAGES SARL a été fondée avec une vision claire : rendre les services de voyage
                accessibles à tous les usagers, en proposant des offres adaptées et des facilités de paiement.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous savons à quel point le déplacement est stratégique pour les entreprises et les professionnels.
                C'est pourquoi nous nous positionnons comme un <strong>partenaire fiable et réactif</strong>,
                prêt à simplifier l'organisation des voyages d'affaires et personnels en garantissant
                efficacité, flexibilité et coût optimisé.
              </p>
              <p className="text-gray-600 leading-relaxed">
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
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-black text-[#FF6B35]">2021</div>
                  <div className="text-xs text-gray-500 mt-1">Année de création</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-black text-[#FF6B35]">+10</div>
                  <div className="text-xs text-gray-500 mt-1">Partenaires institutionnels</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-black text-[#FF6B35]">6</div>
                  <div className="text-xs text-gray-500 mt-1">Services proposés</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-black text-[#FF6B35]">24h</div>
                  <div className="text-xs text-gray-500 mt-1">Délai de réponse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Target className="text-[#FF6B35]" size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0D1B3E] mb-4">Notre Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Devenir la <strong>référence en matière de voyages en Guinée et en Afrique</strong>,
                en facilitant l'accès aux services de voyage et en accompagnant les particuliers
                et les professionnels dans tous leurs déplacements.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm mt-3">
                Être reconnue pour notre professionnalisme, la qualité de notre service client
                et notre engagement à offrir les meilleures solutions de voyage adaptées aux besoins de chacun.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Heart className="text-[#0D1B3E]" size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0D1B3E] mb-4">Notre Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm mb-3">
                Simplifier l'organisation des voyages en offrant des services accessibles, flexibles et de qualité.
              </p>
              <ul className="space-y-2">
                {[
                  "Réduire les barrières financières et logistiques liées aux déplacements",
                  "Accompagner nos clients à chaque étape de leur voyage",
                  "Favoriser le développement du tourisme guinéen",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Eye className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0D1B3E] mb-4">Nos Objectifs</h3>
              <ul className="space-y-2">
                {OBJECTIVES.slice(0, 4).map(obj => (
                  <li key={obj} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                    {obj.split(".")[0]}.
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Nos propositions de services</h2>
            <p className="text-gray-500">Une gamme complète pour tous vos besoins de voyage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map(service => (
              <div key={service.title} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all">
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h3 className="font-bold text-[#0D1B3E] mb-1">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
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
          <div className="grid md:grid-cols-3 gap-6">
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
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Handshake className="text-[#FF6B35]" size={24} />
              <h2 className="text-3xl font-black text-[#0D1B3E]">Nos partenaires</h2>
            </div>
            <p className="text-gray-500">Ils nous font confiance pour leurs déplacements professionnels</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {PARTNERS.map(partner => (
              <span key={partner} className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors">
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
            <p className="text-gray-500">En collaborant avec nous, vous optez pour un service haut de gamme</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {WHY_PARTNER.map(reason => (
              <div key={reason} className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm border border-orange-100">
                <CheckCircle className="text-[#FF6B35] shrink-0 mt-0.5" size={20} />
                <p className="text-gray-700 text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-black text-[#0D1B3E] mb-4">Contactez-nous</h2>
          <p className="text-gray-500 mb-8">Notre équipe est disponible pour répondre à toutes vos questions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="tel:+224611145892" className="flex items-center justify-center gap-2 bg-[#0D1B3E] text-white rounded-xl px-6 py-3.5 font-semibold hover:bg-[#1a3a6e] transition-colors">
              <Phone size={18} /> +224 611 145 892
            </a>
            <a href="mailto:khamcivoyages@gmail.com" className="flex items-center justify-center gap-2 border-2 border-[#0D1B3E] text-[#0D1B3E] rounded-xl px-6 py-3.5 font-semibold hover:bg-gray-50 transition-colors">
              <Mail size={18} /> khamcivoyages@gmail.com
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-8">
            <MapPin size={16} className="text-[#FF6B35]" />
            <span>Conakry, République de Guinée</span>
          </div>
          <Link href="/#contact" className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity">
            Demander un devis gratuit →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
