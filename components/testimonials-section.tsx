"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Star, ThumbsUp, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for testimonials
const testimonials = [
  {
    id: "1",
    name: "Michael Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Professional Bettor",
    site: "BetExpert",
    rating: 5,
    date: "March 15, 2025",
    content:
      "I've been using BetExpert for over 3 years now and their Premier League predictions are consistently the most accurate I've found. Their statistical approach has helped me maintain a 15% ROI over the long term.",
    helpful: 128,
    verified: true,
  },
  {
    id: "2",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Sports Analyst",
    site: "OddsPortal",
    rating: 5,
    date: "February 22, 2025",
    content:
      "OddsPortal's value bet finder is exceptional. Their algorithm for identifying mispriced odds has completely transformed my betting strategy. I've been able to find consistent value, especially in less popular leagues where bookmakers sometimes misprice matches.",
    helpful: 95,
    verified: true,
  },
  {
    id: "3",
    name: "David Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Casual Bettor",
    site: "FootyStats",
    rating: 4,
    date: "April 3, 2025",
    content:
      "FootyStats has been my go-to for underdog picks. Their detailed statistical breakdowns help me understand why certain underdogs have a better chance than the odds suggest. I've hit some big wins following their advice on Bundesliga matches.",
    helpful: 76,
    verified: true,
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Football Coach",
    site: "WhoScored",
    rating: 4,
    date: "January 18, 2025",
    content:
      "As a coach, I appreciate WhoScored's player-focused approach to predictions. Their analysis of individual matchups often reveals betting opportunities that more general sites miss. Their Serie A coverage is particularly strong.",
    helpful: 62,
    verified: true,
  },
  {
    id: "5",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Data Scientist",
    site: "BetRadar",
    rating: 5,
    date: "March 30, 2025",
    content:
      "BetRadar's recent algorithm improvements are impressive. Their in-play prediction model now accounts for momentum shifts in a way that's genuinely useful for live betting. I've seen a significant improvement in their accuracy over the last few months.",
    helpful: 54,
    verified: false,
  },
  {
    id: "6",
    name: "Olivia Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Sports Journalist",
    site: "SoccerStats",
    rating: 4,
    date: "February 5, 2025",
    content:
      "SoccerStats has the most comprehensive historical database I've found. Their head-to-head analysis often reveals patterns that influence my betting decisions. Their over/under market predictions have been particularly profitable for me.",
    helpful: 48,
    verified: true,
  },
]

export function TestimonialsSection() {
  const [page, setPage] = useState(0)
  const testimonialsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  const displayedTestimonials = testimonials.slice(page * testimonialsPerPage, (page + 1) * testimonialsPerPage)

  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="space-y-6">
      <Card className="cozy-shadow">
        <CardHeader>
          <CardTitle>User Testimonials</CardTitle>
          <CardDescription>
            Real experiences from users who have followed predictions from these betting sites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {displayedTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full flex flex-col cozy-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                    {testimonial.verified && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                        Verified User
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">{testimonial.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge>{testimonial.site}</Badge>
                  </div>
                  <div className="relative">
                    <Quote className="h-6 w-6 text-muted-foreground/20 absolute -top-2 -left-2" />
                    <p className="text-sm pl-4">{testimonial.content}</p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{testimonial.helpful} found helpful</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={page === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </div>
          <Button variant="outline" size="icon" onClick={nextPage} disabled={page === totalPages - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="cozy-shadow">
        <CardHeader>
          <CardTitle>Submit Your Experience</CardTitle>
          <CardDescription>Share your own experience with betting prediction sites</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Help other users by sharing your experiences with prediction sites. Your feedback helps us maintain accurate
            rankings and identify the most reliable sources.
          </p>
          <Button>Submit a Testimonial</Button>
        </CardContent>
      </Card>
    </div>
  )
}
