import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { UPCOMING_PROJECTS } from "@/data/site";

export function UpcomingProjects() {
  return (
    <section className="section-y concrete relative overflow-hidden">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">Roadmap</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-h mt-6">Upcoming projects.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-[var(--color-body)]">
              A preview of what's next on the horizon — private villas, luxury row-houses and
              flagship commercial developments launching over the next twelve months.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-3 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary)]/30 to-transparent md:block" />
          <ol className="space-y-10">
            {UPCOMING_PROJECTS.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 md:grid-cols-[80px_140px_1fr] md:pl-0"
              >
                <span className="relative hidden md:block">
                  <span className="absolute left-2 top-2 h-3 w-3 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--stone-bg)]" />
                </span>
                <span className="font-display text-2xl font-light text-[var(--color-primary)]">
                  {p.date}
                </span>
                <div className="min-w-0 border-l border-[var(--color-border)] pl-6 md:border-l-0 md:pl-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl text-[var(--color-heading)]">{p.title}</h3>
                    <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-body)]/70">
                      {p.type}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-[var(--color-body)]">{p.note}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
