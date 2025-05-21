"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for market accuracy
const marketData = {
  matchResult: [
    { name: "BetExpert", accuracy: 72.8 },
    { name: "OddsPortal", accuracy: 70.5 },
    { name: "FootyStats", accuracy: 69.7 },
    { name: "WhoScored", accuracy: 68.9 },
    { name: "BetRadar", accuracy: 68.2 },
  ],
  bothTeamsToScore: [
    { name: "FootyStats", accuracy: 74.2 },
    { name: "BetExpert", accuracy: 71.5 },
    { name: "WhoScored", accuracy: 70.8 },
    { name: "OddsPortal", accuracy: 69.3 },
    { name: "BetRadar", accuracy: 67.9 },
  ],
  overUnder: [
    { name: "OddsPortal", accuracy: 73.6 },
    { name: "BetExpert", accuracy: 72.1 },
    { name: "BetRadar", accuracy: 70.5 },
    { name: "FootyStats", accuracy: 69.8 },
    { name: "WhoScored", accuracy: 68.2 },
  ],
  correctScore: [
    { name: "BetExpert", accuracy: 18.5 },
    { name: "FootyStats", accuracy: 17.2 },
    { name: "OddsPortal", accuracy: 16.8 },
    { name: "WhoScored", accuracy: 15.9 },
    { name: "BetRadar", accuracy: 15.3 },
  ],
  handicap: [
    { name: "OddsPortal", accuracy: 68.7 },
    { name: "BetRadar", accuracy: 67.5 },
    { name: "BetExpert", accuracy: 66.9 },
    { name: "WhoScored", accuracy: 65.2 },
    { name: "FootyStats", accuracy: 64.8 },
  ],
}

// League-specific accuracy
const leagueData = {
  premierLeague: [
    { name: "BetExpert", accuracy: 75.3 },
    { name: "WhoScored", accuracy: 73.8 },
    { name: "OddsPortal", accuracy: 72.5 },
    { name: "FootyStats", accuracy: 71.2 },
    { name: "BetRadar", accuracy: 70.6 },
  ],
  laLiga: [
    { name: "FootyStats", accuracy: 74.1 },
    { name: "BetExpert", accuracy: 73.5 },
    { name: "OddsPortal", accuracy: 72.8 },
    { name: "WhoScored", accuracy: 71.3 },
    { name: "BetRadar", accuracy: 69.7 },
  ],
  bundesliga: [
    { name: "FootyStats", accuracy: 76.2 },
    { name: "BetExpert", accuracy: 74.8 },
    { name: "BetRadar", accuracy: 73.5 },
    { name: "OddsPortal", accuracy: 72.1 },
    { name: "WhoScored", accuracy: 70.9 },
  ],
  serieA: [
    { name: "WhoScored", accuracy: 75.6 },
    { name: "BetExpert", accuracy: 74.2 },
    { name: "OddsPortal", accuracy: 72.8 },
    { name: "FootyStats", accuracy: 71.5 },
    { name: "BetRadar", accuracy: 70.3 },
  ],
  ligue1: [
    { name: "WhoScored", accuracy: 73.9 },
    { name: "OddsPortal", accuracy: 72.5 },
    { name: "BetExpert", accuracy: 71.8 },
    { name: "BetRadar", accuracy: 70.2 },
    { name: "FootyStats", accuracy: 69.5 },
  ],
}

const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"]

interface MarketAccuracyProps {
  timeRange: string
}

