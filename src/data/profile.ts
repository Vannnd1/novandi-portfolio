import type { Language } from './translations';

export interface ExperienceItem {
  period: string;
  role: string;
  institution: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  score?: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  positioning: string;
  email: string;
  phone?: string;
  location: string;
  githubUrl: string;
  instagramUrl: string;
  bioSummary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  verifiedMetrics: {
    gpa: string;
    thesisTitle: string;
    verifiedTests: string;
    dataScale: string;
  };
}

export const profileDataEn: ProfileData = {
  name: "Novandi Ahmad Ramdhan",
  title: "Informatics Engineer",
  positioning: "Software Development · Data Analysis · Cybersecurity",
  email: "novandiramdhan5@gmail.com",
  location: "Cibinong, Bogor, Indonesia",
  githubUrl: "https://github.com/Vannnd1",
  instagramUrl: "https://www.instagram.com/novandiahmdr/",
  bioSummary:
    "Fresh S1 Informatika graduate from Universitas Gunadarma with a verified foundation in software engineering, applied digital image cryptography, and data intelligence. Experienced in developing full-stack web applications with React and Node.js, building enterprise workflows with rigorous test coverage, and implementing medical image encryption algorithms with NIST SP 800-22 statistical validation.",
  verifiedMetrics: {
    gpa: "3.64 / 4.00",
    thesisTitle: "Medical Image Encryption using Gauss-MS & MS-Gauss Chaotic Maps",
    verifiedTests: "252 Automated Tests (MOM/MES Project, 96.6% Core Logic Coverage)",
    dataScale: "541,909 Transactions Preprocessed (Pre-aggregated In-Memory Filtering)",
  },
  education: [
    {
      period: "2022 – 2026",
      degree: "S1 Informatika (Bachelor of Computer Science)",
      institution: "Universitas Gunadarma",
      score: "IPK: 3.64 / 4.00",
      description:
        "Comprehensive undergraduate curriculum in computer science, software engineering, database systems, computer security, and machine learning. Culminating in undergraduate thesis research on medical image cryptography using composite chaotic maps.",
    },
    {
      period: "2019 – 2022",
      degree: "Multimedia Specialization",
      institution: "SMKN 1 Cibinong",
      description:
        "Fundamental studies in interactive digital media, user interface design principles, graphic assets, audio-visual editing, and front-end foundations.",
    },
  ],
  experience: [
    {
      period: "2025 – 2026",
      role: "React & Back-End with AI Developer — Cohort Participant",
      institution: "Program Asah (Dicoding Indonesia × Accenture)",
      description:
        "Selected for the intensive industry-accredited digital talent scholarship program (900+ instructional hours) led by Dicoding Indonesia in association with Accenture under the Kampus Merdeka initiative. Specialized in the 'React & Back-End with AI' learning path, mastering modern front-end web engineering, scalable back-end RESTful API architectures, and seamless artificial intelligence integrations.",
      highlights: [
        "Mastered the 'React & Back-End with AI' curriculum: modern React (Hooks, Context, React Router, Recharts), server-side engineering with Node.js & Express, and integrating AI/LLM capabilities into web applications.",
        "Underwent rigorous code-by-code review from Dicoding industry experts on every submission, ensuring clean code, production-grade security, and performance standards.",
        "Participated in weekly technical and soft skills mentoring sessions conducted directly by senior technology leaders from Accenture and Dicoding.",
        "Collaborated in a development team to engineer the official capstone project 'Adaptive Learning Insight'—an educational analytics platform utilizing React, Express, Supabase, and automated AI insight generation.",
      ],
    },
  ],
  skillCategories: [
    {
      title: "Programming Languages",
      skills: ["Python (Numba JIT, NumPy)", "TypeScript", "JavaScript (ESNext)", "SQL", "HTML5 & CSS3"],
    },
    {
      title: "Web & Backend Engineering",
      skills: ["React 19 / 18", "Node.js", "Express", "RESTful API Design", "Knex.js", "PostgreSQL", "Tailwind CSS"],
    },
    {
      title: "Security & Applied Cryptography",
      skills: [
        "Chaotic Map Cryptography",
        "NIST SP 800-22 Randomness Analysis",
        "Shannon Entropy & NPCR/UACI",
        "Role-Based Access Control (RBAC)",
        "Segregation of Duties (SoD)",
      ],
    },
    {
      title: "Data Analysis & Artificial Intelligence",
      skills: [
        "Data Analysis & ETL Pipelines",
        "Natural Language Processing (NLP)",
        "Support Vector Machine (SVM)",
        "Google Gemini API Integration",
        "Recharts Visualization",
      ],
    },
    {
      title: "Tools & Engineering Infrastructure",
      skills: ["Git & GitHub", "Vite", "Vitest / Jest", "Oxlint", "Postman", "AWS Fundamentals"],
    },
  ],
};

