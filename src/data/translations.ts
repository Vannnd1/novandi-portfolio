export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    homeAria: string;
    langSwitchAria: string;
  };
  heatmap: {
    ariaLabel: string;
    tooltipHover: string;
    contribution: string;
    contributions: string;
    on: string;
    yearSummary: (count: number) => string;
    less: string;
    more: string;
    days: [string, string, string];
  };
  hero: {
    helloIm: string;
    name: string;
    leadBefore: string;
    leadMuted: string;
    leadShare: string;
    and: string;
    leadKeep: string;
  };
  tabs: {
    experience: string;
    education: string;
    works: string;
  };
  works: {
    viewCaseStudy: string;
    liveDemo: string;
    quickPreview: string;
    techStackAria: string;
  };
  stickerCard: {
    heading: string;
    titleAttr: string;
    copyTitle: string;
    copy: string;
    copied: string;
  };
  footer: {
    rights: string;
    navAria: string;
  };
  modal: {
    backToWorks: string;
    liveSite: string;
    visitLiveSite: string;
    githubRepo: string;
    inspectGithubRepo: string;
    sourceAcademic: string;
    closeAria: string;
    sec01Title: string;
    sec01Sub: string;
    sec02Title: string;
    sec03Title: string;
    sec04Title: string;
    sec05Title: string;
    sec06Title: string;
    codeSnippetLabel: string;
    sec07Title: string;
    colMetric: string;
    colOutput: string;
    colBenchmark: string;
    sec08Title: string;
    secRefTitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      homeAria: "beranda novan.arm",
      langSwitchAria: "Ganti bahasa (ID / EN)",
    },
    heatmap: {
      ariaLabel: "Kalender kontribusi GitHub",
      tooltipHover: "arahkan kursor ke kotak untuk melihat riwayat kontribusi",
      contribution: "kontribusi",
      contributions: "kontribusi",
      on: "pada",
      yearSummary: (count: number) => `${count} kontribusi dalam satu tahun terakhir`,
      less: "Sedikit",
      more: "Banyak",
      days: ["Sen", "Rab", "Jum"],
    },
    hero: {
      helloIm: "halo, saya",
      name: "Novandi Ahmad Ramdhan",
      leadBefore: "seorang software engineer dengan fondasi kuat dalam rekayasa informatika dan pengembangan web modern.",
      leadMuted: "saya memiliki ketertarikan mendalam pada apa yang terjadi di balik layar—mulai dari arsitektur backend yang bersih, keamanan dan kriptografi digital, hingga bagaimana sistem cerdas bertenaga AI mempercepat alur kerja industri nyata.",
      leadShare: "saya membagikan perjalanan dan wawasan di",
      and: "dan",
      leadKeep: ", serta mendokumentasikan seluruh proyek yang saya bangun di",
    },
    tabs: {
      experience: "pengalaman",
      education: "pendidikan",
      works: "karya",
    },
    works: {
      viewCaseStudy: "lihat studi kasus lengkap",
      liveDemo: "live demo",
      quickPreview: "pratinjau cepat",
      techStackAria: "Teknologi yang digunakan",
    },
    stickerCard: {
      heading: "Siap mengakselerasi alur kerja Anda?",
      titleAttr: "Kirim email ke Novandi (membuka aplikasi Email di HP / Gmail di Desktop)",
      copyTitle: "Salin alamat email",
      copy: "Salin",
      copied: "Tersalin!",
    },
    footer: {
      rights: "hak cipta dilindungi",
      navAria: "Navigasi footer",
    },
    modal: {
      backToWorks: "kembali ke daftar karya",
      liveSite: "live site",
      visitLiveSite: "kunjungi website live",
      githubRepo: "kunjungi repositori github",
      inspectGithubRepo: "periksa repositori github",
      sourceAcademic: "sumber: riset akademik & rekayasa internal",
      closeAria: "Tutup Studi Kasus",
      sec01Title: "01. latar belakang masalah & motivasi",
      sec01Sub: "Mengapa masalah ini krusial untuk diselesaikan",
      sec02Title: "02. tujuan & ruang lingkup rekayasa",
      sec03Title: "03. peran & kontribusi terverifikasi",
      sec04Title: "04. teknologi & stack teknis terverifikasi",
      sec05Title: "05. arsitektur sistem & alur pemrosesan",
      sec06Title: "06. keputusan implementasi utama",
      codeSnippetLabel: "cuplikan implementasi",
      sec07Title: "07. hasil terverifikasi & validasi empiris",
      colMetric: "metrik evaluasi",
      colOutput: "output terverifikasi",
      colBenchmark: "teoretis / acuan benchmark",
      sec08Title: "08. batasan transparan & pengembangan masa depan",
      secRefTitle: "standar teknis & referensi",
    },
  },
  en: {
    nav: {
      homeAria: "novan.arm home",
      langSwitchAria: "Switch language (EN / ID)",
    },
    heatmap: {
      ariaLabel: "GitHub contribution calendar",
      tooltipHover: "hover on any block to see live contributions",
      contribution: "contribution",
      contributions: "contributions",
      on: "on",
      yearSummary: (count: number) => `${count} contributions in the last year`,
      less: "Less",
      more: "More",
      days: ["Mon", "Wed", "Fri"],
    },
    hero: {
      helloIm: "hello, i'm",
      name: "Novandi Ahmad Ramdhan",
      leadBefore: "a software engineer with a strong foundation in informatics and web development.",
      leadMuted: "i'm curious about what happens behind the screen—from clean backend architectures and digital security to how AI-driven systems power real-world industrial workflows.",
      leadShare: "i share my journey on",
      and: "and",
      leadKeep: ", and keep everything i build on",
    },
    tabs: {
      experience: "experience",
      education: "education",
      works: "works",
    },
    works: {
      viewCaseStudy: "view full case study",
      liveDemo: "live demo",
      quickPreview: "quick preview",
      techStackAria: "Tech stack",
    },
    stickerCard: {
      heading: "Ready to elevate your workflow?",
      titleAttr: "Send email to Novandi (opens email app / Gmail)",
      copyTitle: "Copy email address",
      copy: "Copy",
      copied: "Copied!",
    },
    footer: {
      rights: "all right reserved",
      navAria: "Footer navigation",
    },
    modal: {
      backToWorks: "back to works",
      liveSite: "live site",
      visitLiveSite: "open live website",
      githubRepo: "visit github repository",
      inspectGithubRepo: "inspect github repository",
      sourceAcademic: "source: academic & internal engineering",
      closeAria: "Close Case Study",
      sec01Title: "01. problem statement & motivation",
      sec01Sub: "Why this problem matters",
      sec02Title: "02. objectives & engineering scope",
      sec03Title: "03. verified role & contribution",
      sec04Title: "04. verified technical stack",
      sec05Title: "05. system architecture & processing workflow",
      sec06Title: "06. key implementation decisions",
      codeSnippetLabel: "implementation snippet",
      sec07Title: "07. verified results & empirical validation",
      colMetric: "evaluation metric",
      colOutput: "verified output",
      colBenchmark: "theoretical / benchmark",
      sec08Title: "08. transparent limitations & future work",
      secRefTitle: "technical standards & references",
    },
  },
};
