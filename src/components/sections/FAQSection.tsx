"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { faqItems, type FAQItem } from "@/lib/data/faq";

gsap.registerPlugin(ScrollTrigger);

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
      );
      gsap.to(arrowRef.current, { rotate: 180, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(arrowRef.current, { rotate: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [open]);

  const categoryColors: Record<string, string> = {
    geral: "#FF6B00",
    tecnico: "#0080FF",
    financeiro: "#00A86B",
    entrega: "#FF8C00",
  };

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? "border-electric/40 bg-electric/3" : "border-white/5 bg-obsidian hover:border-white/10"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 text-left cursor-none"
      >
        {/* Number */}
        <span
          className="text-xs font-mono font-bold w-6 shrink-0"
          style={{ color: categoryColors[item.category] }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span className={`flex-1 font-semibold text-sm sm:text-base leading-tight transition-colors duration-300 ${open ? "text-electric" : "text-white"}`}>
          {item.question}
        </span>

        {/* Arrow */}
        <div ref={arrowRef} className="shrink-0">
          <ChevronDown
            size={18}
            className={`transition-colors duration-300 ${open ? "text-electric" : "text-steel"}`}
          />
        </div>
      </button>

      {/* Answer */}
      <div
        ref={contentRef}
        style={{ height: 0, overflow: "hidden" }}
      >
        <div className="px-6 pb-6 pl-16">
          <p className="text-steel text-sm leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      const items = listRef.current?.querySelectorAll(".faq-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 75%",
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
      id="faq"
      className="relative py-32 bg-obsidian overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="inline-flex items-center gap-3 text-electric text-xs font-semibold tracking-[0.4em] uppercase mb-6">
            <span className="w-8 h-px bg-electric" />
            FAQ
            <span className="w-8 h-px bg-electric" />
          </p>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
            Perguntas{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF6B00, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              frequentes
            </span>
          </h2>
          <p className="text-steel text-lg">
            Tudo que você precisa saber antes de fazer sua escolha.
          </p>
        </div>

        {/* FAQ List */}
        <div ref={listRef} className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={item.id} className="faq-item">
              <FAQItem item={item} index={i} />
            </div>
          ))}
        </div>

        {/* CTA below FAQ */}
        <div className="text-center mt-12">
          <p className="text-steel text-sm mb-4">Não encontrou sua dúvida?</p>
          <a
            href="https://wa.me/5500000000000?text=Ol%C3%A1%21+Tenho+uma+d%C3%BAvida+sobre+as+scooters+el%C3%A9tricas+YESU."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-electric font-semibold hover:text-ember transition-colors duration-300 cursor-none"
          >
            Fale diretamente com nossa equipe →
          </a>
        </div>
      </div>
    </section>
  );
}
