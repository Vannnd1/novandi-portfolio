# Novandi Ahmad Ramdhan — Informatics & Systems Engineering Portfolio

Professional Informatics portfolio website for **Novandi Ahmad Ramdhan**, showcasing applied work across **Software Development**, **Data Analysis & AI**, and **Cybersecurity & Applied Cryptography**.

## 🛠 Technology Stack & Tooling

* **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite 8](https://vite.dev/)
* **Styling & Design Tokens:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Linter:** [Oxlint](https://oxc.rs/)

## 🎨 Creative Direction & Anti-Slop Design System

Built under the **"Editorial Minimalism × Technical Research"** design framework, strictly adhering to [anti-slop](https://github.com/miqdadbadjuber/anti-slop) quality standards:
* **Canvas:** Warm Bone Paper (`#FAFAF9`)
* **Ink Typography:** Deep Neutral Ink (`#111318`) & Technical Slate (`#575B66`)
* **Primary Accent:** Precision Cobalt Blue (`#2563EB`)
* **Verification Accent:** Cryptographic Status Emerald (`#059669`)
* **Typography:** `Instrument Serif` (Headlines) + `Plus Jakarta Sans` (Body) + `JetBrains Mono` (Parameters & Code)

## 📂 Project Architecture

```text
src/
├── data/
│   ├── profile.ts            # Verified education, experience, and skills data
│   └── projects.ts           # Verified project records, metrics, and repository links
├── components/
│   ├── Header.tsx            # Sticky minimal navigation with responsive mobile drawer
│   ├── Hero.tsx              # Asymmetric editorial hero with verified profile card
│   ├── FlagshipThesis.tsx    # Prominent presentation of Chaotic Image Encryption thesis
│   ├── ProjectCard.tsx       # Intentional editorial card for engineering codebases
│   ├── ProjectsSection.tsx   # Domain-categorized project showcase with filtering
│   ├── TechnicalBackground.tsx# Education, Program Asah experience, and skills matrix
│   ├── ContactFooter.tsx     # 1-click email copy action, links, and footnote
│   ├── StatusBadge.tsx       # Reusable status and verification badge pill
│   └── Icons.tsx             # Standalone SVG icons (GitHub, etc.)
├── App.tsx                   # Main page composition
├── index.css                 # Tailwind CSS v4 design tokens and resets
└── main.tsx                  # React DOM root entry
```

## 🚀 Development & Verification Commands

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

### 5. Preview Production Build Locally
```bash
npm run preview
```
