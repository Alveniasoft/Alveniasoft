"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, Calculator, Check, Percent, Sigma, Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Types for our betting data
interface Bet {
  id: string
  match: string
  league: string
  prediction: string
  odds: number
  probability: number
  expectedValue: number
  confidence: number
  riskLevel: "Low" | "Medium" | "High"
  reasoning: string
  time: string
}

interface BettingTicket {
  id: string
  name: string
  bets: Bet[]
  totalOdds: number
  expectedReturn: number
  riskProfile: "Conservative" | "Balanced" | "Aggressive"
  winProbability: number
  riskAssessment: string
  recommendedStake: {
    min: number
    max: number
  }
}

// Mock data for optimized betting tickets
const bettingTickets: BettingTicket[] = [
  {
    id: "ticket1",
    name: "Conservative Value Ticket",
    riskProfile: "Conservative",
    winProbability: 42.5,
    expectedReturn: 2.35,
    totalOdds: 8.76,
    riskAssessment:
      "This ticket focuses on high-probability outcomes with positive expected value. The selections have strong statistical backing and relatively low variance.",
    recommendedStake: {
      min: 10,
      max: 50,
    },
    bets: [
      {
        id: "bet1",
        match: "Arsenal vs Manchester United",
        league: "Premier League",
        prediction: "Under 3.5 Goals",
        odds: 1.65,
        probability: 68,
        expectedValue: 1.12,
        confidence: 75,
        riskLevel: "Low",
        reasoning:
          "Historical data shows 72% of matches between these teams have ended with under 3.5 goals. Both teams are currently showing strong defensive metrics with Arsenal conceding only 0.8 goals per game and Man United 1.1 goals per game.",
        time: "Today, 20:00",
      },
      {
        id: "bet2",
        match: "Bayern Munich vs Borussia Dortmund",
        league: "Bundesliga",
        prediction: "Bayern Munich to Win",
        odds: 1.75,
        probability: 65,
        expectedValue: 1.14,
        confidence: 72,
        riskLevel: "Low",
        reasoning:
          "Bayern has won 7 of their last 8 home matches against Dortmund. Their xG differential at home is +1.8 compared to Dortmund's away xG differential of -0.3. Bayern's key performance indicators show strong form.",
        time: "Saturday, 18:30",
      },
      {
        id: "bet3",
        match: "Barcelona vs Real Madrid",
        league: "La Liga",
        prediction: "Both Teams to Score",
        odds: 1.7,
        probability: 67,
        expectedValue: 1.14,
        confidence: 70,
        riskLevel: "Low",
        reasoning:
          "Both teams have scored in 8 of the last 10 El Clásico matches. Barcelona is averaging 2.4 goals per game while Real Madrid is at 2.1. Both teams have scored in 75% of their respective matches this season.",
        time: "Tomorrow, 21:00",
      },
      {
        id: "bet4",
        match: "Liverpool vs Chelsea",
        league: "Premier League",
        prediction: "Liverpool to Win or Draw",
        odds: 1.3,
        probability: 82,
        expectedValue: 1.07,
        confidence: 85,
        riskLevel: "Low",
        reasoning:
          "Liverpool has not lost at home in their last 15 matches. Chelsea's away form shows vulnerability with a 40% win rate. Liverpool's expected goals at home is 2.3 vs Chelsea's away xG of 1.4.",
        time: "Sunday, 16:30",
      },
      {
        id: "bet5",
        match: "PSG vs Marseille",
        league: "Ligue 1",
        prediction: "PSG to Win",
        odds: 1.6,
        probability: 70,
        expectedValue: 1.12,
        confidence: 75,
        riskLevel: "Low",
        reasoning:
          "PSG has won 9 of their last 10 home matches against Marseille. Their home xG is 2.7 vs Marseille's away xG of 1.2. PSG's key players are all fit while Marseille has 2 key defenders suspended.",
        time: "Sunday, 20:45",
      },
      {
        id: "bet16",
        match: "Kaizer Chiefs vs Orlando Pirates",
        league: "South African Premier Division",
        prediction: "Under 2.5 Goals",
        odds: 1.75,
        probability: 65,
        expectedValue: 1.14,
        confidence: 72,
        riskLevel: "Low",
        reasoning:
          "Historical data shows 70% of Soweto derbies have ended with under 2.5 goals. Both teams are showing defensive improvement with Kaizer Chiefs conceding only 0.9 goals per game and Orlando Pirates 1.0 goals per game in their last 5 matches.",
        time: "Saturday, 15:00",
      },
    ],
  },
  {
    id: "ticket2",
    name: "Balanced Value Ticket",
    riskProfile: "Balanced",
    winProbability: 28.6,
    expectedReturn: 3.5,
    totalOdds: 18.42,
    riskAssessment:
      "This ticket balances risk and reward by combining some safer bets with medium-risk selections that have strong value indicators. The correlation between selections has been minimized to reduce overall variance.",
    recommendedStake: {
      min: 5,
      max: 30,
    },
    bets: [
      {
        id: "bet6",
        match: "Arsenal vs Manchester United",
        league: "Premier League",
        prediction: "Draw",
        odds: 3.4,
        probability: 32,
        expectedValue: 1.09,
        confidence: 65,
        riskLevel: "Medium",
        reasoning:
          "Historical data shows 35% of recent matches between these evenly matched teams have ended in draws. The draw is undervalued based on team form metrics and tactical analysis. Both teams have similar xG differentials in recent matches.",
        time: "Today, 20:00",
      },
      {
        id: "bet7",
        match: "Bayern Munich vs Borussia Dortmund",
        league: "Bundesliga",
        prediction: "Over 2.5 Goals",
        odds: 1.55,
        probability: 72,
        expectedValue: 1.12,
        confidence: 78,
        riskLevel: "Low",
        reasoning:
          "The last 10 matches between these teams have averaged 3.8 goals. Both teams are in strong attacking form with Bayern scoring 2.8 goals per game and Dortmund 2.3 goals per game. Expected goals models predict 3.2 total goals.",
        time: "Saturday, 18:30",
      },
      {
        id: "bet8",
        match: "Barcelona vs Real Madrid",
        league: "La Liga",
        prediction: "Barcelona to Win",
        odds: 2.25,
        probability: 48,
        expectedValue: 1.08,
        confidence: 65,
        riskLevel: "Medium",
        reasoning:
          "Barcelona has a strong home record in El Clásico with 60% win rate over the last 10 home matches. Their current xG at home is 2.4 vs Real Madrid's away xG of 1.7. Barcelona has key players returning from injury.",
        time: "Tomorrow, 21:00",
      },
      {
        id: "bet9",
        match: "Juventus vs Inter Milan",
        league: "Serie A",
        prediction: "Under 2.5 Goals",
        odds: 1.85,
        probability: 60,
        expectedValue: 1.11,
        confidence: 70,
        riskLevel: "Medium",
        reasoning:
          "7 of the last 10 matches between these teams have had under 2.5 goals. Both teams have strong defensive metrics with Juventus conceding 0.7 goals per game and Inter 0.9. Tactical analysis suggests a cautious approach from both sides.",
        time: "Sunday, 19:00",
      },
      {
        id: "bet10",
        match: "Ajax vs PSV",
        league: "Eredivisie",
        prediction: "Both Teams to Score",
        odds: 1.65,
        probability: 68,
        expectedValue: 1.12,
        confidence: 75,
        riskLevel: "Low",
        reasoning:
          "Both teams have scored in 80% of matches between these teams over the last 3 seasons. Both teams are averaging over 2 goals per game this season. The defensive metrics for both teams show vulnerability to conceding.",
        time: "Sunday, 15:45",
      },
      {
        id: "bet17",
        match: "Mamelodi Sundowns vs SuperSport United",
        league: "South African Premier Division",
        prediction: "Mamelodi Sundowns to Win",
        odds: 1.85,
        probability: 62,
        expectedValue: 1.15,
        confidence: 70,
        riskLevel: "Medium",
        reasoning:
          "Mamelodi Sundowns has won 8 of their last 10 matches against SuperSport United. Their xG differential at home is +1.5 compared to SuperSport's away xG differential of -0.4. Sundowns' key performance indicators show strong form with 75% possession in recent matches.",
        time: "Sunday, 14:30",
      },
    ],
  },
  {
    id: "ticket3",
    name: "High Value Aggressive Ticket",
    riskProfile: "Aggressive",
    winProbability: 12.8,
    expectedReturn: 7.8,
    totalOdds: 42.64,
    riskAssessment:
      "This ticket targets maximum expected value with higher-risk selections. While the win probability is lower, the positive expected value across all selections makes this a mathematically sound long-term strategy for those with higher risk tolerance.",
    recommendedStake: {
      min: 2,
      max: 15,
    },
    bets: [
      {
        id: "bet11",
        match: "Arsenal vs Manchester United",
        league: "Premier League",
        prediction: "Manchester United to Win",
        odds: 3.5,
        probability: 30,
        expectedValue: 1.05,
        confidence: 60,
        riskLevel: "High",
        reasoning:
          "Man United has shown strong counter-attacking metrics which match well against Arsenal's high defensive line. Their xG in away matches against top-6 teams is 1.8, suggesting they create quality chances. Value bet based on market overreaction to recent form.",
        time: "Today, 20:00",
      },
      {
        id: "bet12",
        match: "RB Leipzig vs Bayer Leverkusen",
        league: "Bundesliga",
        prediction: "Bayer Leverkusen to Win",
        odds: 3.2,
        probability: 35,
        expectedValue: 1.12,
        confidence: 65,
        riskLevel: "High",
        reasoning:
          "Leverkusen's away form has been exceptional with an xG differential of +1.2. Leipzig has key defensive players injured. Tactical matchup favors Leverkusen's pressing style against Leipzig's build-up patterns.",
        time: "Saturday, 15:30",
      },
      {
        id: "bet13",
        match: "Barcelona vs Real Madrid",
        league: "La Liga",
        prediction: "Real Madrid to Win",
        odds: 2.9,
        probability: 38,
        expectedValue: 1.1,
        confidence: 62,
        riskLevel: "Medium",
        reasoning:
          "Real Madrid has won 4 of the last 7 El Clásico matches. Their counter-attacking metrics show strong efficiency against high-pressing teams. Key performance indicators suggest they're undervalued in the current market.",
        time: "Tomorrow, 21:00",
      },
      {
        id: "bet14",
        match: "Tottenham vs Manchester City",
        league: "Premier League",
        prediction: "Tottenham to Win",
        odds: 5.0,
        probability: 22,
        expectedValue: 1.1,
        confidence: 55,
        riskLevel: "High",
        reasoning:
          "Tottenham has won 4 of their last 6 home matches against Man City. Their tactical approach specifically counters City's style. Expected goals models show this match closer to 3.50 odds, suggesting significant value.",
        time: "Next Wednesday, 20:00",
      },
      {
        id: "bet15",
        match: "AC Milan vs Napoli",
        league: "Serie A",
        prediction: "Napoli to Win",
        odds: 2.7,
        probability: 40,
        expectedValue: 1.08,
        confidence: 65,
        riskLevel: "Medium",
        reasoning:
          "Napoli's away form shows strong underlying metrics with an xG differential of +0.9. Milan is missing key midfielders. Tactical analysis shows Napoli's pressing will exploit Milan's current build-up vulnerabilities.",
        time: "Sunday, 20:45",
      },
      {
        id: "bet18",
        match: "ZESCO United vs Nkana FC",
        league: "Zambian Super League",
        prediction: "ZESCO United to Win",
        odds: 2.1,
        probability: 55,
        expectedValue: 1.16,
        confidence: 68,
        riskLevel: "Medium",
        reasoning:
          "ZESCO United has won 7 of their last 10 home matches. Their expected goals at home is 1.8 vs Nkana's away xG of 0.9. ZESCO's home advantage is particularly strong with a 70% win rate this season.",
        time: "Saturday, 14:00",
      },
      {
        id: "bet19",
        match: "Dynamos FC vs Highlanders FC",
        league: "Zimbabwean Premier Soccer League",
        prediction: "Dynamos FC to Win or Draw",
        odds: 1.6,
        probability: 72,
        expectedValue: 1.15,
        confidence: 75,
        riskLevel: "Low",
        reasoning:
          "Dynamos has not lost at home to Highlanders in their last 8 meetings. Their home xG is 1.7 vs Highlanders' away xG of 0.8. Dynamos has key players returning from injury which strengthens their midfield significantly.",
        time: "Sunday, 15:00",
      },
    ],
  },
  {
    id: "ticket4",
    name: "Southern African Focus Ticket",
    riskProfile: "Balanced",
    winProbability: 22.4,
    expectedReturn: 4.5,
    totalOdds: 24.86,
    riskAssessment:
      "This ticket focuses exclusively on Southern African leagues, leveraging regional knowledge and market inefficiencies. These markets often have less efficient pricing due to lower betting volumes, creating value opportunities.",
    recommendedStake: {
      min: 5,
      max: 25,
    },
    bets: [
      {
        id: "bet20",
        match: "Kaizer Chiefs vs Orlando Pirates",
        league: "South African Premier Division",
        prediction: "Both Teams to Score",
        odds: 1.95,
        probability: 58,
        expectedValue: 1.13,
        confidence: 68,
        riskLevel: "Medium",
        reasoning:
          "Both teams have scored in 65% of recent Soweto derbies. The rivalry tends to produce open games with both teams averaging 1.5+ goals per game in their last 5 matches. Both teams have scored in 70% of their respective matches this season.",
        time: "Saturday, 15:00",
      },
      {
        id: "bet21",
        match: "Mamelodi Sundowns vs SuperSport United",
        league: "South African Premier Division",
        prediction: "Over 2.5 Goals",
        odds: 2.1,
        probability: 55,
        expectedValue: 1.16,
        confidence: 65,
        riskLevel: "Medium",
        reasoning:
          "Matches between these teams have averaged 2.8 goals in the last 10 meetings. Mamelodi Sundowns is averaging 2.2 goals per game while SuperSport is scoring 1.4 goals per game. Expected goals models predict 2.9 total goals for this fixture.",
        time: "Sunday, 14:30",
      },
      {
        id: "bet22",
        match: "ZESCO United vs Nkana FC",
        league: "Zambian Super League",
        prediction: "ZESCO United -1 Handicap",
        odds: 3.2,
        probability: 35,
        expectedValue: 1.12,
        confidence: 60,
        riskLevel: "High",
        reasoning:
          "ZESCO United has won by 2+ goals in 5 of their last 8 home matches. Their attacking metrics show they create 2.3 expected goals per home game while Nkana concedes 1.8 expected goals per away game. ZESCO's home form has been particularly strong this season.",
        time: "Saturday, 14:00",
      },
      {
        id: "bet23",
        match: "Dynamos FC vs Highlanders FC",
        league: "Zimbabwean Premier Soccer League",
        prediction: "Under 2.5 Goals",
        odds: 1.7,
        probability: 68,
        expectedValue: 1.16,
        confidence: 75,
        riskLevel: "Low",
        reasoning:
          "8 of the last 10 matches between these teams have had under 2.5 goals. Both teams have strong defensive metrics with Dynamos conceding 0.8 goals per game and Highlanders 1.0. Tactical analysis suggests a cautious approach from both sides in this rivalry match.",
        time: "Sunday, 15:00",
      },
      {
        id: "bet24",
        match: "TS Galaxy vs AmaZulu FC",
        league: "South African Premier Division",
        prediction: "Draw",
        odds: 3.1,
        probability: 36,
        expectedValue: 1.12,
        confidence: 62,
        riskLevel: "Medium",
        reasoning:
          "4 of the last 7 matches between these evenly matched teams have ended in draws. Both teams have similar xG differentials and are separated by just 3 points in the league. Their head-to-head record shows a tendency for tight, low-scoring matches.",
        time: "Saturday, 16:00",
      },
    ],
  },
]

