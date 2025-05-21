import Link from "next/link"
import { BarChart3, Home, LineChart, ListFilter, Target, Trophy, Users } from "lucide-react"
import { Logo } from "@/components/logo"

export function MobileNav() {
  return (
    <div className="flex flex-col h-full py-4">
      <div className="flex items-center gap-2 px-4 mb-6">
        <Logo />
      </div>
      <div className="flex flex-col gap-1 px-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
        >
          <Home className="h-5 w-5" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <Link
          href="/accuracy"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
        >
          <Trophy className="h-5 w-5" />
          <span className="text-sm font-medium">Accuracy Rankings</span>
        </Link>
        <Link
          href="/specialized-bets"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent"
        >
          <Target className="h-5 w-5" />
          <span className="text-sm font-medium">Specialized Bets</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
        >
          <LineChart className="h-5 w-5" />
          <span className="text-sm font-medium">Predictions</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
        >
          <Users className="h-5 w-5" />
          <span className="text-sm font-medium">Leagues</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
        >
          <BarChart3 className="h-5 w-5" />
          <span className="text-sm font-medium">Bookmakers</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
        >
          <ListFilter className="h-5 w-5" />
          <span className="text-sm font-medium">Filters</span>
        </Link>
      </div>
    </div>
  )
}
