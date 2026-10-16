"use client";

import React, { useRef, useState, useEffect } from "react";
import { EXPERIENCES } from "@/lib/data";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through this specific container
      const totalDist = rect.height + windowHeight * 0.4;
      const currentDist = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));
      setTimelineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      aria-label="Professional Path &amp; Experience"
      className="section-vertical relative w-full border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16 rv" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="tag-mono mb-2">05 — Journey</p>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl">
            Single continuous <span className="serif-accent">path.</span>
          </h2>
          <p className="font-sans text-sm text-[var(--mute)] mt-3 max-w-lg">
            Chronological progression across enterprise front-end engineering, web operations, and academic foundations.
          </p>
        </div>

        {/* Timeline Container with Dynamic Spine */}
        <div ref={containerRef} className="relative pl-6 sm:pl-10">
          {/* Background Track (hairline line) */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-[var(--line)]"
            aria-hidden="true"
          />

          {/* Active Ink Spine (scales with scroll progress) */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-4 w-[2px] bg-[var(--ink)] origin-top transition-all duration-150"
            style={{
              height: "calc(100% - 32px)",
              transform: `scaleY(${timelineProgress})`,
            }}
            aria-hidden="true"
          />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCES.map((exp, index) => {
              const itemThreshold = (index + 0.4) / (EXPERIENCES.length + 1);
              const isLit = timelineProgress >= itemThreshold;

              return (
                <div key={exp.id} className="relative group">
                  {/* Timeline Stop Dot */}
                  <div
                    className={`absolute -left-[23px] sm:-left-[31px] top-6 w-[18px] h-[18px] rounded-full border-2 transition-all duration-400 flex items-center justify-center ${
                      isLit
                        ? "border-[var(--ink)] bg-[var(--ink)] shadow-sm scale-110"
                        : "border-[var(--line)] bg-[var(--paper)] scale-90"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isLit ? "bg-white" : "bg-transparent"
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <div
                    className={`card-standard p-6 sm:p-8 transition-all duration-500 ${
                      isLit
                        ? "shadow-md bg-white border border-[var(--line)]"
                        : "bg-white/60 opacity-80"
                    }`}
                  >
                    {/* Period & Type Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[var(--soft)] text-[var(--ink)]">
                        {exp.period}
                      </span>
                      <span className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider">
                        {exp.location}
                      </span>
                    </div>

                    {/* Role / Degree & Company / University */}
                    <div className="mb-4">
                      <h3 className="font-sans font-bold text-xl sm:text-2xl text-[var(--ink)] tracking-tight">
                        {exp.roleOrDegree}
                      </h3>
                      <p className="font-serif italic text-lg text-[var(--mute)]">
                        {exp.companyOrSchool}
                      </p>
                    </div>

                    {/* Verbatim Bullet Points */}
                    <ul className="space-y-2 mt-4 pt-4 border-t border-[var(--line)] text-xs sm:text-sm text-[var(--ink-2)] font-sans">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[var(--mute)] mt-1 text-xs">↳</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* End Dashed Card: Next — Your team? */}
            <div className="relative group">
              <div
                className={`absolute -left-[23px] sm:-left-[31px] top-6 w-[18px] h-[18px] rounded-full border-2 border-dashed transition-all duration-400 flex items-center justify-center ${
                  timelineProgress >= 0.95
                    ? "border-[var(--ink)] bg-[var(--ink)]"
                    : "border-[var(--line)] bg-[var(--paper)]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              <div className="rounded-[28px] border-2 border-dashed border-[var(--line)] p-8 sm:p-10 bg-transparent hover:bg-white transition-all text-center flex flex-col items-center justify-center">
                <span className="font-mono text-xs uppercase text-[var(--mute)] tracking-widest mb-2">
                  The Future
                </span>
                <h3 className="heading-display text-2xl sm:text-3xl text-[var(--ink)] mb-3">
                  Next — <span className="serif-accent">Your team?</span>
                </h3>
                <p className="font-sans text-sm text-[var(--mute)] max-w-md mb-6">
                  Available for senior front-end engineering, design system development, and modern web application opportunities.
                </p>
                <a
                  href="#contact"
                  className="btn-pill btn-primary text-xs"
                >
                  Start a conversation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
