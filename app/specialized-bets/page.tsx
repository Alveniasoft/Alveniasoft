import { SiteHeader } from "@/components/site-header"
import { SpecializedBetsPage } from "@/components/specialized-bets-page"

export default function SpecializedBetsRoute() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <SpecializedBetsPage />
        </div>
      </main>
    </div>
  )
}
