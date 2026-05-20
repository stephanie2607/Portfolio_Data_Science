"use client"
import { useEffect, useRef } from "react"
import type { Project } from "@/lib/github"
import { config } from "@/lib/config"
import { useLang } from "@/lib/providers"
import ProjectCard from "./ProjectCard"

const featuredProjects: Project[] = [
  {
    id: 1001,
    name: "Nexus DataPrep Studio",
    description:
      "A complete Streamlit studio for automating EDA and cleaning raw datasets for Machine Learning.",
    repoUrl: "https://github.com/stephanie2607/EDA_Tools",
    demoUrl: null,
    imageUrl: "/projet/outils_d'EDA/char.png",
    analysisImageUrl: "/projet/outils_d'EDA/histo.png",
    topics: ["Streamlit", "Pandas", "Plotly", "Data Engineering"],
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    privateRepo: true,
  },
  {
    id: 1002,
    name: "Sarcasm Detection (NLP)",
    description:
      "Developed a Naive Bayes classifier to detect irony in news headlines, including a full NLP preprocessing pipeline.",
    repoUrl: "https://github.com/stephanie2607/Naive_bayes",
    demoUrl: null,
    imageUrl: "/projet/nayve_bayes/classe.png",
    analysisImageUrl: "/projet/nayve_bayes/matrice.png",
    topics: ["NLP", "Naive Bayes", "Python", "Scikit-Learn"],
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    privateRepo: true,
  },
  {
    id: 1003,
    name: "Classification of Roman Numerals",
    description:
      "Designed and optimized an MLP image recognition model with Adam vs SGD comparison and data augmentation analysis.",
    repoUrl: "https://github.com/stephanie2607/Classification-de-Chiffres-Romains/",
    demoUrl: null,
    imageUrl: "/projet/mnist/courbes_apprentissage.png",
    analysisImageUrl: "/projet/mnist/matrices_confusion.png",
    topics: ["Deep Learning", "Computer Vision", "MLP", "Optimization"],
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    privateRepo: true,
  },
  {
    id: 1004,
    name: "ML Dashboard: Diagnosis & Performance",
    description:
      "Interactive app combining linear regression for academic performance and medical classification screening with a CustomTkinter interface.",
    repoUrl: "https://github.com/stephanie2607/Classification_VS_Regression",
    demoUrl: null,
    imageUrl: "/projet/Detection_de_diabete/dashboard.png",
    analysisImageUrl: "/projet/Detection_de_diabete/metrics.png",
    topics: ["Machine Learning", "Tkinter", "Matplotlib", "Data Analysis"],
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    privateRepo: true,
  },
  {
    id: 1006,
    name: "Sentiment Analysis Studio (NLP)",
    description:
      "A text classification tool using Naive Bayes to detect positive and negative sentiment with custom vectorization and probabilistic reasoning.",
    repoUrl: "https://github.com/stephanie2607/Sentiment-Analysis-Studio-NLP-",
    demoUrl: null,
    imageUrl: "/projet/detection_d'emotion_negative/1.png",
    analysisImageUrl: "/projet/detection_d'emotion_negative/step4_confusion_matrix.png",
    topics: ["NLP", "Sentiment Analysis", "Naive Bayes", "Python"],
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    privateRepo: true,
  },
  {
    id: 1007,
    name: "Student Performance Analytics",
    description:
      "Comprehensive EDA on student demographics and grades, using Euclidean distance and correlations to identify success factors.",
    repoUrl: "https://github.com/stephanie2607/Exploratory_data_analysis/",
    demoUrl: null,
    imageUrl: "/projet/student_analysis/histo.png",
    analysisImageUrl: "/projet/student_analysis/relation.png",
    topics: ["EDA", "Statistics", "Student Success", "Data Analysis"],
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    privateRepo: true,
  },
]

export default function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null)
  const { t } = useLang()

  const displayedProjects = [...featuredProjects, ...projects].reduce<Project[]>((acc, project) => {
    if (!acc.some((item) => item.repoUrl === project.repoUrl)) {
      acc.push(project)
    }
    return acc
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible") },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-primary text-xs tracking-widest uppercase">{t.projects.sectionLabel}</span>
          <h2 className="font-display text-3xl font-bold text-base-content">{t.projects.sectionTitle}</h2>
          <div className="flex-1 hr-data" />
        </div>

        <p className="font-body text-base-content/60 text-sm mb-4">
          {t.projects.loadedFrom}{" "}
          <a href={`https://github.com/${config.github}`} target="_blank" rel="noopener noreferrer"
            className="text-secondary hover:underline">
            github.com/{config.github}
          </a>
          {" "}{t.projects.taggedWith} <span className="text-primary">{t.projects.tagKeyword}</span> {t.projects.inDescription}
        </p>
        <p className="font-body text-base-content/50 text-sm mb-10 max-w-2xl">
          {t.projects.privateNote}
        </p>

        {displayedProjects.length === 0 ? (
          <EmptyState username={config.github} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((p) => (
              <ProjectCard key={p.repoUrl} project={p} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a href={`https://github.com/${config.github}?tab=repositories`} target="_blank" rel="noopener noreferrer"
            className="btn btn-outline border-primary/30 text-base-content/50 hover:border-primary hover:text-primary font-mono text-xs tracking-wider">
            {t.projects.viewAll}
          </a>
        </div>
      </div>
    </section>
  )
}

function EmptyState({ username }: { username: string }) {
  const { t } = useLang()
  const isPlaceholder = username === "YOUR_GITHUB_USERNAME" || !username
  return (
    <div className="rounded-xl border border-dashed border-base-300 p-12 text-center">
      <div className="font-mono text-primary text-3xl mb-4">[ ]</div>
      <p className="font-mono text-base-content/40 text-sm">
        {isPlaceholder ? t.projects.emptyConfig : t.projects.emptyNone(username)}
      </p>
      <p className="font-mono text-base-content/25 text-xs mt-2">{t.projects.emptyHint}</p>
    </div>
  )
}
