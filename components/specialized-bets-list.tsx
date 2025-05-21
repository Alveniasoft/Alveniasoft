"use client"

import { ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Extended mock data for specialized bets
const allSpecializedBets = [
  // Corner bets
  {
    id: "c1",
    match: "Arsenal vs Manchester United",
    league: "Premier League",
    time: "Today, 20:00",
    betType: "Corner Range",
    category: "corners",
    prediction: "9-11 Corners",
    odds: 2.75,
    confidence: 78,
    explanation:
      "Both teams average 5.3 corners per game. In their last 5 meetings, the average total corners was 10.2, falling within this range 80% of the time.",
    source: "BetExpert",
    additionalStats: "Arsenal avg. 6.2 corners at home, Man Utd avg. 4.8 corners away",
  },
  {
    id: "c2",
    match: "Liverpool vs Chelsea",
    league: "Premier League",
    time: "Sunday, 16:30",
    betType: "Team Corners",
    category: "corners",
    prediction: "Liverpool Over 5.5 Corners",
    odds: 1.85,
    confidence: 75,
    explanation:
      "Liverpool averages 7.2 corners per home game this season. Chelsea concedes an average of 6.1 corners when playing away against top-6 teams.",
    source: "FootyStats",
    additionalStats: "Liverpool has had 6+ corners in 85% of home games",
  },
  {
    id: "c3",
    match: "Manchester City vs Tottenham",
    league: "Premier League",
    time: "Saturday, 17:30",
    betType: "First Half Corners",
    category: "corners",
    prediction: "Over 4.5 First Half Corners",
    odds: 1.95,
    confidence: 72,
    explanation:
      "Man City averages 3.8 corners in the first half of home games. Both teams combined average 5.7 first half corners in their last 8 meetings.",
    source: "OddsPortal",
    additionalStats: "5+ first half corners in 78% of Man City home games",
  },

  // Card bets
  {
    id: "cd1",
    match: "Barcelona vs Real Madrid",
    league: "La Liga",
    time: "Tomorrow, 21:00",
    betType: "Cards",
    category: "cards",
    prediction: "Over 5.5 Cards",
    odds: 1.95,
    confidence: 82,
    explanation:
      "El Clásico historically averages 6.8 cards per match. The assigned referee averages 5.2 cards per game this season, with a 75% rate of showing 6+ cards in high-intensity matches.",
    source: "FootyStats",
    additionalStats: "Last 5 meetings averaged 7.2 cards",
  },
  {
    id: "cd2",
    match: "Atletico Madrid vs Sevilla",
    league: "La Liga",
    time: "Sunday, 18:00",
    betType: "Team Cards",
    category: "cards",
    prediction: "Atletico Madrid Over 2.5 Cards",
    odds: 1.8,
    confidence: 79,
    explanation:
      "Atletico Madrid averages 2.8 cards per home game. The assigned referee has shown Atletico 3+ cards in 7 of their last 9 matches he officiated.",
    source: "BetExpert",
    additionalStats: "Atletico has received 3+ cards in 75% of matches vs top-8 teams",
  },
  {
    id: "cd3",
    match: "Roma vs Lazio",
    league: "Serie A",
    time: "Sunday, 20:45",
    betType: "First Card",
    category: "cards",
    prediction: "Roma to Receive First Card",
    odds: 1.9,
    confidence: 68,
    explanation:
      "Roma has received the first card in 70% of their derby matches against Lazio. Their aggressive pressing style in the opening 15 minutes leads to early fouls.",
    source: "WhoScored",
    additionalStats: "Roma received first card in 8 of last 10 derbies",
  },

  // Penalty bets
  {
    id: "p1",
    match: "Bayern Munich vs Borussia Dortmund",
    league: "Bundesliga",
    time: "Saturday, 18:30",
    betType: "Penalty",
    category: "penalties",
    prediction: "Penalty Awarded: Yes",
    odds: 2.4,
    confidence: 65,
    explanation:
      "Dortmund has conceded 5 penalties in their last 10 away games. The assigned VAR official has awarded 8 penalties in his last 12 matches, significantly above league average.",
    source: "OddsPortal",
    additionalStats: "Bayern has won 4 penalties in last 8 home games",
  },
  {
    id: "p2",
    match: "Manchester United vs Leicester",
    league: "Premier League",
    time: "Monday, 20:00",
    betType: "Penalty",
    category: "penalties",
    prediction: "Man United to Score a Penalty",
    odds: 3.75,
    confidence: 62,
    explanation:
      "Leicester has conceded 4 penalties in their last 7 away games. Man United has been awarded the 2nd most penalties in the league this season, converting 85% of them.",
    source: "BetExpert",
    additionalStats: "Bruno Fernandes has converted 16 of 18 penalties for United",
  },

  // Offside bets
  {
    id: "o1",
    match: "Liverpool vs Chelsea",
    league: "Premier League",
    time: "Sunday, 16:30",
    betType: "Offside",
    category: "offsides",
    prediction: "Over 3.5 Offsides",
    odds: 1.85,
    confidence: 76,
    explanation:
      "Chelsea's high defensive line has resulted in opponents being caught offside 4.7 times per game on average. Liverpool's fast wingers have been caught offside 2.3 times per game this season.",
    source: "BetExpert",
    additionalStats: "4+ offsides in 80% of Chelsea away games",
  },
  {
    id: "o2",
    match: "PSG vs Monaco",
    league: "Ligue 1",
    time: "Friday, 20:45",
    betType: "Team Offsides",
    category: "offsides",
    prediction: "PSG Over 2.5 Offsides",
    odds: 1.95,
    confidence: 74,
    explanation:
      "PSG's attacking trio has been caught offside 3.2 times per game on average. Monaco's defensive line sits deeper against top teams, catching opponents offside 3.8 times per game.",
    source: "WhoScored",
    additionalStats: "Mbappé averages 1.7 offsides per game",
  },

  // Goal market bets
  {
    id: "g1",
    match: "PSG vs Marseille",
    league: "Ligue 1",
    time: "Sunday, 20:45",
    betType: "First Half Goals",
    category: "goals",
    prediction: "Over 1.5 First Half Goals",
    odds: 2.1,
    confidence: 71,
    explanation:
      "PSG has scored in the first half in 85% of their home games this season. Both teams combined average 1.8 goals in the first half, with 2+ first half goals in 70% of their last 10 meetings.",
    source: "WhoScored",
    additionalStats: "PSG scored in first 30 minutes in 75% of home games",
  },
  {
    id: "g2",
    match: "Juventus vs Inter Milan",
    league: "Serie A",
    time: "Sunday, 19:00",
    betType: "Goal Time",
    category: "goals",
    prediction: "Goal Before 30:00",
    odds: 1.75,
    confidence: 74,
    explanation:
      "Inter Milan has scored within the first 30 minutes in 65% of their away games. Juventus has conceded early goals in 4 of their last 6 home matches against top-5 opponents.",
    source: "BetRadar",
    additionalStats: "First 30 minute goals in 70% of matches between these teams",
  },
  {
    id: "g3",
    match: "Arsenal vs Tottenham",
    league: "Premier League",
    time: "Next Sunday, 16:30",
    betType: "Goal Bands",
    category: "goals",
    prediction: "2-3 Total Goals",
    odds: 2.05,
    confidence: 77,
    explanation:
      "North London derbies have ended with 2-3 goals in 75% of the last 12 meetings. Both teams are averaging 2.4 goals per game in their recent fixtures.",
    source: "FootyStats",
    additionalStats: "2-3 goals in 9 of last 12 North London derbies",
  },
]

interface SpecializedBetsListProps {
  betType: string
}

export function SpecializedBetsList({ betType }: SpecializedBetsListProps) {
  // Filter bets based on selected type
  const filteredBets =
    betType === "all" ? allSpecializedBets : allSpecializedBets.filter((bet) => bet.category === betType)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredBets.map((bet) => (
        <Card key={bet.id} className="overflow-hidden transition-all duration-300 hover:shadow-md cozy-shadow">
          <CardContent className="p-0">
            <div className="bg-amber-100/50 px-4 py-3">
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
                <div className="mt-2 text-xs text-amber-700">
                  <strong>Additional Stats:</strong> {bet.additionalStats}
                </div>
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
  )
}
