"use client";

import React, { useState, useEffect, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const scrollProgress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // 1. Detect scroll threshold (40px)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Track active section with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sectionIds = NAV.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Move sliding indicator under active nav item
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeBtn = navContainerRef.current.querySelector(
      `[data-nav-id="${activeSection}"]`
    ) as HTMLElement | null;

    if (activeBtn) {
      const parentRect = navContainerRef.current.getBoundingClientRect();
      const rect = activeBtn.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, scrolled]);

  // 4. Lock body scroll when mobile menu is open, handle ESC
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToTarget(`#${id}`, { offset: -32 });
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 2 px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[var(--ink)] z-50 transition-all pointer-events-none"
        style={{
          width: `${scrollProgress * 100}%`,
          transitionDuration: "50ms",
        }}
        aria-hidden="true"
      />

      {/* Main navigation header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[var(--ease)] ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Left: Initials Mark + Name */}
          <button
            onClick={handleLogoClick}
            aria-label="Scroll to top"
            className="group flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-[var(--ink)] rounded-full p-1 -ml-1 transition-transform"
          >
            {/* Initials circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider transition-all duration-500 group-hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[var(--ink)] text-[#ffffff] shadow-sm"
                  : "border border-[var(--ink)] text-[var(--ink)] bg-transparent"
              }`}
            >
              UJ
            </div>

            {/* Full Name (fades out after scrolling 40px) */}
            <div
              className={`flex flex-col text-left transition-all duration-400 ease-[var(--ease)] overflow-hidden ${
                scrolled
                  ? "w-0 opacity-0 pointer-events-none -translate-x-2"
                  : "w-auto opacity-100 translate-x-0"
              }`}
            >
              <span className="font-sans font-bold text-sm tracking-tight text-[var(--ink)]">
                {PROFILE.name}
              </span>
              <span className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider">
                {PROFILE.role}
              </span>
            </div>
          </button>

          {/* Desktop Nav: Center/Right Pill */}
          <nav
            ref={navContainerRef}
            aria-label="Primary"
            className={`hidden md:flex items-center relative p-1.5 rounded-full transition-all duration-400 ease-[var(--ease)] ${
              scrolled
                ? "bg-white/80 backdrop-blur-md shadow-[0_8px_32px_rgba(13,13,13,0.06),inset_0_0_0_1px_rgba(13,13,13,0.08)]"
                : "bg-transparent"
            }`}
          >
            {/* Sliding indicator pill */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-[var(--ink)] transition-all duration-300 ease-[var(--ease)] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />

            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-4 py-1.5 rounded-full font-sans text-xs font-medium tracking-tight transition-colors duration-200 ${
                    isActive
                      ? "text-[#ffffff]"
                      : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button: Pill */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className={`md:hidden flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-tight transition-all ${
              scrolled
                ? "bg-white/90 backdrop-blur-md text-[var(--ink)] shadow-[inset_0_0_0_1px_rgba(13,13,13,0.1)]"
                : "bg-[var(--ink)] text-[#ffffff]"
            }`}
          >
            <span>Menu</span>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay (clip-path reveal) */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--paper)] flex flex-col justify-between p-8 md:hidden transition-all duration-600 ease-[var(--ease)] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:circle(150%_at_90%_5%)]"
            : "opacity-0 pointer-events-none [clip-path:circle(0%_at_90%_5%)]"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Top bar inside mobile overlay */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--ink)] text-white flex items-center justify-center font-mono text-xs font-semibold">
              UJ
            </div>
            <span className="font-sans font-bold text-sm text-[var(--ink)]">
              {PROFILE.name}
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:bg-[var(--card)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Large numbered links */}
        <div className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left focus-visible:outline-none"
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
            >
              <span className="font-mono text-xs text-[var(--mute)] tracking-wider">
                {item.index}
              </span>
              <span className="font-sans text-3xl font-bold tracking-tight text-[var(--ink)] group-hover:translate-x-2 transition-transform duration-300">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom meta row */}
        <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--mute)] font-mono">
          <span>{PROFILE.location}</span>
          <a
            href={PROFILE.resumePath}
            download
            className="underline underline-offset-4 text-[var(--ink)] font-semibold"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </>
  );
}
