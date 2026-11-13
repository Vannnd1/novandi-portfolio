import type { Language } from './translations';

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

export const projectsDataEn: ProjectItem[] = [
  {
    id: "chaotic-image-encryption",
    title: "Skripsi — Chaotic Medical Image Encryption System",
    subtitle: "Medical Digital Image Cryptography using Hybrid Chaotic Maps & NIST SP 800-22 Evaluation",
    category: "flagship-research",
    categoryLabel: "UNDERGRADUATE THESIS · CRYPTOGRAPHY & SECURITY",
    year: "2026",
    isFlagship: true,
    academicContext: "Undergraduate Thesis (Skripsi), S1 Informatika Universitas Gunadarma",
    summary:
      "A medical digital image encryption and decryption system utilizing composite chaotic maps (Gauss-MS Map and MS-Gauss Map) to protect confidential healthcare imagery against statistical, differential, and brute-force attacks.",
    techStack: ["Python 3.10+", "Numba JIT", "NumPy", "Tkinter / GUI", "SciPy", "OpenCV", "Matplotlib"],
    metrics: [
      { label: "NIST SP 800-22", value: "15/15 Tests Passed (α=0.01)", status: "passed" },
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
        "Universitas Gunadarma Undergraduate Thesis Repository (Skripsi 2026, Novandi Ahmad Ramdhan).",
      ],
    },
  },
  {
    id: "manufacturing-digital-operations",
    title: "Manufacturing Digital Operations System (MOM / MES)",
    subtitle: "Enterprise Manufacturing Operations Management with Strict Segregation of Duties, ACID Ledger, & 5-Stage Lot Genealogy",
    category: "flagship-systems",
    categoryLabel: "ENTERPRISE SYSTEMS · FULL-STACK ARCHITECTURE",
    year: "2026",
    isFlagship: true,
    summary:
      "An enterprise-grade Manufacturing Operations Management (MOM/MES) platform engineered to digitize discrete factory workflows. Implements strict server-side Segregation of Duties (SoD) across 6 discrete manufacturing personas, ACID-compliant Knex database transactions with row-level locks and non-negative inventory invariants, 5-stage upstream-to-downstream lot genealogy, real-time SQL operational analytics with CSV formula injection defense, and resilient observability probes.",
    techStack: ["TypeScript 5.5", "React 19", "Express 4.19", "PostgreSQL", "Knex.js", "Tailwind CSS v4", "Zustand", "Vitest"],
    metrics: [
      { label: "Automated Tests", value: "252 Passed (20 Suites)", status: "passed" },
      { label: "Service Logic Coverage", value: "96.61% (89.9% Overall)", status: "verified" },
      { label: "Security & SoD", value: "6 Enforced Roles", status: "verified" },
      { label: "Database Invariants", value: "ACID & Zero Stockouts", status: "verified" },
      { label: "Traceability Depth", value: "5-Stage Lot Genealogy", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/manufacturing-digital-operations",
    demoUrl: "https://manufacturing-digital-operations.vercel.app/",
    caseStudy: {
      problemStatement:
        "Discrete manufacturing facilities face catastrophic production halts, stockouts, and regulatory audit failures when relying on disconnected paper records and uncoordinated spreadsheets. Core industrial failure modes include: (1) Phantom stockouts and race conditions when concurrent production lines attempt to reserve uncommitted raw materials; (2) Procurement fraud and compliance breaches caused by self-approved purchase orders and unauthorized physical receipts; (3) Broken quality traceability when defective finished goods cannot be traced back through production batches to supplier raw material lots; and (4) Spreadsheet formula injection vulnerabilities in exported CSV reports that threaten plant operational workstations.",
      objectives: [
        "Implement strict server-side Segregation of Duties (SoD) & Role-Based Access Control (RBAC) across 6 discrete manufacturing roles, cryptographically blocking self-approval (Requester ID ≠ Approver ID) and cross-role authority violations.",
        "Guarantee ACID-compliant inventory transactions using Knex.js with row-level locking, atomic state transitions (Available → Reserved → Consumed), and strict non-negative balance invariants.",
        "Construct a 5-tier bidirectional lot & batch genealogy engine linking supplier POs, inbound goods receipts, BOM material consumption, shop floor work order yield, and QC defect classification.",
        "Develop real-time SQL operational analytics (OEE yield rates, defect Pareto distributions, and supplier spend) with defensive CSV sanitization neutralizing spreadsheet formula injection attacks (=, +, -, @).",
        "Ensure production-grade observability and enterprise software reliability through decoupled liveness/readiness probes, distributed X-Request-Id tracing, structured JSON logging with automated credential redaction, and 20 automated test suites (252 tests, 96.61% service logic coverage).",
      ],
      roleAndContributions:
        "Full-Stack Software Engineer & System Architect. Responsible for end-to-end architecture and implementation: engineered the relational schema (PostgreSQL/SQLite) and Knex migrations/seeds; implemented domain service layers and ACID transaction boundaries; created strict RBAC and SoD authorization middleware; designed the React 19 UI with role-tailored operational workflows and Zustand stores; integrated defensive CSV formula sanitization; established decoupled Kubernetes-ready health probes; and authored 20 automated test suites with 252 passing tests achieving 96.61% service logic coverage.",
      systemArchitecture: {
        overview:
          "Monorepo architecture structured with NPM workspaces (apps/backend and apps/frontend). The backend is structured into decoupled layers: REST Controllers → Domain Services with Knex Transaction Boundaries → Relational Database (PostgreSQL/SQLite). The frontend utilizes React 19 with Vite, Tailwind CSS v4, and Zustand client stores, with an Axios interceptor attaching distributed X-Request-Id correlation tokens to every HTTP cycle.",
        steps: [
          {
            step: "1. Material Requisition & Invariant Validation (Purchasing)",
            description: "Sourcing staff creates a Purchase Request (PR) with material SKU, positive quantities, and unit specifications. Status initializes as Pending. Backend middleware strictly validates required fields and stores user_id as the requester.",
          },
          {
            step: "2. Segregation of Duties Approval Governance (Plant Manager)",
            description: "Plant Manager evaluates the pending requisition. Server-side middleware checks req.user.id !== pr.user_id to block self-approval with HTTP 403 SELF_APPROVAL_FORBIDDEN. Approval is committed to the immutable audit ledger.",
          },
          {
            step: "3. Purchase Order Generation & Supplier Commitment (Purchasing)",
            description: "Purchasing binds the approved requisition to an active catalog supplier with itemized unit pricing. Status transitions to Issued, generating a verifiable PO tracking code and expected delivery date.",
          },
          {
            step: "4. Physical Inbound Goods Receipt & Ledger Credit (Warehouse)",
            description: "Warehouse staff inspects the shipment. System executes an over-receipt guard check against the PO balance; an atomic database transaction increments available_stock and writes an immutable receipt transaction to inventory_transactions.",
          },
          {
            step: "5. Work Order Scheduling & Atomic BOM Reservation (Production)",
            description: "Production schedules a Work Order (WO). The system performs pre-flight stock verification against the Bill of Materials (BOM) (available_stock >= required_qty). On confirmation, stock is atomically transferred from available_stock to reserved_stock, switching order status to Ready.",
          },
          {
            step: "6. Independent Quality Inspection, Defect Pareto & Lineage Release (QC)",
            description: "Independent QC inspector grades output. The system enforces strict balance reconciliation (pass_qty + fail_qty === actual_produced). Itemized defect reasons are logged into defect_records for Pareto analysis, and passed units are formally released into finished_goods_records, completing the 5-stage genealogy tree.",
          },
        ],
      },
      implementationDecisions: [
        {
          title: "Server-Side Segregation of Duties (SoD) & Anti-Fraud Self-Approval Guard",
          rationale:
            "Client-side UI disabling is insufficient for enterprise compliance and anti-fraud regulations. Every sensitive state transition (PR approval, PO issuance, Goods Receipt, QC inspection) is gated by server-side middleware and database transaction checks verifying that the Approver ID does not equal the Requester ID.",
          technicalCode:
            "// Server-side SoD enforcement in procurement.service.ts\nstatic async approvePR(prId: string, status: 'Approved' | 'Rejected', userId: string) {\n  return await db.transaction(async (trx) => {\n    const pr = await trx('purchase_requests').where({ id: prId }).first();\n    if (!pr) throw new Error('NOT_FOUND');\n    if (pr.status !== 'Pending') throw new Error('INVALID_TRANSITION');\n\n    // Strict Segregation of Duties (SoD): Requesters cannot approve their own PR\n    if (pr.user_id && pr.user_id === userId) {\n      throw new Error('SELF_APPROVAL_FORBIDDEN');\n    }\n\n    const [updated] = await trx('purchase_requests')\n      .where({ id: prId })\n      .update({ status })\n      .returning('*');\n\n    await trx('audit_logs').insert({\n      user_id: userId,\n      action_type: status === 'Approved' ? 'APPROVE_PR' : 'REJECT_PR',\n      entity_name: 'PURCHASE_REQUEST',\n      entity_id: pr.id,\n      description: `${status} PR #${pr.id}`,\n    });\n    return updated;\n  });\n}",
        },
        {
          title: "Atomic Multi-State Knex Inventory Ledger with Non-Negative Invariants",
          rationale:
            "Concurrent shop floor operators and receiving clerks can trigger race conditions that produce negative inventory or phantom stock allocations. All balance adjustments execute inside atomic Knex transactions with row-level locks and strict mathematical non-negative constraints.",
          technicalCode:
            "// Atomic multi-state stock management in inventory.service.ts\nstatic async recordTransaction(\n  materialId: string,\n  quantityChange: number,\n  type: 'Receipt' | 'Adjustment' | 'Reservation' | 'Release' | 'Consumption',\n  userId: string,\n  referenceId?: string\n) {\n  return await db.transaction(async (trx) => {\n    const inv = await trx('inventory').where({ material_id: materialId }).forUpdate().first();\n    if (!inv) throw new Error('INVENTORY_NOT_FOUND');\n\n    let newAvailable = Number(inv.available_stock);\n    let newReserved = Number(inv.reserved_stock);\n\n    if (type === 'Reservation') {\n      newAvailable -= quantityChange;\n      newReserved += quantityChange;\n    } else if (type === 'Consumption') {\n      newReserved -= quantityChange;\n    } else if (type === 'Release') {\n      newAvailable += quantityChange;\n      newReserved -= quantityChange;\n    }\n\n    // Strict database-level non-negative stock invariants\n    if (newAvailable < 0) throw new Error('NEGATIVE_STOCK');\n    if (newReserved < 0) throw new Error('NEGATIVE_RESERVED_STOCK');\n\n    await trx('inventory').where({ material_id: materialId }).update({\n      available_stock: newAvailable,\n      reserved_stock: newReserved,\n    });\n  });\n}",
        },
        {
          title: "CSV Formula Injection Sanitization (Spreadsheet Security / CWE-1236)",
          rationale:
            "Exported operational CSV files opened in Microsoft Excel or LibreOffice can execute arbitrary macro commands or external data exfiltration if cells start with formula characters. The export engine defensively neutralizes all risky leading characters (=, +, -, @, \\t, \\r) by prepending a single quote.",
          technicalCode:
            "// Defensive CSV formula sanitization in reports.service.ts\nexport function sanitizeCsvField(val: any): string {\n  if (val === null || val === undefined) return '';\n  let str = String(val);\n\n  // Neutralize Formula Injection: prepend single quote to fields starting with =, +, -, @, \\t, or \\r\n  if (/^[=+\\-@\\t\\r]/.test(str)) {\n    str = `'${str}`;\n  }\n\n  // RFC 4180 compliant CSV quoting and inner-quote escaping\n  if (/[\",\\n\\r]/.test(str)) {\n    str = `\"${str.replace(/\"/g, '\"\"')}\"`;\n  }\n  return str;\n}",
        },
        {
          title: "Decoupled Health Probes & Production Observability",
          rationale:
            "To achieve cloud-native reliability and prevent cascading orchestrator restarts during database failovers, the application decouples /api/health/liveness (which only checks Node.js event loop health) from bounded /api/health/readiness (which verifies database connectivity with a 3000ms timeout). Request cycles carry unique X-Request-Id headers, and structured JSON logs automatically redact sensitive credentials.",
          technicalCode:
            "// Decoupled liveness & readiness in health.controller.ts\nexport function getLiveness(_req: Request, res: Response): void {\n  res.status(200).json({ status: 'ok', uptime: Math.floor(process.uptime()), timestamp: new Date().toISOString() });\n}\n\nexport async function getReadiness(_req: Request, res: Response): Promise<void> {\n  const dbCheck = await checkDatabaseConnection(3000);\n  if (!dbCheck.healthy) {\n    return res.status(503).json({ status: 'degraded', database: 'disconnected', error: 'Database unreachable' });\n  }\n  res.status(200).json({ status: 'ready', database: 'connected', latencyMs: dbCheck.latencyMs });\n}",
        },
      ],
      empiricalResults: {
        summary:
          "The platform was validated through 20 automated Vitest/Jest test suites spanning unit business invariants, role authorization gates, transaction rollbacks, SQL aggregations, and complete multi-step end-to-end manufacturing workflows.",
        metrics: [
          { label: "Automated Tests", value: "252 / 252 Passed", benchmark: "100% Green CI Suite" },
          { label: "Service Logic Coverage", value: "96.61%", benchmark: "Core Business Invariants" },
          { label: "Overall Line Coverage", value: "89.94%", benchmark: "Goal: ≥ 80%" },
          { label: "Security & SoD Gates", value: "32 RBAC Tests Passed", benchmark: "100% Forbidden Paths Blocked" },
          { label: "Type Safety & Oxlint", value: "0 Errors / 0 Warnings", benchmark: "TypeScript 5.5 + Oxlint" },
          { label: "Production Bundle Time", value: "1.39s", benchmark: "Vite Client Build" },
        ],
      },
      limitationsAndFutureWork: [
        "Currently configured with single-region PostgreSQL; introducing read replicas would optimize high-throughput inventory telemetry and barcode scanning workloads.",
        "Direct shopfloor telemetry integration via MQTT / WebSocket protocols to ingest real-time machine uptime and cycle counts directly from industrial PLCs.",
        "Automated finite-capacity production scheduling (FCS) leveraging constraint-satisfaction algorithms to optimize machine changeover times.",
      ],
      references: [
        "ANSI/ISA-95 Enterprise-Control System Integration Standards for Manufacturing Operations Management (MOM / MES).",
        "CWE-1236 & OWASP Guidelines: Improper Neutralization of Formula Elements in CSV Export Feeds.",
        "PostgreSQL Row-Level Locking (SELECT ... FOR UPDATE) & Knex.js ACID Transaction Isolation Guarantees.",
        "Martin Fowler: Patterns of Enterprise Application Architecture — Unit of Work, Transaction Script, and Domain Model.",
        "Manufacturing Digital Operations System Repository & PRD (github.com/Vannnd1/manufacturing-digital-operations).",
      ],
    },
  },
  {
    id: "retailinsight-ai",
    title: "RetailInsight AI — Sales Intelligence Dashboard & AI Analyst",
    subtitle: "Multidimensional Retail Analytics with Context-Aware Google Gemini LLM",
    category: "data-ai",
    categoryLabel: "DATA ANALYSIS · GENERATIVE A.I.",
    year: "2026",
    isFlagship: false,
    summary:
      "An end-to-end interactive retail intelligence dashboard analyzing 541,000+ transaction records from the UCI Online Retail dataset through responsive visualizations, client-side in-memory cross-filtering over pre-aggregated matrices, and an embedded context-aware AI analyst powered by Google Gemini.",
    techStack: ["React 18", "Vite", "Tailwind CSS", "Recharts", "Google Gemini API", "JavaScript", "Node.js ETL"],
    metrics: [
      { label: "Dataset Scale", value: "541,909 Records", status: "verified" },
      { label: "Filter Architecture", value: "Client-Side In-Memory", status: "verified" },
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
        "Develop an interactive web dashboard in React 18 + Tailwind CSS + Recharts with universal multidimensional cross-filtering operating entirely in-memory without server roundtrips.",
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
            description: "User clicks on country bar, date slider, or spend bracket; recalculates all dashboard KPIs and chart data instantaneously in-memory without server requests.",
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
            "Sending raw 541,909 rows (45MB) to every browser session causes high memory consumption. Pre-aggregating data into indexed multidimensional JSON matrices allows instant client-side cross-filtering without querying a backend server, keeping the initial network payload under 2MB.",
        },
        {
          title: "Dynamic AI Filter Context Synchronization",
          rationale:
            "To prevent the AI from answering with global numbers when the user is filtering for 'Germany in Q3', the prompt builder extracts exact filtered metrics and injects strict refusal guardrails forbidding answers outside the active dataset.",
          technicalCode:
            "// Dynamic context builder for Gemini\nconst buildContextPrompt = (activeFilters, currentStats) => {\n  return `You are RetailInsight AI, an expert retail analyst.\\nActive Filters: Country=${activeFilters.country || 'ALL'}, DateRange=${activeFilters.dateRange}.\\nComputed Metrics: Revenue=£${currentStats.totalRevenue.toLocaleString()}, Orders=${currentStats.totalOrders}.\\nTop Product: ${currentStats.topProduct}.\\nRULES: Only answer based on this exact data. Never invent metrics. Keep responses concise.`;\n};",
        },
      ],
      empiricalResults: {
        summary:
          "The dashboard handles filtering over multi-million-pound transaction volumes with zero lag, and the AI Analyst provides verified data answers with strict guardrails.",
        metrics: [
          { label: "Transactions Processed", value: "541,909 Rows", benchmark: "UCI Online Retail Dataset" },
          { label: "Cross-Filter Execution", value: "Client-Side In-Memory", benchmark: "Zero backend roundtrips (Pre-aggregated JSON)" },
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

export const projectsDataId: ProjectItem[] = [
  {
    id: "chaotic-image-encryption",
    title: "Skripsi — Sistem Enkripsi Citra Medis Berbasis Chaotic Map",
    subtitle: "Kriptografi Citra Digital Medis Menggunakan Hybrid Chaotic Maps & Evaluasi Standar NIST SP 800-22",
    category: "flagship-research",
    categoryLabel: "SKRIPSI SARJANA · KRIPTOGRAFI & KEAMANAN SIBER",
    year: "2026",
    isFlagship: true,
    academicContext: "Skripsi Sarjana S1 Informatika, Universitas Gunadarma",
    summary:
      "Sistem enkripsi dan dekripsi citra medis digital menggunakan composite chaotic maps (Gauss-MS Map dan MS-Gauss Map) untuk melindungi kerahasiaan data rekam medis pasien dari serangan statistik, diferensial, dan brute-force.",
    techStack: ["Python 3.10+", "Numba JIT", "NumPy", "Tkinter / GUI", "SciPy", "OpenCV", "Matplotlib"],
    metrics: [
      { label: "NIST SP 800-22", value: "15/15 Pengujian Lolos (α=0.01)", status: "passed" },
      { label: "Entropi Shannon", value: "≈ 7.998 / 8.000", status: "verified" },
      { label: "Sensitivitas NPCR", value: "≥ 99.62%", status: "verified" },
      { label: "Perubahan UACI", value: "≈ 33.46%", status: "verified" },
      { label: "Korelasi Piksel", value: "≈ 0.001 (H, V, D)", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/chaotic-image-encryption",
    caseStudy: {
      problemStatement:
        "Dataset citra medis (X-ray, CT scan, USG, dan MRI) menyimpan data riwayat kesehatan pasien yang sensitif dan terikat aturan ketat kerahasiaan medis (HIPAA/GDPR). Citra medis memiliki korelasi piksel bersebelahan yang sangat tinggi (>0.95) serta area latar belakang homogen yang luas, sehingga cipher blok konvensional (seperti DES/AES) dapat mengalami latensi komputasi tinggi dan berisiko membocorkan pola kontur jika tidak menggunakan mode difusi kompleks. Dibutuhkan solusi enkripsi berkecepatan tinggi, tanpa kehilangan informasi (lossless), dan teruji secara matematis khusus untuk matriks raster citra.",
      objectives: [
        "Memformulasikan dan mengevaluasi 5 algoritma chaotic map, khususnya komposit Gauss-MS Map (GoF) dan MS-Gauss Map (FoG).",
        "Mengakselerasi pembangkitan sekuens matematika iteratif melalui kompilasi Numba Just-In-Time (JIT) dengan fallback otomatis NumPy.",
        "Mengimplementasikan generator keystream 8-bit seragam dan engine difusi simetris bitwise XOR untuk citra 2D Grayscale dan 3D RGB/BGR.",
        "Melakukan validasi statistik empiris menggunakan 15 pengujian lengkap rangkaian standar NIST SP 800-22 pada 1.000.000 bit yang dibangkitkan.",
        "Memverifikasi ketahanan terhadap serangan diferensial (NPCR/UACI) serta mengukur dekorelasi piksel bersebelahan.",
        "Membangun antarmuka grafis interaktif (GUI) dengan visualisasi histogram real-time, diagram pencar korelasi piksel, dan pelaporan riwayat uji.",
      ],
      roleAndContributions:
        "Peneliti mandiri dan software engineer utama untuk proyek skripsi sarjana S1 Informatika. Meriset formulasi teori chaos, mengimplementasikan kernel iterasi matematis di Python, merekayasa akselerasi compiler Numba JIT, menyusun skrip pengujian 15 uji NIST SP 800-22, membangun GUI interaktif dengan Tkinter, dan melaksanakan seluruh evaluasi statistik.",
      systemArchitecture: {
        overview:
          "Sistem tersusun dalam pipeline modular: kernel pembangkitan chaos, kuantisasi keystream, engine difusi XOR, rangkaian analisis statistik, dan antarmuka pengguna grafis interaktif berbasis Tkinter.",
        steps: [
          {
            step: "1. Inisialisasi Parameter & Seed",
            description: "Kondisi awal X₀=0.3, parameter bifurkasi r=3.5, parameter bentuk α=5.8, β=2.5, λ=3.5, dan pembuangan iterasi transien awal skip=200.",
          },
          {
            step: "2. Kernel Iterasi Chaotic",
            description: "Loop terakselerasi Numba JIT menghitung sekuens komposit GoF(x) = [exp(-α·(f(x))²) + β] mod 1, dengan f(x) adalah Modified Sine Map.",
          },
          {
            step: "3. Kuantisasi Keystream 8-Bit",
            description: "Nilai float chaotic kontinu dipetakan menjadi byte seragam: K_k = ⌊X_k × 10⁶⌋ mod 256.",
          },
          {
            step: "4. Difusi XOR (Grayscale & Multichannel)",
            description: "Difusi bitwise XOR piksel-demi-piksel C = P ⊕ K menghasilkan citra terenkripsi; difusi balik memulihkan citra asli tanpa kehilangan data (lossless).",
          },
          {
            step: "5. Rangkaian Kriptanalisis Empiris",
            description: "Menghitung Entropi Informasi Shannon, sensitivitas diferensial NPCR/UACI, korelasi piksel tetangga (H, V, D), keseragaman histogram Chi-Square, dan menjalankan 15 pengujian NIST SP 800-22.",
          },
        ],
      },
      implementationDecisions: [
        {
          title: "Kernel Chaotic Komposit Gauss-MS Map (GoF)",
          rationale:
            "Chaotic map 1D tunggal (seperti Logistic Map klasik) memiliki rentang parameter chaos sempit dan jendela periodik yang mudah ditebak. Menggabungkan fungsi eksponensial Gaussian dengan Modified Sine Map menghilangkan celah periodik stabil, memperluas ruang parameter chaotic, dan menghasilkan eksponen Lyapunov positif yang kontinu.",
          technicalCode:
            "# Gauss-MS Map composition: g(f(x))\ndef gauss_ms_map(x, r=3.5, lam=3.5, alpha=5.8, beta=2.5):\n    # Inner: Modified Sine Map\n    fx = (r * lam * x / (1.0 + lam * (1.0 - x)**2)) % 1.0\n    # Outer: Gauss Map with modulo 1\n    return (np.exp(-alpha * (fx**2)) + beta) % 1.0",
        },
        {
          title: "Akselerasi Kompilasi Numba JIT dengan Fallback NumPy",
          rationale:
            "Iterasi matematis chaotic piksel-demi-piksel dalam loop murni Python menimbulkan latensi eksekusi tinggi pada citra beresolusi besar (misal 1024×1024 = 1.048.576 iterasi). Membungkus loop komputasi menggunakan @njit(fastmath=True) menghasilkan kecepatan setara bahasa C tanpa ketergantungan build toolchain eksternal.",
          technicalCode:
            "@njit(fastmath=True)\ndef _iterate_gauss_ms_jit(n_iter, x0, r, lam, alpha, beta, skip):\n    x = x0\n    for _ in range(skip):  # Buang iterasi transien\n        fx = (r * lam * x / (1.0 + lam * (1.0 - x)**2)) % 1.0\n        x = (math.exp(-alpha * fx * fx) + beta) % 1.0\n    seq = np.empty(n_iter, dtype=np.float64)\n    for i in range(n_iter):\n        fx = (r * lam * x / (1.0 + lam * (1.0 - x)**2)) % 1.0\n        x = (math.exp(-alpha * fx * fx) + beta) % 1.0\n        seq[i] = x\n    return seq",
        },
        {
          title: "Rangkaian Evaluasi Keacakan 15 Uji NIST SP 800-22",
          rationale:
            "Kriptanalisis statistik mensyaratkan verifikasi bahwa sekuens keystream tidak dapat dibedakan dari derau acak sejati (true random noise). Sistem menerapkan 15 uji formal NIST pada 125.000 byte (1.000.000 bit) dengan tingkat signifikansi standar α=0.01.",
          technicalCode:
            "# Kriteria Signifikansi NIST:\n# Jika p-value > 0.01: Sekuens diterima sebagai acak secara statistik\n# Uji mencakup: Frequency (Monobit), Runs, Longest Run, DFT (FFT),\n# Non-overlapping Template, Serial, Approximate Entropy, Cumulative Sums.",
        },
      ],
      empiricalResults: {
        summary:
          "Algoritma diuji pada dataset citra medis grayscale standar dan matriks sintetis. Proses dekripsi menghasilkan rekonstruksi piksel 100% sempurna tanpa cacat (MSE = 0.0, PSNR = ∞ dB), sementara citra terenkripsi menunjukkan entropi statistik mendekati ideal dan korelasi piksel bersebelahan mendekati nol.",
        metrics: [
          { label: "Entropi Informasi Shannon", value: "7.9984", benchmark: "Ideal: 8.0000" },
          { label: "NPCR (Sensitivitas Diferensial)", value: "99.62%", benchmark: "Batas Minimal: ≥ 99.60%" },
          { label: "UACI (Perubahan Intensitas)", value: "33.46%", benchmark: "Teoretis: 33.46%" },
          { label: "Korelasi Piksel Horizontal", value: "0.0012", benchmark: "Citra Asli: 0.9642" },
          { label: "Korelasi Piksel Vertikal", value: "-0.0008", benchmark: "Citra Asli: 0.9581" },
          { label: "Korelasi Piksel Diagonal", value: "0.0015", benchmark: "Citra Asli: 0.9419" },
          { label: "Rangkaian Uji NIST SP 800-22", value: "15 / 15 Lolos", benchmark: "p-value > 0.01 di seluruh uji" },
        ],
      },
      limitationsAndFutureWork: [
        "Difusi saat ini berjalan melalui stream cipher simetris 1D XOR; skema permutasi-substitusi multi-tahap (P-box / S-box) dapat diintegrasikan untuk pengacakan posisi piksel lebih lanjut.",
        "Implementasi desktop saat ini mengandalkan Tkinter Python; pengembangan engine WebAssembly (Wasm) atau C++ akan memungkinkan eksekusi langsung di browser.",
        "Keamanan sangat bergantung pada kerahasiaan kunci awal (X₀, r, α, β); integrasi pertukaran kunci asimetris (misal ECDH) akan melengkapi keamanan transmisi end-to-end.",
      ],
      references: [
        "NIST Special Publication 800-22 Revision 1a: A Statistical Test Suite for Random and Pseudorandom Number Generators for Cryptographic Applications.",
        "Shannon, C. E. (1949). Communication Theory of Secrecy Systems. Bell System Technical Journal, 28(4), 656-715.",
        "Repositori Skripsi S1 Informatika Universitas Gunadarma (Skripsi 2026, Novandi Ahmad Ramdhan).",
      ],
    },
  },
  {
    id: "manufacturing-digital-operations",
    title: "Sistem Operasi Digital Manufaktur (MOM / MES)",
    subtitle: "Manajemen Operasi Manufaktur Enterprise dengan Segregation of Duties Ketat, Ledger ACID, & Silsilah Lot 5-Tahap",
    category: "flagship-systems",
    categoryLabel: "SISTEM ENTERPRISE · ARSITEKTUR FULL-STACK",
    year: "2026",
    isFlagship: true,
    summary:
      "Platform Manufacturing Operations Management (MOM/MES) tingkat enterprise yang direkayasa untuk mendigitalkan alur kerja pabrik diskret. Mengimplementasikan Segregation of Duties (SoD) ketat di sisi server untuk 6 persona operasional pabrik, transaksi basis data Knex berbasis ACID dengan lock tingkat baris dan invarian saldo non-negatif, silsilah lot 5-tahap dari hulu ke hilir, analitik operasional SQL real-time dengan proteksi injeksi formula CSV, serta probe observabilitas produksi yang tangguh.",
    techStack: ["TypeScript 5.5", "React 19", "Express 4.19", "PostgreSQL", "Knex.js", "Tailwind CSS v4", "Zustand", "Vitest"],
    metrics: [
      { label: "Pengujian Otomatis", value: "252 Lolos (20 Test Suites)", status: "passed" },
      { label: "Cakupan Service Logic", value: "96.61% (89.9% Keseluruhan)", status: "verified" },
      { label: "Keamanan & SoD", value: "6 Role Terisolasi", status: "verified" },
      { label: "Invarian Basis Data", value: "ACID & Zero Stockouts", status: "verified" },
      { label: "Kedalaman Ketertelusuran", value: "Silsilah Lot 5-Tahap", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/manufacturing-digital-operations",
    demoUrl: "https://manufacturing-digital-operations.vercel.app/",
    caseStudy: {
      problemStatement:
        "Fasilitas manufaktur diskret sering mengalami penghentian lini produksi mendadak, selisih stok (stockouts), dan kegagalan audit kepatuhan akibat ketergantungan pada catatan kertas dan spreadsheet yang terfragmentasi. Masalah utama meliputi: (1) Phantom stockouts dan race condition saat beberapa lini produksi mencoba mereservasi bahan baku yang sama secara bersamaan; (2) Fraud pengadaan akibat self-approval (persetujuan PO oleh pembuat request); (3) Putusnya rantai telusur saat barang jadi cacat tidak bisa dilacak kembali ke batch bahan baku vendor; serta (4) Ancaman injeksi formula spreadsheet pada file CSV yang diekspor.",
      objectives: [
        "Menerapkan Segregation of Duties (SoD) dan RBAC ketat di sisi server untuk 6 peran manufaktur, memblokir persetujuan mandiri (Requester ID ≠ Approver ID) dan pelanggaran wewenang lintas peran.",
        "Menjamin integritas transaksi inventaris berbasis ACID menggunakan Knex.js dengan row-level locking, transisi status atomik (Tersedia → Direservasi → Dikonsumsi), serta invarian saldo non-negatif.",
        "Membangun engine silsilah lot dua arah 5-tahap yang menghubungkan PO vendor, penerimaan barang gudang, konsumsi BOM lini kerja, output yield work order, hingga klasifikasi cacat QC.",
        "Mengembangkan analitik operasional SQL real-time (OEE yield rate, diagram Pareto cacat, belanja pemasok) dilengkapi sanitasi defensif proteksi injeksi formula CSV (=, +, -, @).",
        "Menjamin observabilitas kelas produksi melalui pemisahan liveness/readiness probe, pelacakan terdistribusi X-Request-Id, logging JSON terstruktur dengan sensor redaksi kredensial otomatis, dan 20 suite pengujian otomatis (252 tes, cakupan service logic 96.61%).",
      ],
      roleAndContributions:
        "Full-Stack Software Engineer & System Architect. Bertanggung jawab atas arsitektur dan implementasi menyeluruh: merancang skema relasional (PostgreSQL/SQLite) serta migrasi & seed Knex; membangun service layer bisnis dan batas transaksi ACID; menyusun middleware otorisasi RBAC dan SoD; merancang UI React 19 dengan alur kerja spesifik persona dan state management Zustand; mengintegrasikan proteksi injeksi formula CSV; menyiapkan probe kesiapan produksi; dan menyusun 20 suite pengujian otomatis dengan 252 tes yang lulus 100%.",
      systemArchitecture: {
        overview:
          "Arsitektur monorepo terstruktur dengan NPM workspaces (apps/backend dan apps/frontend). Backend terpisah dalam lapisan: REST Controllers → Domain Services dengan Transaksi Knex → Basis Data Relasional (PostgreSQL/SQLite). Frontend menggunakan React 19 dengan Vite, Tailwind CSS v4, Zustand, dan interceptor Axios yang menyematkan token korelasi X-Request-Id pada setiap siklus HTTP.",
        steps: [
          {
            step: "1. Permintaan Bahan & Validasi Invarian (Purchasing)",
            description: "Staf pengadaan membuat Purchase Request (PR) dengan SKU, kuantitas positif, dan spesifikasi unit. Status awal Pending; middleware memvalidasi kelengkapan data dan mencatat requester ID.",
          },
          {
            step: "2. Tata Kelola Persetujuan SoD (Plant Manager)",
            description: "Plant Manager mengevaluasi PR yang tertunda. Middleware server memeriksa req.user.id !== pr.user_id; jika sama, memblokir persetujuan mandiri dengan HTTP 403 SELF_APPROVAL_FORBIDDEN dan mencatat log audit.",
          },
          {
            step: "3. Penerbitan Purchase Order & Komitmen Vendor (Purchasing)",
            description: "Purchasing mengaitkan PR yang disetujui ke pemasok aktif katalog dengan rincian harga satuan. Status berpindah ke Issued, menghasilkan kode pelacakan PO dan estimasi tanggal kirim.",
          },
          {
            step: "4. Penerimaan Fisik Barang & Kredit Ledger (Warehouse)",
            description: "Staf gudang memeriksa kiriman fisik. Sistem menjalankan over-receipt guard terhadap sisa kuota PO; transaksi basis data atomik menambah available_stock dan mencatat riwayat transaksi permanen.",
          },
          {
            step: "5. Penjadwalan Work Order & Reservasi BOM Atomik (Production)",
            description: "Lini produksi menjadwalkan Work Order (WO). Sistem memverifikasi stok terhadap Bill of Materials (BOM) (available_stock >= required_qty). Jika terpenuhi, stok dipindahkan secara atomik ke reserved_stock dan status order siap berjalan.",
          },
          {
            step: "6. Inspeksi QC Independen, Analisis Pareto, & Rilis Silsilah (QC)",
            description: "Inspektur QC independen menilai hasil produksi. Sistem memastikan rekonsiliasi kuantitas ketat (pass_qty + fail_qty === actual_produced). Rincian jenis cacat dicatat untuk analisis Pareto, dan produk lulus dirilis resmi ke finished_goods_records.",
          },
        ],
      },
      implementationDecisions: [
        {
          title: "Pencegahan Fraud Persetujuan Mandiri via Segregation of Duties (SoD)",
          rationale:
            "Menonaktifkan tombol di UI klien tidak cukup aman untuk kepatuhan audit enterprise. Setiap transisi status penting (persetujuan PR, penerbitan PO, penerimaan barang, inspeksi QC) dijaga oleh middleware dan transaksi basis data yang memvalidasi bahwa Approver ID tidak boleh sama dengan Requester ID.",
          technicalCode:
            "// Penerapan SoD di procurement.service.ts\nstatic async approvePR(prId: string, status: 'Approved' | 'Rejected', userId: string) {\n  return await db.transaction(async (trx) => {\n    const pr = await trx('purchase_requests').where({ id: prId }).first();\n    if (!pr) throw new Error('NOT_FOUND');\n    if (pr.status !== 'Pending') throw new Error('INVALID_TRANSITION');\n\n    // Penegakan Segregation of Duties (SoD): Requester dilarang menyetujui PR sendiri\n    if (pr.user_id && pr.user_id === userId) {\n      throw new Error('SELF_APPROVAL_FORBIDDEN');\n    }\n\n    const [updated] = await trx('purchase_requests')\n      .where({ id: prId })\n      .update({ status })\n      .returning('*');\n\n    await trx('audit_logs').insert({\n      user_id: userId,\n      action_type: status === 'Approved' ? 'APPROVE_PR' : 'REJECT_PR',\n      entity_name: 'PURCHASE_REQUEST',\n      entity_id: pr.id,\n      description: `${status} PR #${pr.id}`,\n    });\n    return updated;\n  });\n}",
        },
        {
          title: "Ledger Inventaris Multi-Status Atomik dengan Invarian Non-Negatif",
          rationale:
            "Operator pabrik dan staf gudang yang mengakses sistem bersamaan dapat memicu race condition yang mengakibatkan stok minus. Seluruh penyesuaian saldo berjalan di dalam transaksi atomik Knex dengan row-level lock dan batasan matematis nilai non-negatif.",
          technicalCode:
            "// Manajemen stok multi-status atomik di inventory.service.ts\nstatic async recordTransaction(\n  materialId: string,\n  quantityChange: number,\n  type: 'Receipt' | 'Adjustment' | 'Reservation' | 'Release' | 'Consumption',\n  userId: string,\n  referenceId?: string\n) {\n  return await db.transaction(async (trx) => {\n    const inv = await trx('inventory').where({ material_id: materialId }).forUpdate().first();\n    if (!inv) throw new Error('INVENTORY_NOT_FOUND');\n\n    let newAvailable = Number(inv.available_stock);\n    let newReserved = Number(inv.reserved_stock);\n\n    if (type === 'Reservation') {\n      newAvailable -= quantityChange;\n      newReserved += quantityChange;\n    } else if (type === 'Consumption') {\n      newReserved -= quantityChange;\n    } else if (type === 'Release') {\n      newAvailable += quantityChange;\n      newReserved -= quantityChange;\n    }\n\n    // Invarian saldo non-negatif di level basis data\n    if (newAvailable < 0) throw new Error('NEGATIVE_STOCK');\n    if (newReserved < 0) throw new Error('NEGATIVE_RESERVED_STOCK');\n\n    await trx('inventory').where({ material_id: materialId }).update({\n      available_stock: newAvailable,\n      reserved_stock: newReserved,\n    });\n  });\n}",
        },
        {
          title: "Sanitasi Proteksi Injeksi Formula CSV (Keamanan Spreadsheet / CWE-1236)",
          rationale:
            "File CSV laporan operasional yang diekspor dan dibuka di Microsoft Excel atau LibreOffice dapat mengeksekusi makro berbahaya jika diawali karakter formula. Engine ekspor secara defensif menetralkan karakter berisiko (=, +, -, @, \\t, \\r) dengan menambahkan kutip tunggal.",
          technicalCode:
            "// Sanitasi formula CSV defensif di reports.service.ts\nexport function sanitizeCsvField(val: any): string {\n  if (val === null || val === undefined) return '';\n  let str = String(val);\n\n  // Netralkan Injeksi Formula: beri kutip tunggal jika diawali =, +, -, @, \\t, atau \\r\n  if (/^[=+\\-@\\t\\r]/.test(str)) {\n    str = `'${str}`;\n  }\n\n  // Kutip CSV standar RFC 4180 dan escaping inner quote\n  if (/[\",\\n\\r]/.test(str)) {\n    str = `\"${str.replace(/\"/g, '\"\"')}\"`;\n  }\n  return str;\n}",
        },
        {
          title: "Pemisahan Health Probe & Observabilitas Produksi",
          rationale:
            "Untuk mencegah restart berantai orkestrator saat terjadi gangguan basis data sesaat, aplikasi memisahkan probe liveness (hanya menguji event loop Node.js) dari probe readiness (memverifikasi koneksi database dengan batas waktu 3000ms). Setiap siklus request membawa token unik X-Request-Id.",
          technicalCode:
            "// Pemisahan liveness & readiness di health.controller.ts\nexport function getLiveness(_req: Request, res: Response): void {\n  res.status(200).json({ status: 'ok', uptime: Math.floor(process.uptime()), timestamp: new Date().toISOString() });\n}\n\nexport async function getReadiness(_req: Request, res: Response): Promise<void> {\n  const dbCheck = await checkDatabaseConnection(3000);\n  if (!dbCheck.healthy) {\n    return res.status(503).json({ status: 'degraded', database: 'disconnected', error: 'Database unreachable' });\n  }\n  res.status(200).json({ status: 'ready', database: 'connected', latencyMs: dbCheck.latencyMs });\n}",
        },
      ],
      empiricalResults: {
        summary:
          "Platform divalidasi melalui 20 suite pengujian otomatis Vitest/Jest yang menguji invarian bisnis, gerbang otorisasi peran, rollback transaksi, agregasi SQL, dan seluruh alur kerja end-to-end manufaktur.",
        metrics: [
          { label: "Pengujian Otomatis", value: "252 / 252 Lolos", benchmark: "100% Green CI Suite" },
          { label: "Cakupan Service Logic", value: "96.61%", benchmark: "Invarian Bisnis Utama" },
          { label: "Cakupan Baris Total", value: "89.94%", benchmark: "Target: ≥ 80%" },
          { label: "Keamanan RBAC & SoD", value: "32 Tes RBAC Lolos", benchmark: "100% Akses Terlarang Diblokir" },
          { label: "Type Safety & Oxlint", value: "0 Error / 0 Warning", benchmark: "TypeScript 5.5 + Oxlint" },
          { label: "Waktu Bundle Produksi", value: "1.39 detik", benchmark: "Vite Client Build" },
        ],
      },
      limitationsAndFutureWork: [
        "Saat ini menggunakan PostgreSQL single-region; penambahan read replica akan mengoptimalkan beban pembacaan data inventaris dan pemindaian barcode berfrekuensi tinggi.",
        "Integrasi telemetri lini pabrik langsung via protokol MQTT / WebSocket untuk mencatat uptime mesin dan cycle time otomatis dari PLC industri.",
        "Penjadwalan produksi berkapasitas terbatas (Finite Capacity Scheduling) menggunakan algoritma pemenuhan batasan untuk meminimalkan waktu changeover.",
      ],
      references: [
        "Standar Integrasi Sistem Kontrol Enterprise ANSI/ISA-95 untuk Manufacturing Operations Management (MOM / MES).",
        "Pedoman CWE-1236 & OWASP: Pencegahan Injeksi Elemen Formula pada Feed Ekspor CSV.",
        "PostgreSQL Row-Level Locking (SELECT ... FOR UPDATE) & Knex.js ACID Transaction Isolation Guarantees.",
        "Martin Fowler: Patterns of Enterprise Application Architecture — Unit of Work, Transaction Script, dan Domain Model.",
        "Repositori Manufacturing Digital Operations System & PRD (github.com/Vannnd1/manufacturing-digital-operations).",
      ],
    },
  },
  {
    id: "retailinsight-ai",
    title: "RetailInsight AI — Dasbor Inteligensi Penjualan & AI Analyst",
    subtitle: "Analitik Multidimensi Retail dengan Asisten LLM Google Gemini Sadar Konteks",
    category: "data-ai",
    categoryLabel: "ANALISIS DATA · GENERATIVE A.I.",
    year: "2026",
    isFlagship: false,
    summary:
      "Dasbor analitik retail interaktif menyeluruh yang menganalisis 541.000+ data transaksi dari dataset UCI Online Retail melalui visualisasi responsif, cross-filtering in-memory di sisi klien berbasis matriks pra-agregasi (tanpa beban server), dan asisten analitik AI cerdas berbasis Google Gemini yang sadar konteks filter.",
    techStack: ["React 18", "Vite", "Tailwind CSS", "Recharts", "Google Gemini API", "JavaScript", "Node.js ETL"],
    metrics: [
      { label: "Skala Dataset", value: "541.909 Baris Data", status: "verified" },
      { label: "Arsitektur Filter", value: "In-Memory Sisi Klien", status: "verified" },
      { label: "Failover Fallback", value: "4-Model Cascade", status: "verified" },
      { label: "Segmentasi Pelanggan", value: "8 Rentang Belanja", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/retailinsight-ai",
    demoUrl: "https://retailinsight-ai.vercel.app/",
    caseStudy: {
      problemStatement:
        "Menganalisis dataset transaksi retail bernilai jutaan dolar sering kali memaksa pengambil keputusan memilih antara kueri database yang lambat atau laporan statis yang kaku. Selain itu, asisten AI umum sering kali tidak memahami konteks filter aktif di dasbor, menghasilkan jawaban yang tidak akurat atau sekadar saran umum yang tidak relevan dengan data saat itu.",
      objectives: [
        "Membangun pipeline ETL pra-pemrosesan data dengan Node.js untuk membersihkan dan mengagregasi 541.909 baris data dari dataset UCI Online Retail.",
        "Mengembangkan dasbor web interaktif di React 18 + Tailwind CSS + Recharts dengan kemampuan universal cross-filtering yang berjalan instan di memori klien tanpa roundtrip server.",
        "Mengatasi skew geografis ekstrem (~90% transaksi dari UK) lewat tombol pembanding 'Exclude UK' untuk membedah pasar Eropa lainnya secara proporsional.",
        "Mengintegrasikan AI Analyst berbasis Google Gemini yang secara dinamis menerima parameter filter aktif, dibentengi guardrail halusinasi rendah (temperature 0.1), serta mekanisme failover berjenjang 4 model.",
      ],
      roleAndContributions:
        "Full-Stack Data & AI Engineer. Merancang skrip pembersihan dan agregasi data (`preprocess.js`), menyusun engine cross-filtering sisi klien (`dataUtils.js`), merancang visualisasi Recharts, dan mengimplementasikan builder prompt konteks AI Google Gemini dengan sistem failover pintar.",
      systemArchitecture: {
        overview:
          "Pipeline dua tingkat: pipeline ETL offline Node.js yang mengubah CSV tabular mentah menjadi agregasi JSON terindeks, dan klien frontend reaktif yang memuat grafik analitik serta prompting dinamis ke LLM.",
        steps: [
          {
            step: "1. Pembersihan & Agregasi Data (Node.js)",
            description: "Mem-parsing online_retail.csv, membuang pesanan yang dibatalkan dan nilai negatif, lalu membuat dataset JSON multidimensi (bulanan, negara, produk, tier pelanggan).",
          },
          {
            step: "2. Cross-Filtering Universal Sisi Klien",
            description: "Pengguna mengklik bar negara, slider tanggal, atau bracket belanja; seluruh KPI dan data grafik dihitung ulang seketika di memori tanpa beban server.",
          },
          {
            step: "3. Generasi Prompt AI Sadar Konteks",
            description: "Status filter aktif, produk terlaris, jumlah pelanggan, dan pendapatan eksak diserialisasi ke dalam konteks sistem terstruktur untuk Google Gemini.",
          },
          {
            step: "4. Failover Cascade Multi-Model",
            description: "Klien mengueri gemini-3.8-flash; jika terkena limit kuota (429) atau server sibuk (503), sistem secara otomatis beralih ke 3.7-flash, 3.6-flash, lalu 3.5-flash demi menjaga ketersediaan layanan.",
          },
        ],
      },
      implementationDecisions: [
        {
          title: "Arsitektur Data Multidimensi Pra-Agregasi",
          rationale:
            "Mengirimkan 541.909 baris data mentah (45MB) ke setiap sesi browser menyebabkan konsumsi memori tinggi dan loading lambat. Melakukan pra-agregasi ke dalam matriks JSON terindeks memungkinkan interaktivitas instan tanpa membebani server backend, dengan payload awal kurang dari 2MB.",
        },
        {
          title: "Sinkronisasi Konteks Filter AI yang Dinamis",
          rationale:
            "Untuk mencegah AI menjawab dengan total pendapatan global ketika pengguna sedang memfilter 'Jerman pada Q3', prompt builder menyuntikkan metrik terfilter secara eksak dan memberi instruksi tegas untuk menolak menjawab data di luar filter aktif.",
          technicalCode:
            "// Builder konteks dinamis untuk Gemini\nconst buildContextPrompt = (activeFilters, currentStats) => {\n  return `You are RetailInsight AI, an expert retail analyst.\\nActive Filters: Country=${activeFilters.country || 'ALL'}, DateRange=${activeFilters.dateRange}.\\nComputed Metrics: Revenue=£${currentStats.totalRevenue.toLocaleString()}, Orders=${currentStats.totalOrders}.\\nTop Product: ${currentStats.topProduct}.\\nRULES: Only answer based on this exact data. Never invent metrics. Keep responses concise.`;\n};",
        },
      ],
      empiricalResults: {
        summary:
          "Dasbor berhasil memproses pemfilteran atas volume transaksi jutaan pound sterling tanpa jeda (zero lag), dan AI Analyst menyajikan wawasan data terverifikasi dengan pagar keamanan fakta yang ketat.",
        metrics: [
          { label: "Transaksi Terproses", value: "541.909 Baris", benchmark: "Dataset UCI Online Retail" },
          { label: "Eksekusi Cross-Filter", value: "In-Memory Sisi Klien", benchmark: "Tanpa roundtrip backend (JSON Pra-Agregasi)" },
          { label: "Guardrail Halusinasi LLM", value: "Temperature 0.1", benchmark: "Prompting berbasis fakta ketat" },
          { label: "Rantai Failover Model", value: "4 Generasi Model", benchmark: "Gemini 3.8 → 3.7 → 3.6 → 3.5" },
        ],
      },
      limitationsAndFutureWork: [
        "Saat ini menggunakan data pra-agregasi statis; menghubungkan ke data warehouse langsung seperti PostgreSQL atau Snowflake via streaming API akan mendukung penyerapan transaksi real-time.",
        "Pengembangan berikutnya: menambahkan deteksi anomali otomatis untuk mendeteksi pesanan grosir dalam jumlah tidak wajar.",
      ],
      references: [
        "Chen, D. (2015). Online Retail Dataset. UCI Machine Learning Repository.",
        "Dokumentasi Resmi Google Gemini API (Structured System Instructions & Context Caching).",
      ],
    },
  },
  {
    id: "adaptive-learning-insight",
    title: "Adaptive Learning Insight — Proyek Capstone Program Asah (Dicoding × Accenture)",
    subtitle: "Platform Analitik Edukasi & Inteligensi Diagnostik Belajar Siswa Berbasis AI",
    category: "academic-coursework",
    categoryLabel: "CAPSTONE COHORT · WEB FULL-STACK & AI",
    year: "2025",
    isFlagship: false,
    academicContext: "Program Asah 2025 — Asah oleh Dicoding bersama Accenture (Learning Path: React & Back-End with AI)",
    summary:
      "Proyek capstone tim resmi yang direkayasa selama Program Asah 2025 yang diselenggarakan oleh Dicoding Indonesia bersama Accenture pada alur spesialisasi 'React & Back-End with AI'. Platform analitik edukasi full-stack yang memantau perkembangan belajar siswa, mengukur penguasaan modul melalui visualisasi interaktif Recharts, serta memberikan insight diagnostik berbasis AI menggunakan React 19, Node.js (Express 5), Supabase PostgreSQL, dan model analitik belajar AI.",
    techStack: ["React 19", "Node.js", "Express 5", "Supabase", "PostgreSQL", "Recharts", "REST API", "Tailwind CSS", "Engine Analitik AI"],
    metrics: [
      { label: "Program Cohort", value: "Asah 2025 (Dicoding × Accenture)", status: "verified" },
      { label: "Alur Pembelajaran", value: "React & Back-End with AI", status: "verified" },
      { label: "Pelatihan Cohort", value: "900+ Jam Kurikulum", status: "verified" },
      { label: "Hasil Capstone", value: "Tervalidasi & Lulus", status: "verified" },
    ],
    caseStudy: {
      problemStatement:
        "Platform edukasi digital modern menghasilkan volume data aktivitas siswa yang melimpah, namun para pengajar dan mentor akademik sering kali kekurangan alat otomatis real-time untuk mendeteksi siswa yang mulai tertinggal, menemukan materi yang menjadi kendala konseptual, atau menyusun strategi intervensi yang dipersonalisasi.",
      objectives: [
        "Berkolaborasi dalam tim pengembang lintas fungsi untuk merekayasa dasbor analitik belajar siswa berbasis web yang andal dan terukur.",
        "Membangun antarmuka pengguna yang responsif dan interaktif di React 19 menggunakan Recharts untuk visualisasi perkembangan belajar, metrik akselerasi, dan rasio ketuntasan kuis.",
        "Merancang dan mengimplementasikan endpoint RESTful API menggunakan Node.js dan Express 5, terhubung ke Supabase (PostgreSQL) untuk penyimpanan data persisten.",
        "Mengintegrasikan model diagnostik pembelajaran berbasis AI untuk menganalisis tren pengerjaan kuis dan menghasilkan rekomendasi perbaikan yang tepat sasaran.",
        "Melaksanakan code review ketat, linting otomatis, dan alur kerja Git feature-branch yang selaras dengan standar produksi Dicoding dan Accenture.",
      ],
      roleAndContributions:
        "Full-Stack Web & AI Developer (Kolaborator Cohort). Mengimplementasikan komponen front-end di React dengan Recharts untuk pelacakan performa berkala, mengembangkan dan menguji endpoint REST backend Express, mengintegrasikan skema basis data Supabase, serta aktif dalam kolaborasi Git/GitHub dengan review kode yang ketat.",
      systemArchitecture: {
        overview:
          "Arsitektur full-stack client-server yang menghubungkan aplikasi web React 19 dengan RESTful API Node.js Express 5, didukung penyimpanan awan Supabase PostgreSQL dan pipeline inferensi analitik AI.",
        steps: [
          { step: "1. Pelacakan Aktivitas Belajar", description: "Mengumpulkan skor kuis, durasi belajar, dan event penyelesaian modul melalui endpoint Express REST API." },
          { step: "2. Agregasi & Penyimpanan Cloud", description: "Menyimpan data riwayat perkembangan siswa secara terstruktur dalam Supabase PostgreSQL dengan pemodelan data relasional." },
          { step: "3. Engine Diagnostik AI", description: "Memproses data performa historis siswa untuk mengidentifikasi potensi putus belajar dan menyusun rekomendasi instruksional terarah." },
          { step: "4. Dasbor Pengajar Interaktif", description: "Menampilkan grafik kecepatan belajar Recharts, indikator kemajuan responsif, dan notifikasi peringatan siswa di React." },
        ],
      },
      implementationDecisions: [
        {
          title: "Supabase & PostgreSQL untuk Persistensi Data Cloud yang Andal",
          rationale:
            "Menggantikan penyimpanan sementara dengan Supabase cloud PostgreSQL untuk memastikan integritas relasional data angkatan siswa, kuis, dan pencapaian milestone pembelajaran.",
        },
        {
          title: "Pemisahan Front-to-Back Bersih Melalui RESTful API",
          rationale:
            "Memisahkan antarmuka React 19 dari backend Express 5 untuk mempermudah pengujian modular, skalabilitas independen, dan standardisasi pertukaran format JSON.",
        },
        {
          title: "Standar Kode Industri Dicoding & Accenture",
          rationale:
            "Menerapkan code review mendalam, validasi pull request, dan aturan linter ketat sepanjang pelatihan intensif 6 bulan (900+ jam).",
        },
      ],
      empiricalResults: {
        summary:
          "Berhasil diselesaikan, dipresentasikan, dan divalidasi sebagai proyek akhir resmi Program Asah 2025 yang dipimpin oleh Dicoding bersama Accenture, memenuhi syarat kelulusan alur React & Back-End with AI.",
        metrics: [
          { label: "Kelulusan Cohort", value: "Lulus Terverifikasi", benchmark: "Asah 2025 (Dicoding × Accenture)" },
          { label: "Alur Pembelajaran", value: "React & Back-End with AI", benchmark: "900+ Jam Kurikulum" },
          { label: "Arsitektur Teknis", value: "Full-Stack Web + AI", benchmark: "React 19 + Express 5 + Supabase" },
        ],
      },
      limitationsAndFutureWork: [
        "Dikembangkan sebagai repositori capstone tim akademik; siklus hosting cloud produksi diselesaikan seiring kelulusan cohort pada Februari 2026.",
      ],
      references: [
        "Kurikulum & Silabus Resmi Alur React & Back-End with AI — Program Asah oleh Dicoding bersama Accenture (2025).",
        "Standar Dokumentasi & Verifikasi Proyek Capstone Dicoding Indonesia & Accenture (2025–2026).",
      ],
    },
  },
  {
    id: "youtube-sentiment-jumbo",
    title: "Analisis Sentimen YouTube Terkait Film Jumbo",
    subtitle: "Pipeline NLP Bahasa Indonesia End-to-End Menggunakan Support Vector Machine & InSet Lexicon",
    category: "academic-coursework",
    categoryLabel: "MACHINE LEARNING · PEMROSESAN BAHASA ALAMI (NLP)",
    year: "2025",
    isFlagship: false,
    academicContext: "Studi Akademik Universitas Gunadarma (2025)",
    summary:
      "Aplikasi machine learning dan NLP lengkap untuk menganalisis respons publik dari komentar video teaser/trailer resmi film animasi 'Jumbo' di YouTube. Menghadirkan preprocessing cerdas (demojize emoji, normalisasi 15.000 kata gaul/slang, preservasi kata negasi, stemming Sastrawi), pelabelan polaritas lexicon InSet dengan penyesuaian domain, serta pengklasifikasi Linear SVM berbobot seimbang dengan akurasi uji 86%, disebarkan sebagai aplikasi web interaktif Streamlit.",
    techStack: ["Python", "Streamlit", "Scikit-Learn", "NLTK", "Sastrawi", "InSet Lexicon", "SVM", "TF-IDF N-gram"],
    metrics: [
      { label: "Akurasi Keseluruhan", value: "86% pada Data Uji", status: "verified" },
      { label: "F1-Score Positif", value: "0.90 (Presisi 0.92)", status: "verified" },
      { label: "F1-Score Negatif", value: "0.74 (Recall 0.77)", status: "verified" },
      { label: "Kamus Kata Gaul", value: "15.000 Kata Dinormalisasi", status: "verified" },
    ],
    githubUrl: "https://github.com/Vannnd1/jumbo-movie-sentiment-analysis",
    demoUrl: "https://jumbo-movie-sentiment.streamlit.app/",
    caseStudy: {
      problemStatement:
        "Penerimaan masyarakat terhadap karya budaya dan film animasi Indonesia tercermin dalam ribuan komentar YouTube. Memahami sentimen penonton secara akurat membutuhkan pipeline NLP yang mampu menangani bahasa informal Indonesia, kata slang/gaul, emoji emosional, negasi ('tidak bagus'), serta ketidakseimbangan proporsi sentimen tanpa menenggelamkan kritik negatif.",
      objectives: [
        "Mengekstrak data komentar publik dari YouTube melalui YouTube Data API v3 pada video teaser dan trailer resmi Film Jumbo.",
        "Membangun pipeline prapemrosesan teks cerdas: demojizing emoji (misal 🔥 ➔ fire), normalisasi 15.000 kata gaul/alay, preservasi kata negasi ('tidak', 'kurang', 'gak'), dan pereduksian kata dasar Sastrawi.",
        "Menerapkan kamus sentimen InSet Lexicon dengan penyesuaian kata spesifik konteks film dan pembalikan polaritas negasi untuk melabeli sentimen biner (Positif vs. Negatif).",
        "Mengekstraksi fitur teks TF-IDF N-gram (1,2) dan melatih model Linear SVM berbobot seimbang (class_weight='balanced') dengan validasi silang 5-fold.",
        "Mendeploy model machine learning yang telah diserialisasi ke dalam dasbor web interaktif Streamlit untuk klasifikasi komentar pengguna secara real-time.",
      ],
      roleAndContributions:
        "Machine Learning & NLP Engineer. Membangun alur ekstraksi data YouTube, merekayasa pipeline prapemrosesan dan normalisasi teks 6-tahap, mengkalibrasi penyesuaian leksikon, melatih serta mengevaluasi model SVM terbobot seimbang, dan menyebarkan aplikasi web interaktif di Streamlit Cloud.",
      systemArchitecture: {
        overview:
          "Pipeline NLP menyeluruh: Ingesti Data YouTube → Prapemrosesan Teks Cerdas (Demojize + Slang + Stemming) → Pelabelan Kamus InSet & Penyesuaian Domain → Ekstraksi Fitur TF-IDF N-gram → Linear SVM Berbobot Seimbang → Deployment Web Streamlit.",
        steps: [
          { step: "1. Pengumpulan Data", description: "Mengambil data komentar penonton dari teaser dan trailer resmi Film Jumbo di YouTube." },
          { step: "2. Prapemrosesan Cerdas", description: "Mengubah emoji menjadi teks, menormalisasi 15 ribu kosakata slang, mempertahankan kata negasi krusial, dan melakukan stemming Sastrawi." },
          { step: "3. Pelabelan Leksikon & Domain", description: "Leksikon sentimen InSet (-5 hingga +5) dengan override konteks perfilman dan pembalikan negasi untuk membentuk label biner terverifikasi." },
          { step: "4. Klasifikasi SVM Berimbang", description: "Ekstraksi fitur unigram dan bigram dengan TF-IDF, dilatih menggunakan Linear SVM bermetode penyeimbang bobot kelas." },
          { step: "5. Aplikasi Interaktif Streamlit", description: "Mendeploy aplikasi web interaktif yang memungkinkan pengunjung memasukkan ulasan bebas dan melihat hasil prediksi sentimen seketika." },
        ],
      },
      implementationDecisions: [
        {
          title: "Demojizing Emoji & Preservasi Kata Negasi",
          rationale:
            "Menghapus emoji dan stopwords secara naif berisiko menghilangkan makna emosional penting. Emoji diubah menjadi teks semantik (misal ❤️ menjadi 'love'), dan kata negasi ('tidak', 'bukan', 'kurang') sengaja dipertahankan agar frasa seperti 'tidak bagus' tidak terlabeli positif.",
        },
        {
          title: "Linear SVM Berbobot Seimbang vs. Sintetis SMOTE",
          rationale:
            "Linear SVM dengan penalti berbobot seimbang (class_weight='balanced') terbukti lebih stabil dan memiliki generalisasi lebih baik pada vektor TF-IDF berdimensi tinggi yang sparse, meningkatkan recall kelas minoritas negatif dari 38% menjadi 77%.",
        },
        {
          title: "Deployment Interaktif di Streamlit Cloud",
          rationale:
            "Menyediakan antarmuka web yang mudah diakses recruiter, pembuat film, dan publik untuk menguji klasifikasi ulasan baru secara langsung tanpa perlu menginstal lingkungan Python lokal.",
        },
      ],
      empiricalResults: {
        summary:
          "Mencapai akurasi uji keseluruhan sebesar 86% pada data yang belum pernah dilihat, dengan F1-Score kelas Positif 0.90, F1-Score kelas Negatif 0.74 (Recall 77%), dan Macro Average F1-Score 0.82 dari 236 sampel uji.",
        metrics: [
          { label: "Akurasi Uji Keseluruhan", value: "86%", benchmark: "236 Komentar Uji (Split 80:20)" },
          { label: "Kelas Positif", value: "F1: 0.90 / Presisi: 0.92", benchmark: "Jumlah: 175 Komentar" },
          { label: "Kelas Negatif", value: "F1: 0.74 / Recall: 0.77", benchmark: "Jumlah: 61 Komentar" },
          { label: "Aplikasi Web Live", value: "Streamlit Cloud", benchmark: "Pengklasifikasi Interaktif" },
        ],
      },
      limitationsAndFutureWork: [
        "Komentar yang sarat sarkasme atau kiasan kontekstual mendalam masih menjadi tantangan bagi model berbasis leksikon dan n-gram statis.",
        "Arah pengembangan masa depan: fine-tuning model transformer bahasa Indonesia (seperti IndoBERT) untuk menangkap nuansa kontekstual yang lebih kompleks.",
      ],
      references: [
        "Koto, F., & Rahmaningtyas, G. Y. (2017). InSet Lexicon: Evaluation of a Word List for Indonesian Sentiment Analysis in Microblogs. IEEE IALP.",
        "Salsabila, N. A., et al. (2018). Colloquial Indonesian Lexicon (Kamus Alay 15K).",
        "Library Python Sastrawi: Indonesian Morphological Lemmatizer and Stemmer.",
      ],
    },
  },
  {
    id: "sahabat-dunia",
    title: "Sahabat Dunia — Aplikasi Web Pembelajaran Satwa Interaktif",
    subtitle: "Platform Edukasi Multimedia dengan Integrasi Web Audio API",
    category: "interactive",
    categoryLabel: "FRONTEND · MULTIMEDIA INTERAKTIF",
    year: "2026",
    isFlagship: false,
    summary:
      "Platform web edukasi interaktif yang memperkenalkan keanekaragaman hayati dan habitat satwa kepada anak-anak melalui kartu visual multimedia, modul kuis interaktif, dan kontrol audio terintegrasi Web Audio API.",
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Web Audio API", "Interactive UI"],
    metrics: [
      { label: "Arsitektur", value: "Vanilla Zero-Dependency", status: "neutral" },
      { label: "Engine Audio", value: "HTML5 Web Audio API", status: "neutral" },
    ],
    githubUrl: "https://github.com/Vannnd1/SahabatDunia",
    demoUrl: "https://sahabat-dunia.vercel.app/",
    caseStudy: {
      problemStatement:
        "Alat edukasi web untuk anak-anak sering kali bergantung pada framework aplikasi yang berat, sarat iklan yang mengganggu, atau berwujud halaman statis tanpa umpan balik auditori yang interaktif dan menyenangkan.",
      objectives: [
        "Membangun website edukasi pengenalan fauna yang ringan dan bebas dependensi pihak ketiga.",
        "Mengimplementasikan pemutaran musik latar dan efek suara real-time dilengkapi kontrol volume slider dan tombol mute/unmute.",
        "Merancang modul kuis interaktif bagi anak-anak untuk menguji pengetahuan satwa mereka secara mandiri.",
      ],
      roleAndContributions:
        "Frontend Developer dan UI Designer. Menyusun struktur semantik HTML5, mendesain animasi bouncing CSS kustom, menulis logika state aplikasi dalam JavaScript murni, dan merancang widget pengendali audio terintegrasi.",
      systemArchitecture: {
        overview:
          "Arsitektur web single-page vanilla yang mengelola kartu visual satwa, state permainan kuis, dan widget pengontrol suara ambient.",
        steps: [
          { step: "1. Katalog Satwa", description: "Menampilkan kategori habitat satwa (Mamalia, Burung, Laut) dengan kartu visual interaktif." },
          { step: "2. Pengendali Audio", description: "Widget kontrol suara global dengan fitur play/pause, volume slider, dan trigger efek suara aksi." },
          { step: "3. Kuis Interaktif", description: "Permainan tebak satwa pilihan ganda dengan pelacakan perolehan skor pada session lokal browser." },
        ],
      },
      implementationDecisions: [
        {
          title: "Arsitektur Vanilla JavaScript Tanpa Dependensi",
          rationale:
            "Menghilangkan library eksternal yang berat memastikan situs termuat sekejap (near-instant) pada perangkat tablet sekolah maupun ponsel berkecepatan internet terbatas.",
        },
        {
          title: "Widget Kontrol Audio Terintegrasi",
          rationale:
            "Mengimplementasikan pemutar musik latar terapung yang fleksibel, memungkinkan pengguna mengatur volume dan mute audio tanpa memutus pengalaman bernavigasi.",
        },
      ],
      empiricalResults: {
        summary:
          "Menghasilkan website interaktif yang responsif, ringan, berdesain ramah anak, dan dilengkapi tata kelola audio serta logika permainan kuis yang berjalan mulus.",
        metrics: [
          { label: "Dependensi", value: "0 Library Eksternal", benchmark: "Native Browser APIs" },
          { label: "Dukungan Audio", value: "Custom Web Audio Widget", benchmark: "Kontrol Volume & Mute" },
        ],
      },
      limitationsAndFutureWork: [
        "Pengembangan berikutnya: menambahkan pelafalan nama satwa bersuara (text-to-speech) dalam bahasa Indonesia dan bahasa Inggris.",
      ],
      references: [
        "Repositori Sahabat Dunia (Vannnd1/SahabatDunia).",
      ],
    },
  },
];

export const getProjectsData = (lang: Language): ProjectItem[] => {
  return lang === 'id' ? projectsDataId : projectsDataEn;
};

// Default export for backward compatibility
export const projectsData = projectsDataId;
