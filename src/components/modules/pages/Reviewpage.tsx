import { userService2 } from "@/services/user2.service"
import { Star } from "lucide-react"

type Review = {
  id: string
  tutorId: string
  userId: string
  rating: string
  comment: string
  createdAt: string
}
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}


export default async function ReviewPage({ review }: { review: Review }) {
  const data=await userService2.getAllUser()
  const student=data?.data.filter(user=>user.id==review.userId)

 

  return (
    <div className="max-h-screen bg-muted/30 px-6 py-5">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white border p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold"> Review given by student {student[0].name}</h1>
          <span className="text-sm text-muted-foreground">
            {new Date(review.createdAt).toDateString()}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-6 flex items-center gap-2">
          <StarRating rating={Number(review.rating)} />
          <span className="text-sm text-muted-foreground">
            {review.rating} / 5
          </span>
        </div>

        {/* Comment */}
        <p className="mt-6 text-base leading-relaxed text-gray-700">
          “{review.comment}”
        </p>

        
      </div>
    </div>
  )
}
