"use client"

import { useState } from "react"
import { ArrowUpDown, Star, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for the accuracy rankings
const mockRankingsData = [
  {
    id: "1",
    name: "BetExpert",
    website: "betexpert.com",
    overallAccuracy: 72.8,
    homeWinAccuracy: 76.2,
    drawAccuracy: 42.5,
    awayWinAccuracy: 68.3,
    valueROI: 15.7,
    verified: true,
    specialties: ["Premier League", "La Liga", "Champions League"],
    notes: "Strongest for top-tier European leagues",
  },
  {
    id: "2",
    name: "OddsPortal",
    website: "oddsportal.com",
    overallAccuracy: 70.5,
    homeWinAccuracy: 73.1,
    drawAccuracy: 38.9,
    awayWinAccuracy: 65.2,
    valueROI: 18.2,
    verified: true,
    specialties: ["Value Bets", "Odds Movement", "Asian Handicap"],
    notes: "Best for finding value bets with positive expected value",
  },
  {
    id: "3",
    name: "FootyStats",
    website: "footystats.org",
    overallAccuracy: 69.7,
    homeWinAccuracy: 71.5,
    drawAccuracy: 36.8,
    awayWinAccuracy: 71.2,
    valueROI: 12.3,
    verified: true,
    specialties: ["Underdog Picks", "Statistical Analysis", "Bundesliga"],
    notes: "Excellent for identifying undervalued underdogs",
  },
  {
    id: "4",
    name: "WhoScored",
    website: "whoscored.com",
    overallAccuracy: 68.9,
    homeWinAccuracy: 72.8,
    drawAccuracy: 35.2,
    awayWinAccuracy: 64.7,
    valueROI: 10.8,
    verified: true,
    specialties: ["Player Performance", "Serie A", "Ligue 1"],
    notes: "Uses detailed player statistics for predictions",
  },
  {
    id: "5",
    name: "BetRadar",
    website: "betradar.com",
    overallAccuracy: 68.2,
    homeWinAccuracy: 70.3,
    drawAccuracy: 39.5,
    awayWinAccuracy: 63.8,
    valueROI: 11.5,
    verified: true,
    specialties: ["Live Betting", "In-Play Statistics", "Momentum Analysis"],
    notes: "Recently improved algorithms for in-play predictions",
  },
  {
    id: "6",
    name: "SoccerStats",
    website: "soccerstats.com",
    overallAccuracy: 67.5,
    homeWinAccuracy: 69.8,
    drawAccuracy: 41.2,
    awayWinAccuracy: 62.5,
    valueROI: 9.7,
    verified: true,
    specialties: ["Historical Data", "Head-to-Head Analysis", "Over/Under"],
    notes: "Extensive historical database for pattern recognition",
  },
  {
    id: "7",
    name: "BetMaster",
    website: "betmaster.com",
    overallAccuracy: 66.8,
    homeWinAccuracy: 68.5,
    drawAccuracy: 37.6,
    awayWinAccuracy: 64.1,
    valueROI: 8.9,
    verified: false,
    specialties: ["Accumulator Bets", "Goal Markets", "Asian Leagues"],
    notes: "Good for Asian leagues and goal-based markets",
  },
  {
    id: "8",
    name: "PredictZ",
    website: "predictz.com",
    overallAccuracy: 65.9,
    homeWinAccuracy: 67.2,
    drawAccuracy: 36.3,
    awayWinAccuracy: 61.8,
    valueROI: 7.5,
    verified: false,
    specialties: ["Free Predictions", "Both Teams to Score", "Corner Markets"],
    notes: "Provides free predictions with decent accuracy",
  },
]

interface AccuracyRankingsProps {
  timeRange: string
}

export function AccuracyRankings({ timeRange }: AccuracyRankingsProps) {
  const [sortColumn, setSortColumn] = useState<string>("overallAccuracy")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [favorites, setFavorites] = useState<string[]>([])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // Sort the data based on the selected column and direction
  const sortedData = [...mockRankingsData].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return (
    <Card className="cozy-shadow">
      <CardHeader>
        <CardTitle>Betting Site Accuracy Rankings</CardTitle>
        <CardDescription>
          Historical performance data from{" "}
          {timeRange === "1m"
            ? "the last month"
            : timeRange === "3m"
              ? "the last 3 months"
              : timeRange === "6m"
                ? "the last 6 months"
                : timeRange === "1y"
                  ? "the last year"
                  : "all time"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]"></TableHead>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead className="min-w-[180px]">
                  <Button variant="ghost" onClick={() => handleSort("name")} className="p-0 h-8">
                    Site Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("overallAccuracy")} className="p-0 h-8">
                    Overall Accuracy
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("homeWinAccuracy")} className="p-0 h-8">
                    Home Win
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("drawAccuracy")} className="p-0 h-8">
                    Draw
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("awayWinAccuracy")} className="p-0 h-8">
                    Away Win
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("valueROI")} className="p-0 h-8">
                    Value ROI
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Specialties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((site, index) => (
                <TableRow key={site.id} className={favorites.includes(site.id) ? "bg-muted/50" : ""}>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(site.id)}>
                      <Star
                        className={`h-4 w-4 ${favorites.includes(site.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                      <span className="sr-only">Favorite</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {index === 0 ? (
                        <Trophy className="h-5 w-5 text-amber-500" />
                      ) : (
                        <span className="font-medium">{index + 1}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{site.name}</span>
                      {site.verified && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                                Verified
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Accuracy verified through independent auditing</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{site.website}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{site.overallAccuracy}%</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{site.homeWinAccuracy}%</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{site.drawAccuracy}%</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{site.awayWinAccuracy}%</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-amber-600">+{site.valueROI}%</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {site.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{site.notes}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Methodology:</strong> Accuracy percentages are calculated based on the site's predictions compared
            to actual match outcomes. Value ROI represents the average return on investment when following the site's
            recommended value bets with equal stakes. Data is compiled from historical records and independently
            verified where possible.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
