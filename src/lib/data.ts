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
  name: "Usman Javaid",
  firstName: "USMAN",
  lastName: "JAVAID",
  role: "Front-End Developer",
  email: "musmanjavaid123@gmail.com",
  phone: "+48 571992607",
  phoneHref: "tel:+48571992607",
  location: "Szczęsna 5C, Warsaw, Poland",
  resumeSummary:
    "Front-End Developer and Web Development Specialist with experience in building responsive, user-friendly websites and optimizing digital experiences. Skilled in translating UI/UX designs into functional web interfaces, developing modern websites, and improving website performance and usability.",
  github: null, // Note: not in resume.pdf
  linkedin: "https://www.linkedin.com/in/ottoman-javaid-83baa1437",
  resumePath: "/resume.pdf",
  department: "Front-End Engineering",
  validTill: "Present",
  idNumber: "UJ-4857199",
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
    id: "responsive-web-app",
    index: "01",
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
    index: "02",
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
    index: "03",
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
