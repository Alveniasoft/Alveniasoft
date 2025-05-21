import { SiteHeader } from "@/components/site-header"
import { BettingSiteAccuracy } from "@/components/betting-site-accuracy"

export default function AccuracyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <BettingSiteAccuracy />
        </div>
      </main>
    </div>
  )
}
