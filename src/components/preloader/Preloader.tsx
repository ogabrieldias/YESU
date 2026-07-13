"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const particlesContainer = particlesRef.current;

      // Criar partículas leves
      if (particlesContainer) {
        const amount =
          window.innerWidth < 768 ? 8 : 20;

        for (let i = 0; i < amount; i++) {
          const particle = document.createElement("div");

          const size = Math.random() * 3 + 1;

          Object.assign(particle.style, {
            position: "absolute",
            width: `${size}px`,
            height: `${size}px`,
            background:
              Math.random() > 0.5
                ? "#FF6B00"
                : "#FF8C00",
            borderRadius: "50%",
            opacity: "0",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${size * 3}px #FF6B00`,
          });

          particlesContainer.appendChild(particle);


          gsap.to(particle, {
            opacity: 0.5,
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }


      // Entrada do logo
      tl.fromTo(
        logoRef.current,
        {
          scale: 0.7,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        }
      );


      // Barra de progresso
      tl.to(
        { value: 0 },
        {
          value: 100,
          duration: 0.9,
          ease: "power2.inOut",

          onUpdate() {
            const value = Math.round(
              this.targets()[0].value
            );

            if (percentRef.current) {
              percentRef.current.textContent =
                `${value}%`;
            }

            if (progressBarRef.current) {
              progressBarRef.current.style.width =
                `${value}%`;
            }
          },
        }
      );


      // Explosão final
      tl.to(logoRef.current, {
        scale: 3,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.4,
        ease: "power3.in",
      });


      // Remover preloader
      tl.to(
        preloaderRef.current,
        {
          opacity: 0,
          duration: 0.35,

          onComplete() {
            if (preloaderRef.current) {
              preloaderRef.current.style.display =
                "none";
            }

            document.body.style.overflow = "";
          },
        }
      );


    }, preloaderRef);


    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };

  }, []);


  return (
    <div
      ref={preloaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >

      {/* partículas */}
      <div
        ref={particlesRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />


      {/* brilho */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(255,107,0,.18), transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />


      {/* Logo */}
      <div
        ref={logoRef}
        style={{
          position: "relative",
          width: 180,
          height: 180,
          opacity: 0,
          filter: "invert(1) brightness(2)",
        }}
      >
        <Image
          src="/images/logo-transparent.png"
          alt="YESU Brasil"
          fill
          sizes="180px"
          style={{
            objectFit: "contain",
          }}
        />
      </div>


      {/* Texto */}
      <div
        style={{
          marginTop: 20,
          letterSpacing: ".4em",
          fontSize: 11,
          textTransform: "uppercase",
          color: "#8A8A8A",
          fontFamily:
            "Inter, sans-serif",
        }}
      >
        Mobilidade Elétrica
      </div>


      {/* Progresso */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: 260,
          textAlign: "center",
        }}
      >

        <span
          ref={percentRef}
          style={{
            display: "block",
            marginBottom: 10,
            color: "#FF6B00",
            fontSize: 12,
            fontFamily: "monospace",
          }}
        >
          0%
        </span>


        <div
          style={{
            height: 1,
            background:
              "rgba(255,255,255,.12)",
            overflow: "hidden",
          }}
        >

          <div
            ref={progressBarRef}
            style={{
              width: "0%",
              height: "100%",
              background:
                "linear-gradient(90deg,#FF6B00,#FF8C00)",
              boxShadow:
                "0 0 10px #FF6B00",
            }}
          />

        </div>

      </div>


    </div>
  );
}