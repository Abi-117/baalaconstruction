import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/data/site";

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % TESTIMONIALS.length);
  const prev = () => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section className="section-y concrete">
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Client voices
            </span>
          </Reveal>
          <Quote className="mx-auto mt-8 text-[var(--color-primary)]/40" size={48} />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <p className="font-display text-2xl font-light leading-relaxed text-[var(--color-heading)] md:text-4xl">
                “{t.quote}”
              </p>
              <div className="mt-8 flex justify-center gap-0.5 text-[var(--color-gold)]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <footer className="mt-4">
                <div className="font-display text-lg text-[var(--color-heading)]">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--color-body)]/70">
                  {t.role}
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  aria-label={`Go to testimonial ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-1 rounded-full transition-all ${
                    k === i ? "w-8 bg-[var(--color-primary)]" : "w-4 bg-[var(--color-border)]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
