"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Zap,
  Shield,
  Battery,
  Gauge,
} from "lucide-react";
import { type Product, formatPrice } from "@/lib/data/products";
import { generateWhatsAppUrl } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  product: Product;
}

const specIconMap: Record<string, React.ReactNode> = {
  battery: <Battery size={16} />,
  gauge: <Gauge size={16} />,
  zap: <Zap size={16} />,
  shield: <Shield size={16} />,
};

export function ProductPageClient({ product }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const heroItems = heroRef.current?.querySelectorAll("[data-hero-item]");
      if (heroItems && heroItems.length > 0) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.3 }
        );
      }

      // Specs animate in
      const specCards = specsRef.current?.querySelectorAll(".spec-card");
      if (specCards && specCards.length > 0) {
        gsap.fromTo(
          specCards,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: specsRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Highlights
      const highlightItems = highlightsRef.current?.querySelectorAll(".highlight-item");
      if (highlightItems && highlightItems.length > 0) {
        gsap.fromTo(
          highlightItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-void pt-24">
      {/* Back nav */}
      <div className="container-wide py-6">
        <a
          href="/#catalogo"
          className="inline-flex items-center gap-2 text-steel hover:text-white transition-colors duration-300 text-sm cursor-none"
        >
          <ArrowLeft size={16} /> Voltar ao catálogo
        </a>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="container-wide pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Image */}
          <div className="sticky top-28">
            {/* Main image */}
            <div className="relative aspect-square rounded-3xl bg-obsidian border border-white/8 overflow-hidden mb-4 flex items-center justify-center"
              data-hero-item>
              <img
                src={product.galleryImages[galleryIdx] || product.coverImage}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${product.accentColor}08 0%, transparent 70%)`,
                }}
              />
            </div>

            {/* Gallery thumbs */}
            <div className="grid grid-cols-4 gap-3">
              {product.galleryImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIdx(i)}
                  className={`aspect-square rounded-xl border transition-all duration-300 cursor-none overflow-hidden ${
                    i === galleryIdx
                      ? "border-electric bg-electric/10"
                      : "border-white/5 bg-obsidian hover:border-white/20"
                  }`}
                >
                  <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Badge */}
            {product.badge && (
              <div data-hero-item className="mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                  style={{ background: `${product.accentColor}20`, color: product.accentColor, border: `1px solid ${product.accentColor}40` }}
                >
                  {product.badge}
                </span>
              </div>
            )}

            {/* Name */}
            <h1 data-hero-item className="text-4xl sm:text-6xl font-black text-white leading-none mb-3">
              {product.name}
            </h1>

            {/* Tagline */}
            <p data-hero-item className="text-xl font-light mb-6" style={{ color: product.accentColor }}>
              {product.tagline}
            </p>

            {/* Description */}
            <p data-hero-item className="text-steel leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            <div data-hero-item className="mb-8">
              <p className="text-xs text-steel uppercase tracking-widest mb-3">Cores disponíveis</p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/60 transition-all duration-300 cursor-none"
                    style={{ background: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div data-hero-item className="p-8 rounded-2xl border border-white/8 bg-obsidian mb-8 ds-card">
              <div className="text-steel text-xs mb-1 uppercase tracking-wider">Preço</div>
              <div className="text-4xl font-black text-white mb-1">{formatPrice(product.price)}</div>
              <div className="text-steel text-sm">
                ou {product.installments}x de{" "}
                <span className="text-electric font-bold">{formatPrice(product.priceInstallment)}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-400" />
                <span className="text-steel text-sm">Frete grátis para capitais</span>
              </div>
            </div>

            {/* CTAs */}
            <div data-hero-item className="flex gap-6">
              <MagneticButton
                href={generateWhatsAppUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
                className="flex-1 justify-center"
                id={`product-whatsapp-${product.slug}`}
              >
                <MessageCircle size={18} />
                Comprar via WhatsApp
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 bg-obsidian border-y border-white/5">
        <div className="container-wide">
          <h2 className="text-3xl font-black text-white mb-12 text-center">Especificações Técnicas</h2>
          <div ref={specsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="spec-card p-6 rounded-2xl border border-white/5 bg-void text-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${product.accentColor}15`, color: product.accentColor }}
                >
                  {specIconMap[spec.icon || ""] || <Zap size={16} />}
                </div>
                <div className="text-2xl font-black text-white leading-none mb-1">
                  {spec.value}
                  {spec.unit && <span className="text-steel text-sm ml-1">{spec.unit}</span>}
                </div>
                <div className="text-steel text-xs uppercase tracking-wider">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-void">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-3xl font-black text-white mb-4">Diferenciais</h2>
              <p className="text-steel mb-10">{product.longDescription}</p>

              <div ref={highlightsRef} className="space-y-4">
                {product.highlights.map((highlight, i) => (
                  <div key={i} className="highlight-item flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.accentColor}20` }}
                    >
                      <CheckCircle size={14} style={{ color: product.accentColor }} />
                    </div>
                    <span className="text-chrome text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="p-12 rounded-3xl border border-white/8 bg-obsidian text-center ds-card">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: `${product.accentColor}15`, border: `2px solid ${product.accentColor}30` }}
              >
                <Zap size={32} style={{ color: product.accentColor }} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Pronto para comprar?</h3>
              <p className="text-steel text-sm mb-8">
                Fale com um especialista YESU Brasil agora mesmo. Atendimento personalizado e entrega para todo o Brasil.
              </p>
              <MagneticButton
                href={generateWhatsAppUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
                className="w-full justify-center"
                id={`product-page-cta-${product.slug}`}
              >
                <MessageCircle size={18} />
                Pedir minha {product.name}
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
