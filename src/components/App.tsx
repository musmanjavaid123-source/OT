"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { RevealObserver } from "@/components/ui/RevealObserver";

export function App() {
  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper)]">
      {/* Global Scroll Observer */}
      <RevealObserver />

      {/* Persistent Navigation */}
      <Navigation />

      {/* Main Single-Scroll Experience */}
      <main id="main-content" className="relative z-10 flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
