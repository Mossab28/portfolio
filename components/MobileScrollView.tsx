"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { t, getIconLabel, type Lang } from "@/lib/i18n";

/* ── Language flags ── */
const FLAGS: Record<Lang, string> = { en: "🇬🇧", fr: "🇫🇷", ko: "🇰🇷" };
const LANG_ORDER: Lang[] = ["en", "fr", "ko"];

/* ── Scattered icon positions — around center, avoiding title band ── */
const MOBILE_ICONS = [
  { id: "polyhedron", src: "/scene/icon-polyhedron.png", sectionId: "about", left: "22%", top: "10%", floatDelay: 0 },
  { id: "text-card", src: "/scene/icon-text-card.png", sectionId: "education", left: "72%", top: "8%", floatDelay: 0.5 },
  { id: "phone", src: "/scene/icon-phone.png", sectionId: "experience", left: "14%", top: "30%", floatDelay: 1.2 },
  { id: "dots", src: "/scene/icon-color-dots.png", sectionId: "certifications", left: "76%", top: "32%", floatDelay: 0.8 },
  { id: "toggle-stack", src: "/scene/icon-toggle-stack.png", sectionId: "tech-stack", left: "12%", top: "60%", floatDelay: 1.5 },
  { id: "cubes", src: "/scene/icon-cubes.png", sectionId: "projects", left: "78%", top: "58%", floatDelay: 0.3 },
  { id: "ai", src: "/scene/icon-ai.png", sectionId: "ai", left: "18%", top: "78%", floatDelay: 1.8 },
  { id: "palette", src: "/scene/icon-palette.png", sectionId: "passions", left: "72%", top: "76%", floatDelay: 1.0 },
];

