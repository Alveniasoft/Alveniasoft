"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AnalysisDialog } from "@/components/analysis-dialog"

export function UpcomingMatches() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const nextDay = () => {
    const next = new Date(currentDate)
    next.setDate(next.getDate() + 1)
    setCurrentDate(next)
  }

  const prevDay = () => {
    const prev = new Date(currentDate)
    prev.setDate(prev.getDate() - 1)
    setCurrentDate(prev)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Matches</CardTitle>
            <CardDescription>Matches scheduled for the next few days</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevDay}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous day</span>
            </Button>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md border">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{formatDate(currentDate)}</span>
            </div>
            <Button variant="outline" size="icon" onClick={nextDay}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next day</span>
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="premier-league">Premier League</TabsTrigger>
            <TabsTrigger value="la-liga">La Liga</TabsTrigger>
            <TabsTrigger value="bundesliga">Bundesliga</TabsTrigger>
            <TabsTrigger value="serie-a">Serie A</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            <div className="rounded-md border">
              <div className="bg-muted/50 px-4 py-2 font-medium">Premier League</div>
              <div className="divide-y">
                <MatchRow
                  time="20:00"
                  homeTeam="Arsenal"
                  awayTeam="Manchester United"
                  homeOdds="2.10"
                  drawOdds="3.40"
                  awayOdds="3.50"
                  valueBet="Draw"
                />
                <MatchRow
                  time="15:00"
                  homeTeam="Liverpool"
                  awayTeam="Chelsea"
                  homeOdds="1.95"
                  drawOdds="3.60"
                  awayOdds="3.80"
                />
                <MatchRow
                  time="17:30"
                  homeTeam="Manchester City"
                  awayTeam="Tottenham"
                  homeOdds="1.65"
                  drawOdds="3.90"
                  awayOdds="5.00"
                  valueBet="Away"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <div className="bg-muted/50 px-4 py-2 font-medium">La Liga</div>
              <div className="divide-y">
                <MatchRow
                  time="21:00"
                  homeTeam="Barcelona"
                  awayTeam="Real Madrid"
                  homeOdds="2.25"
                  drawOdds="3.50"
                  awayOdds="2.90"
                  valueBet="Home"
                />
                <MatchRow
                  time="19:00"
                  homeTeam="Atletico Madrid"
                  awayTeam="Sevilla"
                  homeOdds="1.85"
                  drawOdds="3.40"
                  awayOdds="4.50"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <div className="bg-muted/50 px-4 py-2 font-medium">Bundesliga</div>
              <div className="divide-y">
                <MatchRow
                  time="18:30"
                  homeTeam="Bayern Munich"
                  awayTeam="Borussia Dortmund"
                  homeOdds="1.75"
                  drawOdds="3.80"
                  awayOdds="4.50"
                />
                <MatchRow
                  time="15:30"
                  homeTeam="RB Leipzig"
                  awayTeam="Bayer Leverkusen"
                  homeOdds="2.20"
                  drawOdds="3.40"
                  awayOdds="3.20"
                  valueBet="Away"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="premier-league" className="mt-4 space-y-4">
            <div className="rounded-md border">
              <div className="bg-muted/50 px-4 py-2 font-medium">Premier League</div>
              <div className="divide-y">
                <MatchRow
                  time="20:00"
                  homeTeam="Arsenal"
                  awayTeam="Manchester United"
                  homeOdds="2.10"
                  drawOdds="3.40"
                  awayOdds="3.50"
                  valueBet="Draw"
                />
                <MatchRow
                  time="15:00"
                  homeTeam="Liverpool"
                  awayTeam="Chelsea"
                  homeOdds="1.95"
                  drawOdds="3.60"
                  awayOdds="3.80"
                />
                <MatchRow
                  time="17:30"
                  homeTeam="Manchester City"
                  awayTeam="Tottenham"
                  homeOdds="1.65"
                  drawOdds="3.90"
                  awayOdds="5.00"
                  valueBet="Away"
                />
                <MatchRow
                  time="15:00"
                  homeTeam="Newcastle"
                  awayTeam="Aston Villa"
                  homeOdds="2.05"
                  drawOdds="3.50"
                  awayOdds="3.60"
                />
                <MatchRow
                  time="15:00"
                  homeTeam="Brighton"
                  awayTeam="West Ham"
                  homeOdds="1.90"
                  drawOdds="3.60"
                  awayOdds="4.00"
                />
              </div>
            </div>
          </TabsContent>

          {/* Other league tabs would have similar content */}
          <TabsContent value="la-liga" className="mt-4">
            {/* La Liga matches */}
          </TabsContent>
          <TabsContent value="bundesliga" className="mt-4">
            {/* Bundesliga matches */}
          </TabsContent>
          <TabsContent value="serie-a" className="mt-4">
            {/* Serie A matches */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface MatchRowProps {
  time: string
  homeTeam: string
  awayTeam: string
  homeOdds: string
  drawOdds: string
  awayOdds: string
  valueBet?: "Home" | "Draw" | "Away"
}

function MatchRow({ time, homeTeam, awayTeam, homeOdds, drawOdds, awayOdds, valueBet }: MatchRowProps) {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisType, setAnalysisType] = useState<"player" | "team">("team")
  const [analysisId, setAnalysisId] = useState<string>("")

  const openTeamAnalysis = (team: string) => {
    setAnalysisType("team")
    setAnalysisId(team === homeTeam ? "t1" : "t2")
    setShowAnalysis(true)
  }

  return (
    <>
      <div className="px-4 py-3 flex items-center">
        <div className="w-16 text-sm text-muted-foreground">{time}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div
              className="font-medium cursor-pointer hover:text-amber-600 transition-colors"
              onClick={() => openTeamAnalysis(homeTeam)}
            >
              {homeTeam}
            </div>
            <div className="text-sm text-muted-foreground">vs</div>
            <div
              className="font-medium text-right cursor-pointer hover:text-amber-600 transition-colors"
              onClick={() => openTeamAnalysis(awayTeam)}
            >
              {awayTeam}
            </div>
          </div>
        </div>
        <div className="ml-6 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`w-16 h-8 ${valueBet === "Home" ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800" : ""}`}
          >
            {homeOdds}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`w-16 h-8 ${valueBet === "Draw" ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800" : ""}`}
          >
            {drawOdds}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`w-16 h-8 ${valueBet === "Away" ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800" : ""}`}
          >
            {awayOdds}
          </Button>
          {valueBet && (
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
              Value
            </Badge>
          )}
        </div>
      </div>
      <AnalysisDialog
        type={analysisType}
        id={analysisId}
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
      />
    </>
  )
}
