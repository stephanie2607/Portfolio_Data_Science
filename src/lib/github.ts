export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  owner: {
    login: string
    avatar_url: string
  }
}

export interface Project {
  id: number
  name: string
  description: string
  repoUrl: string
  demoUrl: string | null
  imageUrl: string | null
  analysisImageUrl?: string | null
  topics: string[]
  language: string | null
  stars: number
  forks: number
  updatedAt: string
  privateRepo?: boolean
}

const DATASCIENCE_KEYWORD = "DATASCIENCE"

// Extracts a streamlit / demo URL from a description string.
// Supports patterns: [demo](url), demo: url, live: url, app: url, or any https URL.
function extractDemoUrl(description: string | null): string | null {
  if (!description) return null
  // Markdown link pattern
  const mdMatch = description.match(/\[(?:demo|live|app|streamlit)[^\]]*\]\((https?:\/\/[^\s)]+)\)/i)
  if (mdMatch) return mdMatch[1]
  // Labelled plain URL
  const labelMatch = description.match(/(?:demo|live|app|streamlit)\s*[:=]\s*(https?:\/\/\S+)/i)
  if (labelMatch) return labelMatch[1]
  // Homepage field is already handled separately
  return null
}

function cleanDescription(description: string | null): string {
  if (!description) return ""
  // Remove the DATASCIENCE keyword
  let clean = description.replace(/DATASCIENCE/gi, "").trim()
  // Remove markdown demo links
  clean = clean.replace(/\[(?:demo|live|app|streamlit)[^\]]*\]\(https?:\/\/[^\s)]+\)/gi, "").trim()
  // Remove labelled URLs
  clean = clean.replace(/(?:demo|live|app|streamlit)\s*[:=]\s*https?:\/\/\S+/gi, "").trim()
  // Clean up double spaces / leading commas / dashes
  clean = clean.replace(/\s{2,}/g, " ").replace(/^[,\-–|•\s]+/, "").trim()
  return clean
}

export async function fetchDataScienceProjects(username: string): Promise<Project[]> {
  if (!username || username === "YOUR_GITHUB_USERNAME") return []

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  const token =
    process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN
  if (token) headers["Authorization"] = `Bearer ${token}`

  try {
    let page = 1
    let all: GitHubRepo[] = []
    while (true) {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`,
        { next: { revalidate: 3600 } }
      )
      if (!res.ok) break
      const batch: GitHubRepo[] = await res.json()
      if (batch.length === 0) break
      all = [...all, ...batch]
      if (batch.length < 100) break
      page++
    }


    const filtered = all.filter((repo) =>
      repo.description?.toUpperCase().includes(DATASCIENCE_KEYWORD)
    )

    return filtered.map((repo) => {
      const demoFromDesc = extractDemoUrl(repo.description)
      const demoUrl = demoFromDesc || repo.homepage || null
      const imageUrl = `https://opengraph.githubassets.com/1/${repo.full_name}`

      return {
        id: repo.id,
        name: repo.name,
        description: cleanDescription(repo.description),
        repoUrl: repo.html_url,
        demoUrl,
        imageUrl,
        analysisImageUrl: null,
        topics: repo.topics || [],
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        privateRepo: false,
      }
    })
  } catch {
    return []
  }
}
