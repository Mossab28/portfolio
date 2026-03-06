"use client";

import { RefObject, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

type UseMouseParallaxOptions = {
  enabled?: boolean;
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export function useMouseParallax(
  containerRef: RefObject<HTMLElement | null>,
  options: UseMouseParallaxOptions = {}
) {
  const {
    enabled = true,
    stiffness = 120,
    damping = 26,
    mass = 0.7
  } = options;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness, damping, mass });
  const y = useSpring(rawY, { stiffness, damping, mass });

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rawX.set(px);
      rawY.set(py);
    };

    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };

    element.addEventListener("mousemove", handleMove, { passive: true });
    element.addEventListener("mouseleave", reset, { passive: true });

    return () => {
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", reset);
    };
  }, [containerRef, enabled, rawX, rawY]);

  return { x, y };
}
