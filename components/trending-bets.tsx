"use client"

import { useState } from "react"
import { ArrowRight, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnalysisDialog } from "@/components/analysis-dialog"

export function TrendingBets() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisType, setAnalysisType] = useState<"player" | "team">("team")
  const [analysisId, setAnalysisId] = useState<string>("")

  const openTeamAnalysis = (team: string) => {
    setAnalysisType("team")
    setAnalysisId(team === "Arsenal" ? "t1" : "t2")
    setShowAnalysis(true)
  }

  const openPlayerAnalysis = () => {
    setAnalysisType("player")
    setAnalysisId("p1")
    setShowAnalysis(true)
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cozy-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                Trending
              </Badge>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle
              className="mt-2 cursor-pointer hover:text-amber-600 transition-colors"
              onClick={() => openTeamAnalysis("Arsenal")}
            >
              Arsenal vs Man United
            </CardTitle>
            <CardDescription>Premier League • Today, 20:00</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Arsenal Win</span>
                  <span className="font-medium">52%</span>
                </div>
                <Progress value={52} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Draw</span>
                  <span className="font-medium">28%</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Man United Win</span>
                  <span className="font-medium">20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">2.10</div>
                <div className="text-xs text-muted-foreground">Home</div>
              </div>
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">3.40</div>
                <div className="text-xs text-muted-foreground">Draw</div>
              </div>
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">3.50</div>
                <div className="text-xs text-muted-foreground">Away</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={openPlayerAnalysis}>
              View Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="cozy-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                Trending
              </Badge>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle className="mt-2">Barcelona vs Real Madrid</CardTitle>
            <CardDescription>La Liga • Tomorrow, 21:00</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Barcelona Win</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Draw</span>
                  <span className="font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Real Madrid Win</span>
                  <span className="font-medium">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">2.25</div>
                <div className="text-xs text-muted-foreground">Home</div>
              </div>
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">3.50</div>
                <div className="text-xs text-muted-foreground">Draw</div>
              </div>
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">2.90</div>
                <div className="text-xs text-muted-foreground">Away</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="cozy-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                Trending
              </Badge>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle className="mt-2">Bayern Munich vs Dortmund</CardTitle>
            <CardDescription>Bundesliga • Saturday, 18:30</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Bayern Win</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Draw</span>
                  <span className="font-medium">20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Dortmund Win</span>
                  <span className="font-medium">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">1.75</div>
                <div className="text-xs text-muted-foreground">Home</div>
              </div>
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">3.80</div>
                <div className="text-xs text-muted-foreground">Draw</div>
              </div>
              <div className="rounded-md bg-muted p-2">
                <div className="font-medium">4.50</div>
                <div className="text-xs text-muted-foreground">Away</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
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
