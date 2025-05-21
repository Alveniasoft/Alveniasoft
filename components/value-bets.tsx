"use client"

import { ArrowUpRight, Percent } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ValueBets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="cozy-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
              Value Bet
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-amber-600 text-sm font-medium">
                    <Percent className="h-3 w-3 mr-1" />
                    18% Value
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The odds suggest an 18% higher chance than bookmakers are pricing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardTitle className="mt-2">Juventus vs Inter Milan</CardTitle>
          <CardDescription>Serie A • Sunday, 19:00</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Recommended Bet</div>
                <div className="text-lg font-bold mt-1">Juventus to Win</div>
              </div>
              <div className="text-2xl font-bold text-amber-600">2.45</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Implied Probability</div>
                <div className="font-medium">40.8%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Our Probability</div>
                <div className="font-medium">48.2%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Best Bookmaker</div>
                <div className="font-medium">William Hill</div>
              </div>
              <div>
                <div className="text-muted-foreground">Market Average</div>
                <div className="font-medium">2.38</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-amber-600 hover:bg-amber-700">
            Place Bet
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="cozy-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
              Value Bet
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-amber-600 text-sm font-medium">
                    <Percent className="h-3 w-3 mr-1" />
                    12% Value
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The odds suggest a 12% higher chance than bookmakers are pricing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardTitle className="mt-2">PSG vs Marseille</CardTitle>
          <CardDescription>Ligue 1 • Sunday, 20:45</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Recommended Bet</div>
                <div className="text-lg font-bold mt-1">Marseille to Win</div>
              </div>
              <div className="text-2xl font-bold text-amber-600">5.60</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Implied Probability</div>
                <div className="font-medium">17.9%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Our Probability</div>
                <div className="font-medium">20.0%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Best Bookmaker</div>
                <div className="font-medium">Betway</div>
              </div>
              <div>
                <div className="text-muted-foreground">Market Average</div>
                <div className="font-medium">5.45</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-amber-600 hover:bg-amber-700">
            Place Bet
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="cozy-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
              Value Bet
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-amber-600 text-sm font-medium">
                    <Percent className="h-3 w-3 mr-1" />
                    9% Value
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The odds suggest a 9% higher chance than bookmakers are pricing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardTitle className="mt-2">Arsenal vs Man United</CardTitle>
          <CardDescription>Premier League • Today, 20:00</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Recommended Bet</div>
                <div className="text-lg font-bold mt-1">Draw</div>
              </div>
              <div className="text-2xl font-bold text-amber-600">3.45</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Implied Probability</div>
                <div className="font-medium">29.0%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Our Probability</div>
                <div className="font-medium">31.6%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Best Bookmaker</div>
                <div className="font-medium">Betway</div>
              </div>
              <div>
                <div className="text-muted-foreground">Market Average</div>
                <div className="font-medium">3.35</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-amber-600 hover:bg-amber-700">
            Place Bet
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
