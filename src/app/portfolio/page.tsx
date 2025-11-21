import Header from "@/components/header";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SkillsSection from "@/components/sections/skills-section";
import ExperienceSection from "@/components/sections/experience-section";
import ServicesSection from "@/components/sections/services-section";
import ProjectsSection from "@/components/sections/projects-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/footer";
import GhostCursor from "@/components/GhostCursor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <GhostCursor
        color="#B19EEF"
        brightness={1}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1.0}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
      />
      
      <main className="flex-grow bg-gradient-to-b from-[#0A2A64] to-black">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Header />
      <Footer />
    </div>
  );
}
