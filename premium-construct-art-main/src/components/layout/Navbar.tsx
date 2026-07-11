import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, SERVICES } from "@/data/site";
import { BrandMark } from "@/components/ui/BrandMark";
import logo from "@/assets/logo.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--color-border)]/70 bg-[var(--color-background)]/95 shadow-[0_10px_30px_-20px_rgba(20,20,20,0.25)] backdrop-blur-xl"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between md:h-24">
        <Link
  to="/"
  aria-label="BAALA Constructions home"
  className="inline-flex items-center gap-3"
>
  <img
    src={logo}
    alt="BAALA Constructions"
    className="h-16 w-auto"
  />

  <div className="leading-tight">
    <h1 className="text-xl font-bold text-[var(--color-primary)] tracking-wide">
      BAALA
    </h1>
    <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
      CONSTRUCTIONS
    </p>
  </div>
</Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <div
              key={item.to}
              className="relative"
              onMouseEnter={() => item.label === "Services" && setServicesOpen(true)}
              onMouseLeave={() => item.label === "Services" && setServicesOpen(false)}
            >
              <Link
                to={item.to}
                className={`group relative inline-block text-[0.78rem] font-medium uppercase tracking-[0.2em] transition-colors ${
                  scrolled
                    ? "text-[var(--color-heading)]/85 hover:text-[var(--color-primary)]"
                    : "text-black/90 hover:text-[var(--color-gold)]"
                }`}
                activeProps={{ className: "text-[var(--color-primary)]" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
                <span className={`absolute inset-x-0 -bottom-2 h-[1px] origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100 ${scrolled ? "bg-[var(--color-primary)]" : "bg-[var(--color-gold)]"}`} />
              </Link>

              {item.label === "Services" && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.35 }}
                      className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-5"
                    >
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 rounded-2xl border border-[var(--color-border)] bg-white/95 p-5 shadow-[var(--shadow-lift)] backdrop-blur">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            to="/services"
                            hash={s.slug}
                            className="group flex items-start gap-3 rounded-lg p-3 transition hover:bg-[var(--color-accent)]"
                          >
                            <span className="mt-1 text-xs tracking-widest text-[var(--color-primary)]">
                              {s.tag}
                            </span>
                            <span>
                              <span className="block font-display text-sm font-semibold text-[var(--color-heading)] group-hover:text-[var(--color-primary)]">
                                {s.title}
                              </span>
                              <span className="mt-1 block text-xs text-[var(--color-body)]/80 line-clamp-2">
                                {s.summary}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary">
            Get Consultation
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-white/70 text-[var(--color-heading)] backdrop-blur lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-6">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={n.to}
                    className="block py-3 font-display text-2xl text-[var(--color-heading)]"
                    activeProps={{ className: "text-[var(--color-primary)]" }}
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" className="btn-primary mt-4 w-full">
                Get Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
