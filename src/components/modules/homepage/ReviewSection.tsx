import { reviewsService } from '@/services/reviews.service'
import React from 'react'
import ReviewCard from '../Cards/ReviewCard'

type Review = {
  id: string
  tutorId: string
  userId: string
  rating: string
  comment: string
  createdAt: string
}

export default async function ReviewSection() {
    const { data: reviewsRes } = await reviewsService?.getAllReviews()
    
    const reviews = reviewsRes ? await reviewsRes.json() : []
    
  return (
     <div className="w-11/12 grid grid-cols-1 lg:grid-cols-3 gap-5">
      {Array.isArray(reviews) && reviews?.length > 0 ? (
        reviews?.map((review: Review) => (
          <ReviewCard key={review?.id} review={review} />
        ))
      ) : (
        <p className="col-span-1 lg:col-span-2 text-center text-muted-foreground">
          No reviews available. Book a session to leave a review.
        </p>
      )}
    </div>
  )
}
