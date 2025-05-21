"use client"

import { useState } from "react"
import { Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SpecializedBetsList } from "@/components/specialized-bets-list"

export function SpecializedBetsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [betType, setBetType] = useState("all")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Specialized Betting Opportunities</h1>
          <p className="text-muted-foreground">
            High-value bets beyond traditional match results with detailed explanations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={betType} onValueChange={setBetType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Bet Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bet Types</SelectItem>
              <SelectItem value="corners">Corners</SelectItem>
              <SelectItem value="cards">Cards</SelectItem>
              <SelectItem value="penalties">Penalties</SelectItem>
              <SelectItem value="offsides">Offsides</SelectItem>
              <SelectItem value="goals">Goal Markets</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="hover:bg-amber-50">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cozy-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corner Bets</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">72% historical accuracy</p>
          </CardContent>
        </Card>
        <Card className="cozy-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Card Markets</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">68% historical accuracy</p>
          </CardContent>
        </Card>
        <Card className="cozy-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penalty Markets</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">65% historical accuracy</p>
          </CardContent>
        </Card>
        <Card className="cozy-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offside Markets</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">70% historical accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Types</TabsTrigger>
          <TabsTrigger value="corners">Corners</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="penalties">Penalties</TabsTrigger>
          <TabsTrigger value="offsides">Offsides</TabsTrigger>
          <TabsTrigger value="goals">Goal Markets</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <SpecializedBetsList betType="all" />
        </TabsContent>
        <TabsContent value="corners" className="space-y-4">
          <SpecializedBetsList betType="corners" />
        </TabsContent>
        <TabsContent value="cards" className="space-y-4">
          <SpecializedBetsList betType="cards" />
        </TabsContent>
        <TabsContent value="penalties" className="space-y-4">
          <SpecializedBetsList betType="penalties" />
        </TabsContent>
        <TabsContent value="offsides" className="space-y-4">
          <SpecializedBetsList betType="offsides" />
        </TabsContent>
        <TabsContent value="goals" className="space-y-4">
          <SpecializedBetsList betType="goals" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
