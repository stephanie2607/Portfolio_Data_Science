"use client"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "datatheme" | "datatheme-light"
type Lang = "en" | "fr"

interface AppContextType {
  theme: Theme
  lang: Lang
  toggleTheme: () => void
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "nav.resume": "Resume",
    // Hero
    "hero.available": "// Available for opportunities",
    "hero.viewProjects": "View Projects →",
    "hero.contactMe": "Contact Me",
    "hero.resume": "↓ Resume",
    "hero.intro": "Driving measurable progress with data, clarity and momentum.",
    // About
    "about.section": "About Me",
    "about.openToWork": "✓ Open to work",
    "about.brings": "// What I bring to the table",
    "about.bring1": "Deep statistical reasoning & experimental design",
    "about.bring2": "End-to-end ML pipelines from ingestion to deployment",
    "about.bring3": "Communicating insights clearly to non-technical stakeholders",
    "about.bring4": "Engineering-grade code quality with reproducibility in mind",
    // Projects
    "projects.section": "Projects",
    "projects.loadedFrom": "// Loaded live from",
    "projects.tagged": '— repos tagged',
    "projects.taggedSuffix": "in description",
    "projects.viewAll": "View all repositories on GitHub →",
    "projects.empty.config": 'Set NEXT_PUBLIC_GITHUB_USERNAME in your environment or update src/lib/config.ts',
    "projects.empty.none": 'No repos with "DATASCIENCE" in description found for',
    "projects.empty.hint": 'Add "DATASCIENCE" anywhere in a repo description to feature it here.',
    "projects.github": "GitHub",
    "projects.demo": "Live Demo",
    // Skills
    "skills.section": "Skills",
    "skills.glance": "// Tech stack at a glance",
    // Contact
    "contact.section": "Contact",
    "contact.heading1": "Let's build",
    "contact.heading2": "something with data.",
    "contact.body": "Whether you have a project in mind, a data challenge to solve, or just want to chat about machine learning and pipelines — my inbox is open.",
    "contact.offer1": "Open to full-time, contract, freelance roles",
    "contact.offer2": "Happy to collaborate on open-source projects",
    "contact.offer3": "Available for talks and mentorship",
    "contact.sendMessage": "// Send a message",
    "contact.sendEmail": "✉ Send Email",
    "contact.orFindMe": "or find me on",
    "contact.copied": "Copied!",
    // Footer
    "footer.builtWith": "Built with Next.js · Tailwind · DaisyUI",
    "footer.rights": "All rights reserved.",
  },
  fr: {
    // Navbar
    "nav.about": "À propos",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.contact": "Contact",
    "nav.resume": "CV",
    // Hero
    "hero.available": "// Disponible pour de nouvelles opportunités",
    "hero.viewProjects": "Voir les projets →",
    "hero.contactMe": "Me contacter",
    "hero.resume": "↓ Télécharger le CV",
    "hero.intro": "J'accélère votre progrès avec des données claires et des résultats visibles.",
    // About
    "about.section": "À propos de moi",
    "about.openToWork": "✓ Ouvert aux opportunités",
    "about.brings": "// Ce que j'apporte",
    "about.bring1": "Raisonnement statistique approfondi & conception expérimentale",
    "about.bring2": "Pipelines ML de bout en bout, de l'ingestion au déploiement",
    "about.bring3": "Communication claire des insights aux parties non techniques",
    "about.bring4": "Code de qualité ingénierie avec reproductibilité en tête",
    // Projects
    "projects.section": "Projets",
    "projects.loadedFrom": "// Chargé en direct depuis",
    "projects.tagged": "— dépôts marqués",
    "projects.taggedSuffix": "dans la description",
    "projects.viewAll": "Voir tous les dépôts sur GitHub →",
    "projects.empty.config": "Définissez NEXT_PUBLIC_GITHUB_USERNAME dans votre environnement ou modifiez src/lib/config.ts",
    "projects.empty.none": 'Aucun dépôt avec "DATASCIENCE" dans la description trouvé pour',
    "projects.empty.hint": 'Ajoutez "DATASCIENCE" dans la description d\'un dépôt pour l\'afficher ici.',
    "projects.github": "GitHub",
    "projects.demo": "Démo live",
    // Skills
    "skills.section": "Compétences",
    "skills.glance": "// Stack technique en un coup d'œil",
    // Contact
    "contact.section": "Contact",
    "contact.heading1": "Construisons",
    "contact.heading2": "quelque chose avec les données.",
    "contact.body": "Que vous ayez un projet en tête, un défi data à résoudre, ou que vous souhaitiez simplement discuter de machine learning et de pipelines — ma boîte mail est ouverte.",
    "contact.offer1": "Ouvert aux postes CDI, freelance et contrats",
    "contact.offer2": "Disponible pour collaborer sur des projets open-source",
    "contact.offer3": "Disponible pour des conférences et du mentorat",
    "contact.sendMessage": "// Envoyer un message",
    "contact.sendEmail": "✉ Envoyer un email",
    "contact.orFindMe": "ou retrouvez-moi sur",
    "contact.copied": "Copié !",
    // Footer
    "footer.builtWith": "Construit avec Next.js · Tailwind · DaisyUI",
    "footer.rights": "Tous droits réservés.",
  },
}

const AppContext = createContext<AppContextType>({
  theme: "datatheme",
  lang: "en",
  toggleTheme: () => {},
  toggleLang: () => {},
  t: (k) => k,
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("datatheme")
  const [lang, setLang] = useState<Lang>("en")

  // Persist preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme | null
    const savedLang = localStorage.getItem("portfolio-lang") as Lang | null
    if (savedTheme) setTheme(savedTheme)
    if (savedLang) setLang(savedLang)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("portfolio-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("portfolio-lang", lang)
  }, [lang])

  const toggleTheme = () =>
    setTheme((t) => (t === "datatheme" ? "datatheme-light" : "datatheme"))

  const toggleLang = () => setLang((l) => (l === "en" ? "fr" : "en"))

  const t = (key: string) => translations[lang][key] ?? key

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
