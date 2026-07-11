import { motion } from "framer-motion";
import { useState } from "react";

const PHILOSOPHY_SECTIONS = [
  {
    num: "01",
    subtitle: "Structural Architecture",
    title: "Quiet, honest and completely enduring.",
    body: "We believe great construction happens when architecture, engineering and craftsmanship are held to the same standard. That is why we insist on running all three disciplines under one roof.",
  },
  {
    num: "02",
    subtitle: "Precision Engineering",
    title: "Coordinated by senior partners, not vendors.",
    body: "By keeping structural calculations and site blueprints in-house, we eradicate misalignments. Fewer surprises, zero finger-pointing, and complete control over physical execution parameters.",
  },
  {
    num: "03",
    subtitle: "Honest Craftsmanship",
    title: "Clarity from first sketch to final keys.",
    body: "Our clients tell us this feels completely different. You get full clarity from day one up until twenty years later, living in a space designed to stand the test of solid time.",
  },
];

export function Philosophy() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative bg-[#fdfdfd] text-[#0f0f0f] w-full border-t border-black/[0.05]">
      
      {/* Top Branding Navigation Header (Stays Fixed on Top Layout) */}
      <div className="max-w-7xl mx-auto px-6 pt-12 md:px-20 md:pt-16 flex w-full items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-[0.4em] uppercase font-bold text-black">
            BAALA / PHILOSOPHY
          </span>
          <span className="h-2 w-2 rounded-full bg-primary" />
        </div>
        <div className="font-mono text-xs font-black tracking-widest text-primary">
          [ CORE_0{activeIndex + 1} ]
        </div>
      </div>

      {/* Main Split Layout Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-20 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 relative">
        
        {/* LEFT COLUMN: Sticky Content (Locks in place while right scrolls) */}
        <div className="md:col-span-5 md:sticky md:top-28 md:h-[60vh] flex flex-col justify-center space-y-8 z-20">
          
          {/* Active Big Number Display */}
          <div className="hidden md:block select-none h-32 overflow-hidden relative">
            <motion.div
              key={activeIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="font-display text-[10rem] font-black leading-none tracking-tighter text-black/[0.04] border-b-4 border-primary inline-block"
            >
              0{activeIndex + 1}
            </motion.div>
          </div>

          {/* Minimalist Phase Tracker Indicators */}
          <div className="flex flex-row md:flex-col gap-4 items-center md:items-start">
            {PHILOSOPHY_SECTIONS.map((s, idx) => (
              <div key={s.num} className="flex items-center gap-3 text-left">
                <div 
                  className={`h-1 transition-all duration-500 rounded-full ${
                    idx === activeIndex ? "bg-primary w-12 md:w-16" : "bg-black/10 w-4"
                  }`} 
                />
                <span className={`font-mono text-xs font-bold transition-colors duration-300 ${
                  idx === activeIndex ? "text-black" : "text-black/30"
                }`}>
                  PHASE 0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Timeline Panels */}
        <div className="md:col-span-7 space-y-16 md:space-y-32 z-20">
          {PHILOSOPHY_SECTIONS.map((section, idx) => (
            <motion.div
              key={section.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              onViewportEnter={() => setActiveIndex(idx)}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_#000] relative overflow-hidden group"
            >
              {/* Corner Bracket Premium Details */}
              <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono font-bold bg-primary text-white px-2.5 py-1 tracking-widest rounded-xs">
                    {section.subtitle}
                  </span>
                  <span className="font-mono text-sm font-bold text-black/20 md:hidden">
                    0{idx + 1}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black pt-2 leading-tight">
                  {section.title}
                </h3>
                
                <p className="text-sm md:text-base leading-relaxed text-black/70 font-medium pt-2">
                  {section.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Decorative Static Footer Framework Data */}
      <div className="max-w-7xl mx-auto px-6 pb-12 md:px-20 md:pb-16 relative z-20">
        <div className="flex w-full items-center justify-between border-t-2 border-black pt-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-black font-bold">
            <span className="h-2 w-2 bg-primary rounded-xs animate-pulse" />
            <span>SYS_STATUS: OPTIMIZED ENGINE</span>
          </div>
          <span className="font-mono text-[10px] text-black/50 font-bold tracking-widest">
            BAALA PERFORMANCE PRO / 60 FPS
          </span>
        </div>
      </div>

    </div>
  );
}