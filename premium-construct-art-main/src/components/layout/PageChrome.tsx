import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { BRAND } from "@/data/site";
import logo from "@/assets/logo.png";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-[var(--color-primary)]"
      style={{ scaleX }}
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20, pointerEvents: show ? "auto" : "none" }}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-soft)] backdrop-blur transition hover:bg-[var(--color-accent)] md:bottom-8 md:right-24"
    >
      <ArrowUp size={16} />
    </motion.button>
  );
}

export function FloatingContact() {
  return (
    <motion.a
      href={`https://wa.me/${BRAND.phone.replace(/\D/g, "")}`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.06 }}
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-lift)] transition hover:bg-[var(--color-primary-hover)] md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={18} />
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--color-primary)]/40" />
    </motion.a>
  );
}

export function CursorGlow() {
  useEffect(() => {
    const el = document.getElementById("cursor-glow");
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      id="cursor-glow"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[400px] w-[400px] rounded-full opacity-40 blur-3xl md:block"
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in oklab, var(--color-primary) 25%, transparent), transparent)",
        transition: "transform 0.15s ease-out",
      }}
    />
  );
}

export function PageLoader({ done }: { done: boolean }) {
  const logoGreen = "#27593D"; // Specific green color from image

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[70] grid place-items-center bg-[var(--color-background)]"
    >
      <div className="flex flex-col items-center">
  <motion.img
    src={logo}
    alt="BAALA Constructions"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      duration: 0.7,
      type: "spring",
      stiffness: 120,
    }}
    className="w-40 md:w-52 object-contain"
  />

  <motion.div
    initial={{ width: 0 }}
    animate={{ width: 140 }}
    transition={{ delay: 0.5, duration: 1 }}
    className="mt-6 h-[2px] bg-[var(--color-primary)]"
  />

  {/* <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    className="mt-4 text-xs tracking-[0.45em] uppercase text-[var(--color-primary)]"
  >
    DESIGNS & ENGINEERS
  </motion.p> */}
</div>
    </motion.div>
  );
}