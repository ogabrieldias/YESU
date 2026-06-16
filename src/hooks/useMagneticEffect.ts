"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export function useMagneticEffect(strength: number = 0.4) {
  const ref = useRef<HTMLElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || !xTo.current || !yTo.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      xTo.current(deltaX);
      yTo.current(deltaY);
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    xTo.current = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
