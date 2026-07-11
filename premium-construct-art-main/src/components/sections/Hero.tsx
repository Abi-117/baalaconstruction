import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { useRef } from "react";
import { IMAGES } from "@/data/site";

const TRUST = [
  "15+ Years Experience",
  "500+ Projects Completed",
  "On-Time Delivery",
  "Premium Quality Materials",
];

const VIDEO_SOURCES = [
  // Cinematic construction / architecture b-roll
  "https://www.pexels.com/download/video/38429898/",
  
  // "https://videos.pexels.com/video-files/3141210/3141210-uhd_2560_1440_25fps.mp4",
  // "https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_30fps.mp4",
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background video with image poster fallback */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={IMAGES.heroVilla}
          className="h-full w-full object-cover"
        >
          {VIDEO_SOURCES.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
        {/* Warm dark cinematic overlay */}
        <div
  className="absolute inset-0"
  style={{
    background: `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0.45) 0%,
        rgba(0,0,0,0.35) 40%,
        rgba(0,0,0,0.55) 100%
      )
    `,
  }}
/>
        {/* Gold vignette accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 20%, color-mix(in oklab, var(--color-gold) 18%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col justify-center pb-24 pt-32">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[var(--color-gold)]"
        >
          <span className="h-px w-10 bg-[var(--color-gold)]" />
          Building Trust Since 2010
        </motion.span>

        <h1 className="mt-6 max-w-4xl font-display text-white" style={{
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          fontSize: "clamp(2.5rem, 6.2vw, 5.125rem)",
        }}>
          {["Building Dreams.", "Crafting Strong Foundations."].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 1.0 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {i === 1 ? (
                  <>
                    Crafting{" "}
                    <em className="not-italic italic text-[var(--color-gold)]">
                      Strong Foundations.
                    </em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
        >
          From architectural planning to luxury villa construction, we create
          timeless spaces with precision, quality, and lasting value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link to="/contact" className="btn-primary">
            Get Free Consultation
            <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/60 bg-white/5 px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm transition hover:border-[var(--color-gold)] hover:bg-white/10 hover:text-[var(--color-gold)]"
          >
            View Our Projects
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4"
        >
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2 text-xs text-white/85 md:text-sm">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="tracking-tight">{t}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/70"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
