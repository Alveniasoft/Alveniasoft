import Link from "next/link"
import { BarChart3, BellRing, Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNav } from "@/components/mobile-nav"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 cozy-shadow">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-foreground/80">
            Dashboard
          </Link>
          <Link href="/accuracy" className="font-medium transition-colors hover:text-foreground/80">
            Accuracy Rankings
          </Link>
          <Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-foreground/80">
            Predictions
          </Link>
          <Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-foreground/80">
            Leagues
          </Link>
          <Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-foreground/80">
            Bookmakers
          </Link>
        </nav>
        <div className="flex items-center ml-auto gap-2">
          <form className="hidden md:flex items-center relative">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search matches..." className="w-[200px] lg:w-[300px] pl-8" />
          </form>
          <Button variant="ghost" size="icon" className="relative">
            <BellRing className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-600"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <BarChart3 className="h-5 w-5" />
            <span className="sr-only">Analytics</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
