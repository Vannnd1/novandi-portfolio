export type ProjectCategory = 'flagship-research' | 'flagship-systems' | 'data-ai' | 'interactive' | 'academic-coursework';

export interface ProjectMetric {
  label: string;
  value: string;
  status?: 'verified' | 'passed' | 'neutral';
}

export interface ImplementationDecision {
  title: string;
  rationale: string;
  technicalCode?: string;
}

export interface CaseStudyData {
  problemStatement: string;
  objectives: string[];
  roleAndContributions: string;
  systemArchitecture: {
    overview: string;
    steps: { step: string; description: string }[];
  };
  implementationDecisions: ImplementationDecision[];
  empiricalResults: {
    summary: string;
    metrics: { label: string; value: string; benchmark?: string }[];
  };
  limitationsAndFutureWork: string[];
  references?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  isFlagship?: boolean;
  academicContext?: string;
  summary: string;
  techStack: string[];
  metrics: ProjectMetric[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudy: CaseStudyData;
}

export const projectsData: ProjectItem[] = [
  {
    id: "chaotic-image-encryption",
    title: "Skripsi — Chaotic Medical Image Encryption System",
    subtitle: "Medical Digital Image Cryptography using Hybrid Chaotic Maps & NIST SP 800-22 Evaluation",
    category: "flagship-research",
    categoryLabel: "UNDERGRADUATE THESIS · CRYPTOGRAPHY & SECURITY",
    year: "2026",
    isFlagship: true,
    academicContext: "Undergraduate Thesis (Skripsi), S1 Informatika Universitas Gunadarma (NPM: 51422256)",
    summary:
      "A medical digital image encryption and decryption system utilizing composite chaotic maps (Gauss-MS Map and MS-Gauss Map) to protect confidential healthcare imagery against statistical, differential, and brute-force attacks.",
    techStack: ["Python 3.10+", "Numba JIT", "NumPy", "Tkinter / GUI", "SciPy", "OpenCV", "Matplotlib"],
    metrics: [
      { label: "NIST SP 800-22", value: "100% Passed (15 Tests)", status: "passed" },
      { label: "Shannon Entropy", value: "≈ 7.998 / 8.000", status: "verified" },
      { label: "NPCR Differential", value: "≥ 99.62%", status: "verified" },
      { label: "UACI Differential", value: "≈ 33.46%", status: "verified" },
      { label: "Pixel Correlation", value: "≈ 0.001 (H, V, D)", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/chaotic-image-encryption",
    caseStudy: {
      problemStatement:
        "Medical imaging datasets (X-ray, CT scans, ultrasound, and MRI) contain sensitive patient health records subject to strict clinical confidentiality regulations (HIPAA/GDPR). Because adjacent pixels in uncompressed medical images have extremely high correlation (>0.95) and large homogeneous background regions, standard block ciphers like DES/AES can experience computational latency and may leak edge patterns unless complex diffusion modes are employed. There is a need for high-speed, loss-free, cryptographically sound encryption tailored for raster matrices.",
      objectives: [
        "Formulate and evaluate 5 chaotic map algorithms, specifically composite Gauss-MS Map (GoF) and MS-Gauss Map (FoG).",
        "Accelerate iterative mathematical sequence generation via Numba Just-In-Time (JIT) compilation with automatic NumPy fallback.",
        "Implement an 8-bit uniform keystream generator and symmetric XOR diffusion pipeline for 2D Grayscale and 3D RGB/BGR images.",
        "Conduct empirical statistical validation using the full NIST SP 800-22 test battery across 1,000,000 generated bits.",
        "Verify security against differential attacks (NPCR/UACI) and measure adjacent pixel decorrelation.",
        "Develop an interactive graphical user interface (GUI) with real-time histogram plots, pixel correlation scatter diagrams, and test history reporting.",
      ],
      roleAndContributions:
        "Independent researcher and lead software engineer for the undergraduate thesis project (Skripsi). Researched chaos theory formulations, implemented mathematical iteration kernels in Python, engineered the Numba JIT compiler acceleration, authored the 15 NIST SP 800-22 testing scripts, built the Tkinter interactive GUI, and conducted all statistical evaluations.",
      systemArchitecture: {
        overview:
          "The system is organized into modular pipelines: chaos generation kernel, keystream quantization, XOR diffusion engine, statistical analysis suite, and an interactive Tkinter graphical interface.",
        steps: [
          {
            step: "1. Parameter & Seed Initialization",
            description: "Initial state X₀=0.3, bifurcation control r=3.5, shape parameters α=5.8, β=2.5, λ=3.5, and skip=200 initial transient iterations.",
          },
          {
            step: "2. Chaotic Iteration Kernel",
            description: "Numba JIT accelerated loop computes composite sequence GoF(x) = [exp(-α·(f(x))²) + β] mod 1, where f(x) is the Modified Sine Map.",
          },
          {
            step: "3. 8-Bit Keystream Quantization",
            description: "Continuous chaotic float values are mapped to uniform bytes: K_k = ⌊X_k × 10⁶⌋ mod 256.",
          },
          {
            step: "4. XOR Diffusion (Grayscale & Multichannel)",
            description: "Pixel-by-pixel bitwise XOR diffusion C = P ⊕ K generates cipher image; inverse diffusion restores original image with zero data loss.",
          },
          {
            step: "5. Empirical Cryptanalysis Battery",
            description: "Calculates Shannon Entropy, NPCR/UACI differential sensitivity, adjacent correlation (H, V, D), Chi-Square histogram uniformity, and runs 15 NIST SP 800-22 tests.",
          },
        ],
      },
      implementationDecisions: [
        {
          title: "Composite Gauss-MS Map (GoF) Chaotic Kernel",
          rationale:
            "Individual 1D chaotic maps like the classical Logistic Map have narrow chaotic ranges and predictable periodic windows. Composing the Gaussian exponential map with the Modified Sine Map eliminates stable periodic islands, expanding the chaotic parameter space and producing a continuous positive Lyapunov exponent.",
          technicalCode:
            "# Gauss-MS Map composition: g(f(x))\ndef gauss_ms_map(x, r=3.5, lam=3.5, alpha=5.8, beta=2.5):\n    # Inner: Modified Sine Map\n    fx = (r * lam * x / (1.0 + lam * (1.0 - x)**2)) % 1.0\n    # Outer: Gauss Map with modulo 1\n    return (np.exp(-alpha * (fx**2)) + beta) % 1.0",
        },
        {
          title: "Numba JIT Compilation with NumPy Fallback",
          rationale:
            "Iterating chaotic maps pixel-by-pixel in pure Python creates significant runtime latency for large images (e.g., 1024×1024 = 1,048,576 iterations). Wrapping the inner iteration loop in @njit(fastmath=True) achieves near-C execution speeds without requiring external C/C++ build dependencies.",
          technicalCode:
            "@njit(fastmath=True)\ndef _iterate_gauss_ms_jit(n_iter, x0, r, lam, alpha, beta, skip):\n    x = x0\n    for _ in range(skip):  # Discard transient iterations\n        fx = (r * lam * x / (1.0 + lam * (1.0 - x)**2)) % 1.0\n        x = (math.exp(-alpha * fx * fx) + beta) % 1.0\n    seq = np.empty(n_iter, dtype=np.float64)\n    for i in range(n_iter):\n        fx = (r * lam * x / (1.0 + lam * (1.0 - x)**2)) % 1.0\n        x = (math.exp(-alpha * fx * fx) + beta) % 1.0\n        seq[i] = x\n    return seq",
        },
        {
          title: "15-Test NIST SP 800-22 Randomness Evaluation Suite",
          rationale:
            "Statistical cryptanalysis requires verifying that keystream sequences are indistinguishable from true random noise. The system implements the formal 15 NIST tests across 125,000 bytes (1,000,000 bits) with significance level α=0.01.",
          technicalCode:
            "# NIST Significance criterion:\n# If p-value > 0.01: Sequence accepted as statistically random\n# Tests include: Frequency (Monobit), Runs, Longest Run, DFT (FFT),\n# Non-overlapping Template, Serial, Approximate Entropy, Cumulative Sums.",
        },
      ],
      empiricalResults: {
        summary:
          "The algorithm was benchmarked across standard grayscale medical datasets and synthetic matrices. Decryption produces 100% lossless pixel reconstruction (MSE = 0.0, PSNR = ∞ dB), while the cipher image demonstrates near-perfect statistical entropy and zero adjacent pixel correlation.",
        metrics: [
          { label: "Shannon Information Entropy", value: "7.9984", benchmark: "Ideal: 8.0000" },
          { label: "NPCR (Differential Sensitivity)", value: "99.62%", benchmark: "Threshold: ≥ 99.60%" },
          { label: "UACI (Intensity Change)", value: "33.46%", benchmark: "Theoretical: 33.46%" },
          { label: "Horizontal Pixel Correlation", value: "0.0012", benchmark: "Plaintext: 0.9642" },
          { label: "Vertical Pixel Correlation", value: "-0.0008", benchmark: "Plaintext: 0.9581" },
          { label: "Diagonal Pixel Correlation", value: "0.0015", benchmark: "Plaintext: 0.9419" },
          { label: "NIST SP 800-22 Battery", value: "15 / 15 Passed", benchmark: "p-value > 0.01 on all tests" },
        ],
      },
      limitationsAndFutureWork: [
        "Current diffusion operates via symmetric 1D stream cipher XOR; advanced permutation-substitution (P-box / S-box) rounds could be integrated for multi-stage pixel position scrambling.",
        "The current desktop implementation relies on Python GUI (Tkinter); deploying a cross-platform WebAssembly (Wasm) or C++ engine would enable client-side browser evaluation.",
        "Security depends strictly on seed key secrecy (X₀, r, α, β); integrating asymmetric key exchange (e.g., ECDH) would provide end-to-end transport security.",
      ],
      references: [
        "NIST Special Publication 800-22 Revision 1a: A Statistical Test Suite for Random and Pseudorandom Number Generators for Cryptographic Applications.",
        "Shannon, C. E. (1949). Communication Theory of Secrecy Systems. Bell System Technical Journal, 28(4), 656-715.",
        "Universitas Gunadarma Undergraduate Thesis Repository (Skripsi 2026, Novandi Ahmad Ramdhan, NPM: 51422256).",
      ],
    },
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
    techStack: ["TypeScript 5.5", "React 19", "Express 4.19", "PostgreSQL", "Knex.js", "Tailwind CSS v4", "Zustand", "Vitest"],
    metrics: [
      { label: "Automated Tests", value: "252 Passed (20 Suites)", status: "passed" },
      { label: "Code Line Coverage", value: "89.94% (96.6% Services)", status: "verified" },
      { label: "Security & SoD", value: "6 Enforced Roles", status: "verified" },
      { label: "Database Transactions", value: "ACID Guaranteed", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/manufacturing-digital-operations",
    demoUrl: "https://manufacturing-digital-operations.vercel.app/",
    caseStudy: {
      problemStatement:
        "Discrete manufacturing environments often operate with disconnected paper logs and uncoordinated spreadsheets. This leads to severe factory problems: production delays due to phantom inventory reservations, procurement fraud from self-approved purchase orders, duplicate inspections, and broken traceability when defective finished goods cannot be traced back to supplier raw material lots.",
      objectives: [
        "Engineer a centralized digital operations platform enforcing strict Segregation of Duties (SoD) across 6 discrete manufacturing roles.",
        "Guarantee ACID-compliant inventory transactions, preventing negative stock levels and race conditions.",
        "Establish end-to-end lot and batch genealogy linking supplier POs to final quality release certificates.",
        "Implement production-grade observability: request correlation IDs, decoupled health probes, and structured logs with automated credential scrubbing.",
        "Ensure enterprise software quality through a comprehensive automated test suite achieving >85% code coverage.",
      ],
      roleAndContributions:
        "Full-Stack Software Engineer and System Architect. Designed the domain model and database schema; implemented backend REST controllers, services, Knex transactions, and RBAC middleware; built the React 19 frontend with role-specific views and Zustand state; and authored 20 automated test suites with 252 passing tests.",
      systemArchitecture: {
        overview:
          "Monorepo architecture structured with NPM workspaces (apps/backend and apps/frontend). Backend uses Express + Knex over PostgreSQL; frontend uses React 19 + TypeScript + Tailwind CSS v4.",
        steps: [
          {
            step: "1. Material Requisition (PR)",
            description: "Purchasing staff creates Purchase Request; self-approval is blocked on both frontend and backend.",
          },
          {
            step: "2. Manager Approval (SoD)",
            description: "Plant Manager reviews and approves PR; status changes to Approved with immutable audit trail logging.",
          },
          {
            step: "3. Purchase Order Issuance",
            description: "Purchasing generates formal PO with unit price and supplier allocation; status becomes Issued.",
          },
          {
            step: "4. Inbound Goods Receipt (GR)",
            description: "Warehouse verifies delivery quantity; atomic database transaction increments inventory available_stock.",
          },
          {
            step: "5. Production Scheduling & BOM Reservation",
            description: "Production schedules Work Order; system atomically reserves required Bill of Materials (BOM) stock.",
          },
          {
            step: "6. Quality Inspection & Release",
            description: "Independent QC Inspector grades output (Pass/Fail) and logs defect reasons; passed units released to Finished Goods.",
          },
        ],
      },
      implementationDecisions: [
        {
          title: "Server-Side Segregation of Duties (SoD) Enforcement",
          rationale:
            "Client-side role guards are insufficient for compliance. Every state transition (PR approval, PO issuance, Goods Receipt, QC inspection) is gated by server-side middleware that verifies token claims and explicitly blocks self-approval (Requester ID ≠ Approver ID).",
          technicalCode:
            "// Server-side SoD middleware enforcement\nexport const requireDifferentApprover = (req: Request, res: Response, next: NextFunction) => {\n  const pr = req.purchaseRequest;\n  if (pr.created_by_user_id === req.user.id) {\n    return res.status(403).json({\n      error: 'Segregation of Duties violation: Requester cannot approve their own Purchase Request',\n      code: 'SOD_VIOLATION'\n    });\n  }\n  next();\n};",
        },
        {
          title: "Atomic Knex Inventory Transactions",
          rationale:
            "Concurrent production workers and warehouse receiving clerks can trigger race conditions. All inventory balance changes execute inside Knex database transactions (trx) with row-level locks and strict non-negative constraints.",
          technicalCode:
            "await knex.transaction(async (trx) => {\n  const [stock] = await trx('inventory').where({ material_id }).forUpdate();\n  if (stock.available_qty < required_qty) {\n    throw new Error('INSUFFICIENT_STOCK: Negative inventory prevented');\n  }\n  await trx('inventory').where({ material_id })\n    .decrement('available_qty', required_qty)\n    .increment('reserved_qty', required_qty);\n  await trx('stock_movements').insert({ ...auditData });\n});",
        },
        {
          title: "Production Observability & Credential Scrubbing",
          rationale:
            "To achieve production readiness, the service decouples /api/health/liveness from bounded /api/health/readiness (which verifies database connectivity), attaches a unique X-Request-Id to every request, and automatically scrubs passwords and tokens from structured JSON logs.",
        },
      ],
      empiricalResults: {
        summary:
          "The platform was validated with 20 Vitest automated test suites covering unit logic, integration routes, edge cases, transaction rollbacks, and end-to-end workflows.",
        metrics: [
          { label: "Automated Tests", value: "252 / 252 Passed", benchmark: "100% Green in CI" },
          { label: "Overall Line Coverage", value: "89.94%", benchmark: "Goal: ≥ 80%" },
          { label: "Service Logic Coverage", value: "96.61%", benchmark: "Core Business Rules" },
          { label: "Build & Type Safety", value: "0 Errors / 0 Warnings", benchmark: "Oxlint + tsc -b" },
          { label: "Production Bundle Time", value: "1.39s", benchmark: "Vite Client Build" },
        ],
      },
      limitationsAndFutureWork: [
        "Currently configured with single-region PostgreSQL; introducing read replicas would optimize high-frequency inventory scans.",
        "Can be extended with barcode/QR scanning integration for mobile warehouse terminals.",
        "Future enhancement: real-time WebSocket telemetry for shop floor machine status updates.",
      ],
      references: [
        "ANSI/ISA-95 Enterprise-Control System Integration Standards for Manufacturing Execution Systems (MES).",
        "Knex.js Transaction Management & PostgreSQL Row-Level Locking Patterns.",
        "Manufacturing Digital Operations Repository Documentation & PRD (Vannnd1/manufacturing-digital-operations).",
      ],
    },
  },
  {
    id: "retailinsight-ai",
    title: "RetailInsight AI — Sales Intelligence Dashboard & AI Analyst",
    subtitle: "Zero-Latency Multidimensional Analytics with Context-Aware Google Gemini LLM",
    category: "data-ai",
    categoryLabel: "DATA ANALYSIS · GENERATIVE A.I.",
    year: "2026",
    isFlagship: false,
    summary:
      "An end-to-end interactive retail intelligence dashboard analyzing 541,000+ transaction records through responsive visualizations, universal 0ms cross-filtering, and an embedded context-aware AI analyst powered by Google Gemini.",
    techStack: ["React 18", "Vite", "Tailwind CSS", "Recharts", "Google Gemini API", "JavaScript", "Node.js ETL"],
    metrics: [
      { label: "Dataset Scale", value: "541,909 Records", status: "verified" },
      { label: "Filter Latency", value: "0ms Client-Side", status: "verified" },
      { label: "Failover Fallback", value: "4-Model Cascade", status: "verified" },
      { label: "Customer Segments", value: "8 Spend Brackets", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/retailinsight-ai",
    demoUrl: "https://retailinsight-ai.vercel.app/",
    caseStudy: {
      problemStatement:
        "Analyzing multi-million-dollar retail transaction datasets often forces decision-makers to choose between high-latency database queries or rigid pre-rendered reports. Furthermore, when executives query standalone AI assistants, the models lack real-time context of active dashboard filters, leading to inaccurate answers or generic advice.",
      objectives: [
        "Build a data preprocessing ETL pipeline in Node.js to clean and aggregate 541,909 records from the UCI Online Retail dataset.",
        "Develop an interactive web dashboard in React 18 + Tailwind CSS + Recharts with universal multidimensional cross-filtering operating with 0ms client-side latency.",
        "Solve severe geographical skew (~90% UK transactions) via an 'Exclude UK' benchmark toggle to enable clear comparative analysis of European markets.",
        "Integrate a context-aware Google Gemini AI analyst that dynamically receives currently active filter parameters, enforces low-hallucination guardrails (temperature 0.1), and incorporates a 4-model cascade fallback.",
      ],
      roleAndContributions:
        "Full-Stack Data & AI Engineer. Engineered the data cleaning and aggregation script (`preprocess.js`), structured the client-side cross-filtering engine (`dataUtils.js`), designed the Recharts visualizations, and implemented the Google Gemini AI prompt context builder with smart failover.",
      systemArchitecture: {
        overview:
          "Two-tier pipeline: offline Node.js ETL pipeline converting raw tabular CSV into indexed JSON aggregations, and a reactive frontend client embedding analytical charts and dynamic LLM prompting.",
        steps: [
          {
            step: "1. Data Cleaning & Aggregation (Node.js)",
            description: "Parses online_retail.csv, removes cancelled orders and negative values, and creates multidimensional JSON datasets (monthly, country, product, customer tiers).",
          },
          {
            step: "2. Client-Side Universal Cross-Filtering",
            description: "User clicks on country bar, date slider, or spend bracket; recalculates all dashboard KPIs and chart data instantaneously with 0ms server latency.",
          },
          {
            step: "3. Context-Aware AI Prompt Generation",
            description: "Active filter state, top products, customer counts, and exact computed revenue are serialized into structured system context for Google Gemini.",
          },
          {
            step: "4. Multi-Model Cascade Failover",
            description: "Client queries gemini-3.8-flash; if rate-limited (429) or overloaded (503), sequentially falls back to 3.7-flash, 3.6-flash, and 3.5-flash to maintain uptime.",
          },
        ],
      },
      implementationDecisions: [
        {
          title: "Pre-aggregated Multidimensional Data Architecture",
          rationale:
            "Sending raw 541,909 rows (45MB) to every browser session causes high memory consumption. Pre-aggregating data into indexed multidimensional JSON matrices allows 0ms client-side cross-filtering with less than 2MB initial network payload.",
        },
        {
          title: "Dynamic AI Filter Context Synchronization",
          rationale:
            "To prevent the AI from answering with global numbers when the user is filtering for 'Germany in Q3', the prompt builder extracts exact filtered metrics and injects strict refusal guardrails forbidding answers outside the active dataset.",
          technicalCode:
            "// Dynamic context builder for Gemini\nconst buildContextPrompt = (activeFilters, currentStats) => {\n  return `You are RetailInsight AI, an expert retail analyst.\nActive Filters: Country=${activeFilters.country || 'ALL'}, DateRange=${activeFilters.dateRange}.\nComputed Metrics: Revenue=£${currentStats.totalRevenue.toLocaleString()}, Orders=${currentStats.totalOrders}.\nTop Product: ${currentStats.topProduct}.\nRULES: Only answer based on this exact data. Never invent metrics. Keep responses concise.`;\n};",
        },
      ],
      empiricalResults: {
        summary:
          "The dashboard handles filtering over multi-million-pound transaction volumes with zero lag, and the AI Analyst provides verified data answers with strict guardrails.",
        metrics: [
          { label: "Transactions Processed", value: "541,909 Rows", benchmark: "UCI Online Retail Dataset" },
          { label: "Client Cross-Filter Latency", value: "0ms", benchmark: "Instant React state updates" },
          { label: "LLM Hallucination Guardrail", value: "Temperature 0.1", benchmark: "Strict fact-based prompting" },
          { label: "Model Failover Chain", value: "4 Generations", benchmark: "Gemini 3.8 → 3.7 → 3.6 → 3.5" },
        ],
      },
      limitationsAndFutureWork: [
        "Currently uses static dataset pre-aggregations; connecting to a live PostgreSQL or Snowflake data warehouse via streaming API would support continuous transaction ingestion.",
        "Future enhancement: implementing automated anomaly detection flags for unusual bulk ordering patterns.",
      ],
      references: [
        "Chen, D. (2015). Online Retail Dataset. UCI Machine Learning Repository.",
        "Google Gemini API Documentation (Structured System Instructions & Context Caching).",
      ],
    },
  },
  {
    id: "adaptive-learning-insight",
    title: "Adaptive Learning Insight — Capstone Project Program Asah (Dicoding × Accenture)",
    subtitle: "AI-Powered Educational Learning Analytics & Student Diagnostic Intelligence Platform",
    category: "academic-coursework",
    categoryLabel: "COHORT CAPSTONE · FULL-STACK WEB & AI",
    year: "2025",
    isFlagship: false,
    academicContext: "Program Asah 2025 — Asah led by Dicoding in association with Accenture (Learning Path: React & Back-End with AI)",
    summary:
      "The official team capstone project engineered during Program Asah 2025 led by Dicoding in association with Accenture under the 'React & Back-End with AI' learning path. A full-stack educational analytics platform that tracks student study progression, evaluates module mastery through interactive Recharts visualizations, and delivers automated AI-driven diagnostic insights using React 19, Node.js (Express 5), Supabase PostgreSQL, and AI learning analytics models.",
    techStack: ["React 19", "Node.js", "Express 5", "Supabase", "PostgreSQL", "Recharts", "REST API", "Tailwind CSS", "AI Analytics Engine"],
    metrics: [
      { label: "Program Cohort", value: "Asah 2025 (Dicoding × Accenture)", status: "verified" },
      { label: "Learning Path", value: "React & Back-End with AI", status: "verified" },
      { label: "Cohort Training", value: "900+ Hours Curriculum", status: "verified" },
      { label: "Capstone Delivery", value: "Validated & Graduated", status: "verified" },
    ],
    caseStudy: {
      problemStatement:
        "Modern digital education platforms generate massive volumes of student activity data, yet instructors and academic mentors often lack real-time automated tools to identify students falling behind, pinpoint specific conceptual bottlenecks, or provide individualized intervention strategies.",
      objectives: [
        "Collaborate in a cross-functional development team to engineer a scalable web-based student learning analytics dashboard.",
        "Construct responsive, interactive user interfaces in React 19 utilizing Recharts for visual progress tracking, velocity metrics, and quiz mastery rates.",
        "Architect and implement RESTful API endpoints using Node.js and Express 5, connecting to Supabase (PostgreSQL) for persistent data storage.",
        "Integrate AI-driven learning diagnostic models to synthesize quiz submission trends and generate tailored improvement recommendations.",
        "Execute rigorous code reviews, automated linting, and Git feature-branch workflows matching Dicoding and Accenture production standards.",
      ],
      roleAndContributions:
        "Full-Stack Web & AI Developer (Cohort Collaborator). Implemented frontend interface components in React with Recharts for dynamic time-series performance tracking, developed and tested Express backend REST endpoints, handled database schema integration with Supabase, and participated in Git/GitHub team collaboration with strict code reviews.",
      systemArchitecture: {
        overview:
          "Client-server full-stack architecture coupling a React 19 single-page application with a Node.js Express 5 RESTful API, backed by Supabase cloud PostgreSQL storage and an AI analytics inference pipeline.",
        steps: [
          { step: "1. Learning Activity Tracking", description: "Collects granular student quiz scores, study duration, and module completion events through Express REST API endpoints." },
          { step: "2. Aggregation & Cloud Storage", description: "Persists structured student progress records in Supabase PostgreSQL with relational data modeling." },
          { step: "3. AI Diagnostic Engine", description: "Processes historical student performance data to detect drop-off risks and generate targeted instructional recommendations." },
          { step: "4. Interactive Instructor Dashboard", description: "Renders responsive progress gauges, Recharts learning velocity graphs, and student intervention alerts in React." },
        ],
      },
      implementationDecisions: [
        {
          title: "Supabase & PostgreSQL for Reliable Cloud Persistence",
          rationale:
            "Replaced transient storage with Supabase cloud PostgreSQL, providing relational integrity for student cohorts, quizzes, and learning milestone tracking.",
        },
        {
          title: "Clean Front-to-Back Separation via RESTful APIs",
          rationale:
            "Decoupled the React 19 interface from the Express 5 backend services, allowing modular testing, independent scaling, and standardized JSON data exchange.",
        },
        {
          title: "Dicoding & Accenture Industry Code Standards",
          rationale:
            "Enforced code-by-code reviews, pull-request validations, and ESLint rules throughout the 6-month intensive 900+ hour cohort.",
        },
      ],
      empiricalResults: {
        summary:
          "Successfully completed, defended, and validated as the official team capstone deliverable for Program Asah 2025 led by Dicoding in association with Accenture, fulfilling the graduation criteria for the specialized React & Back-End with AI learning path.",
        metrics: [
          { label: "Cohort Graduation", value: "Verified Distinction", benchmark: "Asah 2025 (Dicoding × Accenture)" },
          { label: "Learning Path", value: "React & Back-End with AI", benchmark: "900+ Hours Curriculum" },
          { label: "Tech Architecture", value: "Full-Stack Web + AI", benchmark: "React 19 + Express 5 + Supabase" },
        ],
      },
      limitationsAndFutureWork: [
        "Delivered as an academic team capstone repository; production cloud hosting lifecycle concluded upon successful cohort graduation in February 2026.",
      ],
      references: [
        "Asah led by Dicoding in association with Accenture — React & Back-End with AI Official Curriculum & Syllabus (2025).",
        "Dicoding Indonesia & Accenture Capstone Project Documentation & Verification Standards (2025–2026).",
      ],
    },
  },
  {
    id: "youtube-sentiment-jumbo",
    title: "YouTube Sentiment Analysis Concerning Film Jumbo",
    subtitle: "End-to-End Indonesian NLP Pipeline using Support Vector Machine & InSet Lexicon",
    category: "academic-coursework",
    categoryLabel: "MACHINE LEARNING · NATURAL LANGUAGE PROCESSING",
    year: "2025",
    isFlagship: false,
    academicContext: "Universitas Gunadarma Academic Study (2025)",
    summary:
      "A complete machine learning and NLP application analyzing audience reception from official YouTube teaser/trailer comments for the animated film 'Jumbo'. Features smart preprocessing (demojizing emojis, 15,000 slang word normalization, negation word preservation, Sastrawi stemming), InSet lexicon polarity scoring with domain override, and a balanced-weight Linear SVM classifier achieving 86% test accuracy, deployed as an interactive Streamlit web application.",
    techStack: ["Python", "Streamlit", "Scikit-Learn", "NLTK", "Sastrawi", "InSet Lexicon", "SVM", "TF-IDF N-gram"],
    metrics: [
      { label: "Overall Accuracy", value: "86% Test Set", status: "verified" },
      { label: "Positive F1-Score", value: "0.90 (Precision 0.92)", status: "verified" },
      { label: "Negative F1-Score", value: "0.74 (Recall 0.77)", status: "verified" },
      { label: "Slang Dictionary", value: "15K Kamus Alay Normalized", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/jumbo-movie-sentiment-analysis",
    demoUrl: "https://jumbo-movie-sentiment.streamlit.app/",
    caseStudy: {
      problemStatement:
        "Public reception of Indonesian cultural media and animated films is reflected in thousands of social media and YouTube comments. Understanding audience sentiment requires automated NLP pipelines capable of handling informal Indonesian text, slang, emotional emojis, negations ('tidak bagus'), and unbalanced opinion polarities without compromising real negative feedback.",
      objectives: [
        "Extract public comment data from YouTube via YouTube Data API v3 concerning the official teasers/trailers of animated film Jumbo.",
        "Implement a smart Indonesian text preprocessing pipeline: emoji demojizing (e.g. 🔥 ➔ fire), slang normalization using a 15,000-word colloquial lexicon, negation preservation (e.g. 'tidak', 'kurang', 'gak'), and Sastrawi root-word stemming.",
        "Apply the InSet Lexicon with domain-specific keyword overrides and negation polarity inversion for binary sentiment labeling (Positive vs. Negative).",
        "Engineer TF-IDF N-gram (1,2) feature representations and train a cost-sensitive Linear Support Vector Machine (class_weight='balanced') evaluated with 5-fold cross-validation.",
        "Deploy the serialized machine learning model into an interactive Streamlit web dashboard for real-time user comment analysis.",
      ],
      roleAndContributions:
        "Machine Learning & NLP Engineer. Developed the YouTube scraping workflow, engineered the 6-stage Indonesian text normalization and preprocessing pipeline, calibrated lexicon overrides, trained and evaluated the balanced SVM model, and built the live Streamlit interactive web application.",
      systemArchitecture: {
        overview:
          "End-to-end NLP pipeline: YouTube Data Ingestion → Smart Text Preprocessing (Demojize + Slang + Stemming) → InSet Lexicon Domain Labeling → TF-IDF N-gram (1,2) Extraction → Class-Weighted Linear SVM → Streamlit Web Deployment.",
        steps: [
          { step: "1. Data Collection", description: "Harvested audience comments from official YouTube teaser and trailer videos for Film Jumbo." },
          { step: "2. Intelligent Preprocessing", description: "Demojizes emojis into text, normalizes 15K slang terms, preserves critical negation markers, and applies Sastrawi Indonesian stemming." },
          { step: "3. Lexicon Labeling & Domain Override", description: "InSet sentiment lexicon (-5 to +5) with movie-domain overrides and negation flips to construct verified binary sentiment labels." },
          { step: "4. Balanced SVM Classification", description: "TF-IDF feature extraction with unigrams and bigrams, trained using Linear SVM with class_weight='balanced' to handle class skew." },
          { step: "5. Streamlit Interactive App", description: "Deployed interactive web dashboard allowing users to input custom reviews and visualize sentiment predictions in real time." },
        ],
      },
      implementationDecisions: [
        {
          title: "Emoji Demojizing & Negation Word Preservation",
          rationale:
            "Rather than stripping emojis and stopwords naively, emojis (like ❤️ or 🔥) were converted into semantic text, and negation words ('tidak', 'kurang', 'bukan') were retained to prevent polarity reversals in phrases like 'tidak bagus'.",
        },
        {
          title: "Balanced-Weight Linear SVM over Synthetic SMOTE",
          rationale:
            "Linear SVM with cost-sensitive penalty (class_weight='balanced') provided superior stability and generalization on high-dimensional sparse TF-IDF vectors compared to synthetic oversampling, doubling negative recall from 38% to 77%.",
        },
        {
          title: "Interactive Streamlit Cloud Deployment",
          rationale:
            "Built and deployed an accessible web interface enabling recruiters, movie creators, and audiences to test sentiment predictions on unseen commentary in real time.",
        },
      ],
      empiricalResults: {
        summary:
          "Demonstrated an 86% overall test accuracy on unseen data, achieving a Positive F1-Score of 0.90, Negative F1-Score of 0.74 (Recall 77%), and Macro Average F1-Score of 0.82 across 236 test samples.",
        metrics: [
          { label: "Overall Test Accuracy", value: "86%", benchmark: "236 Test Comments (80:20 Split)" },
          { label: "Positive Class", value: "F1: 0.90 / Precision: 0.92", benchmark: "Support: 175 Comments" },
          { label: "Negative Class", value: "F1: 0.74 / Recall: 0.77", benchmark: "Support: 61 Comments" },
          { label: "Live Web App", value: "Streamlit Cloud", benchmark: "Interactive Classifier" },
        ],
      },
      limitationsAndFutureWork: [
        "Highly sarcastic comments and contextual figurative speech remain challenging for static lexicon boundaries.",
        "Future direction: fine-tuning pre-trained transformer architectures (such as IndoBERT) for deeper contextual nuance.",
      ],
      references: [
        "Koto, F., & Rahmaningtyas, G. Y. (2017). InSet Lexicon: Evaluation of a Word List for Indonesian Sentiment Analysis in Microblogs. IEEE IALP.",
        "Salsabila, N. A., et al. (2018). Colloquial Indonesian Lexicon (Kamus Alay 15K).",
        "Sastrawi: Indonesian Morphological Lemmatizer and Stemmer Python Library.",
      ],
    },
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
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Web Audio API", "Interactive UI"],
    metrics: [
      { label: "Architecture", value: "Zero-Dependency Vanilla", status: "neutral" },
      { label: "Audio Engine", value: "HTML5 Web Audio API", status: "neutral" },
    ],
    githubUrl: "https://github.com/Vannnd1/SahabatDunia",
    demoUrl: "https://sahabat-dunia.vercel.app/",
    caseStudy: {
      problemStatement:
        "Children's educational web tools often rely on heavy, ad-supported mobile frameworks or static pages lacking engaging auditory feedback and interactive quiz mechanisms.",
      objectives: [
        "Build a lightweight, zero-dependency educational website introducing animal species.",
        "Implement real-time background audio and sound effects with mute/unmute and volume slider controls.",
        "Create an interactive quiz module allowing young students to test their animal recognition.",
      ],
      roleAndContributions:
        "Frontend Developer and UI Designer. Built the HTML5 structure, authored custom CSS styling and bounce animations, wrote the JavaScript application state, and wired the audio controller widget.",
      systemArchitecture: {
        overview:
          "Single-page vanilla web architecture organizing visual cards, quiz state, and an ambient sound controller widget.",
        steps: [
          { step: "1. Animal Catalog", description: "Displays habitat categories (Mammals, Birds, Marine) with visual cards." },
          { step: "2. Audio Controller", description: "Global sound widget with play/pause, volume slider, and sound effect triggers." },
          { step: "3. Interactive Quiz", description: "Multiple-choice animal guessing game with score tracking in local session state." },
        ],
      },
      implementationDecisions: [
        {
          title: "Zero-Dependency Vanilla JavaScript Architecture",
          rationale:
            "Eliminating heavy frameworks ensures near-instant page loads on low-bandwidth school devices and mobile tablets.",
        },
        {
          title: "Universal Audio Controller Widget",
          rationale:
            "Implemented a persistent floating audio widget with volume adjustment and mute toggles that operates continuously across all page views.",
        },
      ],
      empiricalResults: {
        summary:
          "Delivered a fully responsive, lightweight interactive website with custom sound design and educational quiz logic.",
        metrics: [
          { label: "Dependencies", value: "0 External Libraries", benchmark: "Native Browser APIs" },
          { label: "Audio Support", value: "Custom Web Audio Widget", benchmark: "Volume & Mute Controls" },
        ],
      },
      limitationsAndFutureWork: [
        "Future enhancement: adding text-to-speech audio pronunciation for animal names in both Indonesian and English.",
      ],
      references: [
        "Sahabat Dunia Source Repository (Vannnd1/SahabatDunia).",
      ],
    },
  },
];
