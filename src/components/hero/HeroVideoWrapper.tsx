"use client";

import { useEffect, useRef } from "react";
import { ParticleBackgroundWrapper } from "@/components/three/ParticleBackgroundWrapper";

interface HeroVideoWrapperProps {
  children: React.ReactNode;
}

export function HeroVideoWrapper({
  children,
}: HeroVideoWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      try {
        // Importação dinâmica do GSAP + ScrollTrigger para PageSpeed otimizado
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const isMobile = window.innerWidth < 768;

          // Estado inicial do parallax e escala
          gsap.set(videoRef.current, {
            yPercent: 0,
            scale: 1.1,
            transformOrigin: "center center",
          });

          // Estado inicial do overlay escuro (65% opacidade na Hero)
          gsap.set(overlayRef.current, {
            backgroundColor: "rgba(5, 5, 5, 0.65)",
          });

          // 1. Animação de Parallax do Vídeo ao longo de todo o container
          // No mobile, o parallax é reduzido para economizar processamento
          gsap.to(videoRef.current, {
            yPercent: isMobile ? -5 : -15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });

          // 2. Animação de Revelação de Overlay
          // O vídeo se torna gradualmente mais nítido e presente
          gsap.to(overlayRef.current, {
            backgroundColor: "rgba(5, 5, 5, 0.25)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });
        }, containerRef);
      } catch (error) {
        console.error(
          "Failed to load GSAP in HeroVideoWrapper:",
          error
        );
      }
    };

    initGSAP();

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        relative
        w-full
        overflow-hidden
        border
        border-white/5
        isolate
        bg-obsidian
      "
    >
      {/* Efeito de partículas no fundo */}
      <ParticleBackgroundWrapper />

      {/* VÍDEO BACKGROUND CONTÍNUO */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        poster="/images/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          absolute
          inset-0
          w-full
          h-[120%]
          object-cover
          z-0
          pointer-events-none
        "
        style={{
          willChange: "transform",
        }}
      />

      {/* OVERLAY ESCURO DINÂMICO */}
      <div
        ref={overlayRef}
        className="
          absolute
          inset-0
          z-10
          pointer-events-none
        "
        style={{
          willChange: "background-color",
        }}
      />

      {/* SEÇÕES FILHAS (HERO + VIDEO TRANSITION) */}
      <div className="relative z-20 w-full bg-transparent">
        {children}
      </div>
    </div>
  );
}