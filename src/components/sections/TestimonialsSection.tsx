"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { formatPrice } from "@/lib/data/products";

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-electric fill-electric" : "text-steel"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (index: number) => {
    const next = (index + testimonials.length) % testimonials.length;
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActive(next);
        gsap.fromTo(
          trackRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      },
    });
  };

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="relative py-32 bg-void overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <p className="inline-flex items-center gap-3 text-electric text-xs font-semibold tracking-[0.4em] uppercase mb-6">
            <span className="w-8 h-px bg-electric" />
            Depoimentos
            <span className="w-8 h-px bg-electric" />
          </p>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
            O que nossos{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF6B00, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              clientes
            </span>{" "}
            dizem
          </h2>
        </div>

        {/* Main testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured */}
          <div className="lg:col-span-2">
            <div
              ref={trackRef}
              className="relative p-10 rounded-3xl border border-white/8 h-full"
              style={{ background: "linear-gradient(145deg, #111111, #0d0d0d)" }}
            >
              {/* Quote icon */}
              <Quote size={40} className="text-electric/30 mb-6" />

              <p className="text-chrome text-lg leading-relaxed mb-8 font-light">
                &ldquo;{current.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-graphite border border-white/10 flex items-center justify-center text-xl font-bold text-electric">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{current.name}</div>
                  <div className="text-steel text-sm">{current.role} · {current.city}</div>
                  <StarRating rating={current.rating} />
                </div>
                <div className="ml-auto text-right">
                  <div className="text-electric text-2xl font-black">
                    +{formatPrice(current.monthlyEconomy)}/mês
                  </div>
                  <div className="text-steel text-xs">economizados</div>
                  <div className="text-steel text-xs mt-1">{current.product}</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={() => goTo(active - 1)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-steel hover:text-white hover:border-white/30 transition-all duration-300 cursor-none"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="w-2 h-2 rounded-full transition-all duration-300 cursor-none"
                      style={{ background: i === active ? "#FF6B00" : "#2a2a2a" }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => goTo(active + 1)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-steel hover:text-white hover:border-white/30 transition-all duration-300 cursor-none"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-4">
            {testimonials.slice(0, 3).map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 cursor-none ${
                  i === active
                    ? "border-electric/40 bg-electric/5"
                    : "border-white/5 bg-obsidian hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-graphite border border-white/10 flex items-center justify-center text-sm font-bold text-electric">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-steel text-xs">{t.product}</div>
                  </div>
                </div>
                <p className="text-steel text-xs leading-relaxed line-clamp-2">{t.text}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { value: "98%", label: "Clientes satisfeitos" },
            { value: "4.9★", label: "Avaliação média" },
            { value: "+500", label: "Veículos entregues" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-white/5 bg-obsidian"
            >
              <div className="text-3xl font-black text-electric mb-2">{stat.value}</div>
              <div className="text-steel text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
