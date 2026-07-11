import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PageHero } from "@/components/layout/PageShell";
import { CurrentProjects } from "@/components/sections/CurrentProjects";
import { CompletedProjects } from "@/components/sections/CompletedProjects";
import { CTA } from "@/components/sections/CTA";
import { IMAGES } from "@/data/site";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  const [activeTab, setActiveTab] = useState("ongoing");

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Building Landmarks with Quality & Trust."
        subtitle="Explore our ongoing and completed construction projects."
        image={IMAGES.villaPool}
      />

      <section className="py-12">
        <div className="container-x">

          <div className="flex flex-wrap justify-center gap-4">

            <button
              onClick={() => setActiveTab("ongoing")}
              className={`rounded-full px-8 py-3 text-sm font-medium transition
              ${
                activeTab === "ongoing"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Ongoing Projects
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className={`rounded-full px-8 py-3 text-sm font-medium transition
              ${
                activeTab === "completed"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completed Projects
            </button>

          </div>

          <div className="mt-12">

            <AnimatePresence mode="wait">

              {activeTab === "ongoing" && (
                <motion.div
                  key="ongoing"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.4 }}
                >
                  <CurrentProjects />
                </motion.div>
              )}

              {activeTab === "completed" && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.4 }}
                >
                  <CompletedProjects />
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>
      </section>

      <CTA />
    </>
  );
}