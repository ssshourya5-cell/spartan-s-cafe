import { useEffect, useRef, useState } from "react";

const galleryImages = [
  {
    src: "/assets/uploads/screenshot_2026_0327_182541-019d2f98-7b17-744b-b7a3-2cb4e8f2e219-1.png",
    alt: "Spartan Cafeteria — Logo Wall with Red & Yellow Booth Seating",
    caption: "Our Signature Lounge",
  },
  {
    src: "/assets/uploads/screenshot_2026_0327_182407-019d2f98-8738-734b-9345-3d7a3c6ac957-2.png",
    alt: "Bamboo Hut Private Dining Cabins",
    caption: "Private Bamboo Cabins",
  },
  {
    src: "/assets/uploads/screenshot_2026_0327_182503-019d2f98-8e03-758c-b322-b8ef5a7071de-3.png",
    alt: "Colorful Umbrella Ceiling with Yellow Pillar",
    caption: "Umbrella Garden Canopy",
  },
  {
    src: "/assets/uploads/screenshot_2026_0327_182324-019d2f98-8e7d-777d-93ac-26b1db3287e5-4.png",
    alt: "Lantern-Lit Upper Floor Dining Room",
    caption: "Lantern-Lit Upper Floor",
  },
  {
    src: "/assets/uploads/screenshot_2026_0327_182351-019d2f98-8f7b-73db-862b-e2e0035b48c4-5.png",
    alt: "Full Restaurant Panorama with Umbrella Ceiling",
    caption: "The Grand Dining Hall",
  },
];

function GalleryCard({
  image,
  index,
}: { image: (typeof galleryImages)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        data-ocid={`gallery.item.${index + 1}`}
      >
        <button
          type="button"
          className="relative overflow-hidden rounded-xl cursor-pointer group w-full"
          onClick={() => setLightbox(true)}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-foreground font-semibold text-sm">
              {image.caption}
            </p>
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
              <span className="text-primary-foreground text-xs">⛶</span>
            </div>
          </div>
        </button>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <dialog
          open
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 w-full h-full max-w-none m-0 border-none"
          onClick={() => setLightbox(false)}
          onKeyDown={(e) => e.key === "Escape" && setLightbox(false)}
          data-ocid="gallery.lightbox.modal"
          aria-label={image.alt}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setLightbox(false)}
            data-ocid="gallery.lightbox.close_button"
          >
            ✕
          </button>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[90vh] max-w-full object-contain rounded-lg"
          />
          <p className="absolute bottom-6 text-white/70 text-sm">
            {image.caption}
          </p>
        </dialog>
      )}
    </>
  );
}

export default function GallerySection() {
  return (
    <section
      className="min-h-screen pt-24 pb-16 px-4 page-enter"
      data-ocid="gallery.section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Inside Our World
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4">
            Gallery
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4" />
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Step into the vibrant world of Spartan Cafeteria — where every
            corner tells a story.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, i) => (
            <div
              key={image.src}
              className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <GalleryCard image={image} index={i} />
            </div>
          ))}
        </div>

        {/* Visit CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            📍 Goula Road, Haripur Bhandeo, Uttarakhand 263142
          </p>
          <a
            href="https://maps.google.com/?q=Goula+Road+Haripur+Bhandeo+Uttarakhand+263142"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              className="mt-2 border border-gold/40 text-gold px-6 py-2 rounded-full text-xs tracking-widest uppercase hover:bg-gold hover:text-background transition-all duration-200"
              data-ocid="gallery.directions.button"
            >
              Get Directions
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
