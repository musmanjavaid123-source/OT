"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PROJECT_REFERENCES, ProjectReference } from "@/lib/data";

const COUNTRIES = [
  "All",
  "Dubai / UAE",
  "Singapore",
  "Hungary",
  "Poland",
  "Germany",
  "Netherlands",
  "United States",
  "United Kingdom",
  "Canada",
] as const;

export function Work() {
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectReference | null>(null);

  // Mobile specific state
  const [featuredMobileIndex, setFeaturedMobileIndex] = useState<number>(0);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);

  // Filtered references
  const filteredReferences = useMemo(() => {
    if (selectedCountry === "All") return PROJECT_REFERENCES;
    return PROJECT_REFERENCES.filter((p) => p.country === selectedCountry);
  }, [selectedCountry]);

  // Country counts
  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECT_REFERENCES.length };
    PROJECT_REFERENCES.forEach((p) => {
      counts[p.country] = (counts[p.country] || 0) + 1;
    });
    return counts;
  }, []);

  // When country changes, reset mobile featured index & collapsed rows
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setExpandedMobileId(null);
    // Find initial featured project for the selected country (prefer featured: true, else 0)
    const matching = country === "All"
      ? PROJECT_REFERENCES
      : PROJECT_REFERENCES.filter((p) => p.country === country);
    const featIdx = matching.findIndex((p) => p.featured);
    setFeaturedMobileIndex(featIdx >= 0 ? featIdx : 0);
  };

  // Safe current featured reference on mobile
  const currentFeatured = useMemo(() => {
    if (filteredReferences.length === 0) return null;
    const safeIdx = Math.min(Math.max(featuredMobileIndex, 0), filteredReferences.length - 1);
    return filteredReferences[safeIdx];
  }, [filteredReferences, featuredMobileIndex]);

  const handleNextFeatured = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (filteredReferences.length <= 1) return;
    setFeaturedMobileIndex((prev) => (prev + 1) % filteredReferences.length);
  };

  const handlePrevFeatured = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (filteredReferences.length <= 1) return;
    setFeaturedMobileIndex((prev) => (prev - 1 + filteredReferences.length) % filteredReferences.length);
  };

  const toggleMobileRow = (id: string) => {
    setExpandedMobileId((prev) => (prev === id ? null : id));
  };

  // Keyboard navigation for desktop modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    }
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section
      id="work"
      aria-label="International Projects"
      className="section-vertical relative w-full border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* ========================================================= */}
        {/* MOBILE PRESENTATION: COMPACT PROJECT EXPLORER (< lg)     */}
        {/* ========================================================= */}
        <div className="block lg:hidden">
          {/* Part 1: Compact Introduction */}
          <div className="mb-6 rv" style={{ "--i": 0 } as React.CSSProperties}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="tag-mono text-[10px]">03 — INTERNATIONAL PROJECTS</p>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-white border border-[var(--line)] text-[var(--mute)]">
                42 REFS · 09 MARKETS
              </span>
            </div>
            <h2 className="heading-display text-2xl sm:text-3xl tracking-tight mb-2 text-[var(--ink)]">
              A world of digital <span className="serif-accent">experiences.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
              42 references. 9 markets. Endless inspiration.
            </p>
          </div>

          {/* Part 2: Compact Country Filters */}
          <div className="mb-6">
            <div className="w-full overflow-x-auto no-scrollbar pb-1">
              <div className="flex items-center gap-1.5 min-w-max">
                {COUNTRIES.map((country) => {
                  const isActive = selectedCountry === country;
                  const count = countryCounts[country] || 0;
                  const formattedCount = count < 10 ? `0${count}` : `${count}`;

                  return (
                    <button
                      key={country}
                      onClick={() => handleCountryChange(country)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] transition-all duration-200 border ${
                        isActive
                          ? "bg-[var(--ink)] text-white border-[var(--ink)] shadow-sm font-medium"
                          : "bg-white text-[var(--ink-2)] border-[var(--line)] hover:bg-[#faf9f6]"
                      }`}
                    >
                      <span>{country}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[var(--soft)] text-[var(--mute)]"
                        }`}
                      >
                        {formattedCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Part 3: Featured Project Card (One Large Card) */}
          {currentFeatured && (
            <div className="mb-8">
              <div className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                {/* Compact Editorial Graphic Banner (~35% height) */}
                <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#faf8f5] to-[#ece8e1] border border-[var(--line)] p-4 flex flex-col justify-between relative overflow-hidden mb-4">
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-[var(--ink)] font-semibold border border-[var(--line)]">
                      FEATURED REFERENCE
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[var(--ink)]">
                      {currentFeatured.index}
                    </span>
                  </div>

                  {/* Watermark Logo / Typographic Accent */}
                  <div className="z-10">
                    <p className="font-mono text-[10px] tracking-widest text-[var(--mute)] uppercase">
                      {currentFeatured.region}
                    </p>
                    <p className="font-sans font-bold text-lg text-[var(--ink)] truncate">
                      {currentFeatured.name}
                    </p>
                  </div>

                  {/* Abstract background grid decoration */}
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none font-mono text-5xl font-black select-none pr-2 pb-1">
                    {currentFeatured.index}
                  </div>
                </div>

                {/* Info & Category */}
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-semibold text-[var(--ink)]">
                      {currentFeatured.country}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--mute)] truncate max-w-[150px]">
                      {currentFeatured.category}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[var(--ink-2)] leading-relaxed mb-3">
                    {currentFeatured.description}
                  </p>

                  {/* Concise Design Observation */}
                  <div className="rounded-xl bg-[var(--paper)] border border-[var(--line)] p-3">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)] mb-0.5">
                      Design Focus
                    </p>
                    <p className="font-sans text-xs text-[var(--ink)] font-medium leading-snug">
                      {currentFeatured.designNotes}
                    </p>
                  </div>
                </div>

                {/* Actions & Next Project Control */}
                <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between gap-2">
                  <a
                    href={currentFeatured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--ink)] text-white font-mono text-xs font-semibold hover:bg-black transition-colors shadow-sm"
                  >
                    <span>VIEW WEBSITE</span>
                    <span>↗</span>
                  </a>

                  {/* Next / Prev Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevFeatured}
                      aria-label="Previous featured project"
                      className="w-8 h-8 rounded-full border border-[var(--line)] bg-white flex items-center justify-center text-[var(--ink)] hover:bg-[var(--soft)] transition-colors text-xs font-mono"
                    >
                      ←
                    </button>
                    <span className="font-mono text-[10px] text-[var(--mute)] px-1">
                      {featuredMobileIndex + 1}/{filteredReferences.length}
                    </span>
                    <button
                      onClick={handleNextFeatured}
                      aria-label="Next featured project"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--line)] bg-white text-[var(--ink)] hover:bg-[var(--soft)] transition-colors text-xs font-mono"
                    >
                      <span>Next</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Part 4 & 5: Compact Project List with Expandable Details */}
          <div>
            {/* List Header */}
            <div className="flex items-center justify-between gap-2 mb-3 px-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)]">
                {selectedCountry === "All"
                  ? "EXPLORE ALL REFERENCES"
                  : `EXPLORING ${selectedCountry.toUpperCase()}`}
              </p>
              <span className="font-mono text-[10px] text-[var(--mute)]">
                {filteredReferences.length} REFERENCES
              </span>
            </div>

            {/* Compact Rows */}
            <div className="rounded-2xl border border-[var(--line)] bg-white overflow-hidden divide-y divide-[var(--line)]">
              {filteredReferences.map((ref) => {
                const isExpanded = expandedMobileId === ref.id;

                return (
                  <div key={ref.id} className="transition-colors">
                    {/* Collapsed Row Header (Accessible Button) */}
                    <button
                      onClick={() => toggleMobileRow(ref.id)}
                      aria-expanded={isExpanded}
                      className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 hover:bg-[#faf9f6] transition-colors focus-visible:outline-none focus-visible:bg-[#faf9f6]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-[11px] font-semibold text-[var(--mute)] shrink-0 w-6">
                          {ref.index}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-sans font-bold text-sm text-[var(--ink)] truncate">
                            {ref.name}
                          </h4>
                          <p className="font-mono text-[10px] text-[var(--mute)] truncate mt-0.5">
                            {ref.country} · {ref.category}
                          </p>
                        </div>
                      </div>

                      {/* Expand / Collapse Icon */}
                      <div className="w-7 h-7 rounded-full bg-[var(--soft)] flex items-center justify-center text-[var(--ink)] shrink-0 transition-transform duration-200">
                        <span className="font-mono text-xs">{isExpanded ? "−" : "+"}</span>
                      </div>
                    </button>

                    {/* Part 5: Expandable Project Details Inline */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 bg-[#fbfaf8] border-t border-[var(--line)] flex flex-col gap-3 animate-in fade-in duration-200">
                        <p className="font-sans text-xs text-[var(--ink-2)] leading-relaxed pt-1">
                          {ref.description}
                        </p>

                        <div className="rounded-xl bg-white border border-[var(--line)] p-3">
                          <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)] mb-0.5">
                            Design Focus
                          </p>
                          <p className="font-sans text-xs text-[var(--ink)] font-medium leading-snug">
                            {ref.designNotes}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-[10px] text-[var(--mute)]">
                            {ref.referenceType === "website-reference" ? "Reference" : "Inspiration"}
                          </span>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--ink)] text-white font-mono text-xs font-semibold hover:bg-black transition-colors shadow-sm"
                          >
                            <span>VIEW WEBSITE</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP PRESENTATION: PRESERVED EXACTLY AS IS (lg:block)   */}
        {/* ========================================================= */}
        <div className="hidden lg:block">
          {/* Section Header */}
          <div className="mb-10 rv" style={{ "--i": 0 } as React.CSSProperties}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <p className="tag-mono">03 — INTERNATIONAL PROJECTS</p>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-white border border-[var(--line)] text-[var(--mute)]">
                42 REFERENCES / 09 MARKETS
              </span>
            </div>
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 text-[var(--ink)]">
              A world of digital <span className="serif-accent">experiences.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--ink-2)] max-w-3xl leading-relaxed">
              Forty-two digital references across nine markets. Different industries,
              different visual languages, and new ways to think about the web.
            </p>
          </div>

          {/* Filter Bar & Count Header */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-2">
              <span className="font-mono text-xs text-[var(--mute)]">
                Showing <span className="font-semibold text-[var(--ink)]">{filteredReferences.length}</span> of {PROJECT_REFERENCES.length} design archives
              </span>
              {selectedCountry !== "All" && (
                <button
                  onClick={() => setSelectedCountry("All")}
                  className="font-mono text-xs text-[var(--mute)] hover:text-[var(--ink)] underline"
                >
                  Reset to All 42
                </button>
              )}
            </div>

            {/* Horizontal Country Filter Bar */}
            <div className="w-full overflow-x-auto no-scrollbar pb-2">
              <div className="flex items-center gap-2 min-w-max">
                {COUNTRIES.map((country) => {
                  const isActive = selectedCountry === country;
                  const count = countryCounts[country] || 0;
                  const formattedCount = count < 10 ? `0${count}` : `${count}`;

                  return (
                    <button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 border ${
                        isActive
                          ? "bg-[var(--ink)] text-white border-[var(--ink)] shadow-sm font-medium"
                          : "bg-white text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--mute)] hover:bg-[#faf9f6]"
                      }`}
                    >
                      <span>{country}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[var(--soft)] text-[var(--mute)]"
                        }`}
                      >
                        {formattedCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reference Cards Grid (3 columns desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReferences.map((ref) => {
              return (
                <div
                  key={ref.id}
                  onClick={() => setSelectedProject(ref)}
                  className="group relative rounded-2xl border border-[var(--line)] bg-white p-6 flex flex-col justify-between hover:shadow-lg hover:border-[var(--mute)] transition-all duration-300 cursor-pointer"
                >
                  {/* Top Bar: Index + Country + Category */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--ink)]">
                          {ref.index}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--mute)]">
                          {ref.country}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] truncate max-w-[130px]">
                        {ref.category}
                      </span>
                    </div>

                    {/* Studio / Business Name */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-sans font-bold text-xl text-[var(--ink)] group-hover:text-black transition-colors">
                        {ref.name}
                      </h3>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={`Open ${ref.name} in new tab`}
                        className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--mute)] group-hover:text-[var(--ink)] group-hover:border-[var(--ink)] transition-colors shrink-0"
                      >
                        <svg
                          className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </a>
                    </div>

                    {/* Brief description */}
                    <p className="font-sans text-xs text-[var(--ink-2)] leading-relaxed mb-4 line-clamp-2">
                      {ref.description}
                    </p>

                    {/* Design Takeaway Box */}
                    <div className="rounded-xl bg-[var(--paper)] border border-[var(--line)] p-3 mb-4">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                        Design Focus
                      </p>
                      <p className="font-sans text-xs text-[var(--ink)] font-medium leading-snug">
                        {ref.designNotes}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--mute)]">
                      {ref.referenceType === "website-reference" ? "Reference" : "Inspiration"}
                    </span>
                    <span className="text-[var(--ink)] font-semibold flex items-center gap-1 group-hover:underline">
                      Explore Details →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Detail Modal */}
          {selectedProject && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="bg-white rounded-3xl max-w-xl w-full border border-[var(--line)] shadow-2xl p-6 sm:p-8 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--ink)]">
                        {selectedProject.index}
                      </span>
                      <span className="font-mono text-xs text-[var(--mute)]">
                        {selectedProject.country} • {selectedProject.region}
                      </span>
                    </div>
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[var(--ink)]">
                      {selectedProject.name}
                    </h3>
                    <p className="font-mono text-xs text-[var(--mute)] mt-1">
                      {selectedProject.category}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-9 h-9 rounded-full bg-[var(--soft)] border border-[var(--line)] flex items-center justify-center text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[#eae8e3] transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1.5">
                      Overview & Purpose
                    </h4>
                    <p className="font-sans text-sm text-[var(--ink-2)] leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[var(--paper)] border border-[var(--line)] p-4">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1.5">
                      Design & Architectural Analysis
                    </h4>
                    <p className="font-sans text-sm text-[var(--ink)] font-medium leading-relaxed">
                      {selectedProject.designNotes}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[var(--mute)] pt-2 border-t border-[var(--line)]">
                    <span>Type: Website Design Reference</span>
                    <span className="text-[var(--ink)] font-semibold">Active External Archive</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--line)]">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-full font-mono text-xs text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--ink)] text-white font-mono text-xs font-semibold hover:bg-black transition-all shadow-sm"
                  >
                    <span>VIEW WEBSITE</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
