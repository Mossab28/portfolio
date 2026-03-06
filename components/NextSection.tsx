"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FEATURE_CARDS = [
  {
    title: "Direction Artistique",
    text: "Palette earth tones, lumiere diffuse et surfaces sombres pour un rendu premium immediat."
  },
  {
    title: "Interaction Immersive",
    text: "Parallax souris progressif et transitions fluides calibrees pour garder une sensation haut de gamme."
  },
  {
    title: "Stack Moderne",
    text: "Next.js App Router + Tailwind + Framer Motion + GSAP ScrollTrigger dans une base maintenable."
  }
];

gsap.registerPlugin(ScrollTrigger);

export default function NextSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-reveal='heading']", {
        opacity: 0,
        y: 48,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 74%",
          once: true
        }
      });

      gsap.from("[data-reveal='card']", {
        opacity: 0,
        y: 58,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true
        }
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#070806] py-24 md:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_6%,rgba(108,127,86,0.22),rgba(108,127,86,0)_46%),radial-gradient(circle_at_84%_0%,rgba(156,106,63,0.2),rgba(156,106,63,0)_48%),linear-gradient(180deg,#070806_0%,#0f130f_100%)]" />

      <div className="section-shell">
        <div data-reveal="heading" className="max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-bronze md:text-xs">
            Next Section
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-sand md:text-5xl">
            Experience The Project
          </h2>
          <p className="mt-4 text-sm text-white/72 md:text-base">
            Cette section prend le relais apres le zoom du hero. Les cartes
            restent volontairement sobres pour conserver l&apos;esthetique premium.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURE_CARDS.map((card) => (
            <article
              key={card.title}
              data-reveal="card"
              className="glass-panel p-6 shadow-ambient"
            >
              <h3 className="text-xl text-sand">{card.title}</h3>
              <p className="mt-3 text-sm text-white/70">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
