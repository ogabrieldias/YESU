"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { generateWhatsAppUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([taglineRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      // Entrance animation after preloader (delay 3.5s for preloader)
      const tl = gsap.timeline({ delay: 3.2 });

      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4")
        .to(subheadlineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");

      // Scroll parallax on video
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (videoRef.current) {
            gsap.set(videoRef.current, {
              y: self.progress * 150,
            });
          }
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              opacity: 0.4 + self.progress * 0.4,
            });
          }
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              y: self.progress * -80,
              opacity: 1 - self.progress * 1.5,
            });
          }
        },
      });

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const next = document.getElementById("marquee");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[calc(100svh-1rem)] sm:min-h-[calc(100svh-2rem)] md:min-h-[calc(100svh-3rem)] overflow-hidden bg-transparent flex items-center justify-center"
    >
      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scale(1.1)", willChange: "transform" }}
      />

      {/* DYNAMIC DARK OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.85) 100%)",
          opacity: 0.6,
        }}
      />

      {/* Electric accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-30" />

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Tagline */}
        <p
          ref={taglineRef}
          className="inline-flex items-center gap-3 text-electric text-xs font-semibold tracking-[0.4em] uppercase mb-8"
        >
          <span className="w-8 h-px bg-electric" />
          Mobilidade Elétrica Premium
          <span className="w-8 h-px bg-electric" />
        </p>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-7xl lg:text-9xl font-black text-white leading-none tracking-tight mb-8"
          style={{
            textShadow: "0 0 80px rgba(255,107,0,0.2)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Mude sua{" "}
          <br />
          <span
            className="text-gradient-electric"
            style={{
              background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FF6B00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            mobilidade
          </span>
          <br />
          para sempre.
        </h1>

        {/* Sub-headline */}
        <p
          ref={subheadlineRef}
          className="text-chrome text-lg sm:text-xl lg:text-2xl font-light tracking-wider mb-12 max-w-2xl mx-auto"
        >
          Economia · Tecnologia · Sustentabilidade
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <MagneticButton
            href="#catalogo"
            variant="primary"
            size="lg"
            id="hero-cta-primary"
            onClick={() => {
              document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Conheça os Modelos
          </MagneticButton>
          <MagneticButton
            href="#calculadora"
            variant="secondary"
            size="lg"
            id="hero-cta-secondary"
            onClick={() => {
              document.querySelector("#calculadora")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Calcule sua Economia
          </MagneticButton>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-12 mt-16">
          {[
            { value: "90%", label: "Economia em combustível" },
            { value: "0", label: "Emissões de CO₂" },
            { value: "120km", label: "Autonomia máxima" },
          ].map((stat) => (
            <div key={stat.label} className="text-center hidden sm:block">
              <div className="text-2xl font-black text-electric">{stat.value}</div>
              <div className="text-steel text-xs tracking-wider uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-none"
        onClick={scrollToNext}
        style={{ willChange: "transform" }}
      >
        <span className="text-steel text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="text-electric" />
      </div>
    </section>
  );
}
