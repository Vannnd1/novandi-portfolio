# Novandi Ahmad Ramdhan — Informatics & Software Engineering Portfolio

Interactive editorial developer portfolio for **Novandi Ahmad Ramdhan** (S1 Informatika graduate from Universitas Gunadarma), showcasing verified projects across **Full-Stack Software Engineering**, **Applied Cryptography & Cybersecurity**, and **Data Intelligence & Generative AI**.

Live Website: [novandi-portfolio.vercel.app](https://novandi-portfolio.vercel.app/)  
GitHub Repository: [github.com/Vannnd1/novandi-portfolio](https://github.com/Vannnd1/novandi-portfolio)

---

## 🛠 Technology Stack & Tooling

* **Framework:** [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/)
* **Build Tool:** [Vite 8](https://vite.dev/)
* **Motion & Animation:** [Motion for React](https://motion.dev/) (hardware-accelerated, reduced-motion compliant)
* **Styling & Design Tokens:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/) + Custom SVG Icons
* **Code Quality & Linter:** [Oxlint](https://oxc.rs/)
* **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

---

## 🎨 Creative Direction: Interactive Editorial Engineering

The portfolio follows an **"Interactive Editorial Engineering"** visual direction:
* **Foundation:** Editorial pure white background (`#ffffff`), dark ink typography (`#101010`), and crisp neutral zinc dividers.
* **Accent Colors:** Electric Pink / Magenta (`#fd4aa6`), Lime Green (`#9dff34`), and Emerald Verification (`#10b981`).
* **Typography:** `Hegarty` (custom editorial headline display font) + `DM Sans` + `Space Grotesk` + `Geist`.
* **Signature Micro-Interactions:**
  * **Interactive Radial Spotlight:** Fluid pointer-following gradient on hero card using pure Motion values without React re-renders.
  * **3D Perspective Tilt:** Interactive tilt cards (`TiltCard.tsx`) with pointer-coarse (touch) detection and reduced-motion fallback.
  * **Magnetic Physics Buttons:** Subtle magnetic pull on primary CTAs (`MagneticButton.tsx`).
  * **Scroll Progress:** Non-blocking top progress bar (`ScrollProgress.tsx`).
  * **Accessible Case Study Modal:** Full-bleed modal dialog with keyboard Tab focus trap, Escape dismissal, and body scroll locking with layout shift compensation.
  * **Reactive GitHub Heatmap:** Dynamic contribution activity visualizer with abort-controller fetching and reactive month labels.

---

## 📂 Project Architecture

```text
src/
├── context/
│   ├── LanguageContext.tsx         # Bilingual provider (ID / EN) with localStorage persistence
│   ├── LanguageContextInstance.ts  # React context instance
│   ├── useLanguage.ts              # Custom hook for localized content access
│   └── types.ts                    # Context type definitions
├── data/
│   ├── profile.ts                  # Localized profile, education, experience, and verified metrics
│   ├── projects.ts                 # Localized project records, NIST metrics, and case study data
│   └── translations.ts             # Full dictionary for ID and EN translations
├── components/
│   ├── portfolio/
│   │   ├── HeroSection.tsx         # Editorial hero with spotlight, portrait tilt, and magnetic CTAs
│   │   ├── TechnicalMetrics.tsx    # 4-column verified engineering metrics strip
│   │   ├── ProjectShowcase.tsx     # Domain project showcase with accessible mockup viewport
│   │   └── TimelineSection.tsx     # Editorial Experience and Education timelines
│   ├── CaseStudyModal.tsx          # Accessible modal dialog with WCAG 2.1 focus trap
│   ├── GithubHeatmap.tsx           # Abortable GitHub contributions visualizer
│   ├── Icons.tsx                   # Standalone SVG brand icons
│   ├── MagneticButton.tsx          # Physics-based magnetic hover effect
│   ├── NovandiPortfolio.tsx        # Main portfolio composition container
│   ├── ProjectMockup.tsx           # High-fidelity project replicas (Tkinter, MOM/MES, Streamlit, etc.)
│   ├── RevealOnScroll.tsx          # Viewport intersection scroll reveal wrapper
│   ├── ScrollProgress.tsx          # Top window scroll progress indicator
│   ├── SocialPill.tsx              # Rotated badge pill for social links
│   ├── Spotlight.tsx               # High-performance pointer-following radial light
│   ├── StickerCard.tsx             # Lime green email CTA card with clipboard fallback
│   ├── TechPill.tsx                # Technology stack badge pill
│   └── TiltCard.tsx                # 3D perspective mouse hover card
├── utils/
│   └── email.ts                    # Smart email handler (native mailto vs Gmail web client)
├── App.tsx                         # LanguageProvider root wrapper
├── index.css                       # Hegarty font face and Tailwind CSS v4 directives
└── main.tsx                        # Application DOM entry
```

---

## 🚀 Development, Verification & Testing Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Run Static Type Checking & Production Build
```bash
npm run build
```

### 4. Run Oxlint Linter
```bash
npm run lint
```

### 5. Run Automated Tests
```bash
npm test
```

### 6. Preview Production Build Locally
```bash
npm run preview
```
