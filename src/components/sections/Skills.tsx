"use client";

import React, { useState } from "react";
import { SKILLS, SKILL_FAMILIES, SkillItem, SkillFamily } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function Skills() {
  const [selectedFamily, setSelectedFamily] = useState<SkillFamily | "All">("All");
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS[0]);

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="section-vertical relative w-full border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 rv" style={{ "--i": 0 } as React.CSSProperties}>
          <div>
            <p className="tag-mono mb-2">02 — Stack</p>
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl">
              Periodic table of my <span className="serif-accent">stack.</span>
            </h2>
          </div>

          {/* Family Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedFamily("All")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                selectedFamily === "All"
                  ? "bg-[var(--ink)] text-white shadow-sm"
                  : "bg-white text-[var(--mute)] hover:text-[var(--ink)] border border-[var(--line)]"
              }`}
            >
              All ({SKILLS.length})
            </button>
            {SKILL_FAMILIES.map((family) => {
              const count = SKILLS.filter((s) => s.family === family).length;
              const isSelected = selectedFamily === family;
              return (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(family)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                    isSelected
                      ? "bg-[var(--ink)] text-white shadow-sm"
                      : "bg-white text-[var(--mute)] hover:text-[var(--ink)] border border-[var(--line)]"
                  }`}
                >
                  {family} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout: Periodic Table Grid (8 cols desktop / 4 cols mobile) + Inspector Panel */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Grid Container */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 sm:gap-3">
              {SKILLS.map((skill, index) => {
                const row = Math.floor(index / 8);
                const col = index % 8;
                const matches =
                  selectedFamily === "All" || skill.family === selectedFamily;
                const isCurrent = activeSkill.name === skill.name;

                return (
                  <button
                    key={skill.name}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onFocus={() => setActiveSkill(skill)}
                    onClick={() => setActiveSkill(skill)}
                    aria-label={`${skill.name}, ${skill.family} element`}
                    className={`group relative aspect-square p-2 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 ${
                      matches ? "opacity-100 scale-100" : "opacity-25 grayscale scale-95 pointer-events-none"
                    } ${
                      isCurrent
                        ? "bg-[var(--ink)] text-white shadow-xl -translate-y-1 ring-2 ring-[var(--ink)]"
                        : "bg-white text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink-2)] hover:shadow-md hover:-translate-y-0.5"
                    }`}
                    style={{
                      transitionDelay: `${(row + col) * 20}ms`,
                    }}
                  >
                    {/* Top Row: Atomic # and Tiny Family Indicator */}
                    <div className="flex items-center justify-between w-full font-mono text-[9px] sm:text-[10px]">
                      <span className={isCurrent ? "text-white/70" : "text-[var(--faint)]"}>
                        {skill.atomicNumber.toString().padStart(2, "0")}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isCurrent ? "bg-white" : "bg-[var(--faint)] group-hover:bg-[var(--ink)]"
                        }`}
                      />
                    </div>

                    {/* Middle: 2-Letter Symbol */}
                    <div className="my-auto text-center">
                      <span className="font-serif italic font-bold text-xl sm:text-2xl tracking-normal">
                        {skill.symbol}
                      </span>
                    </div>

                    {/* Bottom: Name */}
                    <div className="w-full truncate font-sans text-[10px] sm:text-[11px] font-medium tracking-tight">
                      {skill.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Inspector Panel (320px desktop) */}
          <div className="w-full lg:w-[320px] lg:sticky lg:top-28 shrink-0">
            <div className="card-standard p-6 sm:p-8 flex flex-col justify-between min-h-[460px] border border-[var(--line)] shadow-lg">
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between pb-4 border-b border-[var(--line)] mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)]">
                    Inspector · #{activeSkill.atomicNumber.toString().padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[var(--soft)] text-[var(--ink)] font-semibold">
                    {activeSkill.family}
                  </span>
                </div>

                {/* Pop Logo Display (150px) */}
                <div className="relative w-full h-[160px] flex items-center justify-center my-4 bg-[#fcfbfa] rounded-2xl border border-[var(--line)] overflow-hidden">
                  <div
                    key={activeSkill.name}
                    className="transform animate-in fade-in zoom-in-75 duration-300 flex items-center justify-center"
                  >
                    <TechLogo
                      logoKey={activeSkill.logoKey || "code"}
                      size={100}
                      showGlow={true}
                    />
                  </div>
                </div>

                {/* Skill Name & Symbol */}
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif italic text-3xl font-bold text-[var(--ink)]">
                      {activeSkill.symbol}
                    </span>
                    <h3 className="font-sans font-bold text-xl text-[var(--ink)]">
                      {activeSkill.name}
                    </h3>
                  </div>
                  <p className="font-mono text-xs text-[var(--mute)] mt-1">
                    Family: {activeSkill.family}
                  </p>
                </div>
              </div>

              {/* Related Projects in Resume */}
              <div className="mt-6 pt-4 border-t border-[var(--line)]">
                <span className="font-mono text-[10px] uppercase text-[var(--mute)] tracking-wider block mb-2">
                  Applied in Résumé Projects:
                </span>
                <div className="flex flex-col gap-1.5">
                  {activeSkill.projects.map((proj) => (
                    <div
                      key={proj}
                      className="font-sans text-xs text-[var(--ink)] bg-[var(--soft)]/50 px-3 py-1.5 rounded-lg flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
                      <span className="truncate">{proj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
