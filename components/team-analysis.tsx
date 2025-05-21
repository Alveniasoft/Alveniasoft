"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Activity,
  AlertCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Flag,
  Info,
  Maximize2,
  Minimize2,
  Shield,
  Target,
  TrendingUpIcon as Trending,
  Trophy,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock team data
const teamData = {
  id: "t1",
  name: "Manchester City",
  country: "England",
  league: "Premier League",
  founded: 1880,
  stadium: "Etihad Stadium",
  manager: "Pep Guardiola",
  logo: "/placeholder.svg?height=100&width=100",
  colors: ["#6CABDD", "#FFFFFF"],
  stats: {
    matches: {
      played: 38,
      won: 28,
      drawn: 5,
      lost: 5,
      goalsFor: 94,
      goalsAgainst: 33,
      cleanSheets: 18,
      points: 89,
    },
    standings: {
      position: 1,
      lastSeason: 1,
      form: ["W", "W", "D", "W", "W"],
    },
    attack: {
      goalsPerMatch: 2.47,
      shotsPerMatch: 16.8,
      shotsOnTargetPerMatch: 6.3,
      shotsOnTargetAccuracy: 37.5,
      bigChancesCreated: 104,
      bigChancesScored: 62,
      xG: 89.7,
      xGPerMatch: 2.36,
    },
    defense: {
      goalsAgainstPerMatch: 0.87,
      shotsAgainstPerMatch: 7.9,
      shotsOnTargetAgainstPerMatch: 2.8,
      tacklesPerMatch: 15.2,
      interceptionPerMatch: 8.7,
      clearancesPerMatch: 14.3,
      xGA: 35.2,
      xGAPerMatch: 0.93,
    },
    possession: {
      averagePossession: 67.3,
      passesPerMatch: 684,
      passAccuracy: 91.2,
      longBallAccuracy: 68.4,
      crossesPerMatch: 19.2,
      crossAccuracy: 28.7,
    },
    discipline: {
      yellowCards: 48,
      redCards: 2,
      foulsCommitted: 342,
      foulsDrawn: 412,
      offsides: 78,
    },
    setpieces: {
      cornersPerMatch: 7.2,
      cornerGoals: 14,
      freeKickGoals: 6,
      penaltiesScored: 8,
      penaltiesMissed: 2,
    },
  },
  form: [
    { opponent: "Arsenal (H)", result: "W", score: "3-1", date: "2023-04-26" },
    { opponent: "Fulham (A)", result: "W", score: "2-1", date: "2023-04-30" },
    { opponent: "West Ham (H)", result: "D", score: "2-2", date: "2023-05-03" },
    { opponent: "Leeds (H)", result: "W", score: "2-1", date: "2023-05-07" },
    { opponent: "Everton (A)", result: "W", score: "3-0", date: "2023-05-13" },
  ],
  players: [
    { id: "p1", name: "Kevin De Bruyne", position: "Midfielder", rating: 8.1, goals: 7, assists: 16 },
    { id: "p2", name: "Erling Haaland", position: "Forward", rating: 8.3, goals: 36, assists: 8 },
    { id: "p3", name: "Rodri", position: "Midfielder", rating: 7.9, goals: 6, assists: 7 },
    { id: "p4", name: "Bernardo Silva", position: "Midfielder", rating: 7.7, goals: 4, assists: 5 },
    { id: "p5", name: "Phil Foden", position: "Forward", rating: 7.8, goals: 11, assists: 5 },
  ],
  formations: [
    { formation: "4-3-3", usage: 65, winRate: 78 },
    { formation: "4-2-3-1", usage: 25, winRate: 72 },
    { formation: "3-5-2", usage: 10, winRate: 65 },
  ],
  seasonComparison: [
    { season: "2018/19", points: 98, position: 1, goalsFor: 95, goalsAgainst: 23 },
    { season: "2019/20", points: 81, position: 2, goalsFor: 102, goalsAgainst: 35 },
    { season: "2020/21", points: 86, position: 1, goalsFor: 83, goalsAgainst: 32 },
    { season: "2021/22", points: 93, position: 1, goalsFor: 99, goalsAgainst: 26 },
    { season: "2022/23", points: 89, position: 1, goalsFor: 94, goalsAgainst: 33 },
  ],
  strengths: ["Possession", "Passing", "Chance Creation", "Pressing", "Set Pieces"],
  weaknesses: ["Counter Attacks", "Aerial Duels", "Defensive Transitions"],
  betting: {
    winOdds: 1.45,
    drawOdds: 4.5,
    loseOdds: 7.0,
    overUnder: { line: 2.5, over: 1.65, under: 2.25 },
    cleanSheet: 2.1,
    bothTeamsToScore: 1.85,
    handicap: { line: -1.5, odds: 2.2 },
  },
  headToHead: {
    team: "Tottenham",
    matches: 168,
    wins: 65,
    draws: 36,
    losses: 67,
    goalsFor: 228,
    goalsAgainst: 232,
    lastFive: [
      { result: "W", score: "4-2", date: "2023-01-19" },
      { result: "L", score: "0-1", date: "2022-09-10" },
      { result: "W", score: "3-2", date: "2022-01-22" },
      { result: "L", score: "0-1", date: "2021-08-15" },
      { result: "W", score: "3-0", date: "2021-02-13" },
    ],
  },
  recentPerformance: {
    trend: "upward",
    lastFivePoints: 13,
    form: "Excellent",
    goalsForLast5: 12,
    goalsAgainstLast5: 5,
    xGLast5: 11.2,
    xGALast5: 5.8,
  },
  vsUpcomingOpponent: {
    team: "Tottenham",
    venue: "Home",
    historicalWinRate: 38.7,
    lastEncounter: {
      date: "2023-01-19",
      result: "Man City 4-2 Tottenham",
      scorers: ["Mahrez (2)", "Alvarez", "Haaland"],
      possession: 58,
    },
  },
}

