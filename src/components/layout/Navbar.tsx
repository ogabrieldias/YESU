"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { generateWhatsAppUrl } from "@/lib/utils";

const navLinks = [
  { label: "Modelos", href: "#catalogo" },
  { label: "Tecnologia", href: "#problema" },
  { label: "Calculadora", href: "#calculadora" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3.5 }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
      });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none flex justify-center">
        <nav
          ref={navRef}
          id="navbar"
          className={cn(
            "w-full max-w-7xl transition-all duration-500 opacity-0 rounded-[2rem] border pointer-events-auto",
            scrolled
              ? "py-3 px-6 sm:px-8 bg-obsidian/80 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
              : "py-4 px-6 sm:px-8 bg-transparent border-transparent"
          )}
        >
          <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group cursor-none">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              style={{ filter: "invert(1) brightness(2)" }}>
              <Image
                src="/images/logo-transparent.png"
                alt="YESU Brasil"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base leading-none tracking-wider">YESU</span>
              <span className="text-steel text-[10px] tracking-[0.3em] uppercase leading-tight">Brasil</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-chrome text-sm tracking-wider uppercase hover:text-white hover:text-electric transition-colors duration-300 cursor-none relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <MagneticButton
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              id="nav-whatsapp-cta"
              className="hidden md:inline-flex"
            >
              Falar no WhatsApp
            </MagneticButton>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white p-2 cursor-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-void/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-3xl font-bold text-white hover:text-electric transition-colors duration-300 cursor-none tracking-wider"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </button>
          ))}
          <MagneticButton
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="mt-4"
          >
            Falar no WhatsApp
          </MagneticButton>
        </div>
      )}
    </>
  );
}
