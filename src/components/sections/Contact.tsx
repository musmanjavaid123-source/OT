"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget("#hero");
  };

  // Helper for letter hop bounce
  const renderInteractiveHeading = (text: string) => {
    return text.split("").map((char, index) => {
      if (char === " ") {
        return <span key={index} className="inline-block">&nbsp;</span>;
      }
      return (
        <span
          key={index}
          className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-4 hover:text-[var(--mute)] cursor-default select-none"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section
      id="contact"
      aria-label="Contact Information &amp; Footer"
      className="section-vertical relative w-full border-t border-[var(--line)] pb-8"
    >
      <div className="section-container">
        {/* Header Tag */}
        <div className="mb-10 rv" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="tag-mono mb-2">06 — Connect</p>
          <span className="font-mono text-xs text-[var(--mute)]">
            Warsaw, Poland · Available for Front-End Roles
          </span>
        </div>

        {/* Huge Interactive Hopping Heading */}
        <div className="mb-16">
          <h2 className="heading-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
            <span className="block mb-2 sm:mb-4">
              {renderInteractiveHeading("Let's build")}
            </span>
            <span className="block serif-accent">
              {renderInteractiveHeading("something together.")}
            </span>
          </h2>
        </div>

        {/* Email Row with Copy Chip & Spinning Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 pb-20 border-b border-[var(--line)]">
          {/* Email & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <a
              href={`mailto:${PROFILE.email}`}
              className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] underline underline-offset-8 decoration-[var(--line)] hover:decoration-[var(--ink)] transition-colors break-all"
            >
              {PROFILE.email}
            </a>

            <button
              onClick={copyEmail}
              aria-label="Copy email address to clipboard"
              className="btn-pill btn-secondary self-start sm:self-center font-mono text-xs"
            >
              <span aria-live="polite">
                {copied ? "Copied ✓" : "Copy email"}
              </span>
            </button>
          </div>

          {/* Slow Spinning Circular Text Badge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 animate-[spin_18s_linear_infinite] pointer-events-none select-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[var(--ink)]">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-mono text-[9px] uppercase tracking-[0.22em] font-medium">
                  <textPath href="#circlePath">
                    SAY HELLO · GET IN TOUCH · SAY HELLO ·
                  </textPath>
                </text>
              </svg>
            </div>
            {/* Center Arrow */}
            <span className="font-serif italic text-2xl text-[var(--ink)] select-none">
              ↗
            </span>
          </div>
        </div>

        {/* Contact Coordinates & Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-b border-[var(--line)] font-mono text-xs">
          <div>
            <span className="text-[var(--mute)] block text-[10px] uppercase tracking-wider mb-1">
              Direct Phone
            </span>
            <a
              href={PROFILE.phoneHref}
              className="text-[var(--ink)] font-semibold hover:underline text-sm"
            >
              {PROFILE.phone}
            </a>
          </div>

          <div>
            <span className="text-[var(--mute)] block text-[10px] uppercase tracking-wider mb-1">
              Professional Network
            </span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] font-semibold hover:underline text-sm flex items-center gap-1"
            >
              <span>LinkedIn Profile</span>
              <span>↗</span>
            </a>
          </div>

          <div>
            <span className="text-[var(--mute)] block text-[10px] uppercase tracking-wider mb-1">
              Résumé PDF
            </span>
            <a
              href={PROFILE.resumePath}
              download
              className="text-[var(--ink)] font-semibold hover:underline text-sm flex items-center gap-1"
            >
              <span>Download PDF</span>
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* Footer Meta Row */}
        <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
          <div>
            © 2026 {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleBackToTop}
              className="hover:text-[var(--ink)] underline underline-offset-4 transition-colors"
            >
              Back to top ↑
            </button>
            <span className="text-[var(--line)]">/</span>
            <span>Built with Next.js</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
