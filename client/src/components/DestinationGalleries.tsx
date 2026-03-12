import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  destination: string;
}

const allImages: GalleryImage[] = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/fouta-djallon-1-HV8GNusJeY7gpwrRiJ3ey2.webp",
    alt: "Panorama Fouta Djallon",
    title: "Panorama montagneux au coucher de soleil",
    destination: "Fouta Djallon",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/conakry-1-nzgispaK4KkekcAE6qEAu2.webp",
    alt: "Coucher de soleil Conakry",
    title: "Coucher de soleil sur la plage de Conakry",
    destination: "Conakry",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/iles-loos-1-2fztnGfEJ2sqUphFxcfmTd.webp",
    alt: "Plage Îles de Loos",
    title: "Plage paradisiaque aux Îles de Loos",
    destination: "Îles de Loos",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/fouta-djallon-2-Zgsg7x9tr2ZxRcrwgofmQN.webp",
    alt: "Cascade Fouta Djallon",
    title: "Cascade cristalline dans la forêt",
    destination: "Fouta Djallon",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/kindia-1-VSHwFpKEaWVcw3taNQmsGf.webp",
    alt: "Cascade Kindia",
    title: "Cascade de Kindia avec arc-en-ciel",
    destination: "Kindia",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/conakry-2-HirRmEEC4q7z5EKJS96ydD.webp",
    alt: "Marché Madina",
    title: "Marché Madina - cœur culturel de Conakry",
    destination: "Conakry",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/fouta-djallon-3-PvHXAvKM5m7zkpeg5rmjhs.webp",
    alt: "Village traditionnel Fouta Djallon",
    title: "Village traditionnel dans les montagnes",
    destination: "Fouta Djallon",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/iles-loos-2-Wj8sYJfZSxgUy4a56aeG6z.webp",
    alt: "Coucher de soleil Îles de Loos",
    title: "Coucher de soleil romantique aux Îles de Loos",
    destination: "Îles de Loos",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/kindia-2-XLbcJpggKMcFP9VsbtQnuy.webp",
    alt: "Forêt tropicale Kindia",
    title: "Forêt tropicale vierge avec faune sauvage",
    destination: "Kindia",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/conakry-3-ZoAs8MpVLF6McJqzuWQYt8.webp",
    alt: "Promenade Conakry",
    title: "Promenade waterfront au coucher de soleil",
    destination: "Conakry",
  },
];

export default function DestinationGalleries() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll lent
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      if (!trackRef.current || autoScrollPaused) return;
      const el = trackRef.current;
      // Boucle infinie : quand on arrive à la moitié (images dupliquées), on repart du début
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1;
      }
    }, 20);
  }, [autoScrollPaused]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [startAutoScroll]);

  const pauseAutoScroll = () => setAutoScrollPaused(true);
  const resumeAutoScroll = () => setAutoScrollPaused(false);

  // Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    pauseAutoScroll();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(resumeAutoScroll, 2000);
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    pauseAutoScroll();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setTimeout(resumeAutoScroll, 2000);
  };

  // Scroll buttons
  const scrollBy = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    pauseAutoScroll();
    trackRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    setTimeout(resumeAutoScroll, 3000);
  };

  // Lightbox navigation
  const openLightbox = (index: number) => {
    pauseAutoScroll();
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setTimeout(resumeAutoScroll, 1000);
  };

  const lightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
  };

  const lightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % allImages.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  // Duplicate images for infinite scroll effect
  const displayImages = [...allImages, ...allImages];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="container mb-12">
        <div className="text-center">
          <h2 className="heading-lg gradient-text mb-4">
            Galeries des Destinations
          </h2>
          <p className="text-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explorez la beauté de la Guinée et du monde. Faites défiler ou cliquez sur une image pour l'agrandir.
          </p>
        </div>
      </div>

      {/* Carrousel */}
      <div className="relative group">
        {/* Bouton gauche */}
        <button
          onClick={() => scrollBy("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Bouton droit */}
        <button
          onClick={() => scrollBy("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="Suivant"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Dégradés sur les bords */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-[5] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-[5] pointer-events-none" />

        {/* Piste de défilement */}
        <div
          ref={trackRef}
          className={`flex gap-4 overflow-x-auto scrollbar-hide px-8 py-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {displayImages.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-72 h-52 md:w-80 md:h-60 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group/card"
              onClick={() => !isDragging && openLightbox(i % allImages.length)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                draggable={false}
              />
              {/* Overlay au survol */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-1">
                  {img.destination}
                </span>
                {img.title && (
                  <p className="text-white text-sm font-medium leading-tight">
                    {img.title}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1 text-white/80 text-xs">
                  <ZoomIn size={12} />
                  <span>Agrandir</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de destinations */}
      <div className="container mt-8">
        <div className="flex flex-wrap justify-center gap-3">
          {["Fouta Djallon", "Conakry", "Kindia", "Îles de Loos"].map((dest) => (
            <span
              key={dest}
              className="px-4 py-1.5 bg-orange-50 text-orange-700 text-sm font-medium rounded-full border border-orange-100"
            >
              {dest}
            </span>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            <X size={24} />
          </button>

          {/* Bouton précédent */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Précédent"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[lightboxIndex].src}
              alt={allImages[lightboxIndex].alt}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center">
              <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider">
                {allImages[lightboxIndex].destination}
              </p>
              {allImages[lightboxIndex].title && (
                <p className="text-white/90 text-base mt-1">
                  {allImages[lightboxIndex].title}
                </p>
              )}
              <p className="text-white/40 text-xs mt-2">
                {lightboxIndex + 1} / {allImages.length}
              </p>
            </div>
          </div>

          {/* Bouton suivant */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Suivant"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
