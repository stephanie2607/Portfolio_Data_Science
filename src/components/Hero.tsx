"use client"
import { useEffect, useState } from "react"
import { config } from "@/lib/config"
import { useLang } from "@/lib/providers"

export default function Hero() {
  const { t, lang } = useLang()
  const [displayed, setDisplayed] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  const typewriterLines = [
    lang === "en" ? `> Hello, World.` : `> Bonjour, Monde.`,
    lang === "en" ? `> I am ${config.name}.` : `> Je suis ${config.name}.`,
    `> ${config.title}.`,
    `> ${config.tagline}`,
  ]

  // Reset typewriter on lang change
  useEffect(() => {
    setDisplayed([])
    setCurrentLine(0)
    setCurrentChar(0)
    setDone(false)
  }, [lang])

  useEffect(() => {
    if (currentLine >= typewriterLines.length) { setDone(true); return }
    const line = typewriterLines[currentLine]
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 35)
      return () => clearTimeout(t)
    } else {
      const timer = setTimeout(() => {
        setDisplayed((d) => [...d, line])
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, 400)
      return () => clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine, currentChar, lang])

  const partial = currentLine < typewriterLines.length ? typewriterLines[currentLine].slice(0, currentChar) : ""

  const stats = config.stats.map((s, i) => ({
    ...s,
    label: s.label || t.statsLabels?.[i] || "",
  }))

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-[2rem] border border-base-300 bg-base-200/80 backdrop-blur-xl p-6 shadow-2xl text-sm font-mono leading-relaxed">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-base-300">
            <span className="w-3 h-3 rounded-full bg-secondary" />
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="w-3 h-3 rounded-full bg-accent" />
            <span className="ml-3 text-base-content/40 text-xs tracking-wider">portfolio.data</span>
          </div>

          {displayed.map((line, i) => (
            <div key={i} className={`mb-2 ${
              i === 0 ? "text-base-content/60"
              : i === 1 ? "text-base-content font-semibold text-lg"
              : i === 2 ? "text-secondary"
              : "text-primary"}`}>
              {line}
            </div>
          ))}

          {!done && (
            <div className={`mb-2 ${
              currentLine === 1 ? "text-base-content font-semibold text-lg"
              : currentLine === 2 ? "text-secondary"
              : currentLine === 3 ? "text-primary"
              : "text-base-content/60"}`}>
              {partial}
              <span className="text-secondary animate-[blink_1s_step-end_infinite]">█</span>
            </div>
          )}

          {done && (
            <div className="mt-6 pt-4 border-t border-base-300 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-secondary font-semibold text-xl">{s.value}</div>
                  <div className="text-base-content/40 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6" style={{ opacity: done ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>
          <div>
            <p className="font-mono text-secondary text-xs tracking-widest uppercase mb-3">
              {t.hero.available}
            </p>
            <h1 className="font-display font-extrabold leading-none">
              {config.name.split(" ").map((word, i) => (
                <div key={i} className={`block ${
                  word.length > 12 ? "text-3xl md:text-4xl"
                  : word.length > 8 ? "text-4xl md:text-5xl"
                  : "text-5xl md:text-6xl"
                } ${i % 2 === 0 ? "text-base-content" : "text-secondary"} mb-0.5`}>
                  {word}
                </div>
              ))}
            </h1>
            <p className="font-body text-base-content/70 text-lg mt-3 leading-relaxed max-w-md">
              {("Passionate Data Scientist on a quest to uncover hidden patterns. Explore my world where curiosity meets Machine Learning...")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary font-display text-sm tracking-wide">
              {t.hero.viewProjects}
            </a>
            <a href="#contact" className="btn btn-outline border-primary/30 text-base-content/70 hover:border-secondary hover:text-secondary font-display text-sm tracking-wide">
              {t.hero.contactMe}
            {/* </a>
            {config.resumeUrl && (
              <a href={config.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost text-secondary font-display text-sm tracking-wide hover:bg-secondary/10">
                {t.hero.resume}
              </a> */}
            )}
          </div>

          <div className="flex gap-4 pt-2">
            {config.github && (
              <a href={`https://github.com/${config.github}`} target="_blank" rel="noopener noreferrer"
                className="text-base-content/50 hover:text-base-content transition-colors">
                <GithubIcon />
              </a>
            )}
            {config.linkedin && (
              <a href={config.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-base-content/50 hover:text-secondary transition-colors">
                <LinkedinIcon />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="font-mono text-xs text-base-content/50 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}

function GithubIcon() {
  return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
}
function LinkedinIcon() {
  return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function KaggleIcon() {
  return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.334z"/></svg>
}
