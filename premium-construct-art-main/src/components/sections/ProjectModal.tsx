import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, CalendarDays, BarChart2, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (project) {
      // Handle fallback dynamically if data has old `.image` key or new `.images` array
      const projectImages = project.images && project.images.length > 0 
        ? project.images 
        : project.image ? [project.image] : [];
        
      setImagesList(projectImages);
      setCurrentIndex(0);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: "20px" }}
            animate={{ opacity: 1, scale: 1, y: "0px" }}
            exit={{ opacity: 0, scale: 0.95, y: "20px" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-[101] flex max-h-[88vh] w-[92%] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:max-h-[85vh]"
          >
            <div className="absolute right-4 top-4 z-30">
              <button
                onClick={onClose}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900/40 text-white backdrop-blur-md transition hover:bg-slate-900/70 focus:outline-none shadow-md md:bg-white md:text-slate-700 md:hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              
              {/* Image Presentation Slider Frame */}
              <div className="relative aspect-video w-full max-h-[340px] bg-slate-950 md:max-h-[400px] group flex items-center justify-center">
                {imagesList.length > 0 && (
                  <img
                    src={imagesList[currentIndex]}
                    alt={`${project.title} gallery asset`}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent pointer-events-none" />
                
                {/* Sliders Navigation Arrow Buttons */}
                {imagesList.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <span className={`absolute left-5 bottom-5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow border ${
                  project.category === "completed" 
                    ? "bg-emerald-600 border-emerald-500" 
                    : "bg-amber-500 border-amber-400"
                }`}>
                  {project.category || "Project Entry"}
                </span>
              </div>

              {/* Detail Content Matrix */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Gallery Preview Strip Indicator */}
                {imagesList.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                    {imagesList.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative rounded-xl overflow-hidden h-14 aspect-video border-2 shrink-0 transition-all ${
                          idx === currentIndex ? "border-indigo-600 scale-95 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={url} className="w-full h-full object-cover" alt="Thumbnail" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
                    {project.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 md:text-base md:leading-7">
                    {project.description || "No project summary logs recorded."}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <MapPin size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</p>
                      <h4 className="font-semibold text-slate-800 truncate text-sm md:text-base">
                        {project.location || "Not Provided"}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <CalendarDays size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {project.category === "completed" ? "Year Completed" : "Target Timeline"}
                      </p>
                      <h4 className="font-semibold text-slate-800 truncate text-sm md:text-base">
                        {project.category === "completed" ? project.year : project.completion || "TBD"}
                      </h4>
                    </div>
                  </div>
                </div>

                {project.category === "ongoing" && typeof project.progress !== "undefined" && (
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-semibold text-slate-700">
                        <BarChart2 size={16} className="text-indigo-600" />
                        Construction Status Gauge
                      </span>
                      <span className="font-bold text-indigo-600">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-indigo-600"
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}