"use client";

import { useRef, ReactNode } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  id?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-electric text-white border border-electric hover:bg-ember hover:border-ember shadow-glow",
  secondary:
    "bg-transparent text-white border border-white/20 hover:border-white/60 hover:bg-white/5",
  ghost: "bg-transparent text-electric border border-transparent hover:border-electric/30",
  whatsapp:
    "bg-[#25D366] text-white border border-[#25D366] hover:bg-[#1ebe5b] hover:border-[#1ebe5b]",
};

const sizeStyles: Record<string, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-4 text-sm",
  lg: "px-10 py-5 text-base",
};

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  href,
  variant = "primary",
  size = "md",
  id,
  target,
  rel,
}: MagneticButtonProps) {
  const magneticRef = useMagneticEffect(strength) as React.RefObject<HTMLAnchorElement | HTMLButtonElement>;

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium tracking-wider uppercase text-xs rounded-full transition-all duration-300 cursor-none select-none relative overflow-hidden group";

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        ref={magneticRef as React.RefObject<HTMLAnchorElement>}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        style={{ willChange: "transform" }}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === "primary" && (
          <span className="absolute inset-0 bg-gradient-to-r from-electric to-ember opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </a>
    );
  }

  return (
    <button
      id={id}
      ref={magneticRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      style={{ willChange: "transform" }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-electric to-ember opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
}
