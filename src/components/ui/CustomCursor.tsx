"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { positionRef } = useMousePosition();

  // Detect touch devices — run once on mount
  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return; // Skip cursor setup on mobile/touch

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Hide default cursor
    document.body.style.cursor = "none";

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3.out" });
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const handleMouseEnterLink = () => setIsHovering(true);
    const handleMouseLeaveLink = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Track interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterLink);
      el.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    // MutationObserver to watch for new elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      newElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterLink);
        el.removeEventListener("mouseleave", handleMouseLeaveLink);
        el.addEventListener("mouseenter", handleMouseEnterLink);
        el.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, [positionRef, isTouchDevice]);

  // Animate cursor on state changes
  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: isHovering ? 1.8 : isClicking ? 0.8 : 1,
      opacity: isHovering ? 0.5 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isHovering, isClicking]);

  // Don't render cursor elements on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: "-20px",
          left: "-20px",
          width: "40px",
          height: "40px",
          border: "1px solid rgba(255, 107, 0, 0.8)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          top: "-3px",
          left: "-3px",
          width: "6px",
          height: "6px",
          backgroundColor: "#FF6B00",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />
    </>
  );
}
