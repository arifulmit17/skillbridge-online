"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function ReviewInput({
  tutorId,
  userId,
  
}: {
  tutorId: string
  userId: string
  
}) {
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating || !comment) {
      toast.error("Rating and comment are required")
      return
    }

    try {
      setLoading(true)
      const payload = {
  tutorId,
  userId,
  rating,
  comment,
}

// console.log("Sending review payload:", payload)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.message || "Failed to submit review")
      }else{
       toast.success("Review submitted successfully")
      }

      setRating("")
      setComment("")
      
    } catch (err: unknown) {
  if (err instanceof Error) {
    toast.error(err.message)
  } else {
    toast.error("Something went wrong")
  }
    }finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <Input
            type="number"
            min={1}
            max={5}
            placeholder="Rating (1–5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          {/* Comment */}
          <Textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

