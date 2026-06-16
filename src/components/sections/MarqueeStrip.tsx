"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Zap } from "lucide-react";

const items = [
  "Mobilidade Elétrica Premium",
  "Zero Emissões de CO₂",
  "90% de Economia",
  "Tecnologia de Ponta",
  "Feito para o Brasil",
  "Motor Brushless",
  "Bateria de Lítio",
  "Garantia Nacional",
  "Scooter Elétrica",
  "Futuro é Agora",
];

export function MarqueeStrip() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee 1 — left to right → left
      gsap.fromTo(
        track1Ref.current,
        { x: 0 },
        {
          x: "-50%",
          duration: 30,
          ease: "none",
          repeat: -1,
        }
      );

      // Marquee 2 — opposite direction
      gsap.fromTo(
        track2Ref.current,
        { x: "-50%" },
        {
          x: 0,
          duration: 25,
          ease: "none",
          repeat: -1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const renderItems = (doubled = false) => {
    const list = doubled ? [...items, ...items] : items;
    return list.map((item, i) => (
      <span
        key={`${item}-${i}`}
        className="inline-flex items-center gap-4 px-8 text-sm font-semibold tracking-[0.2em] uppercase whitespace-nowrap"
      >
        <Zap size={12} className="text-electric fill-electric shrink-0" />
        <span>{item}</span>
      </span>
    ));
  };

  return (
    <section id="marquee" className="relative py-5 bg-obsidian border border-white/5 rounded-[2rem] sm:rounded-full overflow-hidden shadow-glow-sm">
      {/* Electric line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />

      {/* Track 1 */}
      <div className="overflow-hidden mb-3">
        <div
          ref={track1Ref}
          className="flex text-chrome whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {renderItems(true)}
          {renderItems(true)}
        </div>
      </div>

      {/* Track 2 */}
      <div className="overflow-hidden">
        <div
          ref={track2Ref}
          className="flex text-steel whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {renderItems(true)}
          {renderItems(true)}
        </div>
      </div>

      {/* Electric line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
    </section>
  );
}
