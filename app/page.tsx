import { BettingInsights } from "@/components/betting-insights"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <BettingInsights />
        </div>
      </main>
    </div>
  )
}
