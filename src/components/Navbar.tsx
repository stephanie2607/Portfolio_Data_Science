"use client"
import { useState, useEffect } from "react"
import { config } from "@/lib/config"
import { useTheme, useLang } from "@/lib/providers"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t } = useLang()

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-base-100/90 backdrop-blur-md border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-sm font-bold tracking-wide">
          <span className="text-secondary">&gt;</span>{" "}
          <span className="text-base-content">
            {config.name.split(" ")[0].toLowerCase()}
            <span className="text-secondary">_</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-body text-xs tracking-wider text-base-content/50 hover:text-secondary transition-colors uppercase">
                {l.label}
              </a>
            </li>
          ))}
          {/* {config.resumeUrl && (
            <li>
              <a href={config.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-xs btn-outline btn-primary font-mono tracking-wider">
                {t.nav.resume}
              </a>
            </li>
          )} */}
          <li>
            <button onClick={toggleTheme}
              className="btn btn-xs btn-ghost text-base-content/60 hover:text-primary border border-base-content/10 hover:border-primary/40 w-8 h-8 p-0"
              title={theme === "dark" ? "Light mode" : "Dark mode"}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </li>
        </ul>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme}
            className="btn btn-xs btn-ghost text-base-content/60 hover:text-primary border border-base-content/10 w-8 h-8 p-0">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="text-base-content hover:text-primary transition-colors" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-base-100/95 backdrop-blur-md border-b border-primary/20 px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}
                  className="font-mono text-xs tracking-widest text-base-content/50 hover:text-primary transition-colors uppercase">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
