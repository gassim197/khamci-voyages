import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedIndex, images.length]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Gallery Grid */}
      <div>
        {title && (
          <h3 className="heading-md mb-6 text-gray-900">{title}</h3>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer h-64 sm:h-72"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          tabIndex={0}
        >
          {/* Main Image */}
          <div
            className="relative w-full max-w-4xl h-screen max-h-96 sm:max-h-[600px] flex items-center justify-center animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="w-full h-full object-contain"
            />

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 p-2 bg-black/70 hover:bg-black text-white rounded-lg transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/70 hover:bg-black text-white rounded-lg transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/70 hover:bg-black text-white rounded-lg transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image Title */}
            {images[selectedIndex].title && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                <p className="text-sm">{images[selectedIndex].title}</p>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-2xl px-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                  index === selectedIndex
                    ? "ring-2 ring-orange-500 scale-110"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
