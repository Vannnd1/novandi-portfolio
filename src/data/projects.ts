export type ProjectCategory = 'flagship-research' | 'flagship-systems' | 'data-ai' | 'interactive' | 'academic-coursework';

export interface ProjectMetric {
  label: string;
  value: string;
  status?: 'verified' | 'passed' | 'neutral';
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  summary: string;
  problemStatement?: string;
  architectureDetails?: string[];
  techStack: string[];
  metrics: ProjectMetric[];
  githubUrl?: string;
  demoUrl?: string;
  isFlagship?: boolean;
  academicContext?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "chaotic-image-encryption",
    title: "Skripsi — Chaotic Medical Image Encryption System",
    subtitle: "Digital Image Cryptography using Hybrid Chaotic Maps & NIST SP 800-22 Evaluation",
    category: "flagship-research",
    categoryLabel: "ACADEMIC THESIS · CRYPTOGRAPHY & SECURITY",
    year: "2026",
    isFlagship: true,
    academicContext: "Undergraduate Thesis (Skripsi), S1 Informatika Universitas Gunadarma (NPM: 51422256)",
    summary:
      "A medical digital image encryption and decryption system utilizing hybrid chaotic maps (Gauss-MS Map and MS-Gauss Map) to protect confidential healthcare imagery against statistical, differential, and brute-force attacks.",
    problemStatement:
      "Digital healthcare transmissions (DICOM/X-ray/MRI) require confidentiality guarantees compliant with medical privacy standards. Conventional ciphers can suffer from computational latency on raw pixel matrices or fail to completely break adjacent pixel correlations in homogeneous regions.",
    architectureDetails: [
      "5 Chaos Algorithms: MS Map, Gauss Map, Gauss-MS Map (GoF composition), MS-Gauss Map (FoG composition), and Sequential layered diffusion.",
      "Just-In-Time (JIT) compilation optimization with Numba for real-time iterative execution, with robust NumPy fallback.",
      "Uniformly distributed 8-bit keystream generation: K_k = ⌊X_k × 10^6⌋ mod 256.",
      "Fast XOR diffusion pipeline supporting both 2D Grayscale and 3D RGB/BGR multichannel arrays with 100% reversible symmetric decryption.",
      "Dynamical system validation including bifurcation diagrams and Largest Lyapunov Exponent (LLE) calculations.",
      "Interactive Python graphical interface (GUI) with live side-by-side histogram plots, pixel correlation scatter diagrams, and test history reporting.",
    ],
    techStack: ["Python 3.10+", "Numba JIT", "NumPy", "Tkinter / GUI", "SciPy", "Matplotlib", "Cryptography"],
    metrics: [
      { label: "NIST SP 800-22", value: "100% Passed", status: "passed" },
      { label: "Shannon Entropy", value: "≈ 7.998 / 8.000", status: "verified" },
      { label: "NPCR Differential", value: "≥ 99.62%", status: "verified" },
      { label: "UACI Differential", value: "≈ 33.46%", status: "verified" },
      { label: "Pixel Correlation", value: "≈ 0.001 (H, V, D)", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/chaotic-image-encryption",
  },
  {
    id: "manufacturing-digital-operations",
    title: "Manufacturing Digital Operations System (MOM / MES)",
    subtitle: "Enterprise Manufacturing Operations Management with Strict Segregation of Duties",
    category: "flagship-systems",
    categoryLabel: "ENTERPRISE SYSTEMS · FULL-STACK ARCHITECTURE",
    year: "2026",
    isFlagship: true,
    summary:
      "An enterprise-grade Manufacturing Operations Management (MOM/MES) platform engineered to digitize factory workflows from procurement through inventory, production scheduling, quality control, operational insights, and immutable audit traceability.",
    problemStatement:
      "Traditional factories suffer from stockouts caused by phantom material reservations, unsegregated approval fraud, duplicate quality inspections, and fragmented compliance paper trails.",
    architectureDetails: [
      "Strict Segregation of Duties (SoD) across 6 roles: Admin, Manager, Purchasing, Warehouse, Production, and Quality Control.",
      "ACID-compliant inventory transactions using Knex and PostgreSQL, preventing negative stock and phantom allocations.",
      "End-to-end lot and batch genealogy linking supplier Purchase Orders to finished goods release certificates.",
      "Production readiness architecture featuring decoupled liveness/readiness probes, X-Request-Id correlation, and automated credential scrubbing in logs.",
    ],
    techStack: ["TypeScript 5.5", "React 19", "Express 4.19", "PostgreSQL", "Knex.js", "Tailwind CSS v4", "Zustand", "Vitest"],
    metrics: [
      { label: "Automated Tests", value: "252 Passed (20 Suites)", status: "passed" },
      { label: "Code Line Coverage", value: "89.94% (96.6% Services)", status: "verified" },
      { label: "Security & SoD", value: "6 Enforced Roles", status: "verified" },
      { label: "Database Transactions", value: "ACID Guaranteed", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/manufacturing-digital-operations",
  },
  {
    id: "retailinsight-ai",
    title: "RetailInsight AI — Retail Sales Intelligence Dashboard & AI Analyst",
    subtitle: "Zero-Latency Multidimensional Analytics with Context-Aware Google Gemini LLM",
    category: "data-ai",
    categoryLabel: "DATA ANALYSIS · GENERATIVE A.I.",
    year: "2026",
    isFlagship: false,
    summary:
      "An end-to-end interactive retail intelligence dashboard analyzing 541,000+ transaction records through responsive visualizations, universal 0ms cross-filtering, and an embedded context-aware AI analyst powered by Google Gemini.",
    problemStatement:
      "Large-scale transaction datasets frequently overwhelm non-technical business leaders with high latency and complex SQL, while standalone AI chatbots hallucinate because they lack real-time query context.",
    architectureDetails: [
      "ETL pipeline preprocessing 541,909 raw records from the UCI Online Retail dataset into optimized multidimensional aggregations.",
      "Universal cross-filtering engine delivering instant 0ms client-side recalculations across revenue trendlines, product rankings, and customer tiers.",
      "'Exclude UK' international benchmarking toggle overcoming extreme 90% domestic market transaction skew.",
      "Context-aware Gemini AI Analyst with temperature 0.1 guardrails, prompt token optimization, and automated 4-model failover (Gemini 3.8 down to 3.5 Flash).",
    ],
    techStack: ["React 18", "Vite", "Tailwind CSS", "Recharts", "Google Gemini API", "JavaScript", "Node.js ETL"],
    metrics: [
      { label: "Dataset Scale", value: "541,909 Records", status: "verified" },
      { label: "Filter Latency", value: "0ms Client-Side", status: "verified" },
      { label: "Failover Fallback", value: "4-Model Cascade", status: "verified" },
      { label: "Customer Segments", value: "8 Spend Brackets", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/retailinsight-ai",
  },
  {
    id: "sahabat-dunia",
    title: "Sahabat Dunia — Interactive Animal Learning Web App",
    subtitle: "Educational Multimedia Platform with Web Audio API Integration",
    category: "interactive",
    categoryLabel: "FRONTEND · INTERACTIVE MULTIMEDIA",
    year: "2026",
    isFlagship: false,
    summary:
      "An interactive educational web platform introducing biodiversity and animal habitats to young learners through multimedia visual cards, quiz modules, and interactive Web Audio sound controls.",
    architectureDetails: [
      "Custom audio controller widget managing background audio and animal vocalization playback via the HTML5 Web Audio API.",
      "Responsive interactive grid with animal taxonomy categorization and visual cards.",
      "Interactive quiz logic tracking learning progress without external backend requirements.",
    ],
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Web Audio API", "Interactive UI"],
    metrics: [
      { label: "Architecture", value: "Zero-Dependency Vanilla", status: "neutral" },
      { label: "Audio Engine", value: "HTML5 Web Audio API", status: "neutral" },
    ],
    githubUrl: "https://github.com/Vannnd1/SahabatDunia",
  },
  {
    id: "adaptive-learning-insight",
    title: "Adaptive Learning Insight — Capstone Project Program Asah",
    subtitle: "AI-Powered Web Solution for Educational Learning Data Analytics",
    category: "academic-coursework",
    categoryLabel: "COHORT CAPSTONE · FULL-STACK WEB & AI",
    year: "2025",
    isFlagship: false,
    academicContext: "Program Asah — Dicoding Indonesia in association with Accenture (2025)",
    summary:
      "Collaborative capstone web application developed to analyze student learning patterns and generate relevant actionable educational insights using React, Node.js, and cloud AI fundamentals.",
    architectureDetails: [
      "Collaborated in a development team building front-end interfaces with React.",
      "Integrated backend endpoints using Node.js RESTful APIs.",
      "Explored AWS Generative AI services to synthesize instructional feedback.",
    ],
    techStack: ["React", "Node.js", "JavaScript", "REST API", "AI Fundamentals", "AWS"],
    metrics: [
      { label: "Program", value: "Program Asah Dicoding", status: "neutral" },
      { label: "Role", value: "Full-Stack Web Collaborator", status: "neutral" },
    ],
  },
  {
    id: "youtube-sentiment-jumbo",
    title: "YouTube Sentiment Analysis Concerning Film Jumbo",
    subtitle: "Natural Language Processing using Support Vector Machine & InSet Lexicon",
    category: "academic-coursework",
    categoryLabel: "ACADEMIC RESEARCH · NATURAL LANGUAGE PROCESSING",
    year: "2025",
    isFlagship: false,
    academicContext: "Universitas Gunadarma Academic Study (2025)",
    summary:
      "Data analysis and machine learning research project performing Indonesian sentiment classification on public YouTube comments concerning the animated film Jumbo using Support Vector Machine (SVM) and the InSet sentiment lexicon.",
    architectureDetails: [
      "Automated extraction and preprocessing of Indonesian YouTube comment text data.",
      "Text normalization, tokenization, stopword removal, and sentiment polarity scoring via InSet Lexicon.",
      "Supervised classification model training and evaluation using Support Vector Machine (SVM).",
    ],
    techStack: ["Python", "Data Analysis", "NLP", "Support Vector Machine (SVM)", "InSet Lexicon"],
    metrics: [
      { label: "Classification Model", value: "Support Vector Machine", status: "neutral" },
      { label: "Lexicon Methodology", value: "InSet Sentiment Lexicon", status: "neutral" },
    ],
  },
];
