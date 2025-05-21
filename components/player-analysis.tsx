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
} from "recharts"
import {
  Activity,
  AlertCircle,
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  Info,
  Maximize2,
  Minimize2,
  Shield,
  Star,
  Target,
  TrendingUpIcon as Trending,
  Users,
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

// Mock player data
const playerData = {
  id: "p1",
  name: "Kevin De Bruyne",
  position: "Midfielder",
  team: "Manchester City",
  nationality: "Belgium",
  age: 31,
  height: "181 cm",
  weight: "70 kg",
  image: "/placeholder.svg?height=300&width=300",
  number: 17,
  stats: {
    matches: 28,
    minutes: 2340,
    goals: 7,
    assists: 16,
    shots: {
      total: 62,
      onTarget: 29,
      accuracy: 46.8,
      goalsPerShot: 0.11,
      xG: 5.8,
      xGPerShot: 0.09,
    },
    passing: {
      total: 1842,
      completed: 1546,
      accuracy: 83.9,
      keyPasses: 87,
      chances: 92,
      xA: 14.2,
    },
    defending: {
      tackles: 42,
      interceptions: 18,
      clearances: 9,
      blocks: 7,
      duelsWon: 124,
      duelsLost: 98,
    },
    discipline: {
      yellowCards: 3,
      redCards: 0,
      fouls: 19,
      fouled: 38,
    },
    physical: {
      distanceCovered: 312.4, // in km
      sprints: 186,
      topSpeed: 32.1, // km/h
      highIntensityRuns: 428,
    },
  },
  form: [
    { match: "vs Arsenal", rating: 8.2, goals: 1, assists: 2, date: "2023-04-26" },
    { match: "vs Leeds", rating: 7.8, goals: 0, assists: 1, date: "2023-04-30" },
    { match: "vs Everton", rating: 7.4, goals: 0, assists: 0, date: "2023-05-03" },
    { match: "vs West Ham", rating: 8.7, goals: 2, assists: 1, date: "2023-05-07" },
    { match: "vs Leicester", rating: 7.9, goals: 0, assists: 2, date: "2023-05-13" },
  ],
  ratings: {
    overall: 91,
    pace: 76,
    shooting: 86,
    passing: 93,
    dribbling: 88,
    defending: 64,
    physical: 78,
    vision: 94,
    crossing: 93,
    finishing: 83,
    shortPassing: 92,
    longPassing: 91,
    ballControl: 87,
    acceleration: 78,
    stamina: 85,
    strength: 74,
    aggression: 76,
    positioning: 87,
    reactions: 88,
    interceptions: 68,
    composure: 88,
    freeKick: 84,
  },
  heatmap: [
    { x: 10, y: 20, value: 12 },
    { x: 30, y: 30, value: 25 },
    { x: 50, y: 40, value: 40 },
    { x: 70, y: 30, value: 30 },
    { x: 90, y: 20, value: 15 },
    { x: 30, y: 50, value: 20 },
    { x: 50, y: 60, value: 35 },
    { x: 70, y: 50, value: 22 },
  ],
  seasonComparison: [
    { season: "2018/19", goals: 6, assists: 11, rating: 7.6 },
    { season: "2019/20", goals: 13, assists: 20, rating: 7.9 },
    { season: "2020/21", goals: 6, assists: 12, rating: 7.7 },
    { season: "2021/22", goals: 15, assists: 8, rating: 7.8 },
    { season: "2022/23", goals: 7, assists: 16, rating: 8.1 },
  ],
  strengths: ["Vision", "Passing", "Set Pieces", "Crossing", "Through Balls"],
  weaknesses: ["Aerial Duels", "Tackling", "Defensive Positioning"],
  betting: {
    goalAnytime: 3.75,
    assist: 2.2,
    shotOnTarget: 1.65,
    keyPass: 1.35,
    motm: 6.5,
    cardAnytime: 4.5,
  },
  similarPlayers: [
    { id: "p2", name: "Bruno Fernandes", team: "Manchester United", similarity: 89 },
    { id: "p3", name: "Martin Ødegaard", team: "Arsenal", similarity: 87 },
    { id: "p4", name: "Bernardo Silva", team: "Manchester City", similarity: 85 },
    { id: "p5", name: "Mason Mount", team: "Chelsea", similarity: 82 },
  ],
  recentPerformance: {
    trend: "upward",
    lastFiveAvgRating: 8.0,
    seasonAvgRating: 7.8,
    form: "Excellent",
    fitnessStatus: "Fully Fit",
    minutesLast5Games: 450,
  },
  vsUpcomingOpponent: {
    team: "Tottenham",
    matches: 14,
    goals: 5,
    assists: 9,
    avgRating: 7.9,
    wins: 9,
    draws: 3,
    losses: 2,
    lastEncounter: {
      date: "2023-02-05",
      result: "Man City 4-2 Tottenham",
      goals: 1,
      assists: 2,
      rating: 8.6,
    },
  },
}

// Radar chart data for player abilities
const radarData = [
  { subject: "Pace", A: playerData.ratings.pace, fullMark: 100 },
  { subject: "Shooting", A: playerData.ratings.shooting, fullMark: 100 },
  { subject: "Passing", A: playerData.ratings.passing, fullMark: 100 },
  { subject: "Dribbling", A: playerData.ratings.dribbling, fullMark: 100 },
  { subject: "Defending", A: playerData.ratings.defending, fullMark: 100 },
  { subject: "Physical", A: playerData.ratings.physical, fullMark: 100 },
]

interface PlayerAnalysisProps {
  playerId?: string
  isOpen: boolean
  onClose: () => void
}

export function PlayerAnalysis({ playerId = "p1", isOpen, onClose }: PlayerAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic", "form", "ratings"])

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section))
    } else {
      setExpandedSections([...expandedSections, section])
    }
  }

  const isSectionExpanded = (section: string) => expandedSections.includes(section)

  // For this demo, we're using the mock data directly
  // In a real app, you would fetch the player data based on the playerId
  const player = playerData

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute left-2 top-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <DialogTitle className="text-center flex-1">Player Analysis</DialogTitle>
          </div>
          <DialogDescription className="text-center">
            Comprehensive performance data and betting insights
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Player basic info card */}
          <Card className="w-full md:w-64 cozy-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
                <AvatarFallback>
                  {player.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{player.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-amber-50 text-amber-800">
                  {player.position}
                </Badge>
                <Badge variant="outline">{player.nationality}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                {player.team} · #{player.number}
              </div>
              <div className="grid grid-cols-2 gap-2 w-full text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Age</span>
                  <span className="font-medium">{player.age}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-medium">{player.height}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{player.weight}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium flex items-center">
                    {player.ratings.overall}
                    <Star className="h-3 w-3 text-amber-500 ml-1" fill="currentColor" />
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="w-full">
                <div className="text-sm font-medium mb-2">Current Form</div>
                <div className="flex items-center gap-1">
                  <Trending className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{player.recentPerformance.form}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Last 5: {player.recentPerformance.lastFiveAvgRating}
                  </span>
                </div>
                <Progress value={player.recentPerformance.lastFiveAvgRating * 10} className="h-1 mt-1" />
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
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                {/* Key Performance Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Card className="cozy-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Goals</div>
                        <Target className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold">{player.stats.goals}</div>
                      <div className="text-xs text-muted-foreground">
                        xG: {player.stats.shots.xG} · {(player.stats.goals / player.stats.matches).toFixed(2)} per match
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cozy-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Assists</div>
                        <Users className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold">{player.stats.assists}</div>
                      <div className="text-xs text-muted-foreground">
                        xA: {player.stats.passing.xA} · {(player.stats.assists / player.stats.matches).toFixed(2)} per
                        match
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cozy-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Matches</div>
                        <Calendar className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold">{player.stats.matches}</div>
                      <div className="text-xs text-muted-foreground">
                        {player.stats.minutes} mins · {Math.round(player.stats.minutes / player.stats.matches)} per
                        match
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cozy-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Rating</div>
                        <Star className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold">{player.recentPerformance.seasonAvgRating}</div>
                      <div className="text-xs text-muted-foreground">
                        Last 5: {player.recentPerformance.lastFiveAvgRating} ·{" "}
                        {player.recentPerformance.trend === "upward" ? "↑" : "↓"}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Ability Radar Chart */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Player Abilities</CardTitle>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Player's key attributes on a scale of 1-100</p>
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
                        variant={player.recentPerformance.trend === "upward" ? "outline" : "secondary"}
                        className={player.recentPerformance.trend === "upward" ? "bg-green-50 text-green-700" : ""}
                      >
                        {player.recentPerformance.trend === "upward" ? "Improving" : "Consistent"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {player.form.map((game, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-24 text-sm">{game.date}</div>
                          <div className="flex-1">
                            <div className="font-medium">{game.match}</div>
                            <div className="text-sm text-muted-foreground">
                              {game.goals > 0 ? `${game.goals} ${game.goals === 1 ? "goal" : "goals"}` : "No goals"} ·
                              {game.assists > 0
                                ? ` ${game.assists} ${game.assists === 1 ? "assist" : "assists"}`
                                : " No assists"}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                game.rating >= 8.0
                                  ? "bg-green-100 text-green-800"
                                  : game.rating >= 7.0
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              <span className="font-bold">{game.rating}</span>
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
                        {player.strengths.map((strength, index) => (
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
                        {player.weaknesses.map((weakness, index) => (
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
                    <CardTitle className="text-lg">VS {player.vsUpcomingOpponent.team}</CardTitle>
                    <CardDescription>Historical performance against upcoming opponent</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Matches</div>
                        <div className="text-xl font-bold">{player.vsUpcomingOpponent.matches}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Goals</div>
                        <div className="text-xl font-bold">{player.vsUpcomingOpponent.goals}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Assists</div>
                        <div className="text-xl font-bold">{player.vsUpcomingOpponent.assists}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Avg Rating</div>
                        <div className="text-xl font-bold">{player.vsUpcomingOpponent.avgRating}</div>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <div className="font-medium">Last Encounter</div>
                      <div className="text-sm">
                        {player.vsUpcomingOpponent.lastEncounter.date} ·{" "}
                        {player.vsUpcomingOpponent.lastEncounter.result}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {player.vsUpcomingOpponent.lastEncounter.goals} goals ·{" "}
                        {player.vsUpcomingOpponent.lastEncounter.assists} assists · Rating:{" "}
                        {player.vsUpcomingOpponent.lastEncounter.rating}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Detailed Stats Tab */}
              <TabsContent value="stats" className="space-y-4">
                {/* Shooting Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("shooting")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Shooting</CardTitle>
                      {isSectionExpanded("shooting") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("shooting") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Goals</div>
                          <div className="text-xl font-bold">{player.stats.goals}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.goals / player.stats.matches).toFixed(2)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Shots</div>
                          <div className="text-xl font-bold">{player.stats.shots.total}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.shots.total / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">On Target</div>
                          <div className="text-xl font-bold">{player.stats.shots.onTarget}</div>
                          <div className="text-xs text-muted-foreground">{player.stats.shots.accuracy}% accuracy</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">xG</div>
                          <div className="text-xl font-bold">{player.stats.shots.xG}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.shots.xG / player.stats.matches).toFixed(2)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">xG per Shot</div>
                          <div className="text-xl font-bold">{player.stats.shots.xGPerShot}</div>
                          <div className="text-xs text-muted-foreground">Shot quality</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Goals per Shot</div>
                          <div className="text-xl font-bold">{player.stats.shots.goalsPerShot}</div>
                          <div className="text-xs text-muted-foreground">Conversion rate</div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Goals", value: player.stats.goals, fill: "#22c55e" },
                              { name: "xG", value: player.stats.shots.xG, fill: "#3b82f6" },
                              { name: "Shots", value: player.stats.shots.total / 10, fill: "#f59e0b" },
                              { name: "On Target", value: player.stats.shots.onTarget / 10, fill: "#8b5cf6" },
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

                {/* Passing Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("passing")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Passing</CardTitle>
                      {isSectionExpanded("passing") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("passing") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Assists</div>
                          <div className="text-xl font-bold">{player.stats.assists}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.assists / player.stats.matches).toFixed(2)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Passes</div>
                          <div className="text-xl font-bold">{player.stats.passing.total}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.passing.total / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Pass Accuracy</div>
                          <div className="text-xl font-bold">{player.stats.passing.accuracy}%</div>
                          <div className="text-xs text-muted-foreground">
                            {player.stats.passing.completed} completed
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Key Passes</div>
                          <div className="text-xl font-bold">{player.stats.passing.keyPasses}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.passing.keyPasses / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Chances Created</div>
                          <div className="text-xl font-bold">{player.stats.passing.chances}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.passing.chances / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">xA</div>
                          <div className="text-xl font-bold">{player.stats.passing.xA}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.passing.xA / player.stats.matches).toFixed(2)} per match
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Assists", value: player.stats.assists, fill: "#22c55e" },
                              { name: "xA", value: player.stats.passing.xA, fill: "#3b82f6" },
                              { name: "Key Passes", value: player.stats.passing.keyPasses / 10, fill: "#f59e0b" },
                              { name: "Chances", value: player.stats.passing.chances / 10, fill: "#8b5cf6" },
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

                {/* Defending Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("defending")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Defending</CardTitle>
                      {isSectionExpanded("defending") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("defending") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Tackles</div>
                          <div className="text-xl font-bold">{player.stats.defending.tackles}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.defending.tackles / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Interceptions</div>
                          <div className="text-xl font-bold">{player.stats.defending.interceptions}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.defending.interceptions / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Clearances</div>
                          <div className="text-xl font-bold">{player.stats.defending.clearances}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.defending.clearances / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Blocks</div>
                          <div className="text-xl font-bold">{player.stats.defending.blocks}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.defending.blocks / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Duels Won</div>
                          <div className="text-xl font-bold">{player.stats.defending.duelsWon}</div>
                          <div className="text-xs text-muted-foreground">
                            {(
                              (player.stats.defending.duelsWon /
                                (player.stats.defending.duelsWon + player.stats.defending.duelsLost)) *
                              100
                            ).toFixed(1)}
                            % success rate
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Duels Lost</div>
                          <div className="text-xl font-bold">{player.stats.defending.duelsLost}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.defending.duelsLost / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Tackles", value: player.stats.defending.tackles, fill: "#22c55e" },
                              { name: "Interceptions", value: player.stats.defending.interceptions, fill: "#3b82f6" },
                              { name: "Clearances", value: player.stats.defending.clearances, fill: "#f59e0b" },
                              { name: "Blocks", value: player.stats.defending.blocks, fill: "#8b5cf6" },
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

                {/* Physical Stats */}
                <Card className="cozy-shadow">
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("physical")}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Physical</CardTitle>
                      {isSectionExpanded("physical") ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                  {isSectionExpanded("physical") && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Distance Covered</div>
                          <div className="text-xl font-bold">{player.stats.physical.distanceCovered} km</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.physical.distanceCovered / player.stats.matches).toFixed(1)} km per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Sprints</div>
                          <div className="text-xl font-bold">{player.stats.physical.sprints}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.physical.sprints / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Top Speed</div>
                          <div className="text-xl font-bold">{player.stats.physical.topSpeed} km/h</div>
                          <div className="text-xs text-muted-foreground">Season best</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">High Intensity Runs</div>
                          <div className="text-xl font-bold">{player.stats.physical.highIntensityRuns}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.physical.highIntensityRuns / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fouls Committed</div>
                          <div className="text-xl font-bold">{player.stats.discipline.fouls}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.discipline.fouls / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fouls Drawn</div>
                          <div className="text-xl font-bold">{player.stats.discipline.fouled}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.discipline.fouled / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              {
                                name: "Distance (km)",
                                value: player.stats.physical.distanceCovered / 10,
                                fill: "#22c55e",
                              },
                              { name: "Sprints", value: player.stats.physical.sprints / 10, fill: "#3b82f6" },
                              {
                                name: "High Int. Runs",
                                value: player.stats.physical.highIntensityRuns / 40,
                                fill: "#f59e0b",
                              },
                              { name: "Top Speed (km/h)", value: player.stats.physical.topSpeed / 3, fill: "#8b5cf6" },
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
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Yellow Cards</div>
                          <div className="text-xl font-bold">{player.stats.discipline.yellowCards}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.discipline.yellowCards / player.stats.matches).toFixed(2)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Red Cards</div>
                          <div className="text-xl font-bold">{player.stats.discipline.redCards}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.discipline.redCards / player.stats.matches).toFixed(2)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fouls Committed</div>
                          <div className="text-xl font-bold">{player.stats.discipline.fouls}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.discipline.fouls / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fouls Drawn</div>
                          <div className="text-xl font-bold">{player.stats.discipline.fouled}</div>
                          <div className="text-xs text-muted-foreground">
                            {(player.stats.discipline.fouled / player.stats.matches).toFixed(1)} per match
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Yellow Cards", value: player.stats.discipline.yellowCards, fill: "#f59e0b" },
                              { name: "Red Cards", value: player.stats.discipline.redCards, fill: "#ef4444" },
                              { name: "Fouls Committed", value: player.stats.discipline.fouls / 5, fill: "#3b82f6" },
                              { name: "Fouls Drawn", value: player.stats.discipline.fouled / 5, fill: "#22c55e" },
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
                    <CardDescription>Available player-specific betting markets for upcoming matches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-md">
                        <div>
                          <div className="font-medium">Goal Anytime</div>
                          <div className="text-sm text-muted-foreground">Player to score at any time</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">
                            {player.stats.goals} goals this season
                          </Badge>
                          <Button className="bg-amber-600 hover:bg-amber-700">{player.betting.goalAnytime}</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">Assist Anytime</div>
                          <div className="text-sm text-muted-foreground">Player to provide an assist</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{player.stats.assists} assists this season</Badge>
                          <Button variant="outline">{player.betting.assist}</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">Shot on Target</div>
                          <div className="text-sm text-muted-foreground">
                            Player to have at least one shot on target
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{player.stats.shots.accuracy}% accuracy</Badge>
                          <Button variant="outline">{player.betting.shotOnTarget}</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">Key Pass</div>
                          <div className="text-sm text-muted-foreground">Player to make at least one key pass</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {(player.stats.passing.keyPasses / player.stats.matches).toFixed(1)} per match
                          </Badge>
                          <Button variant="outline">{player.betting.keyPass}</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">Man of the Match</div>
                          <div className="text-sm text-muted-foreground">Player to be named MOTM</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{player.recentPerformance.lastFiveAvgRating} avg rating</Badge>
                          <Button variant="outline">{player.betting.motm}</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">Card Anytime</div>
                          <div className="text-sm text-muted-foreground">Player to receive a card</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{player.stats.discipline.yellowCards} cards this season</Badge>
                          <Button variant="outline">{player.betting.cardAnytime}</Button>
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
                          <div className="font-medium">Goal Scoring Patterns</div>
                        </div>
                        <div className="text-sm">
                          {player.name} has scored {player.stats.goals} goals this season, outperforming his xG of{" "}
                          {player.stats.shots.xG}. He tends to score more in home games and has a particularly strong
                          record against {player.vsUpcomingOpponent.team}
                          with {player.vsUpcomingOpponent.goals} goals in {player.vsUpcomingOpponent.matches}{" "}
                          appearances.
                        </div>
                        <div className="mt-2 text-sm text-amber-600 font-medium">
                          Recommendation: Consider Goal Anytime bet at odds of {player.betting.goalAnytime}
                        </div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-amber-600" />
                          <div className="font-medium">Assist Potential</div>
                        </div>
                        <div className="text-sm">
                          With {player.stats.assists} assists from an xA of {player.stats.passing.xA}, {player.name} is
                          a consistent creator of chances. He creates{" "}
                          {(player.stats.passing.chances / player.stats.matches).toFixed(1)} chances per game and has
                          provided {player.vsUpcomingOpponent.assists} assists against {player.vsUpcomingOpponent.team}{" "}
                          historically.
                        </div>
                        <div className="mt-2 text-sm text-amber-600 font-medium">
                          Recommendation: Assist Anytime at {player.betting.assist} offers value
                        </div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-4 w-4 text-amber-600" />
                          <div className="font-medium">Current Form Analysis</div>
                        </div>
                        <div className="text-sm">
                          {player.name} is in {player.recentPerformance.form.toLowerCase()} form with an average rating
                          of {player.recentPerformance.lastFiveAvgRating}
                          over his last 5 games, compared to his season average of{" "}
                          {player.recentPerformance.seasonAvgRating}. He has played full 90 minutes in his last{" "}
                          {Math.round(player.recentPerformance.minutesLast5Games / 90)} games, indicating he's likely to
                          feature prominently in the upcoming match.
                        </div>
                        <div className="mt-2 text-sm text-amber-600 font-medium">
                          Recommendation: Player performance markets look favorable
                        </div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-amber-600" />
                          <div className="font-medium">Opponent-Specific Analysis</div>
                        </div>
                        <div className="text-sm">
                          Against {player.vsUpcomingOpponent.team}, {player.name} has an impressive record with
                          {player.vsUpcomingOpponent.goals} goals and {player.vsUpcomingOpponent.assists} assists in
                          {player.vsUpcomingOpponent.matches} appearances. His last encounter resulted in a{" "}
                          {player.vsUpcomingOpponent.lastEncounter.result}
                          where he scored {player.vsUpcomingOpponent.lastEncounter.goals} and assisted{" "}
                          {player.vsUpcomingOpponent.lastEncounter.assists}.
                        </div>
                        <div className="mt-2 text-sm text-amber-600 font-medium">
                          Recommendation: Historical performance suggests strong value in player markets
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <Card className="cozy-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Season Comparison</CardTitle>
                    <CardDescription>Performance across recent seasons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={player.seasonComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="season" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" domain={[7, 8.5]} />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="goals" stroke="#22c55e" name="Goals" />
                          <Line yAxisId="left" type="monotone" dataKey="assists" stroke="#3b82f6" name="Assists" />
                          <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#f59e0b" name="Avg Rating" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>
                        <strong>Analysis:</strong> {player.name} has maintained consistent performance over the past
                        five seasons, with his best goal-scoring season being 2021/22 (15 goals) and his best creative
                        season being 2019/20 (20 assists). His overall rating has gradually improved, reaching a peak of
                        8.1 in the current season.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cozy-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Similar Players</CardTitle>
                    <CardDescription>Players with similar playing styles and statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {player.similarPlayers.map((similar, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {similar.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{similar.name}</div>
                              <div className="text-sm text-muted-foreground">{similar.team}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-amber-50 text-amber-800">
                              {similar.similarity}% Similar
                            </Badge>
                            <Button variant="ghost" size="sm">
                              Compare
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="cozy-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Career Milestones</CardTitle>
                    <CardDescription>Key achievements and records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative pl-6 pb-6 border-l-2 border-amber-200">
                        <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-amber-500"></div>
                        <div className="font-medium">Premier League Champion</div>
                        <div className="text-sm text-muted-foreground">2017/18, 2018/19, 2020/21, 2021/22</div>
                      </div>
                      <div className="relative pl-6 pb-6 border-l-2 border-amber-200">
                        <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-amber-500"></div>
                        <div className="font-medium">PFA Player of the Year</div>
                        <div className="text-sm text-muted-foreground">2019/20, 2021/22</div>
                      </div>
                      <div className="relative pl-6 pb-6 border-l-2 border-amber-200">
                        <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-amber-500"></div>
                        <div className="font-medium">Premier League Playmaker Award</div>
                        <div className="text-sm text-muted-foreground">2019/20 (20 assists)</div>
                      </div>
                      <div className="relative pl-6 pb-6 border-l-2 border-amber-200">
                        <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-amber-500"></div>
                        <div className="font-medium">FIFA World Cup Bronze Medal</div>
                        <div className="text-sm text-muted-foreground">2018 with Belgium</div>
                      </div>
                      <div className="relative pl-6">
                        <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-amber-500"></div>
                        <div className="font-medium">100 Premier League Assists</div>
                        <div className="text-sm text-muted-foreground">
                          Achieved in 2022, one of the fastest to reach this milestone
                        </div>
                      </div>
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
