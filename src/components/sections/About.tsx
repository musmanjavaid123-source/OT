"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";

export function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const cardAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const velocityRef = useRef(0);

  // Pendulum swing physics simulation
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let animId: number;
    let lastTime = performance.now();
    let idlePhase = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Subtle idle sway (1.2 degrees)
      idlePhase += dt * 1.8;
      const idleAngle = Math.sin(idlePhase) * 1.2;

      // Spring physics towards idle target
      const stiffness = 22;
      const damping = 4.5;
      const displacement = cardAngleRef.current - (targetAngleRef.current + idleAngle);
      const force = -stiffness * displacement;
      velocityRef.current += force * dt;
      velocityRef.current *= Math.exp(-damping * dt);
      cardAngleRef.current += velocityRef.current * dt;

      // Apply transform to lanyard assembly
      if (lanyardRef.current) {
        lanyardRef.current.style.transform = `rotate(${cardAngleRef.current.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    // Track mouse velocity over the section
    let lastMouseX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const vx = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      // Convert lateral velocity to angular kick
      targetAngleRef.current = Math.max(-10, Math.min(10, vx * 0.2));
      setTimeout(() => {
        targetAngleRef.current = 0;
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <section
      id="about"
      aria-label="About Ottoman"
      className="section-vertical relative w-full overflow-hidden border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="mb-14 rv" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="tag-mono mb-2">01 — About</p>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl">
            Identity &amp; <span className="serif-accent">discipline.</span>
          </h2>
        </div>

        {/* Three-Column Grid: minmax(0,1fr) 320px minmax(0,1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 lg:gap-12 items-stretch">
          {/* Column 1 (Left): Narrative & Links */}
          <div className="card-standard p-8 sm:p-10 flex flex-col justify-between rv" style={{ "--i": 1 } as React.CSSProperties}>
            <div>
              <p className="tag-mono text-[var(--mute)] mb-4">Profile Overview</p>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-[var(--ink)] mb-6">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              <p className="font-sans text-[var(--ink-2)] text-base leading-relaxed mb-6">
                {PROFILE.resumeSummary}
              </p>
              <p className="font-sans text-sm text-[var(--mute)] leading-relaxed border-l-2 border-[var(--line)] pl-4 italic">
                Skilled in translating UI/UX designs into functional web interfaces, developing modern websites, and improving performance and usability.
              </p>
            </div>

            {/* Resume & LinkedIn Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-8 mt-8 border-t border-[var(--line)]">
              <a
                href={PROFILE.resumePath}
                download
                className="btn-pill btn-primary"
              >
                <span>Résumé</span>
                <span>↓</span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-secondary"
              >
                <span>LinkedIn</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>

          {/* Column 2 (Center): Hanging Lanyard ID Card */}
          <div className="flex flex-col items-center justify-start py-4 rv" style={{ "--i": 2 } as React.CSSProperties}>
            {/* Hanging Assembly (origin at top center) */}
            <div
              ref={lanyardRef}
              className="relative flex flex-col items-center origin-top transition-transform duration-75 will-change-transform"
            >
              {/* Lanyard Strap: 30x56 px with scrolling text and fabric look */}
              <div
                className="relative w-[30px] h-[56px] bg-[#1a1a1a] shadow-md flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 4px)",
                }}
              >
                {/* Scrolling text on strap */}
                <span
                  className="font-mono text-[7px] text-white/70 whitespace-nowrap uppercase tracking-widest rotate-90 select-none animate-marquee"
                >
                  OTTOMAN · DEV
                </span>
              </div>

              {/* Metal Clip & Ring */}
              <div className="relative w-8 h-5 flex flex-col items-center -mt-0.5 z-10">
                {/* Ring */}
                <div className="w-4 h-4 rounded-full border-2 border-[#888888] shadow-inner" />
                {/* Metallic Clip */}
                <div
                  className="w-5 h-3 -mt-1 rounded-sm shadow-sm"
                  style={{
                    background: "linear-gradient(180deg, #d4d4d4 0%, #8c8c8c 50%, #525252 100%)",
                  }}
                />
              </div>

              {/* ID Card with 3D Flip */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Developer ID card. Click, tap or press enter to flip card."
                onClick={() => setIsFlipped((prev) => !prev)}
                onKeyDown={handleCardKeyDown}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                className="relative w-[300px] h-[404px] cursor-pointer mt-0.5 select-none focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-4 rounded-[24px]"
                style={{
                  perspective: "1000px",
                }}
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-[var(--ease)] shadow-2xl rounded-[24px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#ffffff] rounded-[24px] p-5 flex flex-col justify-between border border-[var(--line)] shadow-xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Top Hole Notch & Top Band */}
                    <div>
                      {/* Lanyard punch hole */}
                      <div className="w-8 h-2 rounded-full bg-[#f4f2ee] mx-auto border border-black/10 mb-3 shadow-inner" />

                      {/* Black Top Band */}
                      <div className="bg-[var(--ink)] text-white px-3 py-1.5 rounded-lg flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] font-semibold tracking-wider">
                          DEVELOPER ID
                        </span>
                        <span className="font-mono text-[9px] text-white/60">
                          HAMDARD / IT
                        </span>
                      </div>

                      {/* Portrait centered in 128x156 frame */}
                      <div className="relative w-[128px] h-[156px] mx-auto rounded-xl overflow-hidden p-1 bg-gradient-to-b from-[#e5e5e5] to-[#f4f2ee] shadow-inner group">
                        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
                          <Image
                            src="/portrait-bust.webp"
                            alt="Ottoman"
                            fill
                            unoptimized
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Personal & Dept Meta */}
                    <div className="text-center my-auto">
                      <h4 className="font-sans font-bold text-lg text-[var(--ink)] tracking-tight">
                        {PROFILE.name}
                      </h4>
                      <p className="font-mono text-[11px] text-[var(--mute)] uppercase tracking-wider">
                        {PROFILE.role}
                      </p>

                      <div className="grid grid-cols-3 gap-1 mt-3 pt-3 border-t border-[var(--line)] text-left font-mono text-[9px]">
                        <div>
                          <span className="text-[var(--faint)] block">ID NO.</span>
                          <span className="font-semibold text-[var(--ink)]">{PROFILE.idNumber}</span>
                        </div>
                        <div>
                          <span className="text-[var(--faint)] block">DEPT.</span>
                          <span className="font-semibold text-[var(--ink)] truncate block">Web Dev</span>
                        </div>
                        <div>
                          <span className="text-[var(--faint)] block">VALID</span>
                          <span className="font-semibold text-[var(--ink)]">{PROFILE.validTill}</span>
                        </div>
                      </div>
                    </div>

                    {/* Barcode & Holographic Sticker */}
                    <div className="pt-2 flex items-center justify-between border-t border-[var(--line)]">
                      {/* Barcode */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-[2px] h-6 opacity-85">
                          {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2].map((w, i) => (
                            <span
                              key={i}
                              className="h-full bg-[var(--ink)] inline-block"
                              style={{ width: `${w}px` }}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[7px] text-[var(--faint)] tracking-widest mt-0.5">
                          {PROFILE.idNumber}
                        </span>
                      </div>

                      {/* Hologram Sticker */}
                      <div
                        className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center p-1 shadow-inner relative overflow-hidden"
                        style={{
                          background: "radial-gradient(circle, #e9ecef 0%, #ced4da 70%, #adb5bd 100%)",
                        }}
                      >
                        <div className="text-[7px] font-mono font-bold text-black/60 text-center leading-none tracking-tighter">
                          SECURE
                          <br />
                          PASS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#141414] text-white rounded-[24px] p-6 flex flex-col justify-between border border-black/20 shadow-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div>
                      <div className="w-8 h-2 rounded-full bg-white/20 mx-auto mb-4 shadow-inner" />
                      <p className="font-mono text-[10px] uppercase text-white/50 tracking-widest mb-4">
                        What I Am
                      </p>

                      <ul className="space-y-2.5 font-sans text-xs text-white/90">
                        <li className="flex items-start gap-2">
                          <span className="text-white/40">·</span>
                          <span>Front-End Developer &amp; Web Specialist</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-white/40">·</span>
                          <span>BS Information Technology (Hamdard University)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-white/40">·</span>
                          <span>5 Industry Certifications (Google &amp; NITSEP)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-white/40">·</span>
                          <span>Enterprise Experience at Lacoste &amp; Mastercard</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="mb-3">
                        <span className="font-mono text-[9px] text-white/40 block">SIGNATURE</span>
                        <span className="font-serif italic text-lg text-white/90 tracking-wide">
                          {PROFILE.name}
                        </span>
                      </div>
                      <p className="font-mono text-[8px] text-white/50 leading-tight">
                        If found, say hello · {PROFILE.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Click to flip helper cue */}
              <p className="font-mono text-[10px] text-[var(--mute)] mt-3 tracking-wider uppercase">
                {isFlipped ? "Showing back · Click to reverse" : "Hover or tap to flip card"}
              </p>
            </div>
          </div>

          {/* Column 3 (Right): Quick Facts & Verbatim Quote */}
          <div className="card-standard p-8 sm:p-10 flex flex-col justify-between rv" style={{ "--i": 3 } as React.CSSProperties}>
            <div>
              <p className="tag-mono text-[var(--mute)] mb-4">Quick Facts</p>
              <h3 className="font-sans font-bold text-2xl tracking-tight text-[var(--ink)] mb-6">
                Direct Coordinates
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <div className="pb-3 border-b border-[var(--line)]">
                  <span className="text-[var(--mute)] block text-[10px] uppercase">Location</span>
                  <span className="font-semibold text-[var(--ink)] text-sm">{PROFILE.location}</span>
                </div>
                <div className="pb-3 border-b border-[var(--line)]">
                  <span className="text-[var(--mute)] block text-[10px] uppercase">Education</span>
                  <span className="font-semibold text-[var(--ink)] text-sm">BS Information Technology</span>
                  <span className="text-[var(--mute)] block text-[11px]">Hamdard University</span>
                </div>
                <div className="pb-3 border-b border-[var(--line)]">
                  <span className="text-[var(--mute)] block text-[10px] uppercase">Current Engagement</span>
                  <span className="font-semibold text-[var(--ink)] text-sm">Web Developer</span>
                  <span className="text-[var(--mute)] block text-[11px]">Lacoste (Warsaw, Poland)</span>
                </div>
                <div className="pb-3 border-b border-[var(--line)]">
                  <span className="text-[var(--mute)] block text-[10px] uppercase">Email Inquiries</span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-semibold text-[var(--ink)] hover:underline truncate block"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Paraphrased Quote strictly from resume wording */}
            <div className="pt-6 mt-6 border-t border-[var(--line)]">
              <blockquote className="font-serif italic text-lg sm:text-xl text-[var(--ink-2)] leading-snug">
                &ldquo;Translating design vision into responsive, user-friendly web interfaces while optimizing performance and usability.&rdquo;
              </blockquote>
              <cite className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider block mt-2 not-italic">
                — Professional Core Philosophy
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
