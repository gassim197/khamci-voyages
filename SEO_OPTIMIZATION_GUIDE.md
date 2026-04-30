# Guide d'Optimisation SEO - KHAMCI VOYAGES

## ✅ Étapes Complétées

### 1. **Métadonnées de Base (index.html)**
- ✅ Title tag optimisé
- ✅ Meta description
- ✅ Meta keywords
- ✅ Canonical URL
- ✅ Open Graph tags (og:title, og:description, og:image, og:url)
- ✅ Twitter Card tags
- ✅ Structured Data (Schema.org TravelAgency)

### 2. **Fichiers Techniques Créés**
- ✅ `sitemap.xml` - Sitemap complet avec toutes les pages
- ✅ `robots.txt` - Instructions pour les crawlers
- ✅ `usePageMetadata.ts` - Hook React pour gérer les métadonnées dynamiques par page

## 📋 Prochaines Étapes (À Faire)

### Phase 3: Balisage Structuré Schema.org
**Objectif:** Ajouter des données structurées pour chaque type de page

```typescript
// Exemples de Schema.org à ajouter:

// 1. LocalBusiness (Page d'accueil)
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "KHAMCI VOYAGES",
  "image": "https://khamcivoyages.com/logo.png",
  "description": "Agence de voyages à Conakry, Guinée",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Almamya, commune de Kaloum",
    "addressLocality": "Conakry",
    "addressCountry": "GN"
  },
  "telephone": "+224611145892",
  "url": "https://khamcivoyages.com"
}

// 2. BreadcrumbList (Pages de destination)
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://khamcivoyages.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Destinations",
      "item": "https://khamcivoyages.com/#destinations"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Paris",
      "item": "https://khamcivoyages.com/destination/paris"
    }
  ]
}

// 3. Product (Services)
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Billetterie Aérienne",
  "description": "Service de réservation de billets d'avion",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "0",
    "availability": "https://schema.org/InStock"
  }
}

// 4. FAQPage (Page FAQ)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte un vol pour Paris?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les tarifs varient selon la date et la compagnie aérienne..."
      }
    }
  ]
}
```

### Phase 4: Performance et Accessibilité
- [ ] Optimiser les images (alt text, lazy loading)
- [ ] Améliorer le Core Web Vitals (LCP, FID, CLS)
- [ ] Vérifier l'accessibilité (WCAG 2.1 AA)
- [ ] Optimiser le temps de chargement
- [ ] Minifier CSS/JS

### Phase 5: Contenu et Mots-Clés
- [ ] Audit des mots-clés par page
- [ ] Optimiser les en-têtes (H1, H2, H3)
- [ ] Ajouter des liens internes pertinents
- [ ] Créer du contenu long-form (1000+ mots)
- [ ] Ajouter des FAQ structurées

### Phase 6: Backlinks et Autorité
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Soumettre le sitemap à Bing Webmaster Tools
- [ ] Créer des backlinks de qualité
- [ ] Ajouter le site aux annuaires de voyages
- [ ] Configurer les profils de réseaux sociaux

## 🔧 Comment Utiliser le Hook usePageMetadata

### Exemple d'utilisation dans une page:

```typescript
import { usePageMetadata } from '@/hooks/usePageMetadata';

export default function ParisPage() {
  usePageMetadata({
    title: "Voyage à Paris | Forfait Touristique | KHAMCI VOYAGES",
    description: "Découvrez Paris avec KHAMCI VOYAGES. Forfait complet : vol, hôtel, visites guidées. La Ville Lumière vous attend. Devis gratuit.",
    keywords: "voyage Paris, forfait Paris, tour Eiffel, Louvre, Paris Guinée",
    ogTitle: "Voyage à Paris | Forfait Complet | KHAMCI VOYAGES",
    ogDescription: "Découvrez Paris : vol, hôtel, visites guidées. Forfait complet à prix compétitif.",
    ogUrl: "https://khamcivoyages.com/destination/paris",
    canonicalUrl: "https://khamcivoyages.com/destination/paris",
  });

  return (
    // ... contenu de la page
  );
}
```

## 📊 Outils de Suivi Recommandés

1. **Google Search Console** (https://search.google.com/search-console)
   - Soumettre le sitemap
   - Vérifier les erreurs d'indexation
   - Analyser les impressions et clics

2. **Google Analytics 4** (https://analytics.google.com)
   - Suivre le trafic organique
   - Analyser le comportement des utilisateurs
   - Mesurer les conversions

3. **Bing Webmaster Tools** (https://www.bing.com/webmasters)
   - Alternative à Google Search Console
   - Soumettre le sitemap

4. **SEMrush** ou **Ahrefs** (outils payants)
   - Audit SEO complet
   - Analyse des concurrents
   - Suivi des classements

## 🎯 Objectifs SEO à Court Terme

- [ ] Indexation complète dans Google (vérifier avec `site:khamcivoyages.com`)
- [ ] Classement pour les mots-clés principaux (agence voyage Guinée, billet avion Conakry, etc.)
- [ ] Trafic organique > 1000 visiteurs/mois
- [ ] Taux de conversion > 2% sur les formulaires de devis

## 📝 Checklist SEO Finale

- [x] Métadonnées de base
- [x] Open Graph et Twitter Cards
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Structured Data (TravelAgency)
- [ ] Métadonnées par page (utiliser usePageMetadata)
- [ ] Schema.org complet (BreadcrumbList, FAQPage, Product)
- [ ] Images optimisées avec alt text
- [ ] Performance optimisée (Core Web Vitals)
- [ ] Google Search Console configuré
- [ ] Bing Webmaster Tools configuré
- [ ] Backlinks de qualité
- [ ] Contenu long-form
- [ ] Liens internes optimisés

## 🚀 Prochaines Actions Recommandées

1. **Immédiatement:**
   - Ajouter le hook `usePageMetadata` à toutes les pages principales
   - Soumettre le sitemap à Google Search Console

2. **Cette semaine:**
   - Optimiser les images avec alt text
   - Ajouter le balisage Schema.org complet

3. **Ce mois:**
   - Créer du contenu long-form (guides de voyage, conseils)
   - Construire des backlinks de qualité
   - Analyser les performances dans Google Analytics

---

**Dernière mise à jour:** 12 Mars 2026
**Domaine:** khamcivoyages.com
**Statut:** En cours d'optimisation
