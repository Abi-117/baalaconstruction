import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PageHero } from "@/components/layout/PageShell";
import { CTA } from "@/components/sections/CTA";
import { IMAGES } from "@/data/site";
import api from "@/api/axios";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — BAALA Constructions" },
      {
        name: "description",
        content:
          "A curated gallery of BAALA Constructions architecture, interiors, renovations and completed projects.",
      },
    ],
  }),
  component: Gallery,
});

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  public_id?: string;
}

function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");

  const [openImage, setOpenImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");

      setGallery(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(gallery.map((item) => item.category)),
    ];
  }, [gallery]);

  const items = useMemo(() => {
    if (filter === "All") return gallery;

    return gallery.filter(
      (item) => item.category === filter
    );
  }, [gallery, filter]);

  if (loading) {
    return (
      <>
        <PageHero
          eyebrow="Visual Archive"
          title="Gallery"
          subtitle="Loading..."
          image={IMAGES.interior}
        />

        <section className="section-y">

          <div className="container-x">

            <div className="grid gap-6 md:grid-cols-3">

              {[...Array(9)].map((_, i) => (

                <div
                  key={i}
                  className="aspect-[4/3] animate-pulse rounded-xl bg-gray-200"
                />

              ))}

            </div>

          </div>

        </section>

      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Visual Archive"
        title="Our Gallery"
        subtitle="Explore our completed construction, interiors and architecture projects."
        image={IMAGES.interior}
      />

      <section className="section-y bg-[var(--color-background)]">

        <div className="container-x">

          {/* Category Filter */}

          <div className="mb-12 flex flex-wrap gap-3">

            {categories.map((cat) => (

              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-5 py-2 text-sm transition

                ${
                  filter === cat
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "bg-white border-gray-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {cat}
              </button>

            ))}

          </div>

          <LayoutGroup>

            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">

              <AnimatePresence>
                {items.length === 0 ? (
  <div className="col-span-full py-24 text-center">
    <h2 className="text-3xl font-semibold">
      No Images Found
    </h2>

    <p className="mt-3 text-gray-500">
      Gallery is empty for this category.
    </p>
  </div>
) : (
  items.map((item) => (
    <motion.button
      key={item._id}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
      }}
      onClick={() => setOpenImage(item)}
      className="group relative block w-full overflow-hidden rounded-xl bg-black text-left shadow-lg"
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100">

        <div className="absolute bottom-5 left-5">

          <p className="text-xs uppercase tracking-[0.25em] text-white/80">
            {item.category}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            {item.title}
          </h3>

        </div>

      </div>

    </motion.button>
  ))
)}

</AnimatePresence>

</div>

</LayoutGroup>

</div>

</section>

      <CTA />
    </>
  );
}
