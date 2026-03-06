import ImageGallery from "./ImageGallery";

interface Destination {
  id: string;
  name: string;
  description: string;
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
}

const destinations: Destination[] = [
  {
    id: "fouta-djallon",
    name: "Fouta Djallon",
    description: "Chaîne montagneuse spectaculaire avec cascades et paysages verdoyants",
    images: [
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/fouta-djallon-1-HV8GNusJeY7gpwrRiJ3ey2.webp",
        alt: "Panorama Fouta Djallon",
        title: "Panorama montagneux au coucher de soleil",
      },
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/fouta-djallon-2-Zgsg7x9tr2ZxRcrwgofmQN.webp",
        alt: "Cascade Fouta Djallon",
        title: "Cascade cristalline dans la forêt",
      },
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/fouta-djallon-3-PvHXAvKM5m7zkpeg5rmjhs.webp",
        alt: "Village traditionnel Fouta Djallon",
        title: "Village traditionnel dans les montagnes",
      },
    ],
  },
  {
    id: "conakry",
    name: "Conakry",
    description: "Capitale dynamique avec plages, marchés colorés et vie nocturne vibrante",
    images: [
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/conakry-1-nzgispaK4KkekcAE6qEAu2.webp",
        alt: "Coucher de soleil Conakry",
        title: "Coucher de soleil sur la plage de Conakry",
      },
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/conakry-2-HirRmEEC4q7z5EKJS96ydD.webp",
        alt: "Marché Madina",
        title: "Marché Madina - cœur culturel de Conakry",
      },
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/conakry-3-ZoAs8MpVLF6McJqzuWQYt8.webp",
        alt: "Promenade Conakry",
        title: "Promenade waterfront au coucher de soleil",
      },
    ],
  },
  {
    id: "kindia",
    name: "Kindia",
    description: "Cascades cristallines et forêts tropicales pour les amateurs de nature",
    images: [
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/kindia-1-VSHwFpKEaWVcw3taNQmsGf.webp",
        alt: "Cascade Kindia",
        title: "Cascade de Kindia avec arc-en-ciel",
      },
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/kindia-2-XLbcJpggKMcFP9VsbtQnuy.webp",
        alt: "Forêt tropicale Kindia",
        title: "Forêt tropicale vierge avec faune sauvage",
      },
    ],
  },
  {
    id: "iles-loos",
    name: "Îles de Loos",
    description: "Archipel paradisiaque avec plages de sable blanc et eaux turquoise",
    images: [
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/iles-loos-1-2fztnGfEJ2sqUphFxcfmTd.webp",
        alt: "Plage Îles de Loos",
        title: "Plage paradisiaque aux Îles de Loos",
      },
      {
        src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/iles-loos-2-Wj8sYJfZSxgUy4a56aeG6z.webp",
        alt: "Coucher de soleil Îles de Loos",
        title: "Coucher de soleil romantique aux Îles de Loos",
      },
    ],
  },
];

export default function DestinationGalleries() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-lg gradient-text mb-4">
            Galeries des Destinations
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Explorez nos destinations à travers des galeries d'images interactives.
            Cliquez sur une image pour l'agrandir et naviguer à travers la collection.
          </p>
        </div>

        <div className="space-y-20">
          {destinations.map((destination) => (
            <div key={destination.id} className="scroll-mt-20" id={destination.id}>
              <div className="mb-8">
                <h3 className="heading-md text-gray-900 mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600">{destination.description}</p>
              </div>
              <ImageGallery images={destination.images} />
              <div className="divider-gradient mt-12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
