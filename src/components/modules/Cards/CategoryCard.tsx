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

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="w-full group rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md">
      <CardContent className="p-0 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold capitalize group-hover:text-primary transition">
            {category?.name}
          </h3>

          <Badge variant="secondary">
            {category?._count?.tutors} Tutors
          </Badge>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>📚 {category?._count?.bookings} Bookings</span>
        </div>

        {/* Footer */}
        <div className="w-1/3 flex flex-col lg:flex-row gap-2 justify-between">
        <Link href={`/admin-dashboard/categories/${category?.id}`}><Button>update</Button></Link>
        <DeleteCategoryButton categoryId={category?.id}></DeleteCategoryButton>
        </div>
       
        
      </CardContent>
    </Card>
  )
}
