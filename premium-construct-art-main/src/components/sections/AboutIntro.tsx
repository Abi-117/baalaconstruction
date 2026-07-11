import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/ui/Counter";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { IMAGES, STATS } from "@/data/site";
import house from "@/assets/home1.jpg";

export function AboutIntro() {
  const ref = useRef<HTMLElement>(null);
  
  // Track scroll progress across the container
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  });

  // Smooth out the raw scroll progress with a spring for fluid 60fps animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Left Image: Subtly tilts forward/back and slides down
  const y1 = useTransform(smoothProgress, [0, 1], ["-6%", "6%"]);
  const rotateX1 = useTransform(smoothProgress, [0, 1], [10, -5]);
  const rotateY1 = useTransform(smoothProgress, [0, 1], [-12, 4]);

  // Right Overlapping Image: Moves up faster and tilts dynamically for a stark 3D separation
  const y2 = useTransform(smoothProgress, [0, 1], ["12%", "-12%"]);
  const rotateX2 = useTransform(smoothProgress, [0, 1], [-5, 8]);
  const rotateY2 = useTransform(smoothProgress, [0, 1], [8, -8]);
  
  // Dynamic Shadow: Intensifies as the 3D element "lifts" closer to the viewer
  const shadowIntensity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["0px 10px 30px rgba(0,0,0,0.04)", "0px 25px 50px rgba(0,0,0,0.12)", "0px 10px 30px rgba(0,0,0,0.04)"]
  );

  return (
    <section 
      ref={ref} 
      className="section-y relative overflow-hidden bg-[#fafafa] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-white"
      style={{ perspective: "1200px" }} // Injecting 3D space matrix to the parent
    >
      {/* Structural Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container-x grid gap-20 md:grid-cols-12 md:gap-24 items-center relative z-10">
        
        {/* Left Side: 3D Layered Imagery */}
        <div className="relative md:col-span-6 min-h-[500px] md:min-h-[600px] flex items-center justify-center">
          
          {/* Subtle Backing Architectural Wireframe Frame */}
          <div className="absolute -left-6 -top-6 hidden h-48 w-48 border border-black/10 md:block pointer-events-none" />
          
          {/* Primary Blueprint Image */}
          <motion.div 
            style={{
  transformStyle: "preserve-3d"
}}
            className="relative aspect-[4/5] w-[85%] mr-auto overflow-hidden rounded-md border border-black/5 bg-[#eaeaea]"
          >
            <motion.img
              initial={{ scale: 1.3, filter: "blur(4px)" }}
              whileInView={{ scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              src={house}
              alt="Architect drawing plans"
              className="h-full w-full object-cover origin-center grayscale-[20%] contrast-[1.05]"
              loading="lazy"
            />
          </motion.div>
          
          {/* Overlapping Interior Image (Floating Foreground 3D Object) */}
          {/* <motion.div
            style={{
  transformStyle:"preserve-3d"
}}
            className="absolute bottom-2 right-0 hidden aspect-[3/4] w-1/2 overflow-hidden rounded-md border border-white bg-white md:block"
          >
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              src={IMAGES.interior} 
              alt="Interior detail" 
              className="h-full w-full object-cover" 
              loading="lazy" 
            />
          </motion.div> */}
          
        </div>

        {/* Right Side: Editorial Content Layout */}
        <div className="md:col-span-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-black/40" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-black/50">
                About the studio
              </span>
            </div>
          </Reveal>
          
          <h2 className="text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl mt-6 leading-[1.15]">
            <TextReveal text="Engineering excellence," />
            <br />
            <span className="font-serif italic text-black/70">
              <TextReveal text="crafted with soul." delay={0.12} />
            </span>
          </h2>
          
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-black/70">
              For over two decades, BAALA Constructions has designed and delivered residential
              landmarks, commercial towers and bespoke interiors across South India. Our practice
              sits at the intersection of architecture, engineering and honest craftsmanship.
            </p>
          </Reveal>
          
          <Reveal delay={0.28}>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-black/50">
              Every project begins with listening. We translate ambitions into drawings, drawings
              into details, and details into buildings that stand the test of time.
            </p>
          </Reveal>

          {/* Stats Section with clean Minimalist Grid */}
          <div className="mt-12 grid grid-cols-2 gap-y-12 gap-x-8 border-t border-black/5 pt-10 md:mt-16">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i + 0.3}>
                <div className="group cursor-default">
                  <div className="font-serif text-5xl font-light text-black tracking-tighter md:text-6xl transition-transform duration-500 group-hover:translate-x-1 inline-block">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 group-hover:text-black/70 transition-colors duration-300">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}