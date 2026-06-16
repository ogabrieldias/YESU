"use client";

import { useEffect, useRef, useState } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { position, positionRef };
}
