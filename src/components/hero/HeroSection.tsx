"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {


      /*
        IMPORTANTE PARA LCP:
        O headline NÃO recebe opacity:0.
        Ele aparece imediatamente.
      */

      gsap.set(
        [
          taglineRef.current,
          ctaRef.current,
          scrollIndicatorRef.current,
        ],
        {
          opacity: 0,
          y: 40,
        }
      );


      const tl = gsap.timeline();


      // Tagline
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });


      // CTA
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.3"
      );


      // Scroll indicator
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );



      /*
        PARALLAX
      */

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,

        onUpdate: (self) => {

          if (videoRef.current) {
            gsap.set(videoRef.current, {
              y: self.progress * 150,
            });
          }


          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              opacity:
                0.4 + self.progress * 0.4,
            });
          }


          if (contentRef.current) {
            gsap.set(contentRef.current, {
              y:
                self.progress * -80,
              opacity:
                1 - self.progress * 1.5,
            });
          }

        },

      });



      // Bounce scroll
      gsap.to(
        scrollIndicatorRef.current,
        {
          y: 10,
          duration: 1.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        }
      );


    }, heroRef);


    return () => {
      ctx.revert();
    };


  }, []);



  const scrollToNext = () => {
    const next =
      document.getElementById("marquee");

    if (next) {
      next.scrollIntoView({
        behavior: "smooth",
      });
    }
  };



  return (

    <section
      ref={heroRef}
      id="hero"
      className="
        relative
        w-full
        min-h-[calc(100svh-1rem)]
        sm:min-h-[calc(100svh-2rem)]
        md:min-h-[calc(100svh-3rem)]
        overflow-hidden
        bg-transparent
        flex
        items-center
        justify-center
      "
    >


      {/* VIDEO */}

      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
        style={{
          transform:"scale(1.1)",
          willChange:"transform",
        }}
      />



      {/* OVERLAY */}

      <div
        ref={overlayRef}
        className="
          absolute
          inset-0
        "
        style={{
          background:
          "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.85) 100%)",

          opacity:0.6,
        }}
      />



      {/* ACCENTS */}

      <div className="
        absolute
        top-0
        left-0
        right-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-electric
        to-transparent
        opacity-60
      "/>


      <div className="
        absolute
        bottom-0
        left-0
        right-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-electric
        to-transparent
        opacity-30
      "/>




      {/* CONTENT */}

      <div
        ref={contentRef}
        className="
          relative
          z-10
          text-center
          max-w-6xl
          mx-auto
        "
        style={{
          willChange:
          "transform, opacity",
        }}
      >



        {/* TAGLINE */}

        <p
          ref={taglineRef}
          className="
            inline-flex
            items-center
            gap-3
            text-electric
            text-xs
            font-semibold
            tracking-[0.4em]
            uppercase
          "
        >

          <span className="
            w-8
            h-px
            bg-electric
          "/>

          Mobilidade Elétrica Premium

          <span className="
            w-8
            h-px
            bg-electric
          "/>

        </p>




        {/* H1 - ELEMENTO LCP */}

        <h1
          ref={headlineRef}
          className="
            text-5xl
            sm:text-7xl
            lg:text-9xl
            font-black
            text-white
            leading-none
            tracking-tight
            mb-8
          "
          style={{
            textShadow:
            "0 0 40px rgba(255,107,0,0.18)",
          }}
        >

          Mude sua
          <br />

          <span
            className="text-gradient-electric"
            style={{
              background:
              "linear-gradient(135deg,#FF6B00 0%,#FF8C00 50%,#FF6B00 100%)",

              WebkitBackgroundClip:
              "text",

              WebkitTextFillColor:
              "transparent",

              backgroundClip:
              "text",
            }}
          >
            mobilidade
          </span>

          <br />

          para sempre.

        </h1>





        {/* CTA */}

        <div
          ref={ctaRef}
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-8
          "
        >

          <MagneticButton
            href="#catalogo"
            variant="primary"
            size="lg"
            id="hero-cta-primary"
            onClick={()=>{
              document
              .querySelector("#catalogo")
              ?.scrollIntoView({
                behavior:"smooth",
              });
            }}
          >

            Conheça os Modelos

          </MagneticButton>


        </div>




        {/* STATS */}

        <div className="
          flex
          items-center
          justify-center
          gap-12
          mt-5
        ">

          {[
            {
              value:"90%",
              label:"Economia em combustível"
            },

            {
              value:"0",
              label:"Emissões de CO₂"
            },

            {
              value:"120km",
              label:"Autonomia máxima"
            },

          ].map((stat)=>(
            <div
              key={stat.label}
              className="
                text-center
                hidden
                sm:block
              "
            >

              <div className="
                text-2xl
                font-black
                text-electric
              ">
                {stat.value}
              </div>


              <div className="
                text-steel
                text-xs
                tracking-wider
                uppercase
                mt-1
              ">
                {stat.label}
              </div>


            </div>
          ))}


        </div>



      </div>





      {/* SCROLL */}

      <div
        ref={scrollIndicatorRef}
        className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          flex
          flex-col
          items-center
          gap-2
          cursor-none
        "
        onClick={scrollToNext}
      >

        <span className="
          text-steel
          text-[10px]
          tracking-[0.3em]
          uppercase
        ">
          Scroll
        </span>


        <ChevronDown
          size={16}
          className="text-electric"
        />

      </div>


    </section>

  );
}