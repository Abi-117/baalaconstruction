import { motion } from "framer-motion";
import { CalendarDays, Eye, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectModal } from "./ProjectModal";

const API = "http://localhost:5000";

export function CurrentProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const res = await axios.get(`${API}/api/projects`);
        // Filter dynamically for ongoing projects only
        const ongoing = res.data.filter((p: any) => p.category === "ongoing");
        setProjects(ongoing);
      } catch (error) {
        console.error("Error fetching ongoing projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrent();
  }, []);

  return (
    <>
      <section className="section-y bg-[var(--stone-bg)]">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Current Projects</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="display-h mt-6">
              Projects Under Construction.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-[var(--color-body)]">
              Follow the progress of our ongoing residential and commercial
              construction projects currently being executed across Tamil Nadu.
            </p>
          </Reveal>

          {loading ? (
            <div className="flex justify-center items-center py-20 text-gray-400">
              <Loader2 className="animate-spin text-[var(--color-primary)]" size={32} />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No current projects found under construction.
            </div>
          ) : (
            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id || project.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-3xl bg-white shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="relative">
                      <img
  src={
    project.images?.length > 0
      ? project.images[0]
      : "/placeholder.jpg"
  }
  alt={project.title}
  className="h-72 w-full object-cover"
/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                        Ongoing
                      </span>
                    </div>

                    <div className="space-y-5 p-6">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={16} />
                        {project.location || "N/A"}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays size={16} />
                        Expected Completion : {project.completion || "TBD"}
                      </div>

                      {/* Animated Progress Gauge */}
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Construction Progress
                          </span>
                          <span className="font-semibold text-[var(--color-primary)]">
                            {project.progress || 0}%
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${project.progress || 0}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.5,
                            }}
                            className="h-full rounded-full bg-[var(--color-primary)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-white w-full justify-center hover:opacity-90 transition"
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}