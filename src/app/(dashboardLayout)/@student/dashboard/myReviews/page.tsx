export const dynamic = "force-dynamic"
import ReviewCard from '@/components/modules/Cards/ReviewCard';
import { reviewsService } from '@/services/reviews.service';
import { userService } from '@/services/user.service';
import React from 'react'
type Review = {
  id: string
  tutorId: string
  userId: string
  rating: string
  comment: string
  createdAt: string
}
export default async function page() {
     const {data:user}=await userService?.getSession()
            const  myId=user?.session?.userId;
            // console.log(myId);
            const {data:review}=await reviewsService?.getAllReviews();
            const userReview=await review?.json()
            const myReviews=userReview?.filter((b:Review) => b?.userId === myId);
            
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
  {Array.isArray(myReviews) && myReviews?.length > 0 ? (
    myReviews?.map((review: Review) => (
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
