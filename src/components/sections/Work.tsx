"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function Work() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section
      id="work"
      aria-label="Selected Projects"
      className="section-vertical relative w-full border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="mb-12 rv" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="tag-mono mb-2">03 — Projects</p>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl">
            Featured project <span className="serif-accent">systems.</span>
          </h2>
        </div>

        {/* Desktop Expanding Accordion Gallery (side-by-side flex) */}
        <div className="hidden lg:flex gap-4 h-[min(78svh,620px)] w-full">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                onFocus={() => setActiveId(project.id)}
                onClick={() => setActiveId(project.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-label={`${project.title} panel`}
                className={`relative rounded-[28px] overflow-hidden border border-[var(--line)] transition-all duration-700 ease-[var(--ease)] focus-visible:outline-2 focus-visible:outline-[var(--ink)] ${
                  isOpen
                    ? "flex-[8] bg-white shadow-xl cursor-default"
                    : "flex-[1] bg-[#fbfaf8] hover:bg-white cursor-pointer"
                }`}
              >
                {isOpen ? (
                  // OPEN PANEL: Left details + Right illustrative UI
                  <div className="h-full w-full p-8 xl:p-10 flex flex-col md:flex-row gap-8 items-stretch overflow-hidden animate-in fade-in duration-500">
                    {/* Left Details */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto pr-2">
                      <div>
                        {/* Number & Kicker */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--soft)] text-[var(--ink)]">
                            {project.index}
                          </span>
                          <span className="tag-mono text-[var(--mute)]">
                            {project.kicker}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-sans font-bold text-2xl xl:text-3xl tracking-tight text-[var(--ink)] mb-4">
                          {project.title}
                        </h3>

                        {/* Description (verbatim from resume) */}
                        <p className="font-sans text-sm xl:text-base text-[var(--ink-2)] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* 2-column feature list */}
                        <div className="mb-6">
                          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-2.5">
                            Key Capabilities
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[var(--ink-2)]">
                            {project.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[var(--mute)] mt-0.5">↳</span>
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="pt-6 border-t border-[var(--line)]">
                        <div className="flex flex-wrap items-center gap-2">
                          {project.tech.map((t) => {
                            const logoKey = t.toLowerCase().replace(/[^a-z0-9]/g, "");
                            return (
                              <div
                                key={t}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--paper)] text-[var(--ink)] font-mono text-xs border border-[var(--line)]"
                              >
                                <TechLogo logoKey={logoKey} size={14} />
                                <span>{t}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right: Illustrative UI (pure CSS/JSX grayscale mockup) */}
                    <div className="w-full md:w-1/2 rounded-2xl bg-[var(--paper)] border border-[var(--line)] p-4 flex flex-col justify-between relative overflow-hidden [clip-path:inset(0%_round_16px)]">
                      {/* Illustrative badge */}
                      <div className="absolute top-3 right-3 z-20">
                        <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-[var(--mute)] border border-[var(--line)] shadow-sm">
                          Illustrative UI
                        </span>
                      </div>

                      {/* Mockup Screen based on Project */}
                      <div className="w-full h-full flex flex-col justify-center">
                        {project.id === "responsive-web-app" && <ResponsiveMockup />}
                        {project.id === "database-driven-app" && <DatabaseMockup />}
                        {project.id === "salesforce-dev-project" && <SalesforceMockup />}
                      </div>
                    </div>
                  </div>
                ) : (
                  // FOLDED SLIM SPINE
                  <div className="h-full w-full py-8 px-4 flex flex-col justify-between items-center select-none">
                    {/* Index */}
                    <span className="font-mono text-xs font-semibold text-[var(--mute)]">
                      {project.index}
                    </span>

                    {/* Vertical Title */}
                    <span
                      className="font-sans font-bold text-sm text-[var(--ink)] tracking-wider uppercase [writing-mode:vertical-lr] rotate-180 truncate max-h-[300px]"
                    >
                      {project.title}
                    </span>

                    {/* Plus Button */}
                    <div className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--ink)] group-hover:rotate-90 transition-transform duration-300">
                      +
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="flex lg:hidden flex-col gap-4">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;

            return (
              <div
                key={project.id}
                className="rounded-2xl border border-[var(--line)] bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveId(isOpen ? "" : project.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-[var(--soft)] text-[var(--ink)]">
                      {project.index}
                    </span>
                    <h3 className="font-sans font-bold text-lg text-[var(--ink)]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-mono text-lg text-[var(--mute)]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[var(--line)] flex flex-col gap-6 animate-in fade-in duration-300">
                    <p className="font-sans text-sm text-[var(--ink-2)] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key features */}
                    <ul className="space-y-1.5 font-sans text-xs text-[var(--ink-2)]">
                      {project.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--mute)]">↳</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Mini UI Mockup */}
                    <div className="rounded-xl bg-[var(--paper)] border border-[var(--line)] p-4 relative">
                      <span className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[var(--mute)] border border-[var(--line)] absolute top-2 right-2">
                        Illustrative UI
                      </span>
                      <div className="pt-4">
                        {project.id === "responsive-web-app" && <ResponsiveMockup />}
                        {project.id === "database-driven-app" && <DatabaseMockup />}
                        {project.id === "salesforce-dev-project" && <SalesforceMockup />}
                      </div>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-[var(--paper)] text-[var(--ink)] font-mono text-xs border border-[var(--line)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 1. Responsive App Mockup
function ResponsiveMockup() {
  return (
    <div className="w-full bg-white rounded-xl border border-[var(--line)] p-4 shadow-sm font-mono text-xs">
      {/* Browser Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
        </div>
        <span className="text-[10px] text-[var(--mute)] bg-[var(--paper)] px-3 py-0.5 rounded-full">
          localhost:3000 / responsive
        </span>
        <span className="text-[10px] text-[var(--ink)] font-semibold">100% Fluid</span>
      </div>

      {/* Grid of wireframe cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="h-16 rounded-lg bg-[var(--paper)] border border-[var(--line)] p-2 flex flex-col justify-between">
          <div className="w-3/4 h-2 bg-black/15 rounded" />
          <div className="w-1/2 h-1.5 bg-black/10 rounded" />
        </div>
        <div className="h-16 rounded-lg bg-[var(--paper)] border border-[var(--line)] p-2 flex flex-col justify-between">
          <div className="w-2/3 h-2 bg-black/15 rounded" />
          <div className="w-1/3 h-1.5 bg-black/10 rounded" />
        </div>
        <div className="h-16 rounded-lg bg-[var(--ink)] text-white p-2 flex flex-col justify-between">
          <div className="w-3/4 h-2 bg-white/40 rounded" />
          <div className="w-1/2 h-1.5 bg-white/20 rounded" />
        </div>
      </div>

      {/* Breakpoint Metrics */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-[10px] text-[var(--mute)]">
        <span>Desktop · 1440px</span>
        <span>Tablet · 768px</span>
        <span>Mobile · 375px</span>
      </div>
    </div>
  );
}

// 2. Database App Mockup
function DatabaseMockup() {
  return (
    <div className="w-full bg-white rounded-xl border border-[var(--line)] p-4 shadow-sm font-mono text-xs">
      {/* Query Bar */}
      <div className="bg-[#1a1a1a] text-[#ededed] p-2.5 rounded-lg mb-3 text-[11px] leading-tight flex items-center justify-between">
        <span className="text-emerald-400">SELECT</span>
        <span className="text-white/80 truncate mx-2">id, status, records FROM db</span>
        <span className="text-white/40 text-[9px]">24ms</span>
      </div>

      {/* Data Table */}
      <div className="border border-[var(--line)] rounded-lg overflow-hidden text-[10px]">
        <div className="grid grid-cols-4 bg-[var(--paper)] p-2 font-semibold text-[var(--mute)] border-b border-[var(--line)]">
          <span>RECORD_ID</span>
          <span>ENTITY</span>
          <span>OPERATION</span>
          <span className="text-right">STATUS</span>
        </div>
        <div className="grid grid-cols-4 p-2 border-b border-[var(--line)]">
          <span className="text-[var(--ink)] font-semibold">#09214</span>
          <span>UserSchema</span>
          <span>UPDATE</span>
          <span className="text-right text-emerald-600 font-semibold">SUCCESS</span>
        </div>
        <div className="grid grid-cols-4 p-2 bg-[var(--paper)]/40 border-b border-[var(--line)]">
          <span className="text-[var(--ink)] font-semibold">#09215</span>
          <span>OrderData</span>
          <span>INSERT</span>
          <span className="text-right text-emerald-600 font-semibold">COMMITTED</span>
        </div>
        <div className="grid grid-cols-4 p-2">
          <span className="text-[var(--ink)] font-semibold">#09216</span>
          <span>Inventory</span>
          <span>SELECT</span>
          <span className="text-right text-emerald-600 font-semibold">RESOLVED</span>
        </div>
      </div>
    </div>
  );
}

// 3. Salesforce Mockup
function SalesforceMockup() {
  return (
    <div className="w-full bg-white rounded-xl border border-[var(--line)] p-4 shadow-sm font-mono text-xs">
      {/* Salesforce Lightning Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00a1e0]" />
          <span className="text-[10px] font-bold text-[var(--ink)]">Developer Console</span>
        </div>
        <span className="text-[9px] text-[var(--mute)]">Apex Execution</span>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-[#111111] text-[#cccccc] p-3 rounded-lg text-[10px] leading-relaxed mb-3">
        <p className="text-sky-300">public class AccountTriggerHandler &#123;</p>
        <p className="pl-3 text-white/70">
          List&lt;Account&gt; accs = [SELECT Id FROM Account];
        </p>
        <p className="pl-3 text-white/50">// Trigger business logic</p>
        <p className="text-sky-300">&#125;</p>
      </div>

      {/* Architecture Row */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-[10px] text-[var(--mute)]">
        <span>SOQL Query: OK</span>
        <span>Standard Objects: Synced</span>
      </div>
    </div>
  );
}
