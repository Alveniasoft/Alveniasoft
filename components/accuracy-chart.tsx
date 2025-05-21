"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for the accuracy chart
const generateChartData = (timeRange: string) => {
  // Different data points based on time range
  const dataPoints =
    timeRange === "1m" ? 4 : timeRange === "3m" ? 12 : timeRange === "6m" ? 24 : timeRange === "1y" ? 52 : 104

  const data = []

  // Base accuracies for each site
  const baseAccuracies = {
    BetExpert: 70,
    OddsPortal: 68,
    FootyStats: 67,
    WhoScored: 66,
    BetRadar: 60,
  }

  // Generate data with realistic fluctuations and trends
  for (let i = 0; i < dataPoints; i++) {
    const point: any = {
      name:
        timeRange === "1m"
          ? `Week ${i + 1}`
          : timeRange === "3m" || timeRange === "6m"
            ? `Month ${i + 1}`
            : `Quarter ${Math.floor(i / 12) + 1} Year ${Math.floor(i / 48) + 1}`,
    }

    // Add some realistic fluctuations and trends
    point.BetExpert = baseAccuracies.BetExpert + Math.sin(i / 5) * 3 + (i / dataPoints) * 4
    point.OddsPortal = baseAccuracies.OddsPortal + Math.cos(i / 4) * 4 + (i / dataPoints) * 3
    point.FootyStats = baseAccuracies.FootyStats + Math.sin(i / 6) * 5 + (i / dataPoints) * 3.5
    point.WhoScored = baseAccuracies.WhoScored + Math.cos(i / 7) * 3 + (i / dataPoints) * 3

    // Make BetRadar show significant improvement over time
    point.BetRadar = baseAccuracies.BetRadar + Math.sin(i / 5) * 2 + (i / dataPoints) * 10

    data.push(point)
  }

  return data
}

interface AccuracyChartProps {
  timeRange: string
}

export function AccuracyChart({ timeRange }: AccuracyChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [chartType, setChartType] = useState<"overall" | "home" | "draw" | "away">("overall")

  useEffect(() => {
    setChartData(generateChartData(timeRange))
  }, [timeRange])

  return (
    <div className="space-y-4">
      <Tabs value={chartType} onValueChange={(value) => setChartType(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overall">Overall Accuracy</TabsTrigger>
          <TabsTrigger value="home">Home Win</TabsTrigger>
          <TabsTrigger value="draw">Draw</TabsTrigger>
          <TabsTrigger value="away">Away Win</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="pt-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[50, 80]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="BetExpert" stroke="#22c55e" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="OddsPortal" stroke="#3b82f6" />
                <Line type="monotone" dataKey="FootyStats" stroke="#f59e0b" />
                <Line type="monotone" dataKey="WhoScored" stroke="#8b5cf6" />
                <Line type="monotone" dataKey="BetRadar" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Chart Analysis:</strong> This chart shows how prediction accuracy has changed over time for the top 5
          betting sites. Note the significant improvement in BetRadar's accuracy in recent periods, while BetExpert has
          maintained consistently high accuracy. Seasonal fluctuations are normal as leagues start and end.
        </p>
      </div>
    </div>
  )
}
