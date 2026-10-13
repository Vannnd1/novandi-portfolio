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
    title: "Adaptive Learning Insight — Capstone Project Program Asah",
    subtitle: "AI-Powered Web Solution for Educational Learning Data Analytics",
    category: "academic-coursework",
    categoryLabel: "COHORT CAPSTONE · FULL-STACK WEB & AI",
    year: "2025",
    isFlagship: false,
    academicContext: "Program Asah — Dicoding Indonesia in association with Accenture (2025)",
    summary:
      "A collaborative team capstone web application developed during Program Asah to analyze student learning patterns, track module completions, and generate relevant educational insights using React, Node.js, and cloud AI fundamentals.",
    techStack: ["React", "Node.js", "JavaScript", "REST API", "AI Fundamentals", "AWS"],
    metrics: [
      { label: "Program Cohort", value: "Program Asah Dicoding", status: "neutral" },
      { label: "Verified Role", value: "Full-Stack Web Collaborator", status: "neutral" },
      { label: "Cloud Services", value: "AWS Fundamentals", status: "neutral" },
    ],
    caseStudy: {
      problemStatement:
        "Educational platforms produce large amounts of student activity data, but instructors often lack automated tools to detect where students face learning obstacles or disengage from modules.",
      objectives: [
        "Collaborate in a cross-functional development team to build a web-based educational dashboard.",
        "Create responsive user interfaces in React for viewing course engagement and student quiz performance.",
        "Develop and consume backend RESTful API endpoints using Node.js.",
        "Integrate cloud infrastructure and Generative AI fundamentals via AWS to provide automated learning insight summaries.",
      ],
      roleAndContributions:
        "Team Collaborator and Full-Stack Developer. Collaborated with cohort peers in developing frontend components with React, implementing RESTful API endpoints in Node.js, integrating backend services, and participating in Git/GitHub team collaboration workflows.",
      systemArchitecture: {
        overview:
          "Client-server web architecture connecting a React single-page frontend to a Node.js RESTful API, with backend connectivity to database storage and AWS AI services.",
        steps: [
          { step: "1. Data Capture", description: "Collects student quiz submissions and course progression metrics via API." },
          { step: "2. Analysis Engine", description: "Aggregates completion percentages, average scores, and topic difficulty ratings." },
          { step: "3. Instructor Dashboard", description: "Presents visual charts and student progression tables in React." },
        ],
      },
      implementationDecisions: [
        {
          title: "RESTful API Integration for Front-to-Back Separation",
          rationale:
            "Decoupled the React interface from backend services to ensure independent deployment and clean separation of concerns.",
        },
        {
          title: "Collaborative Git/GitHub Feature-Branch Workflow",
          rationale:
            "Followed team pull-request workflows, branch protection, and code reviews throughout the 6-month intensive Dicoding cohort.",
        },
      ],
      empiricalResults: {
        summary:
          "Successfully completed and presented as the official capstone deliverable for Program Asah led by Dicoding Indonesia in association with Accenture (2025).",
        metrics: [
          { label: "Capstone Completion", value: "Validated", benchmark: "Dicoding Program Asah 2025" },
          { label: "Architecture", value: "Full-Stack Web", benchmark: "React + Node.js + REST API" },
        ],
      },
      limitationsAndFutureWork: [
        "Code was developed in a collaborative cohort repository; ongoing deployment maintenance concluded with the cohort term.",
      ],
      references: [
        "Program Asah Curriculum & Dicoding Indonesia Capstone Documentation (2025).",
      ],
    },
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
      "A data analysis and machine learning research project performing Indonesian sentiment classification on public YouTube comments concerning the animated film Jumbo using Support Vector Machine (SVM) and the InSet sentiment lexicon.",
    techStack: ["Python", "Data Analysis", "NLP", "Support Vector Machine (SVM)", "InSet Lexicon", "Scikit-Learn"],
    metrics: [
      { label: "Classification Model", value: "Support Vector Machine (SVM)", status: "neutral" },
      { label: "Lexicon Methodology", value: "InSet Sentiment Lexicon", status: "neutral" },
      { label: "Language Domain", value: "Indonesian Informal Text", status: "neutral" },
    ],
    caseStudy: {
      problemStatement:
        "Public reception of Indonesian cultural media and animated films is reflected in thousands of social media and YouTube comments. Understanding community reception requires automated NLP methods that can handle informal Indonesian text, slang, and mixed sentiment.",
      objectives: [
        "Extract public comment data from YouTube concerning the promotional videos of the animated film Jumbo.",
        "Implement Indonesian text preprocessing: case folding, tokenization, filtering, and slang normalization.",
        "Apply the InSet Lexicon to determine sentiment polarity scores (positive, neutral, negative).",
        "Train and evaluate a supervised Support Vector Machine (SVM) classifier to categorize public commentary.",
      ],
      roleAndContributions:
        "Individual student researcher. Designed the Python data collection workflow, implemented the text preprocessing pipeline, mapped sentiment polarity using the InSet lexicon dictionary, and trained the SVM model.",
      systemArchitecture: {
        overview:
          "Standard NLP pipeline: Raw Text Extraction → Text Cleaning & Preprocessing → Feature Extraction / Lexicon Scoring → SVM Classification → Sentiment Evaluation.",
        steps: [
          { step: "1. Data Collection", description: "Harvested public comments from YouTube videos related to Film Jumbo." },
          { step: "2. Text Preprocessing", description: "Case folding, URL/emoji stripping, tokenization, Indonesian stopword removal." },
          { step: "3. Lexicon Labeling", description: "InSet sentiment lexicon calculates polarity values for positive and negative terms." },
          { step: "4. SVM Classification", description: "Supervised classification using Support Vector Machine to predict sentiment class." },
        ],
      },
      implementationDecisions: [
        {
          title: "InSet Lexicon for Indonesian Polarity Scoring",
          rationale:
            "General English sentiment dictionaries fail on Indonesian linguistic structures. The InSet Lexicon provides validated polarity weights specifically calibrated for Indonesian vocabulary.",
        },
        {
          title: "Support Vector Machine (SVM) Classifier",
          rationale:
            "SVM is well suited for high-dimensional sparse text vectors produced by bag-of-words and TF-IDF representations, providing strong generalization even with moderate dataset sizes.",
        },
      ],
      empiricalResults: {
        summary:
          "Demonstrated an end-to-end Indonesian NLP pipeline, successfully categorizing audience comments into sentiment classes to gauge public reception for Film Jumbo.",
        metrics: [
          { label: "Language Target", value: "Bahasa Indonesia", benchmark: "Informal YouTube Comments" },
          { label: "Classifier Model", value: "SVM Linear Kernel", benchmark: "Scikit-Learn Implementation" },
        ],
      },
      limitationsAndFutureWork: [
        "Informal colloquial slang (Bahasa gaul) and sarcasm continue to pose challenges for dictionary-based lexicon scoring.",
        "Future enhancement: fine-tuning a pre-trained IndoBERT transformer model for contextual understanding.",
      ],
      references: [
        "Fajri K., et al. (InSet Lexicon for Indonesian Sentiment Analysis).",
        "Universitas Gunadarma Informatics Coursework Research (2025).",
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
