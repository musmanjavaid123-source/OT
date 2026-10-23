/**
 * src/lib/data.ts
 * Single source of truth for Usman Javaid's personal portfolio.
 * Sourced STRICTLY and VERBATIM from resume.pdf (no fabrications).
 */

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  github: string | null;
  linkedin: string;
  resumePath: string;
  department: string;
  validTill: string;
  idNumber: string;
}

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export type SkillFamily =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Salesforce"
  | "Tools"
  | "Concepts";

export interface SkillItem {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: SkillFamily;
  isBrand: boolean;
  logoKey?: string;
  projects: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
}

export interface ProjectReference {
  id: string;
  index: string;
  name: string;
  url: string;
  country: string;
  region: string;
  category: string;
  description: string;
  designNotes: string;
  referenceType: "website-reference" | "design-inspiration";
  featured?: boolean;
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
}

export interface ExperienceItem {
  id: string;
  type: "work" | "education";
  period: string;
  roleOrDegree: string;
  companyOrSchool: string;
  location: string;
  bullets: string[];
}

export interface AchievementItem {
  id: string;
  index: string;
  platform: string;
  value: number;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  brandColor: string;
}

export const PROFILE: Profile = {
  name: "Ottoman",
  firstName: "OTTOMAN",
  lastName: "",
  role: "Front-End Developer",
  email: "mangmnt.imuj@gmail.com",
  phone: "+48 571992607",
  phoneHref: "tel:+48571992607",
  location: "Szczęsna 5C, Warsaw, Poland",
  resumeSummary:
    "Front-End Developer and Web Development Specialist with experience in building responsive, user-friendly websites and optimizing digital experiences. Skilled in translating UI/UX designs into functional web interfaces, developing modern websites, and improving website performance and usability.",
  github: null, // Note: not in resume.pdf
  linkedin: "https://www.linkedin.com/in/ottoman19",
  resumePath: "/resume.pdf",
  department: "Front-End Engineering",
  validTill: "Present",
  idNumber: "OT-4857199",
};

export const NAV: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "certifications", label: "Certifications", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export const SKILL_FAMILIES: SkillFamily[] = [
  "Frontend",
  "Backend",
  "Database",
  "Salesforce",
  "Tools",
  "Concepts",
];

