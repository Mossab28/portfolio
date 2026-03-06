"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
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
    className: "left-[58%] top-[10%] w-16 md:left-[60%] md:top-[12%] md:w-20 lg:w-24",
    depth: 25,
    label: "About",
    side: "right"
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

/* ── Section content ── */
const SECTION_CONTENT: Record<string, ReactNode> = {
  polyhedron: (
    <div className="space-y-4">
      <p>
        Hello! I&apos;m <span className="text-sand">Lakhdar Berache</span>, an engineering student passionate about technological innovation.
        I develop projects combining <span className="text-bronze">AI, data science, and web development</span>.
      </p>
      <p>Curious and adaptable, I aim to apply my skills in a stimulating and collaborative environment.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://github.com/aminssutt" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-sand transition-colors hover:bg-white/10">GitHub</a>
        <a href="https://www.linkedin.com/in/lakhdar-berache-62095426a/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-sand transition-colors hover:bg-white/10">LinkedIn</a>
      </div>
      <div className="mt-6 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-bronze">Languages</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { lang: "French", pct: 100 }, { lang: "Arabic", pct: 95 },
            { lang: "English", pct: 90 }, { lang: "Korean", pct: 30 }
          ].map((l) => (
            <div key={l.lang} className="space-y-1">
              <span className="text-xs text-white/50">{l.lang}</span>
              <div className="h-1 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full bg-bronze/70" style={{ width: `${l.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  phone: (
    <div className="space-y-6">
      <div className="border-l-2 border-bronze/40 pl-4">
        <h4 className="text-sm font-semibold text-sand">Software & AI Engineer Intern — Renault Korea</h4>
        <p className="mt-1 text-xs text-bronze">Sep 2025 – Feb 2026 · South Korea</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-white/55">
          <li>Connected health & fitness app with real-time 3D avatar and AI-driven recommendations (IoT data).</li>
          <li>AI-powered podcast generation platform with NLP & TTS models.</li>
          <li>In-car Theme Store app for dashboard personalization.</li>
          <li>Personalized in-car AI assistant with LLM, RAG, multi-channel APIs (Spotify, calendar, email, calls).</li>
        </ul>
      </div>
      <div className="border-l-2 border-bronze/40 pl-4">
        <h4 className="text-sm font-semibold text-sand">Web Developer — FabulousCreations Studio</h4>
        <p className="mt-1 text-xs text-bronze">Jan 2025 – Ongoing · Paris</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-white/55">
          <li>One-page website for an interior designer with portfolio & booking system.</li>
        </ul>
      </div>
      <div className="border-l-2 border-bronze/40 pl-4">
        <h4 className="text-sm font-semibold text-sand">Internship — Columbus Café</h4>
        <p className="mt-1 text-xs text-bronze">Jul 2024 – Aug 2024 · Paris</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-white/55">
          <li>Team supervision, cost management, online promotion, website creation.</li>
        </ul>
      </div>
    </div>
  ),

  "text-card": (
    <div className="space-y-6">
      <div className="border-l-2 border-olive/50 pl-4">
        <h4 className="text-sm font-semibold text-sand">Specialization in AI — KAIST</h4>
        <p className="mt-1 text-xs text-bronze">Feb 2025 – Jul 2025 · Daejeon, South Korea</p>
        <p className="mt-2 text-xs text-white/55">Exchange semester. Data Science, AI/ML, Start-Up Management.</p>
      </div>
      <div className="border-l-2 border-olive/50 pl-4">
        <h4 className="text-sm font-semibold text-sand">Engineering in Informatics & Systems — UTT</h4>
        <p className="mt-1 text-xs text-bronze">2024 – 2027 · Troyes, France</p>
        <p className="mt-2 text-xs text-white/55">Integrated preparatory program (2022–2024). Database management, Software Engineering.</p>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-bronze">Certifications</p>
        <ul className="list-inside list-disc text-xs text-white/55">
          <li>AI Generative — Microsoft (2024)</li>
          <li>Build a Computer Vision App with Azure — Microsoft (2024)</li>
        </ul>
      </div>
    </div>
  ),

  cubes: (
    <div className="space-y-5">
      {[
        { name: "Hera Studio", desc: "AI platform to create personalized coloring books for kids.", tech: "React, Firebase, Stripe, OpenAI", link: "https://www.herastudio.art" },
        { name: "Frelsi", desc: "Personal creative blog with interactive notebook system.", tech: "React, Supabase, Vercel", link: "https://frelsi.vercel.app" },
        { name: "Fabulous Creations", desc: "One-page website for an interior designer with booking.", tech: "HTML, CSS, JavaScript", link: "https://aminssutt.github.io/Fabulous/" },
        { name: "RePLY", desc: "Intelligent wearable device using ML for heart rate monitoring.", tech: "ML, IoT, Python, Hardware", link: null },
        { name: "AI Adventure", desc: "Game-based learning platform for AI education at KAIST.", tech: "React, ML, Python, Gamification", link: null },
        { name: "Great Teachers", desc: "Platform connecting students with AI assistant support.", tech: "AI, React, Node.js", link: null },
      ].map((p) => (
        <div key={p.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex items-start justify-between">
            <h4 className="text-sm font-semibold text-sand">{p.name}</h4>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-bronze hover:underline">Visit ↗</a>
            )}
          </div>
          <p className="mt-1 text-xs text-white/55">{p.desc}</p>
          <p className="mt-2 text-[10px] text-bronze/70">{p.tech}</p>
        </div>
      ))}
    </div>
  ),

  "toggle-stack": (
    <div className="space-y-4">
      <p className="text-xs text-white/55">Technologies I work with daily.</p>
      <div className="flex flex-wrap gap-2">
        {["React", "Next.js", "TypeScript", "Python", "Node.js", "Firebase", "Supabase", "TailwindCSS", "Framer Motion", "GSAP", "OpenAI API", "LangChain", "ROS2", "PostgreSQL", "Stripe", "Vercel", "Git"].map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-sand/80">{t}</span>
        ))}
      </div>
    </div>
  ),

  palette: (
    <div className="space-y-4">
      <p>UI/UX enthusiast with a focus on minimalist, modern aesthetics and smooth interactions.</p>
      <p>I design with intent — every animation, color choice, and layout decision serves the user experience.</p>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {[
          { color: "#0B0E0B", name: "Obsidian" },
          { color: "#2E4830", name: "Forest" },
          { color: "#6C7F56", name: "Olive" },
          { color: "#B78A59", name: "Bronze" },
          { color: "#EDE8DD", name: "Sand" },
        ].map((c) => (
          <div key={c.name} className="text-center">
            <div className="mx-auto h-8 w-8 rounded-full border border-white/10" style={{ background: c.color }} />
            <p className="mt-1 text-[9px] text-white/40">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  toggle: (
    <div className="space-y-4">
      <p className="text-xs text-white/55">Core competencies and areas of expertise.</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { skill: "AI / Machine Learning", level: 85 },
          { skill: "Web Development", level: 90 },
          { skill: "Data Science", level: 80 },
          { skill: "IoT & Hardware", level: 65 },
          { skill: "UI/UX Design", level: 75 },
          { skill: "Project Management", level: 70 },
        ].map((s) => (
          <div key={s.skill} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/60">{s.skill}</span>
              <span className="text-bronze/60">{s.level}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-olive to-bronze" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  ai: (
    <div className="space-y-4">
      <p>Passionate about <span className="text-bronze">Artificial Intelligence</span>, Machine Learning, and emerging technologies.</p>
      <div className="space-y-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <h4 className="text-sm font-semibold text-sand">AI at Renault</h4>
          <p className="mt-1 text-xs text-white/55">Built an in-car AI assistant with LLM & RAG, and an AI podcast platform with NLP & TTS.</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <h4 className="text-sm font-semibold text-sand">Hera Studio</h4>
          <p className="mt-1 text-xs text-white/55">Created an AI-powered coloring book generator using OpenAI for children&apos;s education.</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <h4 className="text-sm font-semibold text-sand">AI Adventure</h4>
          <p className="mt-1 text-xs text-white/55">Game-based learning platform tested by 30+ KAIST students, promoting active AI learning.</p>
        </div>
      </div>
    </div>
  ),

  dots: (
    <div className="space-y-4">
      <p>Interests & passions that shape who I am beyond code.</p>
      <div className="space-y-3">
        {[
          { emoji: "⚽", title: "Football", desc: "Regional Champion Grand Est 2024. 11 years of competitive play." },
          { emoji: "🏐", title: "Volleyball", desc: "French National Championship participant. PRVB Plessis Robinson." },
          { emoji: "🎨", title: "Art & Design", desc: "Drawing and creative visual expression." },
          { emoji: "🚀", title: "Entrepreneurship", desc: "Building innovative solutions and exploring startup opportunities." },
          { emoji: "🤝", title: "HumanLaw", desc: "Food distribution to homeless and students in need since 2023." },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="text-lg">{item.emoji}</span>
            <div>
              <h4 className="text-sm font-semibold text-sand">{item.title}</h4>
              <p className="text-xs text-white/55">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

/* ── Cross grid for the floor area ── */
function CrossGrid() {
  const crosses = [];
  const cols = 8;
  const rows = 4;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const left = 15 + c * 10;
      const top = r * 22;
      const delay = (r * cols + c) * 0.02;
      crosses.push(
        <span
          key={`${r}-${c}`}
          className="cross-mark absolute text-white/[0.06] transition-all duration-500 hover:text-bronze/60 hover:drop-shadow-[0_0_8px_rgba(183,138,89,0.5)]"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            fontSize: "1.1rem",
            transitionDelay: `${delay}s`
          }}
        >
          ✦
        </span>
      );
    }
  }
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[5] h-[30%] overflow-hidden">
      <div className="relative h-full w-full">{crosses}</div>
    </div>
  );
}

const sceneVariants = {
  idle: { x: "0%", scale: 1 },
  slideLeft: { x: "-42%", scale: 0.88 },
  slideRight: { x: "42%", scale: 0.88 }
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

  const [activeIcon, setActiveIcon] = useState<SceneIcon | null>(null);
  const isOpen = !!activeIcon;

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

  // Avatar parallax — shifts more when panel is open
  const avatarX = useTransform(x, (v) => v * 12);
  const avatarY = useTransform(y, (v) => v * 12);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        variants={sceneVariants}
        animate={slideDirection}
        transition={springTransition}
      >
        <div className="absolute inset-0 bg-black" />

        {/* Glow behind avatar */}
        <div className="pointer-events-none absolute inset-0 z-[8]">
          <div className="absolute left-1/2 top-[38%] h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/20 blur-[120px]" />
          <div className="absolute left-1/2 top-[42%] h-[30vh] w-[30vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/25 blur-[80px]" />
          <div className="absolute left-1/2 top-[36%] h-[18vh] w-[18vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive/20 blur-[60px]" />
        </div>

        {/* Avatar with parallax */}
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

        <CrossGrid />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_44%,rgba(0,0,0,0)_24%,rgba(0,0,0,0.42)_68%,rgba(0,0,0,0.85)_100%)]" />

        {/* Floating icons — fade out when panel is open */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute inset-0 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
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
                  disabled={false}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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

              <div className="mb-4 flex items-center gap-3">
                <Image src={activeIcon.src} alt={activeIcon.alt} width={40} height={40} className="h-8 w-8 object-contain md:h-10 md:w-10" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-bronze md:text-xs">
                    {activeIcon.label}
                  </p>
                  <h2 className="font-[var(--font-display)] text-2xl font-semibold text-sand md:text-3xl lg:text-4xl">
                    {activeIcon.label}
                  </h2>
                </div>
              </div>

              <div className="text-sm leading-relaxed text-white/60 md:text-base">
                {SECTION_CONTENT[activeIcon.id] ?? (
                  <p>Contenu à venir pour <span className="text-sand">{activeIcon.label}</span>.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-away overlay */}
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
