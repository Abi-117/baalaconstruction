import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Check, Compass, Layers, ShieldCheck, Zap, Activity, Users, Award, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WHY_US } from "@/data/site";

const ICONS = [Compass, Layers, ShieldCheck, Zap, Activity, Users, Award];

export function WhyChooseUs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track vertical page scroll to switch cards smoothly
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  return (
    // Height creates comfortable room for scrolling through the 3D stack
    <section ref={containerRef} className="relative bg-[var(--color-background)] w-full h-[300vh] border-t border-[var(--color-border)]">
      
      {/* Sticky view frame holding layout elements */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Engineering blueprint background matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000008_1.5px,transparent_1.5px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-70 pointer-events-none" />

        <div className="container-x max-w-7xl mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* LEFT SIDE: Floating Typography Structure */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <Reveal>
                <span className="eyebrow">Why choose us</span>
              </Reveal>
              
              <Reveal delay={0.1}>
                <h2 className="display-h mt-4">
                  A commitment <br /> you can measure.
                </h2>
              </Reveal>
            </div>

            {/* Contemporary Mini Step Tracker */}
            <div className="flex flex-col gap-3 max-w-xs border-l border-[var(--color-border)] pl-4">
              {WHY_US.map((w, i) => (
                <div 
                  key={w.title}
                  className={`text-xs font-mono tracking-wider transition-all duration-300 flex items-center justify-between ${
                    i === activeIdx ? "text-[var(--color-primary)] font-bold translate-x-1" : "text-slate-400 opacity-60"
                  }`}
                >
                  <span>0{i + 1} . {w.title.split(" ")[0]}</span>
                  {i === activeIdx && <ChevronRight size={12} className="animate-pulse" />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: 3D Layered Kinetic Stack Space */}
          <div 
            className="lg:col-span-7 relative h-[450px] w-full flex items-center justify-center"
            style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
          >
            {WHY_US.map((w, i) => {
              const IconComponent = ICONS[i] || Check;
              
              // Custom map calculations to configure 3D depth per card dynamically based on scroll
              const cardProgress = useTransform(
                scrollYProgress,
                [i / WHY_US.length, (i + 1) / WHY_US.length],
                [0, 1]
              );

              // Hook into animation cycle loops
              scrollYProgress.on("change", (latest) => {
                const step = 1 / WHY_US.length;
                const currentActive = Math.min(Math.floor(latest / step), WHY_US.length - 1);
                if (currentActive !== activeIdx) {
                  setActiveIdx(currentActive);
                }
              });

              // Offset calculations to configure background 3D stacking layout values
              const offset = i - activeIdx;
              const isPast = offset < 0;
              const isFuture = offset > 0;
              const isActive = offset === 0;

              return (
                <motion.div
                  key={w.title}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: WHY_US.length - Math.abs(offset),
                  }}
                  animate={{
                    opacity: isPast ? 0 : isActive ? 1 : 0.35,
                    scale: isActive ? 1 : 1 - Math.abs(offset) * 0.06,
                    x: isActive ? 0 : isPast ? -150 : offset * 45,
                    y: isActive ? 0 : offset * -10,
                    rotateX: isActive ? 0 : 8,
                    rotateY: isActive ? 0 : -25,
                    z: isActive ? 50 : -Math.abs(offset) * 100,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className={`absolute p-8 md:p-10 rounded-3xl border bg-white w-full max-w-[460px] h-[360px] flex flex-col justify-between shadow-2xl transition-all duration-300 ${
                    isActive
                      ? "border-[var(--color-primary)] shadow-[0_50px_100px_rgba(0,0,0,0.12)]"
                      : "border-[var(--color-border)] shadow-[0_10px_30px_rgba(0,0,0,0.02)] pointer-events-none"
                  }`}
                >
                  {/* Decorative Subtle Background Stamp */}
                  <div className="absolute top-6 right-8 font-display text-7xl font-black tracking-tighter opacity-[0.03] select-none">
                    0{i + 1}
                  </div>

                  <div className="space-y-6" style={{ transform: "translateZ(30px)" }}>
                    {/* Animated Geometric Technical Container */}
                    <div 
                      className={`h-14 w-14 grid place-items-center rounded-2xl border transition-all duration-500 ${
                        isActive 
                          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20 rotate-3" 
                          : "bg-slate-50 text-slate-400 border-slate-100"
                      }`}
                    >
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>

                    {/* Standard Font Blocks */}
                    <div className="space-y-3">
                      <span className={`text-[10px] font-mono tracking-[0.25em] uppercase block font-bold transition-colors ${
                        isActive ? "text-[var(--color-primary)]" : "text-slate-400"
                      }`}>
                        PRINCIPLE 0{i + 1}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl text-[var(--color-heading)] tracking-tight font-bold">
                        {w.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-body)] opacity-90 line-clamp-4">
                        {w.copy}
                      </p>
                    </div>
                  </div>

                  {/* Horizontal Base Finishing Line Rule */}
                  <div className={`h-1 w-20 rounded-full transition-all duration-500 ${
                    isActive ? "bg-[var(--color-primary)] w-32" : "bg-slate-100"
                  }`} />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}