export const SKILLS: SkillItem[] = [
  // Front-End Development
  {
    atomicNumber: 1,
    symbol: "Ht",
    name: "HTML5",
    family: "Frontend",
    isBrand: true,
    logoKey: "html5",
    projects: ["Responsive Web Application"],
  },
  {
    atomicNumber: 2,
    symbol: "Cs",
    name: "CSS3",
    family: "Frontend",
    isBrand: true,
    logoKey: "css3",
    projects: ["Responsive Web Application"],
  },
  {
    atomicNumber: 3,
    symbol: "Js",
    name: "JavaScript",
    family: "Frontend",
    isBrand: true,
    logoKey: "javascript",
    projects: ["Responsive Web Application"],
  },
  {
    atomicNumber: 4,
    symbol: "Re",
    name: "React.js",
    family: "Frontend",
    isBrand: true,
    logoKey: "react",
    projects: ["Responsive Web Application"],
  },
  {
    atomicNumber: 5,
    symbol: "Bs",
    name: "Bootstrap",
    family: "Frontend",
    isBrand: true,
    logoKey: "bootstrap",
    projects: ["Responsive Web Application"],
  },
  {
    atomicNumber: 6,
    symbol: "Tw",
    name: "Tailwind CSS",
    family: "Frontend",
    isBrand: true,
    logoKey: "tailwindcss",
    projects: ["Responsive Web Application"],
  },
  {
    atomicNumber: 7,
    symbol: "Rw",
    name: "Responsive Web Design",
    family: "Concepts",
    isBrand: false,
    logoKey: "responsive",
    projects: ["Responsive Web Application"],
  },
  {
    atomicNumber: 8,
    symbol: "Ux",
    name: "UI/UX Implementation",
    family: "Concepts",
    isBrand: false,
    logoKey: "uiux",
    projects: ["Responsive Web Application"],
  },

  // Back-End Development
  {
    atomicNumber: 9,
    symbol: "Jv",
    name: "Java",
    family: "Backend",
    isBrand: true,
    logoKey: "java",
    projects: ["Database-Driven Application"],
  },
  {
    atomicNumber: 10,
    symbol: "Py",
    name: "Python",
    family: "Backend",
    isBrand: true,
    logoKey: "python",
    projects: ["Database-Driven Application"],
  },
  {
    atomicNumber: 11,
    symbol: "Nd",
    name: "Node.js",
    family: "Backend",
    isBrand: true,
    logoKey: "nodejs",
    projects: ["Database-Driven Application"],
  },
  {
    atomicNumber: 12,
    symbol: "Ra",
    name: "REST APIs",
    family: "Concepts",
    isBrand: false,
    logoKey: "api",
    projects: ["Responsive Web Application", "Database-Driven Application"],
  },
  {
    atomicNumber: 13,
    symbol: "Op",
    name: "Object-Oriented Programming (OOP)",
    family: "Concepts",
    isBrand: false,
    logoKey: "oop",
    projects: ["Salesforce Development Project"],
  },
  {
    atomicNumber: 14,
    symbol: "Ss",
    name: "Server-Side Application Development",
    family: "Concepts",
    isBrand: false,
    logoKey: "server",
    projects: ["Database-Driven Application"],
  },

  // Database Technologies
  {
    atomicNumber: 15,
    symbol: "Sq",
    name: "SQL",
    family: "Database",
    isBrand: true,
    logoKey: "sql",
    projects: ["Database-Driven Application"],
  },
  {
    atomicNumber: 16,
    symbol: "My",
    name: "MySQL",
    family: "Database",
    isBrand: true,
    logoKey: "mysql",
    projects: ["Database-Driven Application"],
  },
  {
    atomicNumber: 17,
    symbol: "Pg",
    name: "PostgreSQL",
    family: "Database",
    isBrand: true,
    logoKey: "postgresql",
    projects: ["Database-Driven Application"],
  },
  {
    atomicNumber: 18,
    symbol: "Dd",
    name: "Database Design and Management",
    family: "Concepts",
    isBrand: false,
    logoKey: "dbdesign",
    projects: ["Database-Driven Application"],
  },
  {
    atomicNumber: 19,
    symbol: "Cr",
    name: "CRUD Operations",
    family: "Concepts",
    isBrand: false,
    logoKey: "crud",
    projects: ["Database-Driven Application"],
  },
  {
    atomicNumber: 20,
    symbol: "Dm",
    name: "Data Modeling & Query Optimization",
    family: "Concepts",
    isBrand: false,
    logoKey: "optimization",
    projects: ["Database-Driven Application"],
  },

  // Salesforce Development
  {
    atomicNumber: 21,
    symbol: "Sf",
    name: "Salesforce Apex",
    family: "Salesforce",
    isBrand: true,
    logoKey: "salesforce",
    projects: ["Salesforce Development Project"],
  },
  {
    atomicNumber: 22,
    symbol: "Am",
    name: "Apex Classes and Methods",
    family: "Salesforce",
    isBrand: false,
    logoKey: "code",
    projects: ["Salesforce Development Project"],
  },
  {
    atomicNumber: 23,
    symbol: "Ts",
    name: "Triggers and SOQL",
    family: "Salesforce",
    isBrand: false,
    logoKey: "query",
    projects: ["Salesforce Development Project"],
  },
  {
    atomicNumber: 24,
    symbol: "So",
    name: "Salesforce Objects and Relationships",
    family: "Salesforce",
    isBrand: false,
    logoKey: "relation",
    projects: ["Salesforce Development Project"],
  },
  {
    atomicNumber: 25,
    symbol: "Sd",
    name: "Salesforce Data Model",
    family: "Salesforce",
    isBrand: false,
    logoKey: "model",
    projects: ["Salesforce Development Project"],
  },
  {
    atomicNumber: 26,
    symbol: "Pd",
    name: "Salesforce Platform Development I (PD1)",
    family: "Salesforce",
    isBrand: true,
    logoKey: "salesforce",
    projects: ["Salesforce Development Project"],
  },

  // Development Tools
  {
    atomicNumber: 27,
    symbol: "Gt",
    name: "Git and GitHub",
    family: "Tools",
    isBrand: true,
    logoKey: "git",
    projects: ["Responsive Web Application", "Database-Driven Application"],
  },
  {
    atomicNumber: 28,
    symbol: "Vs",
    name: "Visual Studio Code",
    family: "Tools",
    isBrand: true,
    logoKey: "vscode",
    projects: ["Responsive Web Application"],
  },
  {
    atomicNumber: 29,
    symbol: "Dc",
    name: "Salesforce Developer Console",
    family: "Tools",
    isBrand: true,
    logoKey: "salesforce",
    projects: ["Salesforce Development Project"],
  },
  {
    atomicNumber: 30,
    symbol: "Lp",
    name: "Salesforce Lightning Platform",
    family: "Tools",
    isBrand: true,
    logoKey: "salesforce",
    projects: ["Salesforce Development Project"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "ottoman-live-gallery",
    index: "01",
    title: "Ottoman.live — International Website Design Gallery",
    kicker: "Web Design & UX/UI",
    description:
      "Curated 42 website references across 9 international markets, including Dubai, Singapore, Poland, Germany, the Netherlands, the US, the UK, Hungary, and Canada. Designed an interactive, responsive gallery featuring country filters, project cards, and detailed design analysis, showcasing inspiration across real estate, e-commerce, SaaS, architecture, and creative industries.",
    features: [
      "Curated 42 website references across 9 international markets",
      "Interactive responsive gallery with country filters and project cards",
      "Detailed design analysis across real estate, e-commerce, SaaS, and architecture",
      "UX/UI design, responsive layouts, and information architecture",
    ],
    tech: [
      "UX/UI Design",
      "Responsive Web Design",
      "Frontend Development",
      "Information Architecture",
      "Interaction Design",
    ],
    github: null,
  },
  {
    id: "responsive-web-app",
    index: "02",
    title: "Responsive Web Application",
    kicker: "Web Interface & Usability",
    description:
      "Developed responsive web interfaces using HTML, CSS, and JavaScript. Implemented interactive features and mobile-friendly layouts. Focused on usability, performance, and maintainable code.",
    features: [
      "Responsive web interfaces using HTML, CSS, and JavaScript",
      "Interactive features and mobile-friendly layouts",
      "Focused on usability, performance, and code maintainability",
      "Optimized for cross-browser and cross-device consistency",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: null,
  },
  {
    id: "database-driven-app",
    index: "03",
    title: "Database-Driven Application",
    kicker: "Data Management & CRUD",
    description:
      "Designed database structures to organize and manage application data. Used SQL queries to retrieve, insert, update, and delete records. Implemented CRUD operations and basic data validation.",
    features: [
      "Structured schema design for relational application data",
      "SQL query pipelines for record retrieval and updates",
      "Full CRUD operations and lifecycle management",
      "Basic data validation and transactional integrity",
    ],
    tech: ["SQL", "CRUD Operations", "Data Modeling"],
    github: null,
  },
  {
    id: "salesforce-dev-project",
    index: "04",
    title: "Salesforce Development Project",
    kicker: "Apex & Object Architecture",
    description:
      "Practiced Apex classes, methods, variables, and object-oriented programming. Worked with Salesforce objects and relationships. Practiced SOQL queries to retrieve records from Salesforce. Explored Salesforce application logic and platform development concepts.",
    features: [
      "Apex classes, methods, variables, and OOP patterns",
      "Salesforce objects and relational data architecture",
      "SOQL query structures to retrieve records efficiently",
      "Salesforce application logic and Lightning platform concepts",
    ],
    tech: ["Salesforce Apex", "SOQL", "Salesforce Objects"],
    github: null,
  },
];

export const PROJECT_REFERENCES: ProjectReference[] = [
  // Dubai / UAE (7)
  {
    id: "ax-capital",
    index: "01",
    name: "AX CAPITAL",
    url: "https://www.axcapital.ae/",
    country: "Dubai / UAE",
    region: "Middle East",
    category: "Dubai Real Estate Agency",
    description: "Property discovery, area guides, architectural listings, and high-conversion real-estate interface.",
    designNotes: "High-conversion filtering, interactive area maps, architectural photography rhythm, and clear conversion paths.",
    referenceType: "website-reference",
    featured: true,
  },
  {
    id: "sobha-realty",
    index: "02",
    name: "Sobha Realty",
    url: "https://sobharealty.com/",
    country: "Dubai / UAE",
    region: "Middle East",
    category: "Real Estate Developer",
    description: "Luxury property storytelling, architectural development galleries, and premium residential showcases.",
    designNotes: "Full-bleed architectural imagery, 3D floor plan integration, elegant serif typography, and premium spatial layout.",
    referenceType: "website-reference",
    featured: true,
  },
  {
    id: "vela",
    index: "03",
    name: "VELA",
    url: "https://velawebdesign.com/",
    country: "Dubai / UAE",
    region: "Middle East",
    category: "Web Design / Development",
    description: "Boutique digital studio crafting custom-built websites for ambitious regional brands.",
    designNotes: "Disciplined Swiss whitespace, minimalist editorial typography, and bespoke web craftsmanship.",
    referenceType: "website-reference",
  },
  {
    id: "meant",
    index: "04",
    name: "Meant",
    url: "https://meant.space/",
    country: "Dubai / UAE",
    region: "Middle East",
    category: "Web / Apps / Digital",
    description: "Independent digital product and branding studio based in Dubai.",
    designNotes: "Founder-led studio storytelling, high-contrast monochrome design, and clean interactive service tiers.",
    referenceType: "website-reference",
  },
  {
    id: "jaleed",
    index: "05",
    name: "Jaleed Studio",
    url: "https://www.jaleed.studio/",
    country: "Dubai / UAE",
    region: "Middle East",
    category: "Creative Studio",
    description: "Independent creative studio focused on structured digital identities and web platforms.",
    designNotes: "Rigorous Swiss layout grids, restrained motion design, and editorial project case studies.",
    referenceType: "website-reference",
  },
  {
    id: "clay-graphik",
    index: "06",
    name: "Clay Graphik",
    url: "https://claygraphik.com/",
    country: "Dubai / UAE",
    region: "Middle East",
    category: "Branding / Websites",
    description: "Independent creative consultancy delivering cohesive brand-to-digital systems.",
    designNotes: "Brand clarity, typography-first digital experiences, and focused boutique positioning.",
    referenceType: "website-reference",
  },
  {
    id: "bond-dubai",
    index: "07",
    name: "Bond Dubai",
    url: "https://bond-agency.com/",
    country: "Dubai / UAE",
    region: "Middle East",
    category: "Brand & Digital Studio",
    description: "Multi-disciplinary studio crafting bold brand identities and digital platforms in the Gulf region.",
    designNotes: "Multi-disciplinary brand architecture, brutalist-editorial design rhythm, and refined interactive case studies.",
    referenceType: "website-reference",
  },

  // Singapore (5)
  {
    id: "made-u-look",
    index: "08",
    name: "MADE U LOOK Studio",
    url: "https://madeulook.studio/work",
    country: "Singapore",
    region: "Southeast Asia",
    category: "Web Design / Creative Studio",
    description: "Curated project archive spanning websites for independent brands and small businesses.",
    designNotes: "Restrained grid composition, editorial typography, and thoughtful interactive hover states.",
    referenceType: "website-reference",
  },
  {
    id: "nout-studio",
    index: "09",
    name: "Nout Studio",
    url: "https://www.noutstudio.com/",
    country: "Singapore",
    region: "Southeast Asia",
    category: "Branding / Design",
    description: "Minimal identity systems and considered presentation of client projects.",
    designNotes: "Monochromatic typography, quiet luxury aesthetics, and precise project storytelling.",
    referenceType: "website-reference",
  },
  {
    id: "melio-designs",
    index: "10",
    name: "Melio Designs",
    url: "https://meliodesigns.com/",
    country: "Singapore",
    region: "Southeast Asia",
    category: "Web Design",
    description: "Small-studio positioning, clean interfaces, and deliberate type hierarchy.",
    designNotes: "Approachable layout structure, modern responsive design, and crisp visual hierarchy.",
    referenceType: "website-reference",
  },
  {
    id: "dubient-designs",
    index: "11",
    name: "Dubient Designs",
    url: "https://dubientdesigns.com/",
    country: "Singapore",
    region: "Southeast Asia",
    category: "Web / Digital Products",
    description: "Founder-led digital product services and practical web application presentation.",
    designNotes: "Clean conversion flows, modern micro-interactions, and purposeful component states.",
    referenceType: "website-reference",
  },
  {
    id: "de-makers-space",
    index: "12",
    name: "De Makers Space",
    url: "https://demakersspace.com/",
    country: "Singapore",
    region: "Southeast Asia",
    category: "Web Design",
    description: "Small-business websites, approachable messaging, and transparent service packages.",
    designNotes: "Modular content blocks, warm color accents, and structured service tier architecture.",
    referenceType: "website-reference",
  },

  // Hungary (4)
  {
    id: "zern-studio",
    index: "13",
    name: "ZERN Studio",
    url: "https://www.zernstudio.com/en",
    country: "Hungary",
    region: "Central Europe",
    category: "Web Design / Development",
    description: "Technical editorial style, interactive case files, and clear interface presentation.",
    designNotes: "Deep-level case study documentation, interactive prototype snippets, and dark/light contrast.",
    referenceType: "website-reference",
    featured: true,
  },
  {
    id: "blasterr-design",
    index: "14",
    name: "Blasterr Design",
    url: "https://blasterrdesign.hu/en/",
    country: "Hungary",
    region: "Central Europe",
    category: "Web Design / Branding",
    description: "Small-business branding, portfolio showcases, and clean layout systems.",
    designNotes: "Vibrant brand accents against neutral canvas, bespoke iconography, and smooth scroll transitions.",
    referenceType: "website-reference",
  },
  {
    id: "flow-project",
    index: "15",
    name: "FlowProject",
    url: "https://flowproject.hu/en/",
    country: "Hungary",
    region: "Central Europe",
    category: "Digital Studio",
    description: "Developer-led digital services, modern software storytelling, and distinctive studio voice.",
    designNotes: "Engineering-first aesthetic, crisp code/component previews, and modern typography.",
    referenceType: "website-reference",
  },
  {
    id: "circumstances",
    index: "16",
    name: "Circumstances Creative Co.",
    url: "https://circumstances.hu/",
    country: "Hungary",
    region: "Central Europe",
    category: "Digital / Editorial Design",
    description: "Cultural websites, editorial art direction, and detailed narrative case studies.",
    designNotes: "Experimental typographic scale, rich editorial composition, and thoughtful cultural archives.",
    referenceType: "website-reference",
  },

  // Poland (5)
  {
    id: "huncwot",
    index: "17",
    name: "Huncwot",
    url: "https://huncwot.com/",
    country: "Poland",
    region: "Central Europe",
    category: "Digital Creative Agency",
    description: "Warsaw-based award-winning interactive studio and Cannes Lions winner.",
    designNotes: "Bespoke digital craftsmanship, tactile micro-interactions, and innovative cultural platforms.",
    referenceType: "website-reference",
    featured: true,
  },
  {
    id: "kamil-tomczuk",
    index: "18",
    name: "Kamil Tomczuk",
    url: "https://www.professorkt.tech/",
    country: "Poland",
    region: "Central Europe",
    category: "Web Design / Development",
    description: "Strong typography, independent portfolio identity, and custom website presentation.",
    designNotes: "Bold brutalist-editorial layout, monospace metadata badges, and custom technical shaders.",
    referenceType: "website-reference",
  },
  {
    id: "noeeko",
    index: "19",
    name: "Noeeko",
    url: "https://www.noeeko.com/",
    country: "Poland",
    region: "Central Europe",
    category: "Creative / Design Studio",
    description: "Art direction, corporate identity, editorial design, and refined portfolio composition.",
    designNotes: "High-fashion editorial balance, ultra-clean whitespace, and restrained typography.",
    referenceType: "website-reference",
  },
  {
    id: "roud-studio",
    index: "20",
    name: "Roud Studio",
    url: "https://roudstudio.com/portfolio",
    country: "Poland",
    region: "Central Europe",
    category: "Web / Branding / E-commerce",
    description: "Case-study organisation, digital brand identities, and small-business platforms.",
    designNotes: "Tactile micro-animations, structured e-commerce layouts, and multi-viewport previews.",
    referenceType: "website-reference",
  },
  {
    id: "maverick-studio",
    index: "21",
    name: "Maverick Studio",
    url: "https://www.wearemaverick.pl/",
    country: "Poland",
    region: "Central Europe",
    category: "Branding / Digital Design",
    description: "Independent studio positioning and technology-oriented brand identities.",
    designNotes: "Geometric vector graphics, clean brand consistency, and modern typography.",
    referenceType: "website-reference",
  },

  // Germany (5)
  {
    id: "1042-studio",
    index: "22",
    name: "1042 Studio",
    url: "https://1042.studio/",
    country: "Germany",
    region: "Western Europe",
    category: "Branding / Digital Design",
    description: "Berlin-based studio crafting contemporary visual systems and brand experiences.",
    designNotes: "Swiss modernist typography, high-contrast layouts, and disciplined grid alignment.",
    referenceType: "website-reference",
  },
  {
    id: "cee-cee-creative",
    index: "23",
    name: "Cee Cee Creative",
    url: "https://www.ceeceecreative.com/",
    country: "Germany",
    region: "Western Europe",
    category: "Branding / Interactive Design",
    description: "Brand identity, editorial composition, and curated digital culture presentation.",
    designNotes: "Publishing-grade editorial layouts, high-res photography direction, and quiet luxury aesthetics.",
    referenceType: "website-reference",
  },
  {
    id: "cru",
    index: "24",
    name: "CRU",
    url: "https://www.madebycru.com/",
    country: "Germany",
    region: "Western Europe",
    category: "Branding / Interactive Design",
    description: "Hamburg-based studio renowned for distinctive art direction and cohesive visual systems.",
    designNotes: "Modular card systems, sleek interactive page transitions, and expressive typography.",
    referenceType: "website-reference",
  },
  {
    id: "eiga",
    index: "25",
    name: "EIGA",
    url: "https://eiga.design/",
    country: "Germany",
    region: "Western Europe",
    category: "Branding / Digital Design",
    description: "Brand architecture, corporate design, and typography-driven digital interfaces.",
    designNotes: "Rigorous grid systems, corporate identity craftsmanship, and clear hierarchy.",
    referenceType: "website-reference",
  },
  {
    id: "moby-digg",
    index: "26",
    name: "Moby Digg",
    url: "https://mobydigg.de/",
    country: "Germany",
    region: "Western Europe",
    category: "Branding / Interactive Design",
    description: "Munich-based studio merging graphic design with creative coding and digital art.",
    designNotes: "Generative visuals, fluid interactive layouts, and kinetic typography.",
    referenceType: "website-reference",
    featured: true,
  },

  // Netherlands (4)
  {
    id: "driezie-studio",
    index: "27",
    name: "Driezie Studio",
    url: "https://driezie.studio/",
    country: "Netherlands",
    region: "Western Europe",
    category: "Web Design / Development",
    description: "Accessible websites for independent businesses, local cafés, and creative services.",
    designNotes: "Warm editorial aesthetic, accessible color ratios, and community-first storytelling.",
    referenceType: "website-reference",
  },
  {
    id: "goat-pixels",
    index: "28",
    name: "GOAT Pixels",
    url: "https://goatpixels.com/",
    country: "Netherlands",
    region: "Western Europe",
    category: "Web Design / Creative Dev",
    description: "Custom websites, bespoke interactive experiences, and creative engineering.",
    designNotes: "Playful micro-interactions, canvas animations, and developer craftsmanship.",
    referenceType: "website-reference",
  },
  {
    id: "uncommon",
    index: "29",
    name: "UNCOMMON",
    url: "https://www.uncommon.nl/",
    country: "Netherlands",
    region: "Western Europe",
    category: "Creative Studio",
    description: "Amsterdam studio delivering distinctive art direction, brand strategy, and digital experiences.",
    designNotes: "Brutalist minimalism, bold narrative pacing, and distinctive Dutch design culture.",
    referenceType: "website-reference",
  },
  {
    id: "vanta-studio",
    index: "30",
    name: "VANTA Studio",
    url: "https://www.vantastudioamsterdam.com/",
    country: "Netherlands",
    region: "Western Europe",
    category: "Creative / Digital Studio",
    description: "Amsterdam boutique studio focusing on high-aesthetic web experiences and brand identity.",
    designNotes: "Atmospheric visual direction, understated luxury storytelling, and refined case-study layout.",
    referenceType: "website-reference",
  },

  // United States (5)
  {
    id: "equo",
    index: "31",
    name: "Equo",
    url: "https://www.equocreate.com/",
    country: "United States",
    region: "North America",
    category: "Independent Web Design",
    description: "Websites for architecture practices, hospitality, and independent professional services.",
    designNotes: "Restrained editorial typography, spacious grid gutters, and calm natural aesthetics.",
    referenceType: "website-reference",
  },
  {
    id: "common-field",
    index: "32",
    name: "Common Field Media",
    url: "https://commonfieldmedia.com/",
    country: "United States",
    region: "North America",
    category: "Independent Digital Studio",
    description: "Editorial layouts, brand archives, and digital experiences for boutique brands.",
    designNotes: "Magazine-style grid layouts, organic color palettes, and independent brand storytelling.",
    referenceType: "website-reference",
  },
  {
    id: "halftone-studios",
    index: "33",
    name: "Halftone Studios",
    url: "https://halftone-studios.com/",
    country: "United States",
    region: "North America",
    category: "Web Design / Development",
    description: "Minimal studio branding, lightweight project previews, and clean typography.",
    designNotes: "Monospace metadata styling, high performance metrics, and rapid responsive adaptability.",
    referenceType: "website-reference",
  },
  {
    id: "almost-always",
    index: "34",
    name: "Almost Always Studio",
    url: "https://www.almostalways.studio/home",
    country: "United States",
    region: "North America",
    category: "Branding / Web Design",
    description: "Boutique brands, lifestyle businesses, and warm editorial art direction.",
    designNotes: "Warm editorial palette, expressive typography pairings, and tactile layout rhythm.",
    referenceType: "website-reference",
  },
  {
    id: "finewright",
    index: "35",
    name: "FineWright",
    url: "https://finewright.com/",
    country: "United States",
    region: "North America",
    category: "Web Design / Development",
    description: "Small-business web presence and restrained, hand-crafted digital layouts.",
    designNotes: "Hand-crafted typography, focused single-page conversion layouts, and clean CSS execution.",
    referenceType: "website-reference",
  },

  // United Kingdom (4)
  {
    id: "timms",
    index: "36",
    name: "timms",
    url: "https://timmsdesign.com/",
    country: "United Kingdom",
    region: "Western Europe",
    category: "Branding / Web / E-commerce",
    description: "Independent studio presentation and cohesive brand-to-website digital projects.",
    designNotes: "British typographic discipline, tactile e-commerce interfaces, and seamless layout transitions.",
    referenceType: "website-reference",
  },
  {
    id: "studio-output",
    index: "37",
    name: "Studio Output",
    url: "https://www.studio-output.com/",
    country: "United Kingdom",
    region: "Western Europe",
    category: "Brand & Digital Studio",
    description: "London-based studio creating brand systems, motion, and digital design for tech and culture.",
    designNotes: "High-energy visual systems, motion-forward web experiences, and tech & culture positioning.",
    referenceType: "website-reference",
    featured: true,
  },
  {
    id: "koto",
    index: "38",
    name: "Koto",
    url: "https://koto.com/",
    country: "United Kingdom",
    region: "Western Europe",
    category: "Brand & Digital Studio",
    description: "Independent global studio crafting optimistic brand identities and digital platforms.",
    designNotes: "World-renowned typographic discipline, optimistic identity design, and bold editorial grids.",
    referenceType: "website-reference",
    featured: true,
  },
  {
    id: "monc",
    index: "39",
    name: "Monc",
    url: "https://monclondon.com/",
    country: "United Kingdom",
    region: "Western Europe",
    category: "Boutique Sustainable Brand",
    description: "London-based sustainable eyewear brand with an editorial e-commerce platform.",
    designNotes: "High-craft e-commerce experience, editorial photography, and understated product storytelling.",
    referenceType: "website-reference",
  },

  // Canada (3)
  {
    id: "locomotive",
    index: "40",
    name: "Locomotive",
    url: "https://locomotive.ca/en",
    country: "Canada",
    region: "North America",
    category: "Digital Studio",
    description: "Montreal-based independent studio, global Awwwards leader in digital craftsmanship.",
    designNotes: "Pioneering smooth-scroll interactions, cutting-edge art direction, and immersive web experiences.",
    referenceType: "website-reference",
    featured: true,
  },
  {
    id: "moga-web",
    index: "41",
    name: "Moga Web",
    url: "https://mogaweb.ca/",
    country: "Canada",
    region: "North America",
    category: "Creative Studio",
    description: "Websites and branding for independent businesses, local agencies, and organisations.",
    designNotes: "Clean digital identity for independent enterprises, clear typography, and accessible UX.",
    referenceType: "website-reference",
  },
  {
    id: "chrisps",
    index: "42",
    name: "CHRISPS",
    url: "https://chrispsdesign.ca/",
    country: "Canada",
    region: "North America",
    category: "Founder-led Digital Design",
    description: "Founder-led digital design and boutique Shopify e-commerce systems.",
    designNotes: "Boutique e-commerce architecture, founder-led personal touch, and clean layout structure.",
    referenceType: "website-reference",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    index: "01",
    title: "Full Stack Web Engineer",
    issuer: "NITSEP",
  },
  {
    id: "cert-2",
    index: "02",
    title: "Google Certified Digital Marketing & E-Commerce Specialist",
    issuer: "Google",
  },
  {
    id: "cert-3",
    index: "03",
    title: "Full Stack Digital & SMM Marketing Specialist",
    issuer: "NITSEP",
  },
  {
    id: "cert-4",
    index: "04",
    title: "Google Certified Analytics Specialist",
    issuer: "Google",
  },
  {
    id: "cert-5",
    index: "05",
    title: "Google Certified Ads Search Professional",
    issuer: "Google",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "lacoste",
    type: "work",
    period: "AUG 2022 to Present",
    roleOrDegree: "Web Developer",
    companyOrSchool: "Lacoste",
    location: "Warsaw, Poland",
    bullets: [
      "Develop and maintain responsive web pages using HTML, CSS, and JavaScript.",
      "Translate UI/UX designs and wireframes into interactive, user-friendly web interfaces.",
      "Build responsive layouts optimized for desktop, tablet, and mobile devices.",
      "Optimize website performance, loading speed, and cross-browser compatibility.",
      "Collaborate with designers, developers, and stakeholders to deliver high-quality web solutions.",
      "Identify and resolve front-end bugs and usability issues.",
      "Implement website updates and enhancements to improve functionality and user experience.",
      "Apply SEO best practices to improve website structure and accessibility.",
    ],
  },
  {
    id: "mastercard",
    type: "work",
    period: "SEP 2020 to AUG 2022",
    roleOrDegree: "Web Operations Specialist",
    companyOrSchool: "Mastercard",
    location: "Budapest, Hungary",
    bullets: [
      "Assisted in developing and maintaining responsive website pages and landing pages.",
      "Converted design mockups into functional web interfaces.",
      "Implemented layouts using HTML, CSS, and JavaScript.",
      "Tested website functionality across different browsers and devices.",
      "Identified and fixed front-end issues to improve website usability.",
      "Collaborated with design and marketing teams to implement website enhancements.",
      "Supported website optimization initiatives to improve performance and user experience.",
    ],
  },
  {
    id: "hamdard",
    type: "education",
    period: "Higher Education",
    roleOrDegree: "BS Information Technology",
    companyOrSchool: "Hamdard University",
    location: "Hamdard University",
    bullets: [
      "Bachelor of Science in Information Technology.",
      "Core coursework in Computer Science, Database Systems, Software Engineering, and Web Development.",
    ],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [];