// Radar chart data for team abilities
const radarData = [
  { subject: "Attack", A: 85, fullMark: 100 },
  { subject: "Defense", A: 80, fullMark: 100 },
  { subject: "Possession", A: 90, fullMark: 100 },
  { subject: "Set Pieces", A: 75, fullMark: 100 },
  { subject: "Discipline", A: 70, fullMark: 100 },
  { subject: "Fitness", A: 85, fullMark: 100 },
]

// Colors for charts
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"]

interface TeamAnalysisProps {
  teamId?: string
  isOpen: boolean
  onClose: () => void
}

export function TeamAnalysis({ teamId = "t1", isOpen, onClose }: TeamAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic", "form", "standings"])

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section))
    } else {
      setExpandedSections([...expandedSections, section])
    }
  }

  const isSectionExpanded = (section: string) => expandedSections.includes(section)

  // For this demo, we're using the mock data directly
  // In a real app, you would fetch the team data based on the teamId
  const team = teamData

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute left-2 top-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <DialogTitle className="text-center flex-1">Team Analysis</DialogTitle>
          </div>
          <DialogDescription className="text-center">
            Comprehensive team performance data and betting insights
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Team basic info card */}
          <Card className="w-full md:w-64 cozy-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={team.logo || "/placeholder.svg"} alt={team.name} />
                <AvatarFallback>
                  {team.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{team.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-amber-50 text-amber-800">
                  {team.league}
                </Badge>
                <Badge variant="outline">{team.country}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                Founded: {team.founded} · Stadium: {team.stadium}
              </div>
              <div className="grid grid-cols-2 gap-2 w-full text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Position</span>
                  <span className="font-medium">{team.stats.standings.position}st</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-medium">{team.stats.matches.points}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Manager</span>
                  <span className="font-medium">{team.manager}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Win Rate</span>
                  <span className="font-medium">
                    {Math.round((team.stats.matches.won / team.stats.matches.played) * 100)}%
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="w-full">
                <div className="text-sm font-medium mb-2">Current Form</div>
                <div className="flex items-center gap-2 mb-2">
                  {team.stats.standings.form.map((result, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                        result === "W"
                          ? "bg-green-500"
                          : result === "D"
                            ? "bg-amber-500"
                            : result === "L"
                              ? "bg-red-500"
                              : ""
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Trending className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{team.recentPerformance.form}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Last 5: {team.recentPerformance.lastFivePoints} pts
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content area */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
                <TabsTrigger value="betting">Betting</TabsTrigger>
                <TabsTrigger value="players">Players & Tactics</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                {/* Key Performance Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Card className="cozy-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Goals For</div>
                        <Target className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold">{team.stats.matches.goalsFor}</div>
                      <div className="text-xs text-muted-foreground">
                        {team.stats.attack.goalsPerMatch} per match · xG: {team.stats.attack.xG}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cozy-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Goals Against</div>
                        <Shield className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold">{team.stats.matches.goalsAgainst}</div>
                      <div className="text-xs text-muted-foreground">
                        {team.stats.defense.goalsAgainstPerMatch} per match · xGA: {team.stats.defense.xGA}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cozy-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Win Rate</div>
                        <Trophy className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold">
                        {Math.round((team.stats.matches.won / team.stats.matches.played) * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {team.stats.matches.won}W {team.stats.matches.drawn}D {team.stats.matches.lost}L
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cozy-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Possession</div>
                        <Activity className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold">{team.stats.possession.averagePossession}%</div>
                      <div className="text-xs text-muted-foreground">
                        {team.stats.possession.passesPerMatch} passes · {team.stats.possession.passAccuracy}% accuracy
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Team Abilities Radar Chart */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Team Abilities</CardTitle>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Team's key attributes on a scale of 1-100</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name="Abilities" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Form */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Recent Form</CardTitle>
                      <Badge
                        variant={team.recentPerformance.trend === "upward" ? "outline" : "secondary"}
                        className={team.recentPerformance.trend === "upward" ? "bg-green-50 text-green-700" : ""}
                      >
                        {team.recentPerformance.trend === "upward" ? "Improving" : "Consistent"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {team.form.map((game, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-24 text-sm">{game.date}</div>
                          <div className="flex-1">
                            <div className="font-medium">{game.opponent}</div>
                            <div className="text-sm text-muted-foreground">{game.score}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                                game.result === "W"
                                  ? "bg-green-500"
                                  : game.result === "D"
                                    ? "bg-amber-500"
                                    : game.result === "L"
                                      ? "bg-red-500"
                                      : ""
                              }`}
                            >
                              {game.result}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Strengths and Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="cozy-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Award className="h-4 w-4 mr-2 text-green-600" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {team.strengths.map((strength, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronUp className="h-4 w-4 text-green-600 mr-2" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="cozy-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                        Weaknesses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {team.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronDown className="h-4 w-4 text-amber-600 mr-2" />
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* VS Upcoming Opponent */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">VS {team.vsUpcomingOpponent.team}</CardTitle>
                    <CardDescription>Head-to-head record and historical performance</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Matches</div>
                        <div className="text-xl font-bold">{team.headToHead.matches}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Wins</div>
                        <div className="text-xl font-bold">{team.headToHead.wins}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Draws</div>
                        <div className="text-xl font-bold">{team.headToHead.draws}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Losses</div>
                        <div className="text-xl font-bold">{team.headToHead.losses}</div>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <div className="font-medium">Last Encounter</div>
                      <div className="text-sm">
                        {team.vsUpcomingOpponent.lastEncounter.date} · {team.vsUpcomingOpponent.lastEncounter.result}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Scorers: {team.vsUpcomingOpponent.lastEncounter.scorers.join(", ")} · Possession:{" "}
                        {team.vsUpcomingOpponent.lastEncounter.possession}%
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Last 5 Head-to-Head Results</div>
                      <div className="flex items-center gap-2">
                        {team.headToHead.lastFive.map((game, index) => (
                          <div
                            key={index}
                            className={`flex-1 p-2 text-center rounded-md ${
                              game.result === "W"
                                ? "bg-green-100 text-green-800"
                                : game.result === "D"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            <div className="font-medium">{game.result}</div>
                            <div className="text-xs">{game.score}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Detailed Stats Tab */}
              <TabsContent value="stats" className="space-y-4">
                {/* Attack Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("attack")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Attack</CardTitle>
                      {isSectionExpanded("attack") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("attack") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Goals</div>
                          <div className="text-xl font-bold">{team.stats.matches.goalsFor}</div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.attack.goalsPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Shots</div>
                          <div className="text-xl font-bold">
                            {Math.round(team.stats.attack.shotsPerMatch * team.stats.matches.played)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.attack.shotsPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Shots on Target</div>
                          <div className="text-xl font-bold">
                            {Math.round(team.stats.attack.shotsOnTargetPerMatch * team.stats.matches.played)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.attack.shotsOnTargetAccuracy}% accuracy
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">xG</div>
                          <div className="text-xl font-bold">{team.stats.attack.xG}</div>
                          <div className="text-xs text-muted-foreground">{team.stats.attack.xGPerMatch} per match</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Big Chances Created</div>
                          <div className="text-xl font-bold">{team.stats.attack.bigChancesCreated}</div>
                          <div className="text-xs text-muted-foreground">
                            {(team.stats.attack.bigChancesCreated / team.stats.matches.played).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Big Chances Scored</div>
                          <div className="text-xl font-bold">{team.stats.attack.bigChancesScored}</div>
                          <div className="text-xs text-muted-foreground">
                            {((team.stats.attack.bigChancesScored / team.stats.attack.bigChancesCreated) * 100).toFixed(
                              1,
                            )}
                            % conversion
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Goals", value: team.stats.matches.goalsFor, fill: "#22c55e" },
                              { name: "xG", value: team.stats.attack.xG, fill: "#3b82f6" },
                              {
                                name: "Shots",
                                value: Math.round(team.stats.attack.shotsPerMatch * team.stats.matches.played) / 10,
                                fill: "#f59e0b",
                              },
                              {
                                name: "On Target",
                                value:
                                  Math.round(team.stats.attack.shotsOnTargetPerMatch * team.stats.matches.played) / 10,
                                fill: "#8b5cf6",
                              },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Value" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Defense Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("defense")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Defense</CardTitle>
                      {isSectionExpanded("defense") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("defense") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Goals Against</div>
                          <div className="text-xl font-bold">{team.stats.matches.goalsAgainst}</div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.defense.goalsAgainstPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Clean Sheets</div>
                          <div className="text-xl font-bold">{team.stats.matches.cleanSheets}</div>
                          <div className="text-xs text-muted-foreground">
                            {((team.stats.matches.cleanSheets / team.stats.matches.played) * 100).toFixed(1)}% of
                            matches
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Shots Against</div>
                          <div className="text-xl font-bold">
                            {Math.round(team.stats.defense.shotsAgainstPerMatch * team.stats.matches.played)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.defense.shotsAgainstPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">xGA</div>
                          <div className="text-xl font-bold">{team.stats.defense.xGA}</div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.defense.xGAPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Tackles</div>
                          <div className="text-xl font-bold">
                            {Math.round(team.stats.defense.tacklesPerMatch * team.stats.matches.played)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.defense.tacklesPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Interceptions</div>
                          <div className="text-xl font-bold">
                            {Math.round(team.stats.defense.interceptionPerMatch * team.stats.matches.played)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.defense.interceptionPerMatch} per match
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Goals Against", value: team.stats.matches.goalsAgainst, fill: "#ef4444" },
                              { name: "xGA", value: team.stats.defense.xGA, fill: "#f59e0b" },
                              { name: "Clean Sheets", value: team.stats.matches.cleanSheets, fill: "#22c55e" },
                              {
                                name: "Tackles",
                                value: Math.round(team.stats.defense.tacklesPerMatch * team.stats.matches.played) / 10,
                                fill: "#3b82f6",
                              },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Value" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Possession Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("possession")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Possession</CardTitle>
                      {isSectionExpanded("possession") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("possession") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Average Possession</div>
                          <div className="text-xl font-bold">{team.stats.possession.averagePossession}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Passes</div>
                          <div className="text-xl font-bold">
                            {Math.round(team.stats.possession.passesPerMatch * team.stats.matches.played)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.possession.passesPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Pass Accuracy</div>
                          <div className="text-xl font-bold">{team.stats.possession.passAccuracy}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Long Ball Accuracy</div>
                          <div className="text-xl font-bold">{team.stats.possession.longBallAccuracy}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Crosses</div>
                          <div className="text-xl font-bold">
                            {Math.round(team.stats.possession.crossesPerMatch * team.stats.matches.played)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.possession.crossesPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Cross Accuracy</div>
                          <div className="text-xl font-bold">{team.stats.possession.crossAccuracy}%</div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Possession", value: team.stats.possession.averagePossession, fill: "#22c55e" },
                              { name: "Pass Accuracy", value: team.stats.possession.passAccuracy, fill: "#3b82f6" },
                              {
                                name: "Long Ball Acc.",
                                value: team.stats.possession.longBallAccuracy,
                                fill: "#f59e0b",
                              },
                              { name: "Cross Accuracy", value: team.stats.possession.crossAccuracy, fill: "#8b5cf6" },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Value (%)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Set Pieces Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("setpieces")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Set Pieces</CardTitle>
                      {isSectionExpanded("setpieces") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("setpieces") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Corners</div>
                          <div className="text-xl font-bold">
                            {Math.round(team.stats.setpieces.cornersPerMatch * team.stats.matches.played)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.stats.setpieces.cornersPerMatch} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Corner Goals</div>
                          <div className="text-xl font-bold">{team.stats.setpieces.cornerGoals}</div>
                          <div className="text-xs text-muted-foreground">
                            {(
                              (team.stats.setpieces.cornerGoals /
                                (team.stats.setpieces.cornersPerMatch * team.stats.matches.played)) *
                              100
                            ).toFixed(1)}
                            % conversion
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Free Kick Goals</div>
                          <div className="text-xl font-bold">{team.stats.setpieces.freeKickGoals}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Penalties Scored</div>
                          <div className="text-xl font-bold">{team.stats.setpieces.penaltiesScored}</div>
                          <div className="text-xs text-muted-foreground">
                            {(
                              (team.stats.setpieces.penaltiesScored /
                                (team.stats.setpieces.penaltiesScored + team.stats.setpieces.penaltiesMissed)) *
                              100
                            ).toFixed(1)}
                            % conversion
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Penalties Missed</div>
                          <div className="text-xl font-bold">{team.stats.setpieces.penaltiesMissed}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Set Piece Goals</div>
                          <div className="text-xl font-bold">
                            {team.stats.setpieces.cornerGoals +
                              team.stats.setpieces.freeKickGoals +
                              team.stats.setpieces.penaltiesScored}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {(
                              ((team.stats.setpieces.cornerGoals +
                                team.stats.setpieces.freeKickGoals +
                                team.stats.setpieces.penaltiesScored) /
                                team.stats.matches.goalsFor) *
                              100
                            ).toFixed(1)}
                            % of all goals
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Corner Goals", value: team.stats.setpieces.cornerGoals },
                                { name: "Free Kick Goals", value: team.stats.setpieces.freeKickGoals },
                                { name: "Penalties", value: team.stats.setpieces.penaltiesScored },
                                {
                                  name: "Open Play",
                                  value:
                                    team.stats.matches.goalsFor -
                                    (team.stats.setpieces.cornerGoals +
                                      team.stats.setpieces.freeKickGoals +
                                      team.stats.setpieces.penaltiesScored),
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {[0, 1, 2, 3].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Discipline Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("discipline")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Discipline</CardTitle>
                      {isSectionExpanded("discipline") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("discipline") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Yellow Cards</div>
                          <div className="text-xl font-bold">{team.stats.discipline.yellowCards}</div>
                          <div className="text-xs text-muted-foreground">
                            {(team.stats.discipline.yellowCards / team.stats.matches.played).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Red Cards</div>
                          <div className="text-xl font-bold">{team.stats.discipline.redCards}</div>
                          <div className="text-xs text-muted-foreground">
                            {(team.stats.discipline.redCards / team.stats.matches.played).toFixed(2)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fouls Committed</div>
                          <div className="text-xl font-bold">{team.stats.discipline.foulsCommitted}</div>
                          <div className="text-xs text-muted-foreground">
                            {(team.stats.discipline.foulsCommitted / team.stats.matches.played).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fouls Drawn</div>
                          <div className="text-xl font-bold">{team.stats.discipline.foulsDrawn}</div>
                          <div className="text-xs text-muted-foreground">
                            {(team.stats.discipline.foulsDrawn / team.stats.matches.played).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Offsides</div>
                          <div className="text-xl font-bold">{team.stats.discipline.offsides}</div>
                          <div className="text-xs text-muted-foreground">
                            {(team.stats.discipline.offsides / team.stats.matches.played).toFixed(1)} per match
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Yellow Cards", value: team.stats.discipline.yellowCards, fill: "#f59e0b" },
                              { name: "Red Cards", value: team.stats.discipline.redCards * 5, fill: "#ef4444" },
                              {
                                name: "Fouls Committed",
                                value: team.stats.discipline.foulsCommitted / 10,
                                fill: "#3b82f6",
                              },
                              {
                                name: "Fouls Drawn",
                                value: team.stats.discipline.foulsDrawn / 10,
                                fill: "#22c55e",
                              },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Value" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>

              {/* Betting Tab */}
              <TabsContent value="betting" className="space-y-4">
                <Card className="cozy-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Betting Markets</CardTitle>
                    <CardDescription>Available team betting markets for upcoming matches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-md">
                        <div>
                          <div className="font-medium">Match Result</div>
                          <div className="text-sm text-muted-foreground">Team to win, draw, or lose</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button className="bg-amber-600 hover:bg-amber-700 w-16">{team.betting.winOdds}</Button>
                          <Button variant="outline" className="w-16">
                            {team.betting.drawOdds}
                          </Button>
                          <Button variant="outline" className="w-16">
                            {team.betting.loseOdds}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">Over/Under {team.betting.overUnder.line} Goals</div>
                          <div className="text-sm text-muted-foreground">Total goals in the match</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Avg: {team.stats.attack.goalsPerMatch + team.stats.defense.goalsAgainstPerMatch} goals per
                            match
                          </Badge>
                          <Button variant="outline" className="w-16">
                            {team.betting.overUnder.over}
                          </Button>
                          <Button variant="outline" className="w-16">
                            {team.betting.overUnder.under}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">Clean Sheet</div>
                          <div className="text-sm text-muted-foreground">Team to not concede a goal</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {team.stats.matches.cleanSheets} clean sheets (
                            {Math.round((team.stats.matches.cleanSheets / team.stats.matches.played) * 100)}%)
                          </Badge>
                          <Button variant="outline" className="w-16">
                            {team.betting.cleanSheet}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">Both Teams to Score</div>
                          <div className="text-sm text-muted-foreground">Both teams score at least one goal</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {team.stats.matches.played - team.stats.matches.cleanSheets} BTTS games (
                            {Math.round(
                              ((team.stats.matches.played - team.stats.matches.cleanSheets) /
                                team.stats.matches.played) *
                                100,
                            )}
                            %)
                          </Badge>
                          <Button variant="outline" className="w-16">
                            {team.betting.bothTeamsToScore}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">
                            Handicap {team.betting.handicap.line > 0 ? "+" : ""}
                            {team.betting.handicap.line}
                          </div>
                          <div className="text-sm text-muted-foreground">Team to win with handicap applied</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Avg goal diff:{" "}
                            {(team.stats.matches.goalsFor - team.stats.matches.goalsAgainst) /
                              team.stats.matches.played}
                          </Badge>
                          <Button variant="outline" className="w-16">
                            {team.betting.handicap.odds}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cozy-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Betting Insights</CardTitle>
                    <CardDescription>Statistical analysis to inform betting decisions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-amber-600" />
                          <div className="font-medium">Match Result Analysis</div>
                        </div>
                        <div className="text-sm">
                          {team.name} has won {team.stats.matches.won} out of {team.stats.matches.played} matches this
                          season ({Math.round((team.stats.matches.won / team.stats.matches.played) * 100)}% win rate).
                          Against {team.vsUpcomingOpponent.team}, they have a historical win rate of{" "}
                          {team.vsUpcomingOpponent.historicalWinRate}% with {team.headToHead.wins} wins in{" "}
                          {team.headToHead.matches} matches. Their current form shows{" "}
                          {team.stats.standings.form.filter((result) => result === "W").length} wins in the last 5
                          games.
                        </div>
                        <div className="mt-2 text-sm text-amber-600 font-medium">
                          Recommendation: {team.name} to win at odds of {team.betting.winOdds} offers value
                        </div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-4 w-4 text-amber-600" />
                          <div className="font-medium">Goals Analysis</div>
                        </div>
                        <div className="text-sm">
                          Matches involving {team.name} average{" "}
                          {(team.stats.attack.goalsPerMatch + team.stats.defense.goalsAgainstPerMatch).toFixed(1)} goals
                          per game. They score {team.stats.attack.goalsPerMatch} and concede{" "}
                          {team.stats.defense.goalsAgainstPerMatch} on average. In their last 5 games, there have been a
                          total of {team.recentPerformance.goalsForLast5 + team.recentPerformance.goalsAgainstLast5}{" "}
                          goals ({(team.recentPerformance.goalsForLast5 + team.recentPerformance.goalsAgainstLast5) / 5}{" "}
                          per game).
                        </div>
                        <div className="mt-2 text-sm text-amber-600 font-medium">
                          Recommendation: Over {team.betting.overUnder.line} goals at {team.betting.overUnder.over}{" "}
                          appears favorable
                        </div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-amber-600" />
                          <div className="font-medium">Clean Sheet Analysis</div>
                        </div>
                        <div className="text-sm">
                          {team.name} has kept {team.stats.matches.cleanSheets} clean sheets in{" "}
                          {team.stats.matches.played} games this season (
                          {Math.round((team.stats.matches.cleanSheets / team.stats.matches.played) * 100)}%). They
                          concede an average of {team.stats.defense.goalsAgainstPerMatch} goals per game with an xGA of{" "}
                          {team.stats.defense.xGAPerMatch} per match. Against {team.vsUpcomingOpponent.team}, they have
                          conceded in {team.headToHead.matches - team.headToHead.wins - team.headToHead.draws} of their
                          last {team.headToHead.matches} meetings.
                        </div>
                        <div className="mt-2 text-sm text-amber-600 font-medium">
                          Recommendation: Clean sheet at {team.betting.cleanSheet} is a risky bet
                        </div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Flag className="h-4 w-4 text-amber-600" />
                          <div className="font-medium">Head-to-Head Analysis</div>
                        </div>
                        <div className="text-sm">
                          In matches against {team.vsUpcomingOpponent.team}, {team.name} has won {team.headToHead.wins},
                          drawn {team.headToHead.draws}, and lost {team.headToHead.losses}. The last 5 meetings have
                          resulted in {team.headToHead.lastFive.filter((game) => game.result === "W").length} wins,{" "}
                          {team.headToHead.lastFive.filter((game) => game.result === "D").length} draws, and{" "}
                          {team.headToHead.lastFive.filter((game) => game.result === "L").length} losses. The most
                          recent encounter ended {team.vsUpcomingOpponent.lastEncounter.result}.
                        </div>
                        <div className="mt-2 text-sm text-amber-600 font-medium">
                          Recommendation: Consider the historical pattern when placing bets
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Players & Tactics Tab */}
              <TabsContent value="players" className="space-y-4">
                <Card className="cozy-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Players</CardTitle>
                    <CardDescription>Top performing players this season</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {team.players.map((player, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {player.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.position}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground">Goals</div>
                              <div className="font-medium">{player.goals}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground">Assists</div>
                              <div className="font-medium">{player.assists}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground">Rating</div>
                              <div className="font-medium">{player.rating}</div>
                            </div>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="cozy-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Formations & Tactics</CardTitle>
                    <CardDescription>Team's preferred formations and tactical approach</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm font-medium mb-3">Formation Usage</div>
                        <div className="space-y-3">
                          {team.formations.map((formation, index) => (
                            <div key={index}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-medium">{formation.formation}</div>
                                <div className="text-sm">
                                  {formation.usage}% usage · {formation.winRate}% win rate
                                </div>
                              </div>
                              <Progress value={formation.usage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <div className="text-sm font-medium mb-3">Tactical Approach</div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Aspect</TableHead>
                              <TableHead>Style</TableHead>
                              <TableHead>Effectiveness</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Build-up Play</TableCell>
                              <TableCell>Possession-based</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Progress value={85} className="h-2 w-24 mr-2" />
                                  <span className="text-sm">85%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Attacking Style</TableCell>
                              <TableCell>Positional play</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Progress value={80} className="h-2 w-24 mr-2" />
                                  <span className="text-sm">80%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Defensive Style</TableCell>
                              <TableCell>High press</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Progress value={75} className="h-2 w-24 mr-2" />
                                  <span className="text-sm">75%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Transition</TableCell>
                              <TableCell>Counter-press</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Progress value={82} className="h-2 w-24 mr-2" />
                                  <span className="text-sm">82%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Set Pieces</TableCell>
                              <TableCell>Structured routines</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Progress value={78} className="h-2 w-24 mr-2" />
                                  <span className="text-sm">78%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cozy-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Season Comparison</CardTitle>
                    <CardDescription>Performance across recent seasons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={team.seasonComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="season" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="points" stroke="#22c55e" name="Points" />
                          <Line yAxisId="left" type="monotone" dataKey="goalsFor" stroke="#3b82f6" name="Goals For" />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="goalsAgainst"
                            stroke="#ef4444"
                            name="Goals Against"
                          />
                          <Line yAxisId="right" type="monotone" dataKey="position" stroke="#f59e0b" name="Position" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>
                        <strong>Analysis:</strong> {team.name} has maintained consistent performance over the past five
                        seasons, winning the league in 4 out of 5 campaigns. Their points total has fluctuated between
                        81 and 98, with their best defensive record in the 2018/19 season (23 goals conceded) and their
                        best attacking output in 2019/20 (102 goals scored).
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
