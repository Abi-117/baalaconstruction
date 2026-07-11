import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { CurrentProjects } from "@/components/sections/CurrentProjects";
import { UpcomingProjects } from "@/components/sections/UpcomingProjects";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ServicesGrid />
      {/* <WhyChooseUs /> */}
      {/* <FeaturedProjects /> */}
      {/* <CurrentProjects />
      <UpcomingProjects /> */}
      {/* <Process /> */}
      <Testimonials />
      <CTA />
    </>
  );
}
