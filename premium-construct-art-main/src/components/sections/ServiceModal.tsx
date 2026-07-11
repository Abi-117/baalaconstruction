import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

interface ServiceModalProps {
  service: any;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (service) {
      setActiveImage(service.image);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Scrollable Container */}
          <div className="fixed inset-0 z-[101] overflow-y-auto px-4 py-6 md:py-12 flex justify-center items-start">
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-5xl rounded-2xl md:rounded-3xl bg-white shadow-2xl overflow-hidden"
            >
              {/* Close Button - Now pinned relatively inside a stable container */}
              <button
                onClick={onClose}
                className="absolute right-4 top-12 z-30 rounded-full bg-white/90 backdrop-blur-sm p-2.5 text-gray-800 shadow-md transition hover:bg-white hover:scale-105 active:scale-95"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Hero Banner Section */}
              <div className="relative aspect-[16/10] sm:aspect-[16/7] md:h-[380px] lg:h-[440px] w-full bg-gray-900">
                <img
                  src={activeImage}
                  alt={service.title}
                  className="h-full w-full object-cover opacity-90"
                />
                {/* Gradient tint for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10 text-white">
                  <span className="inline-block rounded-full bg-[var(--color-primary)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider md:text-xs">
                    {service.tag}
                  </span>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                    {service.title}
                  </h2>

                  <p className="mt-2 max-w-xl text-xs text-white/80 sm:text-sm md:text-base">
                    {service.summary}
                  </p>
                </div>
              </div>

              {/* Horizontal Image Gallery Slider */}
              {service.gallery && service.gallery.length > 0 && (
                <div className="flex gap-3 overflow-x-auto border-b p-4 scrollbar-thin">
                  {service.gallery.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-18 sm:w-26 md:h-20 md:w-28
                        ${
                          activeImage === img
                            ? "border-[var(--color-primary)] scale-95"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }
                      `}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Split Content Main Layout */}
              <div className="grid gap-10 p-5 sm:p-8 lg:p-10 lg:grid-cols-[1.6fr_1fr] items-start">
                
                {/* Left Side: Information */}
                <div className="space-y-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                      Overview
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                      Complete {service.title} Solutions
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                      {service.description}
                    </p>
                  </div>

                  {/* Included features list */}
                  {service.points && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        What's Included
                      </h4>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {service.points.map((item: string) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-xl bg-gray-50 p-3.5"
                          >
                            <CheckCircle2
                              className="mt-0.5 flex-shrink-0 text-[var(--color-primary)]"
                              size={18}
                            />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Operational Flow Process */}
                  {service.process && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        Our Process
                      </h4>
                      <div className="mt-4 space-y-4">
                        {service.process.map((step: string, index: number) => (
                          <div key={step} className="flex items-start gap-4">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                              {index + 1}
                            </div>
                            <span className="mt-1 text-sm text-gray-700 sm:text-base">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Sticky CTA Sidebar */}
                <div className="lg:sticky lg:top-6">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 sm:p-8 text-center lg:text-left">
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                      Need this Service?
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                      Speak with our construction experts and get a customized quotation for your project.
                    </p>
                    <Link
                      to="/contact"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 active:scale-[0.99]"
                    >
                      Get Free Consultation
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}