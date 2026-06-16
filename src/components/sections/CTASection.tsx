"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Zap, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { generateWhatsAppUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create particle field
      const container = particlesRef.current;
      if (container) {
        for (let i = 0; i < 60; i++) {
          const p = document.createElement("div");
          const size = Math.random() * 4 + 1;
          const isLarge = Math.random() > 0.8;
          p.style.cssText = `
            position: absolute;
            width: ${isLarge ? size * 3 : size}px;
            height: ${isLarge ? size * 3 : size}px;
            border-radius: 50%;
            background: ${Math.random() > 0.6 ? "#FF6B00" : Math.random() > 0.5 ? "#FF8C00" : "#ffffff"};
            opacity: 0;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
          `;
          container.appendChild(p);

          gsap.fromTo(
            p,
            { opacity: 0, scale: 0 },
            {
              opacity: Math.random() * 0.6 + 0.1,
              scale: 1,
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              duration: Math.random() * 3 + 2,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
              delay: Math.random() * 3,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            }
          );
        }
      }

      // Content reveal
      const revealItems = contentRef.current?.querySelectorAll("[data-reveal]");
      if (revealItems && revealItems.length > 0) {
        gsap.fromTo(
          revealItems,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta-final"
      className="relative py-40 bg-void overflow-hidden"
    >
      {/* Particle field */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Large radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 text-center" ref={contentRef}>
        {/* Tag */}
        <div data-reveal className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/30 bg-electric/10 text-electric text-xs font-semibold tracking-widest uppercase">
            <Zap size={12} className="fill-electric" />
            Comece agora
          </span>
        </div>

        {/* Headline */}
        <h2
          data-reveal
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none mb-8"
          style={{ textShadow: "0 0 80px rgba(255,107,0,0.15)" }}
        >
          Pronto para{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FF6B00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            economizar
          </span>
          <br />
          milhares por ano?
        </h2>

        {/* Subtext */}
        <p data-reveal className="text-chrome text-lg sm:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Fale agora com um especialista YESU Brasil e descubra qual modelo é perfeito
          para o seu perfil. Atendimento personalizado via WhatsApp.
        </p>

        {/* Main CTA */}
        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12">
          <MagneticButton
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            id="final-cta-whatsapp"
          >
            <MessageCircle size={20} />
            Falar no WhatsApp
          </MagneticButton>
          <MagneticButton
            href="#catalogo"
            variant="secondary"
            size="lg"
            id="final-cta-catalog"
            onClick={() => document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver Catálogo <ArrowRight size={16} />
          </MagneticButton>
        </div>

        {/* Trust badges */}
        <div data-reveal className="flex flex-wrap items-center justify-center gap-8 text-steel">
          {[
            "✓ Entrega para todo Brasil",
            "✓ Garantia nacional",
            "✓ Parcelamento em 30x",
            "✓ Suporte 7 dias",
          ].map((badge) => (
            <span key={badge} className="text-sm">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
