import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS } from "@/data/site";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section className="section-y bg-[var(--color-background)]">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">How we build</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-h mt-6">Six steps. One studio.</h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          <div className="absolute left-0 right-0 top-6 h-px bg-[var(--color-border)] md:top-8" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute left-0 top-6 h-px bg-[var(--color-primary)] md:top-8"
          />
          <div className="grid gap-10 md:grid-cols-6 md:gap-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative pt-12 md:pt-16"
              >
                <span className="absolute left-0 top-3 h-6 w-6 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)] md:top-5" />
                <span className="ghost-num absolute right-2 top-0 text-6xl">{p.n}</span>
                <h3 className="font-display text-lg text-[var(--color-heading)]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]/85">{p.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
