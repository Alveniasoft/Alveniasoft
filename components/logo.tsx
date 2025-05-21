import { Trophy } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Trophy className="h-6 w-6 text-amber-600" />
      <span className="font-bold text-lg">OSC BETS</span>
    </div>
  )
}