export function MarketAccuracy({ timeRange }: MarketAccuracyProps) {
  return (
    <div className="space-y-6">
      <Card className="cozy-shadow">
        <CardHeader>
          <CardTitle>Betting Market Accuracy</CardTitle>
          <CardDescription>How different sites perform across various betting markets</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="matchResult">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="matchResult">Match Result</TabsTrigger>
              <TabsTrigger value="bothTeamsToScore">BTTS</TabsTrigger>
              <TabsTrigger value="overUnder">Over/Under</TabsTrigger>
              <TabsTrigger value="correctScore">Correct Score</TabsTrigger>
              <TabsTrigger value="handicap">Handicap</TabsTrigger>
            </TabsList>

            <TabsContent value="matchResult" className="pt-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketData.matchResult}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[60, 80]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => [`${value}%`, "Accuracy"]} />
                    <Legend />
                    <Bar dataKey="accuracy" name="Accuracy (%)">
                      {marketData.matchResult.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  <strong>Analysis:</strong> BetExpert leads in match result predictions with 72.8% accuracy,
                  particularly strong in predicting home wins in top European leagues.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="bothTeamsToScore" className="pt-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketData.bothTeamsToScore}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[60, 80]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => [`${value}%`, "Accuracy"]} />
                    <Legend />
                    <Bar dataKey="accuracy" name="Accuracy (%)">
                      {marketData.bothTeamsToScore.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  <strong>Analysis:</strong> FootyStats excels in Both Teams to Score predictions with 74.2% accuracy,
                  using their detailed team scoring pattern analysis.
                </p>
              </div>
            </TabsContent>

            {/* Other tabs would have similar content */}
            <TabsContent value="overUnder" className="pt-4">
              {/* Over/Under content */}
            </TabsContent>
            <TabsContent value="correctScore" className="pt-4">
              {/* Correct Score content */}
            </TabsContent>
            <TabsContent value="handicap" className="pt-4">
              {/* Handicap content */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="cozy-shadow">
        <CardHeader>
          <CardTitle>League-Specific Accuracy</CardTitle>
          <CardDescription>How different sites perform across major soccer leagues</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="premierLeague">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="premierLeague">Premier League</TabsTrigger>
              <TabsTrigger value="laLiga">La Liga</TabsTrigger>
              <TabsTrigger value="bundesliga">Bundesliga</TabsTrigger>
              <TabsTrigger value="serieA">Serie A</TabsTrigger>
              <TabsTrigger value="ligue1">Ligue 1</TabsTrigger>
            </TabsList>

            <TabsContent value="premierLeague" className="pt-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={leagueData.premierLeague}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[65, 80]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => [`${value}%`, "Accuracy"]} />
                    <Legend />
                    <Bar dataKey="accuracy" name="Accuracy (%)">
                      {leagueData.premierLeague.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  <strong>Analysis:</strong> BetExpert leads Premier League predictions with 75.3% accuracy, with
                  particularly strong performance in the top-6 team matchups.
                </p>
              </div>
            </TabsContent>

            {/* Other league tabs would have similar content */}
            <TabsContent value="laLiga" className="pt-4">
              {/* La Liga content */}
            </TabsContent>
            <TabsContent value="bundesliga" className="pt-4">
              {/* Bundesliga content */}
            </TabsContent>
            <TabsContent value="serieA" className="pt-4">
              {/* Serie A content */}
            </TabsContent>
            <TabsContent value="ligue1" className="pt-4">
              {/* Ligue 1 content */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="cozy-shadow">
          <CardHeader>
            <CardTitle>Best Sites by Market</CardTitle>
            <CardDescription>The most accurate sites for specific betting markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Match Result</div>
                  <div className="text-sm text-muted-foreground">1X2 betting</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">BetExpert</Badge>
                  <span className="font-medium">72.8%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Both Teams to Score</div>
                  <div className="text-sm text-muted-foreground">Yes/No markets</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">FootyStats</Badge>
                  <span className="font-medium">74.2%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Over/Under Goals</div>
                  <div className="text-sm text-muted-foreground">Total goals markets</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">OddsPortal</Badge>
                  <span className="font-medium">73.6%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Correct Score</div>
                  <div className="text-sm text-muted-foreground">Exact score prediction</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">BetExpert</Badge>
                  <span className="font-medium">18.5%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Asian Handicap</div>
                  <div className="text-sm text-muted-foreground">Handicap markets</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">OddsPortal</Badge>
                  <span className="font-medium">68.7%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cozy-shadow">
          <CardHeader>
            <CardTitle>Best Sites by League</CardTitle>
            <CardDescription>The most accurate sites for specific leagues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Premier League</div>
                  <div className="text-sm text-muted-foreground">English top division</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">BetExpert</Badge>
                  <span className="font-medium">75.3%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">La Liga</div>
                  <div className="text-sm text-muted-foreground">Spanish top division</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">FootyStats</Badge>
                  <span className="font-medium">74.1%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Bundesliga</div>
                  <div className="text-sm text-muted-foreground">German top division</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">FootyStats</Badge>
                  <span className="font-medium">76.2%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Serie A</div>
                  <div className="text-sm text-muted-foreground">Italian top division</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">WhoScored</Badge>
                  <span className="font-medium">75.6%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Ligue 1</div>
                  <div className="text-sm text-muted-foreground">French top division</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">WhoScored</Badge>
                  <span className="font-medium">73.9%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
