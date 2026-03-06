"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import FloatingIcon from "@/components/FloatingIcon";
import { useMouseParallax } from "@/hooks/useMouseParallax";

type IconSide = "left" | "right" | "center";

type SceneIcon = {
  id: string;
  src: string;
  alt: string;
  className: string;
  depth: number;
  label: string;
  side: IconSide;
};

const SCENE_ICONS: SceneIcon[] = [
  {
    id: "cubes",
    src: "/scene/icon-cubes.png",
    alt: "Cubes",
    className: "left-[16%] top-[14%] w-16 md:left-[20%] md:top-[16%] md:w-20 lg:w-24",
    depth: 40,
    label: "Projects",
    side: "left"
  },
  {
    id: "phone",
    src: "/scene/icon-phone.png",
    alt: "Phone",
    className: "left-[12%] top-[34%] w-20 md:left-[18%] md:top-[34%] md:w-24 lg:w-28",
    depth: 55,
    label: "Experience",
    side: "left"
  },
  {
    id: "text-card",
    src: "/scene/icon-text-card.png",
    alt: "Text Card",
    className: "left-[14%] top-[54%] w-24 md:left-[20%] md:top-[54%] md:w-32 lg:w-36",
    depth: 35,
    label: "Education",
    side: "left"
  },
  {
    id: "polyhedron",
    src: "/scene/icon-polyhedron.png",
    alt: "Polyhedron",
    className: "left-1/2 top-[10%] w-16 -translate-x-1/2 md:top-[12%] md:w-20 lg:w-24",
    depth: 25,
    label: "About",
    side: "center"
  },
  {
    id: "toggle-stack",
    src: "/scene/icon-toggle-stack.png",
    alt: "Toggle Stack",
    className: "right-[14%] top-[20%] w-20 md:right-[20%] md:top-[22%] md:w-24 lg:w-28",
    depth: 50,
    label: "Tech Stack",
    side: "right"
  },
  {
    id: "palette",
    src: "/scene/icon-palette.png",
    alt: "Palette",
    className: "right-[12%] top-[38%] w-20 md:right-[18%] md:top-[40%] md:w-24 lg:w-28",
    depth: 45,
    label: "Design",
    side: "right"
  },
  {
    id: "toggle",
    src: "/scene/icon-toggle.png",
    alt: "Toggle",
    className: "right-[20%] top-[50%] w-16 md:right-[24%] md:top-[50%] md:w-20 lg:w-[5.5rem]",
    depth: 30,
    label: "Skills",
    side: "right"
  },
  {
    id: "ai",
    src: "/scene/icon-ai.png",
    alt: "AI",
    className: "right-[14%] top-[60%] w-20 md:right-[20%] md:top-[62%] md:w-24 lg:w-28",
    depth: 60,
    label: "AI & Innovation",
    side: "right"
  },
  {
    id: "dots",
    src: "/scene/icon-color-dots.png",
    alt: "Color Dots",
    className: "left-[24%] top-[70%] w-14 md:left-[28%] md:top-[70%] md:w-[4.5rem] lg:w-20",
    depth: 20,
    label: "Branding",
    side: "left"
  }
];

const sceneSlideVariants = {
  idle: { x: "0%", scale: 1 },
  slideLeft: { x: "-35%", scale: 0.85 },
  slideRight: { x: "35%", scale: 0.85 }
};

const panelVariants = {
  hiddenRight: { x: "100%", opacity: 0 },
  hiddenLeft: { x: "-100%", opacity: 0 },
  visible: { x: "0%", opacity: 1 }
};

const springTransition = {
  type: "spring" as const,
  stiffness: 80,
  damping: 22,
  mass: 0.9
};

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = useMouseParallax(sectionRef, { enabled: true });

  // Avatar parallax (slower than icons for depth effect)
  const avatarX = useTransform(x, (v) => v * 12);
  const avatarY = useTransform(y, (v) => v * 12);

  const [activeIcon, setActiveIcon] = useState<SceneIcon | null>(null);

  const handleIconClick = useCallback((icon: SceneIcon) => {
    setActiveIcon(icon);
  }, []);

  const handleClose = useCallback(() => {
    setActiveIcon(null);
  }, []);

  const slideDirection = activeIcon
    ? activeIcon.side === "right" || activeIcon.side === "center"
      ? "slideLeft"
      : "slideRight"
    : "idle";

  const panelSide = activeIcon
    ? activeIcon.side === "right" || activeIcon.side === "center"
      ? "right"
      : "left"
    : null;

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Scene wrapper — slides on icon click */}
      <motion.div
        className="absolute inset-0"
        variants={sceneSlideVariants}
        animate={slideDirection}
        transition={springTransition}
      >
        {/* Black base */}
        <div className="absolute inset-0 bg-black" />

        {/* Avatar / background image with parallax */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ x: avatarX, y: avatarY }}
        >
          <Image
            src="/scene/background-main.png"
            alt="Avatar"
            fill
            priority
            className="object-contain object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Vignette overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_44%,rgba(0,0,0,0)_24%,rgba(0,0,0,0.42)_68%,rgba(0,0,0,0.85)_100%)]" />

        {/* Floating icons — above everything */}
        <div className="absolute inset-0 z-30">
          {SCENE_ICONS.map((icon) => (
            <FloatingIcon
              key={icon.id}
              src={icon.src}
              alt={icon.alt}
              className={icon.className}
              label={icon.label}
              side={icon.side}
              mouseX={x}
              mouseY={y}
              depth={icon.depth}
              onClick={() => handleIconClick(icon)}
              disabled={!!activeIcon}
            />
          ))}
        </div>
      </motion.div>

      {/* Content panel */}
      <AnimatePresence>
        {activeIcon && panelSide && (
          <motion.div
            key={activeIcon.id}
            className={`absolute top-0 z-40 flex h-full w-[55%] flex-col justify-center px-10 md:px-16 ${
              panelSide === "right" ? "right-0" : "left-0"
            }`}
            variants={panelVariants}
            initial={panelSide === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit={panelSide === "right" ? "hiddenRight" : "hiddenLeft"}
            transition={springTransition}
          >
            <div className="glass-panel relative max-h-[80vh] overflow-y-auto p-8 shadow-ambient md:p-12">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sand/70 transition-colors hover:bg-white/10 hover:text-sand"
              >
                ✕
              </button>

              <p className="text-[10px] uppercase tracking-[0.3em] text-bronze md:text-xs">
                {activeIcon.label}
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-sand md:text-4xl lg:text-5xl">
                {activeIcon.label}
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/60 md:text-base">
                <p>
                  Contenu à venir — cette section accueillera le détail de&nbsp;
                  <span className="text-sand">{activeIcon.label}</span>.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back overlay — click anywhere outside panel to close */}
      <AnimatePresence>
        {activeIcon && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
