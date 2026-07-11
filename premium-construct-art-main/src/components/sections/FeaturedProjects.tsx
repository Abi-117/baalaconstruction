import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURED_PROJECTS } from "@/data/site";

const layout = [
  "md:col-span-7 md:row-span-2 aspect-[4/5]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-4 aspect-[3/4]",
  "md:col-span-4 aspect-[3/4]",
  "md:col-span-4 aspect-[3/4]",
];

export function FeaturedProjects() {
  return (
    <section className="section-y concrete">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="eyebrow">Featured projects</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-h mt-6 max-w-2xl">
                Recent work <br />
                worth revisiting.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/projects" className="btn-secondary">
              All projects
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-12 md:grid-rows-[auto_auto]">
          {FEATURED_PROJECTS.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-sm bg-black ${layout[i]}`}
            >
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <div className="min-w-0 text-white">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                    {p.category} · {p.year}
                  </span>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl">{p.title}</h3>
                  <span className="mt-1 block text-sm text-white/70">{p.location}</span>
                </div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 text-white transition group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-heading)]"
                >
                  <ArrowUpRight size={16} />
                </motion.span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
