import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DeleteCategoryButton from "../shared/DeleteCategoryButton"

type CategoryCardProps = {
  category: {
    id: string
    name: string
    _count: {
      tutors: number
      bookings: number
    }
  }
}

export function CategoryCard2({ category }: CategoryCardProps) {
  return (
   <Card className="w-full group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

  {/* Subtle gradient overlay */}
  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

  <CardContent className="relative p-0 space-y-4">
    
    {/* Header */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold capitalize tracking-tight transition-colors group-hover:text-primary">
          {category?.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Explore tutors and sessions
        </p>
      </div>

      <Badge 
        variant="secondary" 
        className="bg-secondary/80 text-secondary-foreground backdrop-blur-sm border border-border"
      >
        {category?._count?.tutors} Tutors
      </Badge>
    </div>

    {/* Divider */}
    <div className="h-px bg-border" />

    {/* Meta */}
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-base">📚</span>
        <span>{category?._count?.bookings} Bookings</span>
      </div>

      {/* CTA */}
      <span className="text-xs font-medium text-primary opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        View →
      </span>
    </div>

  </CardContent>
</Card>
  )
}
