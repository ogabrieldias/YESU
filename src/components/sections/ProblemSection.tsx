"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Fuel, AlertTriangle, Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Fuel,
    value: "R$ 6.200",
    label: "Custo anual médio com gasolina",
    description: "O brasileiro médio gasta isso por ano só em combustível",
    color: "#FF4444",
  },
  {
    icon: TrendingUp,
    value: "38%",
    label: "Alta da gasolina em 5 anos",
    description: "E os preços continuam subindo sem previsão de queda",
    color: "#FF8C00",
  },
  {
    icon: AlertTriangle,
    value: "2,3t",
    label: "CO₂ emitido por ano por moto",
    description: "Cada litro de gasolina queimado lança 2,3kg de CO₂ no ar",
    color: "#FF6B00",
  },
  {
    icon: Leaf,
    value: "R$ 620",
    label: "Custo anual na YESU",
    description: "Mesmo percurso, 90% de economia. Energia elétrica = futuro.",
    color: "#00A86B",
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll(".problem-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Bottom CTA
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 85%",
          },
        }
      );

      // Number counting animation on scroll
      stats.forEach((stat, i) => {
        const numEl = document.querySelector(`[data-stat-num="${i}"]`);
        if (!numEl) return;
        ScrollTrigger.create({
          trigger: numEl,
          start: "top 80%",
          once: true,
          onEnter: () => {
            numEl.classList.add("stat-visible");
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problema"
      className="relative py-[120px] sm:py-[160px] bg-obsidian border border-white/5 rounded-[2rem] sm:rounded-[3rem] overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red glow (problem) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      {/* Green glow (solution) */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 !mt-10">
          <p className="inline-flex items-center gap-3 text-electric text-xs font-semibold tracking-[0.4em] uppercase mb-6">
            <span className="w-8 h-px bg-electric" />
            O Problema
            <span className="w-8 h-px bg-electric" />
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight !mb-6 !p-2">
            Quanto você perde{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF4444, #FF6B00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              por ano
            </span>
            <br />
            com gasolina?
          </h2>
          <p className="text-steel text-lg max-w-2xl mx-auto">
            Enquanto os preços dos combustíveis sobem, você continua pagando cada vez mais
            para andar o mesmo percurso de sempre. Existe uma saída melhor.
          </p>
        </div>

        {/* Stats grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                data-stat-num={i}
                className="problem-card group relative p-8 rounded-2xl border border-white/5 bg-obsidian hover:border-white/15 transition-all duration-500 overflow-hidden ds-card ds-card-hover"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${stat.color}15 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>

                {/* Value */}
                <div
                  className="text-3xl font-black mb-2 leading-none"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-white text-sm font-semibold mb-3">{stat.label}</div>

                {/* Description */}
                <p className="text-steel text-xs leading-relaxed">{stat.description}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom highlight */}
        <div ref={bottomRef} className="text-center">
          <div className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <Leaf size={24} className="text-emerald-400" />
            <div className="text-left">
              <div className="text-white font-bold">
                Com a YESU, você economiza{" "}
                <span className="text-emerald-400">mais de R$ 5.580 por ano</span>
              </div>
              <div className="text-steel text-sm">
                E ainda contribui para um planeta mais limpo. Sem gasolina. Sem emissões.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
