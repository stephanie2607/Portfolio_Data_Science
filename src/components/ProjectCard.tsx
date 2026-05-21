"use client"
import { useState } from "react"
import type { Project } from "@/lib/github"
import { useLang } from "@/lib/providers"

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5", TypeScript: "#2b7489",
  SQL: "#e38c00", Jupyter: "#DA5B0B", Scala: "#c22d40", default: "#8a8a9a",
}

export default function ProjectCard({ project }: { project: Project }) {
  const [imgErr, setImgErr] = useState(false)
  const { t } = useLang()
  const langColor = LANG_COLORS[project.language ?? ""] ?? LANG_COLORS.default

  const relativeTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const days = Math.floor(diff / 86400000)
    if (days < 1) return "today"
    if (days < 7) return `${days}d ago`
    if (days < 30) return `${Math.floor(days / 7)}w ago`
    if (days < 365) return `${Math.floor(days / 30)}mo ago`
    return `${Math.floor(days / 365)}y ago`
  }

  return (
    <div className="group relative rounded-xl border border-base-300 bg-base-200/80 backdrop-blur overflow-hidden
      transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 glow-box flex flex-col">

      <div className="relative">
        <div className="absolute top-3 left-3 z-10 rounded-full bg-base-100/90 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-base-content/70 shadow-sm">
          Dépôt Privé
        </div>
        <div className="h-40 grid grid-cols-2 gap-2 overflow-hidden rounded-t-xl">
          <div className="relative overflow-hidden bg-base-300">
            {project.imageUrl && !imgErr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.imageUrl} alt={`${project.name} interface`}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-300"
                onError={() => setImgErr(true)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
                <span className="font-display text-4xl font-extrabold text-base-content/10 select-none">
                  {project.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-base-content/70">
              Interface
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
            {((project.analysisImageUrl || project.imageUrl) && !imgErr) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.analysisImageUrl || project.imageUrl || ""} alt={`${project.name} analyse`}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-300"
                onError={() => setImgErr(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary/80">Analyse</div>
                <div className="text-[11px] leading-snug text-base-content/65">
                  Visualisation et aperçu code
                </div>
              </div>
            )}
            <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-base-content/70">
              Analyse
            </div>
          </div>
        </div>
        {project.language && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-base-100/80 rounded-full px-2.5 py-1">
            <span className="w-2 h-2 rounded-full" style={{ background: langColor }} />
            <span className="font-mono text-[10px] text-base-content/50">{project.language}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-display font-bold text-base-content text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
            {project.name.replace(/-/g, " ").replace(/_/g, " ")}
          </h3>
          <p className="font-body text-base-content/75 text-base leading-relaxed line-clamp-4">
            {project.description || t.projects.privateNote}
          </p>
        </div>

        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.topics.slice(0, 4).map((topic) => (
              <span key={topic} className="badge badge-xs bg-base-300 text-secondary border-0 font-mono">
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-base-content/40 font-mono text-xs mt-auto pt-1">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 9.306l8.332-1.151z"/>
            </svg>
            {project.stars}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M6 3v12"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/>
              <path d="M18 9v2a6 6 0 0 1-6 6H9"/>
            </svg>
            {project.forks}
          </span>
          <span className="ml-auto text-base-content/25">{relativeTime(project.updatedAt)}</span>
        </div>

        <div className="flex gap-2 pt-1">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="btn btn-xs flex-1 btn-outline border-primary/40 text-primary hover:bg-primary hover:border-primary hover:text-primary-content font-mono tracking-wider gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            {t.projects.github}
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-xs flex-1 btn-outline border-secondary/40 text-secondary hover:bg-secondary hover:border-secondary hover:text-secondary-content font-mono tracking-wider gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              {t.projects.liveDemo}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
