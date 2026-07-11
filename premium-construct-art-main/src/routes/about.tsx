import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageShell";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { IMAGES } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import {Philosophy} from "@/components/sections/Philosophy";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BAALA Constructions" },
      {
        name: "description",
        content:
          "Two decades of design + build practice across South India. Meet the studio, the philosophy and the leadership behind BAALA Constructions.",
      },
      { property: "og:title", content: "About — BAALA Constructions" },
      { property: "og:description", content: "Meet the studio behind BAALA Constructions." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our studio"
        title="A quiet studio building lasting things."
        subtitle="Design, engineering and craftsmanship — kept under one roof, held to one standard, delivered with the calm of people who have done this for two decades."
        image={IMAGES.interior}
      />
      <AboutIntro />
      <Philosophy />
      {/* <section className="section-y bg-[var(--color-background)]">
        <div className="container-x grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal>
            <div>
              <span className="eyebrow">Philosophy</span>
              <h3 className="display-h mt-6 text-4xl md:text-5xl">
                Buildings should be quiet, honest and enduring.
              </h3>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-6 text-lg leading-relaxed text-[var(--color-body)]">
              <p>
                We believe great construction happens when architecture, engineering and
                craftsmanship are held to the same standard. That is why we insist on running all
                three disciplines under one roof — coordinated by senior partners, not passed
                between vendors.
              </p>
              <p>
                Our clients tell us this feels different. Fewer surprises. Fewer meetings. More
                clarity from the first sketch to the day the keys change hands.
              </p>
            </div>
          </Reveal>
        </div>
      </section> */}
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
