"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(true);

  // 1. Initial play attempt (sound first, fallback to muted)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsAudioMuted(false);
          setAudioBlocked(false);
        })
        .catch(() => {
          // Autoplay with sound blocked: fallback to muted play
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(true);
            setIsAudioMuted(true);
            setAudioBlocked(true);
          });
        });
    }
  }, []);

  // 2. Unlock sound on visitor's first user interaction
  useEffect(() => {
    const unlockSound = () => {
      const video = videoRef.current;
      if (!video) return;

      if (video.muted) {
        video.muted = false;
        setIsAudioMuted(false);
        setAudioBlocked(false);
      }

      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return cleanupListeners;
  }, []);

  // 3. Pause video when less than 35% visible; resume when returning
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        } else {
          if (video.paused) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }
      },
      {
        threshold: [0, 0.35, 1],
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 4. Sound toggle button
  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsAudioMuted(false);
      setAudioBlocked(false);
      if (video.paused) video.play();
    } else {
      video.muted = true;
      setIsAudioMuted(true);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction Hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-28 pb-12"
    >
      {/* Background Ghost Word: USMAN */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-sans font-black tracking-tighter text-center uppercase whitespace-nowrap"
          style={{
            fontSize: "clamp(120px, 22vw, 320px)",
            lineHeight: 0.8,
            WebkitTextStroke: "1.5px rgba(13, 13, 13, 0.08)",
            color: "transparent",
            transform: "translateY(-6%)",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Center Video Container */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-auto pointer-events-auto">
        <div
          className="relative w-auto flex items-center justify-center"
          style={{
            height: "clamp(460px, 68svh, 920px)",
            aspectRatio: "768 / 960",
          }}
        >
          {/* Multiply blend video: white backdrop dissolves into warm paper */}
          <video
            ref={videoRef}
            playsInline
            loop
            preload="auto"
            muted
            className="w-full h-full object-contain pointer-events-none"
            style={{
              mixBlendMode: "multiply",
            }}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Sound Control: 46px round solid ink button */}
          <button
            onClick={toggleSound}
            aria-label={isAudioMuted ? "Unmute voice intro" : "Mute voice intro"}
            className="absolute bottom-4 right-4 z-20 w-[46px] h-[46px] rounded-full bg-[var(--ink)] text-[#ffffff] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-4"
          >
            {/* Soft ping ring if autoplay sound was blocked */}
            {audioBlocked && isAudioMuted && (
              <span
                className="absolute inset-0 rounded-full animate-ping bg-[var(--ink)] opacity-30 pointer-events-none"
                aria-hidden="true"
              />
            )}

            {isAudioMuted ? (
              // ▶ Triangle (sound off)
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="ml-0.5"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              // ❚❚ Two bars (sound on)
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Hero Bottom Content & CTAs */}
      <div className="section-container relative z-20 w-full mt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6 border-t border-[var(--line)]">
          {/* Role Heading */}
          <div className="max-w-xl">
            <p className="tag-mono mb-2">00 — Introduction</p>
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Front-End <span className="serif-accent">Developer.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[var(--mute)] max-w-md font-sans">
              Specialized in responsive web systems, UI/UX implementation, and high-performance digital interfaces.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToTarget("#work")}
              className="btn-pill btn-primary"
            >
              Explore work
            </button>
            <button
              onClick={() => scrollToTarget("#contact")}
              className="btn-pill btn-secondary"
            >
              Let&apos;s talk
            </button>
            <a
              href={PROFILE.resumePath}
              download
              className="btn-pill btn-secondary group"
            >
              <span>Résumé</span>
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
