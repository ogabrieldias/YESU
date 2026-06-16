"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  trigger?: boolean;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  className = "",
  trigger = true,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current || !counterRef.current) return;

    hasAnimated.current = true;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (!counterRef.current) return;
        const formatted = new Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(obj.val);
        counterRef.current.textContent = `${prefix}${formatted}${suffix}`;
      },
    });
  }, [trigger, value, duration, decimals, prefix, suffix]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