const INTERNSHIP_CERTIFICATE_URL = "/Internship%20Certificate_Lakhdar%20BERACHE.pdf";
const RESUME_EN_URL = "/CV_Berache_EN.pdf";
const isPdfPreviewUrl = (url: string) => /\.pdf(?:$|[?#])/i.test(url);

/* ── Section definition ── */
type SectionDef = {
  id: string;
  iconId: string;
  content: ReactNode;
};

/* ── Build sections content (same data as desktop but formatted for mobile) ── */
function buildSections(
  lang: Lang,
  onPreview: (url: string) => void
): SectionDef[] {
  return [
    {
      id: "about",
      iconId: "polyhedron",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-white/70">
            {t("about_hello", lang)}{" "}
            <span className="text-sand">Lakhdar Berache</span>
            {t("about_desc", lang)}{" "}
            <span className="text-bronze">{t("about_skills", lang)}</span>
            {t("about_projects_combine", lang)}
          </p>
          <p className="text-sm text-white/50">{t("about_sub", lang)}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://github.com/aminssutt"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-sand transition-colors hover:bg-white/10"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lakhdar-berache-62095426a/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-sand transition-colors hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-bronze">
              {t("about_langTitle", lang)}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: t("lang_french", lang), pct: 100 },
                { name: t("lang_arabic", lang), pct: 95 },
                { name: t("lang_english", lang), pct: 90 },
                { name: t("lang_korean", lang), pct: 30 },
              ].map((l) => (
                <div key={l.name} className="space-y-1">
                  <span className="text-xs text-white/50">{l.name}</span>
                  <div className="h-1 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-bronze/70"
                      style={{ width: `${l.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "education",
      iconId: "text-card",
      content: (
        <div className="space-y-4">
          {[
            {
              logo: "/scene/KAIST_logo.svg.png",
              alt: "KAIST",
              title: t("edu_kaist_title", lang),
              period: t("edu_kaist_period", lang),
              desc: t("edu_kaist_desc", lang),
            },
            {
              logo: "/scene/Logo_UTT_2018.svg.png",
              alt: "UTT",
              title: t("edu_utt_title", lang),
              period: t("edu_utt_period", lang),
              desc: t("edu_utt_desc", lang),
            },
          ].map((e) => (
            <div
              key={e.alt}
              className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <Image
                src={e.logo}
                alt={e.alt}
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 rounded-lg object-contain"
              />
              <div>
                <h4 className="text-base font-semibold text-sand">
                  {e.title}
                </h4>
                <p className="mt-0.5 text-xs text-bronze">{e.period}</p>
                <p className="mt-1.5 text-sm text-white/55">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "experience",
      iconId: "phone",
      content: (
        <div className="space-y-5">
          {[
            {
              company: "Renault Korea",
              logoSrc: "/scene/renault logo.webp",
              role: t("exp_renault_role", lang),
              period: t("exp_renault_period", lang),
              certificateUrl: INTERNSHIP_CERTIFICATE_URL,
              bullets: [
                t("exp_renault_b1", lang),
                t("exp_renault_b2", lang),
                t("exp_renault_b3", lang),
                t("exp_renault_b4", lang),
                t("exp_renault_b5", lang),
              ],
            },
            {
              company: "FabulousCreations Studio",
              logoSrc: "/scene/logo fabulous.png",
              role: t("exp_fabulous_role", lang),
              period: t("exp_fabulous_period", lang),
              bullets: [t("exp_fabulous_b1", lang)],
            },
            {
              company: "Columbus Café",
              logoSrc: "/scene/logo columbus.png",
              role: t("exp_columbus_role", lang),
              period: t("exp_columbus_period", lang),
              bullets: [t("exp_columbus_b1", lang)],
            },
          ].map((exp) => (
            <div key={exp.company} className="flex items-start gap-3">
              <Image
                src={exp.logoSrc}
                alt={exp.company}
                width={48}
                height={48}
                className="h-11 w-11 shrink-0 rounded-lg object-contain"
              />
              <div className="flex-1 border-l-2 border-bronze/40 pl-3">
                <h4 className="text-sm font-semibold text-sand">
                  {exp.role} — {exp.company}
                </h4>
                <p className="mt-0.5 text-xs text-bronze">{exp.period}</p>
                <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-xs text-white/55">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {exp.certificateUrl && (
                  <button
                    type="button"
                    onClick={() => onPreview(exp.certificateUrl)}
                    className="mt-2 inline-flex rounded-md border border-bronze/30 bg-bronze/10 px-2 py-0.5 text-[10px] font-medium text-bronze"
                  >
                    Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "certifications",
      iconId: "dots",
      content: (
        <div className="space-y-2">
          {[
            {
              icon: (
                <svg className="h-8 w-8 shrink-0" viewBox="0 0 21 21">
                  <rect width="10" height="10" fill="#f25022" />
                  <rect x="11" width="10" height="10" fill="#7fba00" />
                  <rect width="10" height="10" y="11" fill="#00a4ef" />
                  <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
                </svg>
              ),
              name: "AI Generative",
              issuer: "Microsoft",
              link: "https://www.linkedin.com/learning/certificates/5b5281b684492aa1a1337b3128d78a276ff7214baafb905a8662ba6aaeec7d88",
            },
            {
              icon: (
                <svg className="h-8 w-8 shrink-0" viewBox="0 0 21 21">
                  <rect width="10" height="10" fill="#f25022" />
                  <rect x="11" width="10" height="10" fill="#7fba00" />
                  <rect width="10" height="10" y="11" fill="#00a4ef" />
                  <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
                </svg>
              ),
              name: "Build a Computer Vision App with Azure",
              issuer: "Microsoft",
              link: null,
            },
            {
              icon: (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#232F3E]">
                  <span className="text-[10px] font-black tracking-tight text-[#FF9900]">
                    aws
                  </span>
                </div>
              ),
              name: "Getting Started with AWS Generative AI",
              issuer: "AWS",
              link: "https://www.coursera.org/account/accomplishments/verify/NML0N2TUUO4V",
            },
            {
              icon: (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#0F62FE]/15">
                  <span className="text-xs font-black tracking-wider text-[#0F62FE]">
                    IBM
                  </span>
                </div>
              ),
              name: "Build RAG Applications",
              issuer: "IBM",
              link: "https://www.coursera.org/account/accomplishments/verify/JU6HGK3RB32O",
            },
            {
              icon: (
                <Image
                  src="/scene/board infinity logo.jpg"
                  alt="Board Infinity"
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 rounded object-contain"
                />
              ),
              name: "Build Intelligent Agents Using DeepSeek & N8N",
              issuer: "Board Infinity",
              link: "https://www.coursera.org/account/accomplishments/verify/JO22VAEMU1AO",
            },
          ].map((c) => {
            const inner = (
              <>
                {c.icon}
                <div className="flex-1">
                  <p className="text-xs text-sand">{c.name}</p>
                  <p className="text-[10px] text-white/40">{c.issuer}</p>
                </div>
                {c.link && (
                  <svg className="h-3.5 w-3.5 shrink-0 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                )}
              </>
            );
            return c.link ? (
              <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-bronze/30 hover:bg-white/[0.05]"
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.name}
                className="flex items-center gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
              >
                {inner}
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: "tech-stack",
      iconId: "toggle-stack",
      content: (
        <div className="space-y-5">
          <p className="text-xs text-white/50">{t("tech_intro", lang)}</p>
          {[
            {
              cat: t("tech_frontend", lang),
              techs: [
                "React",
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Framer Motion",
                "GSAP",
              ],
            },
            {
              cat: t("tech_backend", lang),
              techs: [
                "Node.js",
                "Firebase",
                "Supabase",
                "PostgreSQL",
                "Stripe",
              ],
            },
            {
              cat: t("tech_aidata", lang),
              techs: [
                "Gemini API",
                "LangChain",
                "Python",
                "TensorFlow",
                "ML/DL",
                "NLP",
                "Computer Vision",
                "LLM / RAG",
              ],
            },
            {
              cat: t("tech_tools", lang),
              techs: ["Git", "Vercel", "Docker", "ROS2", "Figma"],
            },
          ].map((g) => (
            <div key={g.cat}>
              <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-bronze">
                <span className="text-[7px] text-bronze/50">◆</span> {g.cat}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {g.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-sand/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-white/[0.06] pt-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-bronze">
              {t("tech_profSkills", lang)}
            </h4>
            <div className="space-y-3">
              {[
                {
                  area: t("tech_webMobile", lang),
                  items: [
                    t("skill_fullstack", lang),
                    t("skill_restapi", lang),
                    t("skill_realtime", lang),
                    "PWA",
                    "SEO",
                  ],
                },
                {
                  area: t("tech_dataAnalytics", lang),
                  items: [
                    t("skill_datapipe", lang),
                    t("skill_statanalysis", lang),
                    t("skill_visualization", lang),
                    "SQL / NoSQL",
                  ],
                },
                {
                  area: t("tech_softSkills", lang),
                  items: [
                    t("skill_leadership", lang),
                    "Agile XP",
                    t("skill_speaking", lang),
                    t("skill_crosscultural", lang),
                  ],
                },
              ].map((group) => (
                <div key={group.area}>
                  <h5 className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-sand/50">
                    {group.area}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "projects",
      iconId: "cubes",
      content: (
        <div className="space-y-3">
          {[
            {
              name: "Hera Studio",
              desc: t("proj_hera_desc", lang),
              tech: "React, Firebase, Stripe, OpenAI",
              link: "https://www.herastudio.art",
            },
            {
              name: "CarChat",
              desc: t("proj_carchat_desc", lang),
              tech: "React, Vite, Framer Motion",
              link: "https://www.carchat.online",
            },
            {
              name: "Fabulous Creations",
              desc: t("proj_fabulous_desc", lang),
              tech: "HTML, CSS, JavaScript",
              link: "https://aminssutt.github.io/Fabulous/",
            },
            {
              name: "RePLY",
              desc: t("proj_reply_desc", lang),
              tech: "ML, IoT, Python, Hardware",
              link: null,
            },
            {
              name: "AI Adventure",
              desc: t("proj_aiadventure_desc", lang),
              tech: "React, ML, Python, Gamification",
              link: null,
            },
            {
              name: "Great Teachers",
              desc: t("proj_greatteachers_desc", lang),
              tech: "AI, React, Node.js",
              link: null,
            },
          ].map((p) => (
            <div
              key={p.name}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-semibold text-sand">{p.name}</h4>
                {p.link && (
                  <button
                    type="button"
                    onClick={() => onPreview(p.link!)}
                    className="shrink-0 rounded-md border border-bronze/30 bg-bronze/10 px-2 py-0.5 text-[10px] text-bronze"
                  >
                    {t("proj_visit", lang)}
                  </button>
                )}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                {p.desc}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tech.split(", ").map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] text-bronze/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "ai",
      iconId: "ai",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-white/60">
            {t("ai_intro", lang)}{" "}
            <span className="text-bronze">{t("ai_keyword", lang)}</span>
            {t("ai_intro2", lang)}
          </p>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <h4 className="text-sm font-semibold text-sand">
              {t("ai_renault_title", lang)}
            </h4>
            <p className="mt-1 text-xs text-white/55">
              {t("ai_renault_desc", lang)}
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <h4 className="text-sm font-semibold text-sand">
              {t("ai_hera_title", lang)}
            </h4>
            <p className="mt-1 text-xs text-white/55">
              {t("ai_hera_desc", lang)}
            </p>
          </div>
          <div className="rounded-lg border border-dashed border-bronze/20 bg-bronze/[0.03] px-4 py-3 text-center">
            <p className="text-xs text-bronze/60">
              {t("ai_comingSoon", lang)}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "passions",
      iconId: "palette",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-white/60">{t("passions_intro", lang)}</p>
          {[
            {
              emoji: "⚽",
              title: t("passion_football", lang),
              desc: t("passion_football_d", lang),
            },
            {
              emoji: "🏐",
              title: t("passion_volleyball", lang),
              desc: t("passion_volleyball_d", lang),
            },
            {
              emoji: "🎨",
              title: t("passion_art", lang),
              desc: t("passion_art_d", lang),
            },
            {
              emoji: "🚀",
              title: t("passion_entrepreneurship", lang),
              desc: t("passion_entrepreneurship_d", lang),
            },
            {
              emoji: "🤝",
              title: t("passion_humanlaw", lang),
              desc: t("passion_humanlaw_d", lang),
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <h4 className="text-sm font-semibold text-sand">
                  {item.title}
                </h4>
                <p className="mt-0.5 text-xs text-white/55">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];
}

/* ── Scroll-animated section wrapper ── */
function ScrollSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  return (
    <div ref={ref} className="flex items-center justify-center px-4 py-14">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Main MobileScrollView ── */
export default function MobileScrollView() {
  const [lang, setLang] = useState<Lang>("en");
  const [showContact, setShowContact] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [previewBlocked, setPreviewBlocked] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeIconId, setActiveIconId] = useState<string | null>(null);
  const isPdfPreview = !!previewUrl && isPdfPreviewUrl(previewUrl);

  const openPreview = (url: string) => {
    setLangOpen(false);
    setShowContact(false);
    setActiveIconId(null);
    setPreviewLoaded(false);
    setPreviewBlocked(false);
    setPreviewUrl(url);
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewLoaded(false);
    setPreviewBlocked(false);
  };

  const openExternal = (url: string) => {
    if (typeof window === "undefined") return;
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.assign(url);
    }
  };

  useEffect(() => {
    if (!previewUrl || isPdfPreviewUrl(previewUrl)) return;
    const timer = window.setTimeout(() => {
      if (!previewLoaded) {
        setPreviewBlocked(true);
      }
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [previewUrl, previewLoaded]);

  const sections = buildSections(lang, openPreview);
  const activeSection = sections.find((section) => section.iconId === activeIconId) ?? null;
  const activeIcon = MOBILE_ICONS.find((icon) => icon.id === activeIconId) ?? null;

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-obsidian">
      {/* ── Hero — full viewport ── */}
      <div className="relative h-[100dvh] overflow-hidden">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/scene/background%20mobile.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* ── Title — centered with typewriter animation ── */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <h1 className="font-[var(--font-display)] text-[2rem] font-semibold tracking-[0.10em] text-bronze/80 text-center leading-tight drop-shadow-[0_2px_16px_rgba(183,138,89,0.3)]">
            {t("portfolioTitle", lang).split("").map((char, i) => (
              <motion.span
                key={`${lang}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.04, delay: 0.4 + i * 0.06 }}
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block w-[2px] h-[1.1em] bg-bronze/60 align-middle ml-0.5 animate-blink" />
          </h1>
        </div>

        {/* ── Floating icons ── */}
        {MOBILE_ICONS.map((icon) => (
          <motion.button
            key={icon.id}
            type="button"
            onClick={() => setActiveIconId(icon.id)}
            className="absolute z-20 flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: icon.left, top: icon.top }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0, 6, 0],
              x: [0, 4, 0, -4, 0],
            }}
            transition={{
              opacity: { duration: 0.4, delay: 0.3 + icon.floatDelay * 0.3 },
              scale: { duration: 0.4, delay: 0.3 + icon.floatDelay * 0.3, type: "spring", stiffness: 200, damping: 18 },
              y: { repeat: Infinity, duration: 4 + icon.floatDelay, ease: "easeInOut", delay: icon.floatDelay },
              x: { repeat: Infinity, duration: 5 + icon.floatDelay, ease: "easeInOut", delay: icon.floatDelay + 0.5 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={icon.src}
              alt={getIconLabel(icon.id, lang)}
              width={72}
              height={72}
              className="h-[4.5rem] w-[4.5rem] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            />
            <span className="text-[9px] tracking-wide text-white/40 text-center max-w-[70px] leading-tight">
              {getIconLabel(icon.id, lang)}
            </span>
          </motion.button>
        ))}

        {/* ── Bottom bar (fixed in hero) ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-3 pb-4 pt-8 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent">
          {/* Language switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((p) => !p)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-bronze/40 bg-bronze/15 text-sm"
            >
              {FLAGS[lang]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className="absolute bottom-10 left-0 flex flex-col gap-1 rounded-xl border border-white/10 bg-obsidian/95 backdrop-blur-md p-1.5 shadow-xl"
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                >
                  {LANG_ORDER.filter((l) => l !== lang).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition-all hover:bg-white/10"
                    >
                      {FLAGS[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Explore hint */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] tracking-[0.12em] text-white/30">
              {t("clickToExplore", lang)}
            </p>
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-bronze/40"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/aminssutt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <svg className="h-3.5 w-3.5 text-sand/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/lakhdar-berache-62095426a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <svg className="h-3.5 w-3.5 text-sand/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setShowContact(true)}
              className="rounded-full border border-bronze/30 bg-bronze/10 px-3 py-1.5 text-[9px] font-medium tracking-wider text-bronze"
            >
              Freelance
            </button>
          </div>
        </div>
      </div>

      {/* ── Scroll sections ── */}
      {false && sections.map((section) => (
        <div key={section.id} id={`section-${section.id}`}>
          <ScrollSection>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[8px] text-bronze/50">◆</span>
                <p className="text-[10px] uppercase tracking-[0.3em] text-bronze">
                  {getIconLabel(section.iconId, lang)}
                </p>
              </div>
              <h2 className="mb-4 font-[var(--font-display)] text-xl font-semibold text-sand">
                {getIconLabel(section.iconId, lang)}
              </h2>
              <div className="text-sm leading-relaxed text-white/60">
                {section.content}
              </div>
            </div>
          </ScrollSection>
        </div>
      ))}

      {/* ── Footer ── */}
      {false && (
      <div className="flex min-h-[30vh] flex-col items-center justify-center gap-4 px-6 py-12">
        <h2 className="font-[var(--font-display)] text-lg font-semibold text-sand">
          {t("getInTouch", lang)}
        </h2>
        <p className="max-w-xs text-center text-xs text-white/40">
          {t("contactDesc", lang)}
        </p>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <a
            href="mailto:lakhdarberache@gmail.com"
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-sand transition-colors hover:border-bronze/30"
          >
            lakhdarberache@gmail.com
          </a>
          <a
            href="tel:+33781500771"
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-sand transition-colors hover:border-bronze/30"
          >
            +33 7 81 50 07 71
          </a>
        </div>
      </div>
      )}

      {/* Centered content popup */}
      <AnimatePresence>
        {activeSection && activeIcon && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/65"
              onClick={() => setActiveIconId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
              <div className="glass-panel relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-5 shadow-ambient">
                <button
                  type="button"
                  onClick={() => setActiveIconId(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sand/70 transition-colors hover:bg-white/10 hover:text-sand"
                >
                  X
                </button>
                <div className="mb-3 flex items-center gap-2 pr-8">
                  <Image
                    src={activeIcon.src}
                    alt={getIconLabel(activeIcon.id, lang)}
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-bronze">
                      {getIconLabel(activeIcon.id, lang)}
                    </p>
                    <h2 className="font-[var(--font-display)] text-xl font-semibold text-sand">
                      {getIconLabel(activeIcon.id, lang)}
                    </h2>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto pr-1 text-sm leading-relaxed text-white/60">
                  {activeSection.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact modal */}
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
              className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-obsidian p-6 shadow-2xl"
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
              <h3 className="font-[var(--font-display)] text-xl font-semibold text-sand">
                {t("getInTouch", lang)}
              </h3>
              <p className="mt-2 text-sm text-white/50">
                {t("contactDesc", lang)}
              </p>
              <div className="mt-5 space-y-2">
                <a
                  href="mailto:lakhdarberache@gmail.com"
                  className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-sand transition-colors hover:border-bronze/30"
                >
                  lakhdarberache@gmail.com
                </a>
                <a
                  href="tel:+33781500771"
                  className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-sand transition-colors hover:border-bronze/30"
                >
                  +33 7 81 50 07 71
                </a>
                <a
                  href={RESUME_EN_URL}
                  download="Lakhdar_Berache_Resume_EN.pdf"
                  className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-sand transition-colors hover:border-bronze/30"
                >
                  Resume (EN)
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
            onClick={closePreview}
          >
            <motion.div
              className="relative mx-2 h-[90vh] w-[96vw] overflow-hidden rounded-2xl border border-white/10 bg-obsidian shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openExternal(previewUrl)}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-sand/70"
                  >
                    {t("proj_visit", lang)}
                  </button>
                  <button
                    type="button"
                    onClick={closePreview}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-sand"
                  >
                    ✕
                  </button>
                </div>
              </div>
              {previewBlocked && !isPdfPreview && (
                <div className="absolute inset-x-0 top-10 z-20 flex h-[calc(100%-2.5rem)] flex-col items-center justify-center gap-3 bg-obsidian/95 px-6 text-center">
                  <p className="text-xs text-white/55">
                    Preview unavailable on this mobile browser.
                  </p>
                  <button
                    type="button"
                    onClick={() => openExternal(previewUrl)}
                    className="rounded-md border border-bronze/30 bg-bronze/10 px-3 py-1 text-[10px] text-bronze"
                  >
                    {t("proj_visit", lang)}
                  </button>
                </div>
              )}
              {isPdfPreview ? (
                <iframe
                  src={previewUrl}
                  title="PDF preview"
                  className="h-[calc(100%-2.5rem)] w-full border-0 bg-white"
                  onLoad={() => {
                    setPreviewLoaded(true);
                    setPreviewBlocked(false);
                  }}
                  onError={() => setPreviewBlocked(true)}
                />
              ) : (
                <iframe
                  src={previewUrl}
                  title="Preview"
                  className="h-[calc(100%-2.5rem)] w-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                  onLoad={() => {
                    setPreviewLoaded(true);
                    setPreviewBlocked(false);
                  }}
                  onError={() => setPreviewBlocked(true)}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
