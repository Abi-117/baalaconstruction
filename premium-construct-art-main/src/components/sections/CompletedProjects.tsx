import { motion } from "framer-motion";
import { Eye, MapPin, CalendarDays, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectModal } from "./ProjectModal";

const API = "http://localhost:5000";

export function CompletedProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await axios.get(`${API}/api/projects`);
        const completed = res.data.filter((p: any) => p.category === "completed");
        setProjects(completed);
      } catch (error) {
        console.error("Error fetching completed projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleted();
  }, []);

  return (
    <section className="section-y bg-[var(--color-background)]">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">Completed Projects</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="display-h mt-6 max-w-3xl">Successfully Delivered Projects.</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-[var(--color-body)]">
            Every completed project reflects our commitment to quality, engineering excellence, timely delivery and customer satisfaction.
          </p>
        </Reveal>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-400">
            <Loader2 className="animate-spin text-[var(--color-primary)]" size={32} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No completed projects found at the moment.</div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => {
              const displayCover = project.images?.[0] || project.image || "";
              return (
                <motion.div
                  key={project._id || project.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden">
                      <img
                        src={displayCover}
                        alt={project.title}
                        className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                        Completed
                      </span>
                    </div>

                    <div className="space-y-4 p-6">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={16} />
                        {project.location || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays size={16} />
                        {project.year || "N/A"}
                      </div>
                      <p className="line-clamp-3 text-sm leading-7 text-gray-600">{project.description}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 w-full justify-center"
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}