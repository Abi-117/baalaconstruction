import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageShell";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { IMAGES, SERVICES } from "@/data/site";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — BAALA Constructions" },
      {
        name: "description",
        content:
          "Construction, architecture, renovation, interior design, turnkey projects and PMC — six practices held to one uncompromising standard.",
      },
      { property: "og:title", content: "Services — BAALA Constructions" },
      {
        property: "og:description",
        content: "Six practices, one uncompromising standard.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Six disciplines, one studio."
        subtitle="From architecture and construction to interiors, renovation and project management — every discipline led by senior partners under one roof."
        image={IMAGES.commercial}
      />
      <ServicesGrid />

      {/* <section className="section-y bg-[var(--color-background)]">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Deep dive</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-h mt-6 max-w-3xl">A closer look at each practice.</h2>
          </Reveal>

          <div className="mt-20 space-y-28">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.slug}
                id={s.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-6 top-6 text-xs uppercase tracking-[0.28em] text-white/85">
                    {s.tag}
                  </span>
                </div>
                <div>
                  <span className="eyebrow">Practice {s.tag}</span>
                  <h3 className="display-h mt-6 text-4xl md:text-5xl">{s.title}</h3>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-body)]">
                    {s.summary}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-accent)] px-4 py-1.5 text-xs uppercase tracking-widest text-[var(--color-primary)]"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <Process />
      <CTA />
    </>
  );
}
