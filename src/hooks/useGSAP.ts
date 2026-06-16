"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(
  callback: (gsapInstance: typeof gsap) => gsap.core.Timeline | void,
  deps: React.DependencyList = []
) {
  const contextRef = useRef<gsap.Context | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(gsap);
    }, containerRef);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { containerRef };
}

export function useScrollReveal(
  selector: string = ".reveal-hidden",
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  }
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options?.y ?? 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.8,
          stagger: options?.stagger ?? 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: options?.start ?? "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selector, options?.y, options?.duration, options?.stagger, options?.start]);

  return containerRef;
}
