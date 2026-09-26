import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import "./StudiesFrancePromotion.css";

const DISMISS_KEY = "khamci-studies-france-announcement-v1";

export default function AnnouncementBar() {
  const [isClosed, setIsClosed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "closed";
    } catch {
      return false;
    }
  });

  const handleClose = () => {
    setIsClosed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "closed");
    } catch {
      // La fermeture reste possible même si le navigateur bloque le stockage.
    }
  };

  if (isClosed) return null;

  return (
    <aside className="sf-announcement" aria-label="Offre Études France">
      <div className="sf-announcement-inner">
        <p>
          <span className="sf-promo-flag" aria-hidden="true" />
          <strong>Projet d’études en France ?</strong>
          <span className="sf-announcement-detail">Khamci Voyages vous accompagne à chaque étape.</span>
        </p>
        <a href="/etudes-france" className="sf-announcement-link">
          Découvrir l’offre <ArrowRight size={15} aria-hidden="true" />
        </a>
        <button type="button" onClick={handleClose} aria-label="Fermer l’annonce Études France" className="sf-announcement-close">
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
