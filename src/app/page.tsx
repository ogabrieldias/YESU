import type { Metadata } from "next";
import { HeroSection } from "@/components/hero/HeroSection";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Preloader } from "@/components/preloader/Preloader";
import { ParticleBackgroundWrapper } from "@/components/three/ParticleBackgroundWrapper";

export const metadata: Metadata = {
  title: "YESU Brasil | Mobilidade Elétrica Premium — Scooters Elétricos",
  description:
    "Descubra a nova era da mobilidade urbana. Scooters elétricos premium da YESU Brasil com até 120km de autonomia, zero emissões e 90% de economia em combustível.",
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="space-y-8 md:space-y-12">
            <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/5 isolate bg-obsidian">
              <ParticleBackgroundWrapper />
              <HeroSection />
            </div>

            <MarqueeStrip />
            <ProblemSection />
            <CatalogSection />
            <CalculatorSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
          </div>
        </div>
      </div>
    </>
  );
}
