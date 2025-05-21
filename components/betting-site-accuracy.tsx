"use client"

import { useState } from "react"
import { Filter, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AccuracyRankings } from "@/components/accuracy-rankings"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AccuracyChart } from "@/components/accuracy-chart"
import { MarketAccuracy } from "@/components/market-accuracy"

export function BettingSiteAccuracy() {
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prediction Accuracy Rankings</h1>
          <p className="text-muted-foreground">
            Historical performance data of betting sites based on prediction accuracy
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cozy-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Accurate Site</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Highest overall prediction accuracy across all markets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">BetExpert</div>
            <p className="text-xs text-muted-foreground">
              72.8% accuracy over{" "}
              {timeRange === "1m"
                ? "the last month"
                : timeRange === "3m"
                  ? "the last 3 months"
                  : timeRange === "6m"
                    ? "the last 6 months"
                    : timeRange === "1y"
                      ? "the last year"
                      : "all time"}
            </p>
          </CardContent>
        </Card>
        <Card className="cozy-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best for Value Bets</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Site with highest ROI on recommended value bets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">OddsPortal</div>
            <p className="text-xs text-muted-foreground">18.2% average ROI on value picks</p>
          </CardContent>
        </Card>
        <Card className="cozy-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best for Underdogs</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Highest accuracy when predicting underdog wins</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">FootyStats</div>
            <p className="text-xs text-muted-foreground">31.5% accuracy on underdog predictions</p>
          </CardContent>
        </Card>
        <Card className="cozy-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Improved</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Site with the biggest accuracy improvement</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BetRadar</div>
            <p className="text-xs text-muted-foreground">+8.3% improvement in the last 3 months</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rankings">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rankings">Accuracy Rankings</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
          <TabsTrigger value="markets">Market Breakdown</TabsTrigger>
          <TabsTrigger value="testimonials">User Testimonials</TabsTrigger>
        </TabsList>
        <TabsContent value="rankings" className="space-y-4">
          <AccuracyRankings timeRange={timeRange} />
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical Accuracy Trends</CardTitle>
              <CardDescription>How prediction accuracy has changed over time for top betting sites</CardDescription>
            </CardHeader>
            <CardContent>
              <AccuracyChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="markets" className="space-y-4">
          <MarketAccuracy timeRange={timeRange} />
        </TabsContent>
        <TabsContent value="testimonials" className="space-y-4">
          <TestimonialsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