export const profileDataId: ProfileData = {
  name: "Novandi Ahmad Ramdhan",
  title: "Sarjana Informatika & Software Engineer",
  positioning: "Pengembangan Perangkat Lunak · Analisis Data · Keamanan Siber",
  email: "novandiramdhan5@gmail.com",
  location: "Cibinong, Bogor, Indonesia",
  githubUrl: "https://github.com/Vannnd1",
  instagramUrl: "https://www.instagram.com/novandiahmdr/",
  bioSummary:
    "Lulusan S1 Informatika Universitas Gunadarma dengan fondasi teruji dalam rekayasa perangkat lunak, kriptografi citra digital terapan, dan inteligensi data. Berpengalaman membangun aplikasi web full-stack dengan React dan Node.js, merancang arsitektur alur kerja enterprise dengan cakupan pengujian otomatis yang ketat, serta mengimplementasikan algoritma enkripsi citra medis dengan validasi statistik standar NIST SP 800-22.",
  verifiedMetrics: {
    gpa: "3.64 / 4.00",
    thesisTitle: "Enkripsi Citra Medis Menggunakan Composite Chaotic Maps Gauss-MS & MS-Gauss",
    verifiedTests: "252 Pengujian Otomatis (Proyek MOM/MES, 96.6% Core Logic Coverage)",
    dataScale: "541.909 Transaksi Terproses (Pemfilteran In-Memory Pra-Agregasi)",
  },
  education: [
    {
      period: "2022 – 2026",
      degree: "S1 Informatika (Sarjana Komputer)",
      institution: "Universitas Gunadarma",
      score: "IPK: 3.64 / 4.00",
      description:
        "Kurikulum sarjana komprehensif dalam ilmu komputer, rekayasa perangkat lunak, sistem basis data, keamanan komputer, dan machine learning. Menyelesaikan penelitian skripsi sarjana di bidang kriptografi citra medis menggunakan composite chaotic maps.",
    },
    {
      period: "2019 – 2022",
      degree: "Jurusan Multimedia",
      institution: "SMKN 1 Cibinong",
      description:
        "Studi fundamental media digital interaktif, prinsip desain antarmuka pengguna (UI/UX), aset grafis, penyuntingan audio-visual, dan fondasi pengembangan front-end web.",
    },
  ],
  experience: [
    {
      period: "2025 – 2026",
      role: "Pengembang React & Back-End with AI — Peserta Cohort",
      institution: "Program Asah (Dicoding Indonesia × Accenture)",
      description:
        "Terpilih dalam program beasiswa talenta digital intensif terakreditasi industri (900+ jam pembelajaran) yang diselenggarakan oleh Dicoding Indonesia bersama Accenture di bawah naungan inisiatif Kampus Merdeka. Mengambil alur spesialisasi 'React & Back-End with AI', menguasai rekayasa web front-end modern, arsitektur RESTful API berskala besar dengan Node.js, dan integrasi kecerdasan buatan (AI) yang mulus.",
      highlights: [
        "Menguasai kurikulum 'React & Back-End with AI': React modern (Hooks, Context, React Router, Recharts), rekayasa server-side dengan Node.js & Express, serta integrasi kapabilitas AI/LLM ke dalam aplikasi web.",
        "Menjalani reviu kode mendalam (code-by-code review) dari praktisi industri Dicoding pada setiap submission untuk memastikan standar clean code, keamanan tingkat produksi, dan efisiensi performa.",
        "Mengikuti sesi mentoring teknis dan soft skills mingguan yang dibimbing langsung oleh pimpinan teknologi senior dari Accenture dan Dicoding.",
        "Berkolaborasi dalam tim pengembang untuk merekayasa proyek capstone resmi 'Adaptive Learning Insight'—platform analitik edukasi berbasis React, Express, Supabase, dan generasi insight AI otomatis.",
      ],
    },
  ],
  skillCategories: [
    {
      title: "Bahasa Pemrograman",
      skills: ["Python (Numba JIT, NumPy)", "TypeScript", "JavaScript (ESNext)", "SQL", "HTML5 & CSS3"],
    },
    {
      title: "Rekayasa Web & Backend",
      skills: ["React 19 / 18", "Node.js", "Express", "Desain RESTful API", "Knex.js", "PostgreSQL", "Tailwind CSS"],
    },
    {
      title: "Keamanan & Kriptografi Terapan",
      skills: [
        "Kriptografi Chaotic Map",
        "Analisis Keacakan NIST SP 800-22",
        "Shannon Entropy & NPCR/UACI",
        "Role-Based Access Control (RBAC)",
        "Segregation of Duties (SoD)",
      ],
    },
    {
      title: "Analisis Data & Kecerdasan Buatan",
      skills: [
        "Pipeline Analisis Data & ETL",
        "Natural Language Processing (NLP)",
        "Support Vector Machine (SVM)",
        "Integrasi Google Gemini API",
        "Visualisasi Data Recharts",
      ],
    },
    {
      title: "Alat & Infrastruktur Rekayasa",
      skills: ["Git & GitHub", "Vite", "Vitest / Jest", "Oxlint", "Postman", "Dasar-Dasar AWS"],
    },
  ],
};

export const getProfileData = (lang: Language): ProfileData => {
  return lang === 'id' ? profileDataId : profileDataEn;
};

// Default export for backward compatibility
export const profileData = profileDataId;
