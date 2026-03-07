"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { t, getIconLabel, type Lang } from "@/lib/i18n";

/* ── Language flags ── */
const FLAGS: Record<Lang, string> = { en: "🇬🇧", fr: "🇫🇷", ko: "🇰🇷" };
const LANG_ORDER: Lang[] = ["en", "fr", "ko"];

/* ── Section definition ── */
type SectionDef = {
  id: string;
  iconId: string;
  content: ReactNode;
};

/* ── Scroll-animated section wrapper — fade in/out with slide ── */
function ScrollSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div ref={ref} className="flex items-center justify-center px-4 sm:px-8 py-14 sm:py-20">
      <motion.div
        className="w-full max-w-lg sm:max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Burger menu — responsive for mobile & tablet ── */
function BurgerMenu({
  lang,
  setLang,
  onContact,
  sections,
  scrollToSection,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  onContact: () => void;
  sections: SectionDef[];
  scrollToSection: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative z-50">
      {/* Burger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-bronze/20"
        aria-label="Menu"
      >
        <div className="flex flex-col items-center justify-center gap-[5px]">
          <motion.span
            className="block h-[2px] w-5 sm:w-6 rounded-full bg-sand/70"
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block h-[2px] w-5 sm:w-6 rounded-full bg-sand/70"
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-[2px] w-5 sm:w-6 rounded-full bg-sand/70"
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </div>
      </button>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* Menu panel — slides from right */}
            <motion.div
              className="fixed top-0 right-0 z-50 flex h-full w-[85vw] max-w-[360px] sm:w-[55vw] sm:max-w-[400px] flex-col border-l border-white/[0.06] bg-obsidian/98 backdrop-blur-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 sm:px-6 py-4 sm:py-5">
                <h2 className="font-[var(--font-display)] text-base sm:text-lg font-semibold text-sand tracking-wide">
                  Menu
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-sand"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Language switcher */}
              <div className="flex items-center gap-2 px-5 sm:px-6 py-4 border-b border-white/[0.04]">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/30 mr-2">Lang</span>
                {LANG_ORDER.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border text-base sm:text-lg transition-all ${
                      l === lang
                        ? "border-bronze/40 bg-bronze/15 shadow-[0_0_12px_rgba(183,138,89,0.15)]"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {FLAGS[l]}
                  </button>
                ))}
              </div>

              {/* Section navigation — 2-col grid on tablet, compact list on mobile */}
              <div className="flex-1 px-5 sm:px-6 py-3 sm:py-4">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/25 mb-2 sm:mb-3">
                  Sections
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        scrollToSection(s.id);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-white/60 transition-all hover:bg-white/[0.04] hover:text-sand active:scale-[0.98]"
                    >
                      <span className="text-[6px] text-bronze/50">◆</span>
                      {getIconLabel(s.iconId, lang)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer: social + contact */}
              <div className="border-t border-white/[0.06] px-5 sm:px-6 py-4 sm:py-5 space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://github.com/aminssutt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-sand"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lakhdar-berache-62095426a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-sand"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onContact();
                    setOpen(false);
                  }}
                  className="w-full rounded-xl border border-bronze/30 bg-bronze/10 py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-bronze/80 transition-all hover:bg-bronze/20 hover:text-bronze active:scale-[0.98]"
                >
                  {t("openToWork", lang)}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

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
              bullets: [
                t("exp_renault_b1", lang),
                t("exp_renault_b2", lang),
                t("exp_renault_b3", lang),
                t("exp_renault_b4", lang),
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
              name: "Frelsi",
              desc: t("proj_frelsi_desc", lang),
              tech: "React, Supabase, Vercel",
              link: "https://frelsi.vercel.app",
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
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      onPreview(p.link!);
                    }}
                    className="shrink-0 rounded-md border border-bronze/30 bg-bronze/10 px-2 py-0.5 text-[10px] text-bronze"
                  >
                    {t("proj_visit", lang)}
                  </a>
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

/* ── Main MobileScrollView ── */
export default function MobileScrollView() {
  const [lang, setLang] = useState<Lang>("en");
  const [showContact, setShowContact] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = buildSections(lang, setPreviewUrl);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="mobile-scroll-container relative h-screen overflow-y-auto overflow-x-hidden bg-obsidian">
      {/* ── Hero (full-screen) ── */}
      <div className="relative h-screen flex flex-col overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/10 blur-[140px]" />
          <div className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/12 blur-[90px]" />
        </div>

        {/* Burger menu — fixed so it stays during scroll */}
        <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50">
          <BurgerMenu
            lang={lang}
            setLang={setLang}
            onContact={() => setShowContact(true)}
            sections={sections}
            scrollToSection={scrollToSection}
          />
        </div>

        {/* Title at top */}
        <motion.div
          className="relative z-20 pt-5 sm:pt-7 flex justify-center px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-[var(--font-display)] text-xl sm:text-2xl font-semibold tracking-[0.12em] text-bronze/80 drop-shadow-[0_2px_12px_rgba(183,138,89,0.25)]">
            {t("portfolioTitle", lang)}
          </h1>
        </motion.div>

        {/* Avatar — mobile/tablet specific image, centered & scales UP on smaller screens */}
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/scene/background-tablet-mobile.png"
              alt="Avatar"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </motion.div>

        {/* Scroll hint — at bottom over the avatar */}
        <motion.div
          className="absolute bottom-5 sm:bottom-7 inset-x-0 flex flex-col items-center gap-2 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.15em] text-white/40 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            {t("scrollDown", lang)}
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6 text-bronze/50"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll sections ── */}
      {sections.map((section) => (
        <div key={section.id} id={`section-${section.id}`}>
          <ScrollSection>
            <div className="glass-panel p-5 sm:p-7">
              {/* Section header */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-[8px] text-bronze/50">◆</span>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-bronze">
                  {getIconLabel(section.iconId, lang)}
                </p>
              </div>
              <h2 className="mb-5 font-[var(--font-display)] text-xl sm:text-2xl font-semibold text-sand">
                {getIconLabel(section.iconId, lang)}
              </h2>
              <div className="text-sm sm:text-base leading-relaxed text-white/60">
                {section.content}
              </div>
            </div>
          </ScrollSection>
        </div>
      ))}

      {/* ── Footer section ── */}
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-12">
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
            <svg
              className="h-4 w-4 shrink-0 text-bronze"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            lakhdarberache@gmail.com
          </a>
          <a
            href="tel:+33781500771"
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-sand transition-colors hover:border-bronze/30"
          >
            <svg
              className="h-4 w-4 shrink-0 text-bronze"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            +33 7 81 50 07 71
          </a>
          <a
            href="https://www.linkedin.com/in/lakhdar-berache-62095426a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-sand transition-colors hover:border-bronze/30"
          >
            <svg
              className="h-4 w-4 shrink-0 text-bronze"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Lakhdar Berache
          </a>
        </div>
      </div>

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
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-sand/70"
                  >
                    {t("proj_visit", lang)}
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewUrl(null)}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-sand"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <iframe
                src={previewUrl}
                title="Preview"
                className="h-[calc(100%-2.5rem)] w-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
