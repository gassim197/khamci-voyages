import { ArrowRight, GraduationCap } from "lucide-react";
import "./StudiesFrancePromotion.css";

export default function StudiesFrancePromotion() {
  return (
    <section className="sf-promo-section" aria-labelledby="sf-promo-title">
      <div className="container">
        <div className="sf-promo-card">
          <div className="sf-promo-copy">
            <p className="sf-promo-eyebrow"><span className="sf-promo-flag" aria-hidden="true" /> OBJECTIF FRANCE · KHAMCI VOYAGES</p>
            <h2 id="sf-promo-title">Votre avenir se prépare.<br /><span>Direction la France.</span></h2>
            <p className="sf-promo-description">Orientation, candidature, préparation à l’entretien et dossier visa : découvrez notre accompagnement depuis la Guinée.</p>
            <a href="/etudes-france" className="sf-promo-cta">Je présente mon projet <ArrowRight size={19} aria-hidden="true" /></a>
            <p className="sf-promo-note">Un accompagnement à chaque étape de votre projet.</p>
          </div>
          <div className="sf-promo-visual">
            <img src="/covers/hero-paris.webp" alt="La tour Eiffel au coucher du soleil à Paris" loading="lazy" width="720" height="540" />
            <div className="sf-promo-caption"><GraduationCap size={27} aria-hidden="true" /><div><strong>Vos ambitions.</strong><span>Notre accompagnement.</span></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
