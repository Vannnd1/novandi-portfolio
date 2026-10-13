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
  phone: string;
  location: string;
  githubUrl: string;
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

export const profileData: ProfileData = {
  name: "Novandi Ahmad Ramdhan",
  title: "Informatics Engineer",
  positioning: "Software Development · Data Analysis · Cybersecurity",
  email: "novandiramdhan5@gmail.com",
  phone: "085155228540",
  location: "Cibinong, Bogor, Indonesia",
  githubUrl: "https://github.com/Vannnd1",
  bioSummary:
    "Fresh S1 Informatika graduate from Universitas Gunadarma with a verified foundation in software engineering, applied digital image cryptography, and data intelligence. Experienced in developing full-stack web applications with React and Node.js, building enterprise workflows with rigorous test coverage, and implementing medical image encryption algorithms with NIST SP 800-22 statistical validation.",
  verifiedMetrics: {
    gpa: "3.64 / 4.00",
    thesisTitle: "Medical Image Encryption using Gauss-MS & MS-Gauss Chaotic Maps",
    verifiedTests: "252 Automated Tests Passing (89.9% Coverage)",
    dataScale: "541,909 Transactions Preprocessed (0ms Client Latency)",
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
      period: "2025",
      role: "Cohort Developer — Cloud & Full-Stack Web",
      institution: "Program Asah — Dicoding Indonesia",
      description:
        "Intensive technical development program covering full-stack web engineering with React and Node.js, RESTful API architecture, cloud infrastructure, and Generative AI fundamentals using AWS services.",
      highlights: [
        "Architected full-stack web services integrating React front-ends with Node.js back-ends via RESTful APIs.",
        "Implemented cloud deployment concepts and utilized AWS Generative AI services.",
        "Collaborated in a development team on the capstone project Adaptive Learning Insight to analyze educational data and generate AI-driven insights.",
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
