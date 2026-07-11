import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import { BRAND, NAV, SERVICES } from "@/data/site";
import { BrandMark } from "@/components/ui/BrandMark";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-heading)] text-white/85">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "var(--concrete-noise)" }}
      />
      <div className="container-x relative pb-12 pt-12 md:pt-12">
        {/* <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mega-h max-w-5xl text-white"
          style={{ color: "white" }}
        >
          Let's build something <em className="not-italic text-[var(--color-gold)]">enduring.</em>
        </motion.h2> */}

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-white">
              <img src={logo} alt="BAALA 
CONSTRUCTIONS" className="h-20 w-auto bg-white" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {BRAND.tagline}. A design + build studio crafting residential, commercial and turnkey
              projects with uncompromising quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {BRAND.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/80 transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)]">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="group inline-flex items-center gap-1 text-white/80 transition hover:text-white"
                  >
                    {n.label}
                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)]">Services</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services"
                    hash={s.slug}
                    className="text-white/80 transition hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)]">Studio</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>{BRAND.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                <span>{BRAND.hours}</span>
              </li>
            </ul>

          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} BAALA Constructions. All rights reserved.</span>
          <span>Designs &amp; Engineers · Chennai · India</span>
        </div>
      </div>
    </footer>
  );
}
