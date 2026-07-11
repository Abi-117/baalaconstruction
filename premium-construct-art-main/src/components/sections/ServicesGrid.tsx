import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/data/site";
import { useState } from "react";
import { ServiceModal } from "./ServiceModal";

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
    <section id="services" className="section-y relative concrete">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">What we do</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-h mt-6 max-w-3xl">
                Six practices, <br />
                one uncompromising standard.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-[var(--color-body)]">
              From the first sketch to the final handover, our specialists lead every discipline
              with focus, calm and craft.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              id={s.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-sm border border-[var(--color-border)] bg-white transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />
                <span className="absolute left-6 top-6 text-xs uppercase tracking-[0.28em] text-white/85">
                  {s.tag}
                </span>
              </div>
              <div className="flex flex-col gap-4 p-8">
                <h3 className="font-display text-2xl text-[var(--color-heading)]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-body)]">{s.summary}</p>
                <ul className="flex flex-wrap gap-2 pt-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] uppercase tracking-widest text-[var(--color-body)]/75"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <button
  onClick={() => setSelectedService(s)}
  className="mt-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]"
>
  Learn More

  <ArrowUpRight
    size={14}
    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
  />
</button>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <ServiceModal
    service={selectedService}
    onClose={() => setSelectedService(null)}
/>
</>
  );
}
