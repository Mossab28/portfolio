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
    label: "Tech Stack & Skills",
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
    label: "Passion",
    side: "left"
  }
];

/* ── Section content (function to allow preview callbacks) ── */
function getSectionContent(onPreview: (url: string) => void): Record<string, ReactNode> {
  return {
    polyhedron: (
      <div className="space-y-4">
        <p>
          Hello! I&apos;m <span className="text-sand">Lakhdar Berache</span>, an engineering student passionate about technological innovation.
          I develop projects combining <span className="text-bronze">AI, data science, and web development</span>.
        </p>
        <p className="text-base text-white/55">Curious and adaptable, I aim to apply my skills in a stimulating and collaborative environment.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://github.com/aminssutt" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-sand transition-colors hover:bg-white/10">GitHub</a>
          <a href="https://www.linkedin.com/in/lakhdar-berache-62095426a/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-sand transition-colors hover:bg-white/10">LinkedIn</a>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-bronze">Languages</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { lang: "French", pct: 100 }, { lang: "Arabic", pct: 95 },
              { lang: "English", pct: 90 }, { lang: "Korean", pct: 30 }
            ].map((l) => (
              <div key={l.lang} className="space-y-1">
                <span className="text-sm text-white/50">{l.lang}</span>
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
        {[
          {
            company: "Renault Korea",
            logoSrc: "/scene/renault logo.webp",
            logoClass: "h-12 w-12",
            role: "Software & AI Engineer Intern",
            period: "Sep 2025 – Feb 2026 · South Korea",
            bullets: [
              "Connected health & fitness app with real-time 3D avatar and AI-driven recommendations (IoT data).",
              "AI-powered podcast generation platform with NLP & TTS models.",
              "In-car Theme Store app for dashboard personalization.",
              "Personalized in-car AI assistant with LLM, RAG, multi-channel APIs (Spotify, calendar, email, calls).",
            ]
          },
          {
            company: "FabulousCreations Studio",
            logoSrc: "/scene/logo fabulous.png",
            logoClass: "h-20 w-20",
            role: "Web Developer",
            period: "Jan 2025 – Ongoing · Paris",
            bullets: [
              "One-page website for an interior designer with portfolio & booking system.",
            ]
          },
          {
            company: "Columbus Café",
            logoSrc: "/scene/logo columbus.png",
            logoClass: "h-20 w-20",
            role: "Internship",
            period: "Jul 2024 – Aug 2024 · Paris",
            bullets: [
              "Team supervision, cost management, online promotion, website creation.",
            ]
          },
        ].map((exp) => (
          <div key={exp.company} className="flex items-start gap-4">
            <Image src={exp.logoSrc} alt={exp.company} width={80} height={80} className={`${exp.logoClass} shrink-0 rounded-lg object-contain`} />
            <div className="flex-1 border-l-2 border-bronze/40 pl-4">
              <h4 className="text-base font-semibold text-sand">{exp.role} — {exp.company}</h4>
              <p className="mt-1 text-sm text-bronze">{exp.period}</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-white/55">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    ),

    "text-card": (
      <div className="space-y-6">
        <div className="flex items-start gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <Image src="/scene/KAIST_logo.svg.png" alt="KAIST" width={72} height={72} className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-lg object-contain" />
          <div>
            <h4 className="text-lg font-semibold text-sand">Specialization in AI — KAIST</h4>
            <p className="mt-1 text-sm text-bronze">Feb 2025 – Jul 2025 · Daejeon, South Korea</p>
            <p className="mt-2 text-base text-white/60">Exchange semester focused on Data Science, AI/ML, and Start-Up Management at Korea&apos;s top science &amp; technology university.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <Image src="/scene/Logo_UTT_2018.svg.png" alt="UTT" width={72} height={72} className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-lg object-contain" />
          <div>
            <h4 className="text-lg font-semibold text-sand">Engineering in Informatics &amp; Systems — UTT</h4>
            <p className="mt-1 text-sm text-bronze">2024 – 2027 · Troyes, France</p>
            <p className="mt-2 text-base text-white/60">Integrated preparatory program (2022–2024). Database management, Software Engineering, Systems Architecture.</p>
          </div>
        </div>
        <div className="mt-2 space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-bronze">Certifications</p>
          <div className="space-y-2">
            <div className="flex items-center gap-4 rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <svg className="h-9 w-9 shrink-0" viewBox="0 0 21 21"><rect width="10" height="10" fill="#f25022"/><rect x="11" width="10" height="10" fill="#7fba00"/><rect width="10" height="10" y="11" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg>
              <div>
                <p className="text-sm text-sand">AI Generative</p>
                <p className="text-xs text-white/40">Microsoft</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <svg className="h-9 w-9 shrink-0" viewBox="0 0 21 21"><rect width="10" height="10" fill="#f25022"/><rect x="11" width="10" height="10" fill="#7fba00"/><rect width="10" height="10" y="11" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg>
              <div>
                <p className="text-sm text-sand">Build a Computer Vision App with Azure</p>
                <p className="text-xs text-white/40">Microsoft</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#232F3E]">
                <span className="text-[11px] font-black tracking-tight text-[#FF9900]">aws</span>
              </div>
              <div>
                <p className="text-sm text-sand">Getting Started with AWS Generative AI for Developers</p>
                <p className="text-xs text-white/40">AWS</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#0F62FE]/15">
                <span className="text-sm font-black tracking-wider text-[#0F62FE]">IBM</span>
              </div>
              <div>
                <p className="text-sm text-sand">Build RAG Applications</p>
                <p className="text-xs text-white/40">IBM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-purple-500/15">
                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
              </div>
              <div>
                <p className="text-sm text-sand">Build Intelligent Agents Using DeepSeek &amp; N8N</p>
                <p className="text-xs text-white/40">DeepSeek / N8N</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    cubes: (
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Hera Studio", desc: "AI-powered platform that generates personalized coloring books for children. Users choose themes, characters and styles, then the AI creates unique illustrations ready to print or color digitally.", tech: "React, Firebase, Stripe, OpenAI", link: "https://www.herastudio.art" },
          { name: "Frelsi", desc: "A personal creative blog built around an interactive notebook system. Features real-time editing, markdown support, and a minimalist reading experience with custom themes.", tech: "React, Supabase, Vercel", link: "https://frelsi.vercel.app" },
          { name: "Fabulous Creations", desc: "Elegant one-page portfolio for an interior designer, featuring a curated project gallery, smooth scroll animations, and an integrated booking & contact system.", tech: "HTML, CSS, JavaScript", link: "https://aminssutt.github.io/Fabulous/" },
          { name: "RePLY", desc: "Connected wearable device that monitors heart rate using machine learning algorithms. Processes real-time IoT sensor data for health insights and anomaly detection.", tech: "ML, IoT, Python, Hardware", link: null },
          { name: "AI Adventure", desc: "Gamified learning platform built at KAIST to teach AI concepts interactively. Tested by 30+ students with quizzes, challenges, and progressive difficulty levels.", tech: "React, ML, Python, Gamification", link: null },
          { name: "Great Teachers", desc: "Educational platform connecting students with an AI-powered teaching assistant. Provides instant answers, personalized study plans, and resource recommendations.", tech: "AI, React, Node.js", link: null },
        ].map((p) => (
          <div
            key={p.name}
            className={`group flex flex-col rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-bronze/40 hover:bg-bronze/[0.06] ${p.link ? "cursor-pointer" : ""}`}
            onClick={() => p.link && onPreview(p.link)}
            role={p.link ? "button" : undefined}
            tabIndex={p.link ? 0 : undefined}
            onKeyDown={(e) => { if (p.link && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onPreview(p.link); } }}
          >
            <div className="flex items-start justify-between">
              <h4 className="text-base font-semibold text-sand group-hover:text-bronze transition-colors">{p.name}</h4>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="shrink-0 rounded-md border border-bronze/30 bg-bronze/10 px-2.5 py-1 text-[11px] text-bronze transition-colors hover:bg-bronze/25">
                  Visit ↗
                </a>
              )}
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tech.split(", ").map((t) => (
                <span key={t} className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-bronze/70">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),

    "toggle-stack": (
      <div className="space-y-6">
        <p className="text-sm text-white/50">Technologies, frameworks &amp; competencies I work with.</p>
        {[
          { category: "Frontend", techs: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP"] },
          { category: "Backend", techs: ["Node.js", "Firebase", "Supabase", "PostgreSQL", "Stripe"] },
          { category: "AI & Data", techs: ["Gemini API", "LangChain", "Python", "TensorFlow", "ML/DL", "NLP", "Computer Vision", "LLM / RAG"] },
          { category: "Tools & DevOps", techs: ["Git", "Vercel", "Docker", "ROS2", "Figma"] },
        ].map((cat) => (
          <div key={cat.category}>
            <h4 className="mb-2.5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-bronze">
              <span className="text-[8px] text-bronze/50">◆</span> {cat.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.techs.map((t) => (
                <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-sand/80 transition-colors hover:border-bronze/30 hover:bg-bronze/10">{t}</span>
              ))}
            </div>
          </div>
        ))}
        <div className="border-t border-white/[0.06] pt-5">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-bronze">Professional Skills</h4>
          <div className="space-y-4">
            {[
              { area: "Web & Mobile", items: ["Full-Stack Development", "REST APIs", "Real-time Systems", "PWA", "SEO"] },
              { area: "Data & Analytics", items: ["Data Pipelines", "Statistical Analysis", "Visualization", "SQL / NoSQL"] },
              { area: "Soft Skills", items: ["Team Leadership", "Agile XP", "Public Speaking", "Cross-cultural Collaboration"] },
            ].map((group) => (
              <div key={group.area}>
                <h5 className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-sand/50">{group.area}</h5>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/60">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    ),

    palette: (
      <div className="space-y-5">
        <p className="text-base text-white/60">I design with intent — every animation, color, and layout decision serves the user experience.</p>
        <div className="space-y-3">
          {[
            { principle: "Minimalism", desc: "Clean interfaces, clear hierarchy, no visual noise." },
            { principle: "Motion Design", desc: "Purposeful animations that guide attention and delight." },
            { principle: "Responsive First", desc: "Fluid layouts that feel native on any screen size." },
          ].map((p) => (
            <div key={p.principle} className="rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <h4 className="text-base font-semibold text-sand">{p.principle}</h4>
              <p className="mt-1 text-sm text-white/45">{p.desc}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-bronze">Tools</p>
          <div className="flex flex-wrap gap-2">
            {["Figma", "TailwindCSS", "Framer Motion", "GSAP", "Photoshop"].map((t) => (
              <span key={t} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-sand/70">{t}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-bronze">Palette</p>
          <div className="flex gap-3">
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
      </div>
    ),



    ai: (
      <div className="space-y-4">
        <p className="text-base text-white/60">Passionate about <span className="text-bronze">Artificial Intelligence</span>, Machine Learning, and emerging technologies.</p>
        <div className="space-y-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <h4 className="text-base font-semibold text-sand">AI at Renault</h4>
            <p className="mt-1.5 text-sm text-white/55">Built an in-car AI assistant with LLM &amp; RAG, and an AI podcast platform with NLP &amp; TTS.</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <h4 className="text-base font-semibold text-sand">Hera Studio</h4>
            <p className="mt-1.5 text-sm text-white/55">Created an AI-powered coloring book generator using OpenAI for children&apos;s education.</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <h4 className="text-base font-semibold text-sand">AI Adventure</h4>
            <p className="mt-1.5 text-sm text-white/55">Game-based learning platform tested by 30+ KAIST students, promoting active AI learning.</p>
          </div>
        </div>
      </div>
    ),

    dots: (
      <div className="space-y-5">
        <p className="text-base text-white/60">Interests &amp; passions that shape who I am beyond code.</p>
        <div className="space-y-4">
          {[
            { emoji: "⚽", title: "Football", desc: "Regional Champion Grand Est 2024. 11 years of competitive play at national level." },
            { emoji: "🏐", title: "Volleyball", desc: "French National Championship participant. PRVB Plessis Robinson." },
            { emoji: "🎨", title: "Art & Design", desc: "Drawing and creative visual expression — a lifelong pursuit." },
            { emoji: "🚀", title: "Entrepreneurship", desc: "Building innovative solutions and exploring startup opportunities." },
            { emoji: "🤝", title: "HumanLaw", desc: "Food distribution to homeless and students in need since 2023." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <h4 className="text-lg font-semibold text-sand">{item.title}</h4>
                <p className="mt-0.5 text-base text-white/55">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  };
}

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
  slideLeft: { x: "-30%", scale: 0.92 },
  slideRight: { x: "30%", scale: 0.92 }
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  const isOpen = !!activeIcon;

  const sectionContent = getSectionContent(setPreviewUrl);

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

              <div className="text-base leading-relaxed text-white/60 md:text-lg">
                {sectionContent[activeIcon.id] ?? (
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

      {/* Hint text — bottom center */}
      <AnimatePresence>
        {!isOpen && (
          <motion.p
            className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-xs tracking-[0.15em] text-white/25"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Click an icon to explore
          </motion.p>
        )}
      </AnimatePresence>

      {/* Social links — bottom right */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="absolute bottom-6 right-8 z-30 flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="https://github.com/aminssutt" target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-sand">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/lakhdar-berache-62095426a/" target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-sand">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <button
              type="button"
              onClick={() => setShowContact(true)}
              className="rounded-full border border-bronze/30 bg-bronze/10 px-4 py-1.5 text-xs font-medium text-bronze/70 transition-all duration-300 hover:border-bronze/60 hover:bg-bronze/20 hover:text-bronze hover:shadow-[0_0_16px_rgba(183,138,89,0.3)]"
            >
              Open to Work — Freelance
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact form modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowContact(false)}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-obsidian p-8 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-sand"
              >
                ✕
              </button>
              <h3 className="font-[var(--font-display)] text-2xl font-semibold text-sand">Get in touch</h3>
              <p className="mt-2 text-base text-white/50">Feel free to contact me for any freelance demand or job opportunity!</p>
              <div className="mt-6 space-y-3">
                <a href="mailto:lakhdarberache@gmail.com" className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-sand transition-colors hover:border-bronze/30 hover:bg-bronze/[0.06]">
                  <svg className="h-5 w-5 shrink-0 text-bronze" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  lakhdarberache@gmail.com
                </a>
                <a href="tel:+33781500771" className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-sand transition-colors hover:border-bronze/30 hover:bg-bronze/[0.06]">
                  <svg className="h-5 w-5 shrink-0 text-bronze" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  +33 7 81 50 07 71
                </a>
                <a href="https://www.linkedin.com/in/lakhdar-berache-62095426a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-sand transition-colors hover:border-bronze/30 hover:bg-bronze/[0.06]">
                  <svg className="h-5 w-5 shrink-0 text-bronze" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Lakhdar Berache
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project preview modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setPreviewUrl(null)}
          >
            <motion.div
              className="relative h-[80vh] w-[85vw] max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-obsidian shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <p className="text-xs text-white/40 select-all">{previewUrl}</p>
                <div className="flex items-center gap-2">
                  <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-sand/70 transition-colors hover:bg-white/10">
                    Open ↗
                  </a>
                  <button type="button" onClick={() => setPreviewUrl(null)} className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-sand">✕</button>
                </div>
              </div>
              <iframe
                src={previewUrl}
                title="Site preview"
                className="h-[calc(100%-3rem)] w-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
