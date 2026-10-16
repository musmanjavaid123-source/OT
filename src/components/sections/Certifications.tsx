"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Professional Certifications"
      className="bg-white border-y border-[var(--line)] py-24 sm:py-32 w-full relative"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Heading & Count */}
          <div className="lg:sticky lg:top-28">
            <p className="tag-mono mb-2">04 — Certifications</p>
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Always <span className="serif-accent">learning.</span>
            </h2>
            <p className="font-mono text-sm text-[var(--mute)]">
              {CERTIFICATIONS.length.toString().padStart(2, "0")} accredited credentials from Google &amp; NITSEP.
            </p>
            <p className="font-sans text-xs text-[var(--mute)] mt-4 leading-relaxed max-w-xs">
              Continuous validation in full-stack web engineering, marketing architecture, analytics, and search optimization.
            </p>
          </div>

          {/* Right Column: Ink-Flood Numbered List */}
          <div className="flex flex-col border-t border-[var(--line)]">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                tabIndex={0}
                role="listitem"
                aria-label={`${cert.title} issued by ${cert.issuer}`}
                className="group relative border-b border-[var(--line)] py-7 sm:py-8 px-6 sm:px-8 cursor-default overflow-hidden transition-colors duration-400 focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
              >
                {/* Ink Flood Layer: scaleX from 0 to 1 on hover */}
                <span
                  className="absolute inset-0 bg-[var(--ink)] origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-500 ease-[var(--ease)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Content Row */}
                <div className="relative z-10 flex items-center justify-between gap-6 transition-colors duration-300 group-hover:text-white group-focus:text-white">
                  {/* Left: Index & Title */}
                  <div className="flex items-baseline gap-4 sm:gap-6 flex-1">
                    <span className="font-mono text-xs font-semibold text-[var(--mute)] group-hover:text-white/60 group-focus:text-white/60 transition-colors">
                      {cert.index}
                    </span>
                    <div>
                      <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tight text-[var(--ink)] group-hover:text-white group-focus:text-white transition-colors">
                        {cert.title}
                      </h3>
                      <p className="font-mono text-xs text-[var(--mute)] group-hover:text-white/70 group-focus:text-white/70 mt-1 transition-colors">
                        Issuer: {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Right: Sliding Arrow ↗ */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] group-hover:text-white/60 group-focus:text-white/60 transition-colors hidden sm:inline">
                      Verified
                    </span>
                    <span className="text-xl sm:text-2xl transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 transition-all duration-300">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
