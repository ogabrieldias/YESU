"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Disable scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    const particlesContainer = particlesRef.current;

    // Create electric particles
    if (particlesContainer) {
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${Math.random() > 0.5 ? "#FF6B00" : "#FF8C00"};
          border-radius: 50%;
          opacity: 0;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          box-shadow: 0 0 ${size * 3}px #FF6B00;
          pointer-events: none;
        `;
        particlesContainer.appendChild(particle);

        // Animate each particle
        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          scale: Math.random() * 2 + 0.5,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2,
        });
      }
    }

    // Logo entrance
    tl.fromTo(
      logoRef.current,
      { scale: 0.3, opacity: 0, filter: "blur(20px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
    )
      // Pulse glow on logo
      .to(logoRef.current, {
        filter: "drop-shadow(0 0 30px #FF6B00) drop-shadow(0 0 60px #FF6B0066)",
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4")
      // Progress counting
      .to(
        { val: 0 },
        {
          val: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: function () {
            const v = Math.round(this.targets()[0].val);
            if (percentRef.current) percentRef.current.textContent = `${v}%`;
            if (progressBarRef.current)
              progressBarRef.current.style.width = `${v}%`;
          },
        },
        "-=0.2"
      )
      // Electric pulse on logo
      .to(logoRef.current, {
        scale: 1.05,
        filter: "drop-shadow(0 0 50px #FF6B00) drop-shadow(0 0 100px #FF6B00)",
        duration: 0.3,
        ease: "power2.in",
      }, "-=0.5")
      // Explosion: logo scales up and fades
      .to(logoRef.current, {
        scale: 8,
        opacity: 0,
        filter: "blur(40px)",
        duration: 0.8,
        ease: "power4.in",
      })
      // Fade out the entire preloader
      .to(
        preloaderRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = "none";
            }
            document.body.style.overflow = "";
          },
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={preloaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Electric particles background */}
      <div
        ref={particlesRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      {/* Radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "pulse 2s ease-in-out infinite",
        }}
      />

      {/* Logo */}
      <div
        ref={logoRef}
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          opacity: 0,
          filter: "invert(1) brightness(2)",
        }}
      >
        <Image
          src="/images/logo-transparent.png"
          alt="YESU Brasil"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Brand name */}
      <div
        style={{
          marginTop: "24px",
          letterSpacing: "0.4em",
          fontSize: "11px",
          textTransform: "uppercase",
          color: "#8A8A8A",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Mobilidade Elétrica
      </div>

      {/* Progress section */}
      <div
        ref={progressRef}
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "260px",
          textAlign: "center",
        }}
      >
        <span
          ref={percentRef}
          style={{
            display: "block",
            fontSize: "12px",
            color: "#FF6B00",
            letterSpacing: "0.2em",
            marginBottom: "12px",
            fontFamily: "monospace",
          }}
        >
          0%
        </span>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              width: "0%",
              background: "linear-gradient(90deg, #FF6B00, #FF8C00)",
              boxShadow: "0 0 10px #FF6B00",
              borderRadius: "1px",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
