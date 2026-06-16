"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Battery,
  Gauge,
  Shield,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { featuredProducts, formatPrice, type Product } from "@/lib/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { generateWhatsAppUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const mainSpecs = product.specs.slice(0, 3);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-700 cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "linear-gradient(145deg, #111111, #0d0d0d)",
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease-out, border-color 0.3s ease",
        willChange: "transform",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className="absolute top-5 left-5 z-20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
          style={{
            background: `${product.badge === "Mais Vendida" ? "#FF6B00" : product.accentColor}20`,
            border: `1px solid ${product.accentColor}40`,
            color: product.accentColor,
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Image area */}
      <div className="relative h-64 bg-graphite overflow-hidden flex items-center justify-center">
        {/* Placeholder — insert product image here */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: `${product.accentColor}20`, border: `2px solid ${product.accentColor}40` }}
          >
            <Zap size={32} style={{ color: product.accentColor }} />
          </div>
          <p className="text-steel text-xs tracking-widest uppercase">
            ⚠️ Inserir imagem em:
          </p>
          <p className="text-white/40 text-[10px] font-mono px-4 text-center">
            /public/images/products/{product.slug}/cover.jpg
          </p>
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.accentColor}15 0%, transparent 70%)`,
          }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111111] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category tag */}
        <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: product.accentColor }}>
          {product.category === "urban" ? "Urbana" :
           product.category === "sport" ? "Esportiva" :
           product.category === "cargo" ? "Cargo" : "Premium"}
        </p>

        {/* Name */}
        <h3 className="text-xl font-black text-white mb-1 group-hover:text-electric transition-colors duration-300">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-steel text-sm mb-4">{product.tagline}</p>

        {/* Mini specs */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-white/3 border border-white/5">
          {mainSpecs.map((spec) => (
            <div key={spec.label} className="text-center">
              <div className="text-white font-bold text-sm">
                {spec.value}
                <span className="text-steel text-xs ml-0.5">{spec.unit}</span>
              </div>
              <div className="text-steel text-[10px] uppercase tracking-wider mt-0.5">{spec.label}</div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-steel text-xs mb-1">A partir de</div>
            <div className="text-3xl font-black text-white">
              {formatPrice(product.price)}
            </div>
            <div className="text-steel text-xs mt-1">
              ou {product.installments}x de {formatPrice(product.priceInstallment)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-electric text-xs font-semibold">≈ 90% menos</div>
            <div className="text-steel text-[10px]">que combustível/ano</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <a
            href={`/produtos/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 cursor-none"
          >
            Ver Detalhes <ArrowRight size={14} />
          </a>
          <a
            href={generateWhatsAppUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 cursor-none"
            style={{
              background: "#25D36620",
              border: "1px solid #25D36640",
            }}
          >
            <MessageCircle size={14} className="text-[#25D366]" />
          </a>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${product.accentColor}, transparent)` }}
      />
    </div>
  );
}

export function CatalogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      const cards = gridRef.current?.querySelectorAll(".product-card-wrapper");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="catalogo"
      className="relative py-24 sm:py-32 bg-obsidian border border-white/5 rounded-[2rem] sm:rounded-[3rem] overflow-hidden"
    >
      {/* Electric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <p className="inline-flex items-center gap-3 text-electric text-xs font-semibold tracking-[0.4em] uppercase mb-6">
            <span className="w-8 h-px bg-electric" />
            Catálogo
            <span className="w-8 h-px bg-electric" />
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Escolha seu{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF6B00, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              modelo
            </span>
          </h2>
          <p className="text-steel text-lg max-w-2xl mx-auto">
            Quatro modelos desenvolvidos para diferentes perfis e necessidades.
            Todos elétricos, premium e prontos para transformar sua mobilidade.
          </p>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard product={product} index={index} />
            </div>
          ))}

          {/* Coming soon card */}
          <div className="relative rounded-2xl border border-white/5 border-dashed bg-obsidian/50 flex flex-col items-center justify-center p-12 min-h-[400px]">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6">
              <Zap size={24} className="text-electric" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Em Breve</h3>
            <p className="text-steel text-sm text-center">
              Novos modelos chegando em 2025. Seja o primeiro a saber.
            </p>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-electric text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 cursor-none"
            >
              Ser avisado <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <MagneticButton
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            id="catalog-whatsapp"
          >
            <MessageCircle size={18} />
            Dúvidas? Fale com um especialista
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
