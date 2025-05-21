"use client"

import { useState } from "react"
import { ArrowUpDown, ExternalLink, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for the table
const mockData = [
  {
    id: "1",
    match: "Arsenal vs Manchester United",
    league: "Premier League",
    time: "Today, 20:00",
    bet365: { home: 2.1, draw: 3.4, away: 3.5 },
    williamHill: { home: 2.15, draw: 3.3, away: 3.6 },
    betway: { home: 2.05, draw: 3.45, away: 3.55 },
    unibet: { home: 2.12, draw: 3.35, away: 3.65 },
    bestOdds: { type: "home", value: 2.15, bookmaker: "William Hill" },
  },
  {
    id: "2",
    match: "Barcelona vs Real Madrid",
    league: "La Liga",
    time: "Tomorrow, 21:00",
    bet365: { home: 2.25, draw: 3.5, away: 2.9 },
    williamHill: { home: 2.3, draw: 3.4, away: 2.85 },
    betway: { home: 2.2, draw: 3.55, away: 2.95 },
    unibet: { home: 2.35, draw: 3.45, away: 2.8 },
    bestOdds: { type: "home", value: 2.35, bookmaker: "Unibet" },
  },
  {
    id: "3",
    match: "Bayern Munich vs Borussia Dortmund",
    league: "Bundesliga",
    time: "Saturday, 18:30",
    bet365: { home: 1.75, draw: 3.8, away: 4.5 },
    williamHill: { home: 1.7, draw: 3.9, away: 4.6 },
    betway: { home: 1.8, draw: 3.75, away: 4.4 },
    unibet: { home: 1.72, draw: 3.85, away: 4.55 },
    bestOdds: { type: "away", value: 4.6, bookmaker: "William Hill" },
  },
  {
    id: "4",
    match: "PSG vs Marseille",
    league: "Ligue 1",
    time: "Sunday, 20:45",
    bet365: { home: 1.6, draw: 4.0, away: 5.5 },
    williamHill: { home: 1.65, draw: 3.9, away: 5.4 },
    betway: { home: 1.55, draw: 4.1, away: 5.6 },
    unibet: { home: 1.62, draw: 3.95, away: 5.45 },
    bestOdds: { type: "away", value: 5.6, bookmaker: "Betway" },
  },
  {
    id: "5",
    match: "Juventus vs Inter Milan",
    league: "Serie A",
    time: "Sunday, 19:00",
    bet365: { home: 2.4, draw: 3.2, away: 3.0 },
    williamHill: { home: 2.45, draw: 3.15, away: 2.95 },
    betway: { home: 2.35, draw: 3.25, away: 3.05 },
    unibet: { home: 2.42, draw: 3.18, away: 2.98 },
    bestOdds: { type: "home", value: 2.45, bookmaker: "William Hill" },
  },
]

export function BettingTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [favorites, setFavorites] = useState<string[]>([])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]"></TableHead>
            <TableHead className="min-w-[180px]">
              <Button variant="ghost" onClick={() => handleSort("match")} className="p-0 h-8">
                Match
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]">League</TableHead>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead className="text-center">Bet365</TableHead>
            <TableHead className="text-center">William Hill</TableHead>
            <TableHead className="text-center">Betway</TableHead>
            <TableHead className="text-center">Unibet</TableHead>
            <TableHead className="w-[150px] text-right">Best Odds</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id} className={favorites.includes(row.id) ? "bg-muted/50" : ""}>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(row.id)}>
                  <Star
                    className={`h-4 w-4 ${favorites.includes(row.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                  <span className="sr-only">Favorite</span>
                </Button>
              </TableCell>
              <TableCell className="font-medium">{row.match}</TableCell>
              <TableCell>{row.league}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-1 text-xs">
                  <div className="w-12 text-center py-1 px-2 rounded bg-muted">{row.bet365.home}</div>
                  <div className="w-12 text-center py-1 px-2 rounded bg-muted">{row.bet365.draw}</div>
                  <div className="w-12 text-center py-1 px-2 rounded bg-muted">{row.bet365.away}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-1 text-xs">
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "William Hill" && row.bestOdds.type === "home" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.williamHill.home}
                  </div>
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "William Hill" && row.bestOdds.type === "draw" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.williamHill.draw}
                  </div>
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "William Hill" && row.bestOdds.type === "away" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.williamHill.away}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-1 text-xs">
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "Betway" && row.bestOdds.type === "home" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.betway.home}
                  </div>
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "Betway" && row.bestOdds.type === "draw" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.betway.draw}
                  </div>
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "Betway" && row.bestOdds.type === "away" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.betway.away}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-1 text-xs">
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "Unibet" && row.bestOdds.type === "home" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.unibet.home}
                  </div>
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "Unibet" && row.bestOdds.type === "draw" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.unibet.draw}
                  </div>
                  <div
                    className={`w-12 text-center py-1 px-2 rounded ${row.bestOdds.bookmaker === "Unibet" && row.bestOdds.type === "away" ? "bg-green-100 text-green-800" : "bg-muted"}`}
                  >
                    {row.unibet.away}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    {row.bestOdds.value} ({row.bestOdds.type.charAt(0).toUpperCase() + row.bestOdds.type.slice(1)})
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Visit site</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
