import { SiteHeader } from "@/components/site-header"
import { OptimizedBettingTickets } from "@/components/optimized-betting-tickets"

export const metadata = {
  title: "Optimized Betting Tickets | OSC BETS",
  description: "Data-driven betting combinations with positive expected value, including Southern African leagues",
}

export default function OptimizedTicketsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <OptimizedBettingTickets />
        </div>
      </main>
    </div>
  )
}
