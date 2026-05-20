// ============================================================
// PORTFOLIO CONFIGURATION — Edit everything in this file!
// ============================================================

export const config = {
  // ── Personal Info ──────────────────────────────────────────
  name: "RASOAMANANA Herimanjaka Stéphanie",
  title: "Data Scientist | Analyst | Engineer",
  tagline: "Student data scientist passionate about creating end-to-end solutions — from raw pipelines to production ML models.",
  bio: `Fuelled by an infectious optimism and a deep passion for Big Data & AI, I build scalable solutions where engineering rigor meets strategic vision, always driven by a relentless curiosity to innovate and a proactive search for new technological opportunities.`,
  location: "Antananarivo, Madagascar",
  email: "stephparabis@gmail.com",
  avatar: "/avatar.jpg", // URL or leave empty for initials avatar

  // ── Social Links ───────────────────────────────────────────
  github: "stephanie2607", // ← REQUIRED — also drives project fetching
  linkedin: "https://www.linkedin.com/in/stephanie-parabis-3a9a9b318",
  twitter: "", // or X handle — leave empty to hide
  kaggle: "", // leave empty to hide

  // ── Skills ─────────────────────────────────────────────────
  // Each group has a label, an emoji icon, and a list of skills
  skillGroups: [
    {
      label: "Data Engineering & Analytics",
      icon: "🧩",
      skills: ["ETL", "EDA", "SQL", "Pandas", "Tableau / Plotly"],
    },
    {
      label: "Machine Learning & AI",
      icon: "🤖",
      skills: ["Regression", "Classification", "NLP", "Computer Vision", "Scikit-Learn"],
    },
    {
      label: "Development & Tools",
      icon: "🛠️",
      skills: ["Python", "FastAPI / Streamlit", "Git", "Linux / Kali", "Docker"],
    },
  ],

  // ── Resume / CV ────────────────────────────────────────────
  resumeUrl: "/resume.pdf", // place your PDF in /public and set path here

  // ── Fun stats shown in the hero ───────────────────────────
  stats: [
    { value: "10+", label: "Academic Projects" },
    { value: "13+", label: "Tools & Libraries" },
    { value: "100%", label: "AI Enthusiast" },
  ],
}

export type Config = typeof config
