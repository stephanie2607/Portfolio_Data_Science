import type { Metadata } from "next"
import "./globals.css"
import { config } from "@/lib/config"
import { Providers } from "@/lib/providers"
import { ScreenBlocker } from "@/components/ScreenBlocker"

export const metadata: Metadata = {
  title: `${config.name} — ${config.title}`,
  description: config.bio.slice(0, 155),
  openGraph: {
    title: `${config.name} — ${config.title}`,
    description: config.tagline,
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="datatheme">
      <body className="noise">
        <ScreenBlocker />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
