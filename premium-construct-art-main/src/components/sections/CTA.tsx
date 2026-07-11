import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { BRAND, IMAGES } from "@/data/site";

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src={IMAGES.villaPool}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[var(--color-heading)]/55" />
      </div>

      <div className="container-x relative py-32 md:py-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card mx-auto max-w-3xl rounded-sm p-10 text-center md:p-16"
        >
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Let's begin
          </span>
          <h2 className="display-h mt-6">
            Let's build your <br />
            <em className="not-italic italic text-[var(--color-primary)]">dream</em> together.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[var(--color-body)]">
            Send us a note and we'll get in touch within one business day to schedule your
            complimentary studio consultation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="btn-secondary">
              <Phone size={14} />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
