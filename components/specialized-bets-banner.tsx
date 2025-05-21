"use client"

import React from "react"

import { useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for specialized bets
const specializedBets = [
  {
    id: "1",
    match: "Arsenal vs Manchester United",
    league: "Premier League",
    time: "Today, 20:00",
    betType: "Corner Range",
    prediction: "9-11 Corners",
    odds: 2.75,
    confidence: 78,
    explanation:
      "Both teams average 5.3 corners per game. In their last 5 meetings, the average total corners was 10.2, falling within this range 80% of the time.",
    source: "BetExpert",
  },
  {
    id: "2",
    match: "Barcelona vs Real Madrid",
    league: "La Liga",
    time: "Tomorrow, 21:00",
    betType: "Cards",
    prediction: "Over 5.5 Cards",
    odds: 1.95,
    confidence: 82,
    explanation:
      "El Clásico historically averages 6.8 cards per match. The assigned referee averages 5.2 cards per game this season, with a 75% rate of showing 6+ cards in high-intensity matches.",
    source: "FootyStats",
  },
  {
    id: "3",
    match: "Bayern Munich vs Borussia Dortmund",
    league: "Bundesliga",
    time: "Saturday, 18:30",
    betType: "Penalty",
    prediction: "Penalty Awarded: Yes",
    odds: 2.4,
    confidence: 65,
    explanation:
      "Dortmund has conceded 5 penalties in their last 10 away games. The assigned VAR official has awarded 8 penalties in his last 12 matches, significantly above league average.",
    source: "OddsPortal",
  },
  {
    id: "4",
    match: "Liverpool vs Chelsea",
    league: "Premier League",
    time: "Sunday, 16:30",
    betType: "Offside",
    prediction: "Over 3.5 Offsides",
    odds: 1.85,
    confidence: 76,
    explanation:
      "Chelsea's high defensive line has resulted in opponents being caught offside 4.7 times per game on average. Liverpool's fast wingers have been caught offside 2.3 times per game this season.",
    source: "BetExpert",
  },
  {
    id: "5",
    match: "PSG vs Marseille",
    league: "Ligue 1",
    time: "Sunday, 20:45",
    betType: "First Half Goals",
    prediction: "Over 1.5 First Half Goals",
    odds: 2.1,
    confidence: 71,
    explanation:
      "PSG has scored in the first half in 85% of their home games this season. Both teams combined average 1.8 goals in the first half, with 2+ first half goals in 70% of their last 10 meetings.",
    source: "WhoScored",
  },
  {
    id: "6",
    match: "Juventus vs Inter Milan",
    league: "Serie A",
    time: "Sunday, 19:00",
    betType: "Goal Time",
    prediction: "Goal Before 30:00",
    odds: 1.75,
    confidence: 74,
    explanation:
      "Inter Milan has scored within the first 30 minutes in 65% of their away games. Juventus has conceded early goals in 4 of their last 6 home matches against top-5 opponents.",
    source: "BetRadar",
  },
]

export function SpecializedBetsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Calculate the indices for the visible bets (3 at a time)
  const visibleBets = [
    specializedBets[currentIndex % specializedBets.length],
    specializedBets[(currentIndex + 1) % specializedBets.length],
    specializedBets[(currentIndex + 2) % specializedBets.length],
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % specializedBets.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + specializedBets.length) % specializedBets.length)
  }

  // Auto-rotate the banner every 5 seconds
  React.useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  return (
    <div className="relative overflow-hidden rounded-xl border bg-amber-50/50 p-1 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <h3 className="text-lg font-semibold">Favorable Specialized Bets</h3>
          <p className="text-sm text-muted-foreground">High-value betting opportunities beyond match results</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} className="h-8 w-8 rounded-full">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} className="h-8 w-8 rounded-full">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        {visibleBets.map((bet) => (
          <Card key={bet.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardContent className="p-0">
              <div className="bg-amber-100/50 px-4 py-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    {bet.betType}
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-amber-600 text-sm font-medium">
                          {bet.confidence}% Confidence
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="max-w-xs">Based on historical data and current form</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <h4 className="mt-1 font-semibold">{bet.match}</h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{bet.league}</span>
                  <span>{bet.time}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-medium">{bet.prediction}</div>
                  <div className="text-xl font-bold text-amber-600">{bet.odds}</div>
                </div>

                <div className="relative rounded-lg bg-amber-50 p-3 text-sm">
                  <div className="absolute -top-2 -left-2 rounded-full bg-amber-100 p-1">
                    <Info className="h-3 w-3 text-amber-600" />
                  </div>
                  <p className="text-amber-800">{bet.explanation}</p>
                  <div className="mt-2 text-xs text-right text-amber-600">Source: {bet.source}</div>
                </div>

                <Button className="mt-3 w-full bg-amber-600 hover:bg-amber-700">
                  Place Bet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
