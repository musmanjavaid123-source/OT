import React from "react";
import Image from "next/image";

export const BRAND_MAP: Record<string, { name: string; src: string; glow: string }> = {
  html5: { name: "HTML5", src: "/logos/html5.svg", glow: "rgba(227, 76, 38, 0.15)" },
  css3: { name: "CSS3", src: "/logos/css3.svg", glow: "rgba(38, 77, 228, 0.15)" },
  javascript: { name: "JavaScript", src: "/logos/javascript.svg", glow: "rgba(247, 223, 30, 0.15)" },
  react: { name: "React", src: "/logos/react.svg", glow: "rgba(97, 218, 251, 0.18)" },
  bootstrap: { name: "Bootstrap", src: "/logos/bootstrap.svg", glow: "rgba(121, 82, 179, 0.16)" },
  tailwindcss: { name: "Tailwind CSS", src: "/logos/tailwindcss.svg", glow: "rgba(56, 189, 248, 0.18)" },
  java: { name: "Java", src: "/logos/java.svg", glow: "rgba(234, 45, 46, 0.14)" },
  python: { name: "Python", src: "/logos/python.svg", glow: "rgba(55, 118, 171, 0.16)" },
  nodejs: { name: "Node.js", src: "/logos/nodejs.svg", glow: "rgba(104, 160, 99, 0.18)" },
  sql: { name: "SQL", src: "/logos/mysql.svg", glow: "rgba(0, 117, 143, 0.15)" },
  mysql: { name: "MySQL", src: "/logos/mysql.svg", glow: "rgba(0, 117, 143, 0.15)" },
  postgresql: { name: "PostgreSQL", src: "/logos/postgresql.svg", glow: "rgba(51, 103, 145, 0.16)" },
  salesforce: { name: "Salesforce", src: "/logos/salesforce.svg", glow: "rgba(0, 161, 224, 0.18)" },
  git: { name: "Git", src: "/logos/git.svg", glow: "rgba(240, 80, 50, 0.15)" },
  github: { name: "GitHub", src: "/logos/github.svg", glow: "rgba(36, 41, 46, 0.14)" },
  vscode: { name: "VS Code", src: "/logos/vscode.svg", glow: "rgba(0, 122, 204, 0.16)" },
  google: { name: "Google", src: "/logos/google.svg", glow: "rgba(66, 133, 244, 0.16)" },
  linkedin: { name: "LinkedIn", src: "/logos/linkedin.svg", glow: "rgba(10, 102, 194, 0.16)" },
};

export const CONCEPT_MAP: Record<string, { name: string; render: (size: number) => React.ReactNode }> = {
  responsive: {
    name: "Responsive Web Design",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  uiux: {
    name: "UI/UX Implementation",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  api: {
    name: "REST APIs",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  oop: {
    name: "Object-Oriented Programming (OOP)",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  server: {
    name: "Server-Side Application Development",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" />
        <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
  },
  dbdesign: {
    name: "Database Design and Management",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  crud: {
    name: "CRUD Operations",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  optimization: {
    name: "Data Modeling & Query Optimization",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  code: {
    name: "Apex Classes and Methods",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  query: {
    name: "Triggers and SOQL",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  relation: {
    name: "Salesforce Objects & Relationships",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
  },
  model: {
    name: "Salesforce Data Model",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
};

export function isBrand(key: string): boolean {
  return Boolean(BRAND_MAP[key]);
}

interface TechLogoProps {
  logoKey: string;
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export function TechLogo({
  logoKey,
  size = 32,
  className = "",
  showGlow = false,
}: TechLogoProps) {
  const brand = BRAND_MAP[logoKey];

  if (brand) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-500"
            style={{ backgroundColor: brand.glow }}
          />
        )}
        <Image
          src={brand.src}
          alt={brand.name}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain"
        />
      </div>
    );
  }

  const concept = CONCEPT_MAP[logoKey];
  if (concept) {
    return (
      <div
        className={`inline-flex items-center justify-center text-[var(--ink-2)] shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {concept.render(size)}
      </div>
    );
  }

  // Fallback icon
  return (
    <div
      className={`inline-flex items-center justify-center text-[var(--mute)] shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 8h10M7 12h10M7 16h6" />
      </svg>
    </div>
  );
}