export function OptimizedBettingTickets() {
  const [activeTicket, setActiveTicket] = useState<string>("ticket1")
  const [expandedBets, setExpandedBets] = useState<string[]>([])

  const toggleBet = (betId: string) => {
    if (expandedBets.includes(betId)) {
      setExpandedBets(expandedBets.filter((id) => id !== betId))
    } else {
      setExpandedBets([...expandedBets, betId])
    }
  }

  const calculateExpectedValue = (ticket: BettingTicket) => {
    // For a 5-bet accumulator, we multiply the individual probabilities
    // and multiply by the total odds, then subtract 1 to get the EV
    const probability = ticket.winProbability / 100
    return (probability * ticket.totalOdds - 1).toFixed(2)
  }

  const getRiskColor = (risk: "Conservative" | "Balanced" | "Aggressive") => {
    switch (risk) {
      case "Conservative":
        return "bg-green-100 text-green-800 border-green-200"
      case "Balanced":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Aggressive":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-muted"
    }
  }

  const getBetRiskColor = (risk: "Low" | "Medium" | "High") => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-amber-100 text-amber-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Optimized Betting Tickets</h2>
        <p className="text-muted-foreground">
          Data-driven betting combinations with positive expected value and optimized risk profiles
        </p>
      </div>

      <Tabs value={activeTicket} onValueChange={setActiveTicket}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ticket1">Conservative</TabsTrigger>
          <TabsTrigger value="ticket2">Balanced</TabsTrigger>
          <TabsTrigger value="ticket3">Aggressive</TabsTrigger>
          <TabsTrigger value="ticket4">Southern African</TabsTrigger>
        </TabsList>

        {bettingTickets.map((ticket) => (
          <TabsContent key={ticket.id} value={ticket.id} className="space-y-4">
            <Card className="cozy-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{ticket.name}</CardTitle>
                    <CardDescription>
                      5-bet combination with {ticket.expectedReturn.toFixed(2)}x expected return
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className={`${getRiskColor(ticket.riskProfile)}`}>
                    {ticket.riskProfile} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-1 p-3 rounded-md bg-muted/50">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      Total Odds
                    </div>
                    <div className="text-2xl font-bold">{ticket.totalOdds.toFixed(2)}</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 rounded-md bg-muted/50">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Percent className="h-4 w-4 mr-1" />
                      Win Probability
                    </div>
                    <div className="text-2xl font-bold">{ticket.winProbability.toFixed(1)}%</div>
                  </div>
                  <div className="flex flex-col space-y-1 p-3 rounded-md bg-muted/50">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calculator className="h-4 w-4 mr-1" />
                      Expected Value
                    </div>
                    <div className="text-2xl font-bold">{calculateExpectedValue(ticket)}</div>
                  </div>
                </div>

                <div className="p-3 rounded-md bg-muted/50">
                  <div className="text-sm font-medium mb-2">Risk Assessment</div>
                  <p className="text-sm text-muted-foreground">{ticket.riskAssessment}</p>
                </div>

                <div className="p-3 rounded-md bg-muted/50">
                  <div className="text-sm font-medium mb-2">Recommended Stake</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Min: ${ticket.recommendedStake.min}</span>
                    <span className="text-sm text-muted-foreground">Max: ${ticket.recommendedStake.max}</span>
                  </div>
                  <Progress
                    value={50}
                    className="h-2 mt-2"
                    indicatorClassName={
                      ticket.riskProfile === "Conservative"
                        ? "bg-green-500"
                        : ticket.riskProfile === "Balanced"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="text-sm font-medium">Selected Bets</div>
                  <Accordion type="multiple" value={expandedBets} className="w-full">
                    {ticket.bets.map((bet) => (
                      <AccordionItem key={bet.id} value={bet.id} className="border rounded-md mb-2 overflow-hidden">
                        <AccordionTrigger onClick={() => toggleBet(bet.id)} className="px-4 py-2 hover:bg-muted/50">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col items-start text-left">
                              <div className="font-medium">{bet.match}</div>
                              <div className="text-xs text-muted-foreground">
                                {bet.league} • {bet.time}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getBetRiskColor(bet.riskLevel)}>{bet.riskLevel} Risk</Badge>
                              <div className="text-lg font-bold">{bet.odds.toFixed(2)}</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Prediction</div>
                              <div>{bet.prediction}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="flex flex-col space-y-1">
                                <div className="text-xs text-muted-foreground">Probability</div>
                                <div className="font-medium">{bet.probability}%</div>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <div className="text-xs text-muted-foreground">Expected Value</div>
                                <div className="font-medium">{bet.expectedValue.toFixed(2)}</div>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <div className="text-xs text-muted-foreground">Confidence</div>
                                <div className="font-medium">{bet.confidence}%</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Data-Driven Reasoning</div>
                              <div className="text-sm p-2 rounded-md bg-muted">{bet.reasoning}</div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Sigma className="h-4 w-4 mr-2" />
                        View Correlation Matrix
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="w-80">
                      <p className="text-sm">
                        The correlation matrix shows how each bet relates to others. Low correlation means diversified
                        risk, which is optimal for accumulators.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Place ${ticket.recommendedStake.min} Bet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="cozy-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Statistical Analysis</CardTitle>
                <CardDescription>Mathematical breakdown of this betting ticket</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Probability Distribution</div>
                    <div className="h-32 bg-muted rounded-md flex items-end p-2">
                      {/* Simple visual representation of probability distribution */}
                      <div className="w-1/5 h-[10%] bg-amber-200 mx-0.5"></div>
                      <div className="w-1/5 h-[20%] bg-amber-300 mx-0.5"></div>
                      <div className="w-1/5 h-[80%] bg-amber-400 mx-0.5"></div>
                      <div className="w-1/5 h-[40%] bg-amber-500 mx-0.5"></div>
                      <div className="w-1/5 h-[15%] bg-amber-600 mx-0.5"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      This distribution shows the probability of different return outcomes. The highest bar represents
                      the most likely scenario.
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Kelly Criterion Analysis</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Optimal Kelly Stake:</span>
                        <span className="font-medium">
                          {(ticket.recommendedStake.min + ticket.recommendedStake.max) / 2}% of bankroll
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Half Kelly (Recommended):</span>
                        <span className="font-medium">
                          {(ticket.recommendedStake.min + ticket.recommendedStake.max) / 4}% of bankroll
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Expected Growth Rate:</span>
                        <span className="font-medium">
                          +
                          {(
                            ticket.winProbability * Math.log(ticket.totalOdds) -
                            (100 - ticket.winProbability) * Math.log(1)
                          ).toFixed(2)}
                          % per bet
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Risk of Ruin (100 bets):</span>
                        <span className="font-medium">
                          {ticket.riskProfile === "Conservative"
                            ? "< 1%"
                            : ticket.riskProfile === "Balanced"
                              ? "~5%"
                              : "~15%"}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Kelly Criterion helps determine the optimal bet size to maximize bankroll growth while minimizing
                      risk of ruin.
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-md bg-muted/50">
                  <div className="text-sm font-medium mb-2">Value Analysis</div>
                  <div className="space-y-2">
                    {ticket.bets.map((bet) => (
                      <div key={bet.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full ${bet.expectedValue >= 1.1 ? "bg-green-500" : bet.expectedValue >= 1.05 ? "bg-amber-500" : "bg-red-500"} mr-2`}
                          ></div>
                          <span>
                            {bet.match.split(" vs ")[0]} vs {bet.match.split(" vs ")[1]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Fair odds: {(100 / bet.probability).toFixed(2)}</span>
                          <span>Market odds: {bet.odds.toFixed(2)}</span>
                          <span
                            className={`font-medium ${bet.expectedValue >= 1.1 ? "text-green-600" : bet.expectedValue >= 1.05 ? "text-amber-600" : "text-red-600"}`}
                          >
                            {((bet.expectedValue - 1) * 100).toFixed(1)}% edge
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Edge percentage represents your mathematical advantage over the bookmaker's odds. Positive edges
                    compound for long-term profitability.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="cozy-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Risk Management Principles</CardTitle>
          <CardDescription>Data science approach to sports betting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-md bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-amber-600" />
                <div className="font-medium">Expected Value</div>
              </div>
              <p className="text-sm">
                All selections have positive expected value (EV &gt; 1.0), meaning the true probability is higher than
                what the odds suggest. This is the foundation of profitable betting.
              </p>
            </div>
            <div className="p-3 rounded-md bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <div className="font-medium">Variance Management</div>
              </div>
              <p className="text-sm">
                Tickets are designed with correlation analysis to minimize variance. Conservative tickets prioritize
                lower variance, while aggressive tickets accept higher variance for greater returns.
              </p>
            </div>
            <div className="p-3 rounded-md bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-4 w-4 text-amber-600" />
                <div className="font-medium">Bankroll Management</div>
              </div>
              <p className="text-sm">
                Recommended stakes follow modified Kelly Criterion to optimize long-term growth while protecting against
                drawdowns. Conservative bettors should use half-Kelly for added safety.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-md bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-4 w-4 text-green-600" />
              <div className="font-medium text-green-800">Data Scientist's Note</div>
            </div>
            <p className="text-sm text-green-800">
              These tickets are optimized using advanced statistical models that analyze historical data, current form,
              and market inefficiencies. While no betting system guarantees profits, this approach provides a
              mathematical edge over time. Remember that variance is inevitable in the short term, but positive expected
              value prevails in the long run. Always bet responsibly and within your means.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
