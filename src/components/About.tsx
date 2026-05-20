"use client"
import { useEffect, useRef } from "react"
import { config } from "@/lib/config"
import { useLang } from "@/lib/providers"

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useLang()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible") },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-primary text-xs tracking-widest uppercase">{t.about.sectionLabel}</span>
          <h2 className="font-display text-3xl font-bold text-base-content">{t.about.sectionTitle}</h2>
          <div className="flex-1 hr-data" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="font-body text-base-content/60 text-lg leading-relaxed">{config.bio}</p>

            <div className="rounded-3xl border border-base-300 bg-base-200/60 p-5 space-y-4 shadow-sm">
              <p className="font-mono text-primary text-xs tracking-widest uppercase mb-2">
                {t.about.whatIBring}
              </p>
              {t.about.bullets.map((text, i) => {
                const icons = ["🔬", "⚙️", "📊", "🛠️"]
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg">{icons[i]}</span>
                    <span className="font-body text-base-content text-sm leading-relaxed">{text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 translate-x-4 -translate-y-4 rounded-[2.25rem] border border-secondary/20 bg-secondary/5" />
            <div className="relative rounded-[2.25rem] overflow-hidden border-2 border-primary/30 bg-base-200 shadow-[0_20px_80px_-40px_rgba(99,102,241,0.65)]">
              {config.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={config.avatar} alt={config.name}
                  className="w-full h-[420px] object-cover" />
              ) : (
                <div className="w-full h-[420px] flex items-center justify-center bg-base-300">
                  <span className="font-display text-5xl font-extrabold gradient-text">
                    {config.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
