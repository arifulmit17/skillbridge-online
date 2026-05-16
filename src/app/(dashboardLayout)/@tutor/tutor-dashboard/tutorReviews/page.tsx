import ReviewCard from '@/components/modules/Cards/ReviewCard';
import ReviewPage from '@/components/modules/pages/Reviewpage';
import { getUser } from '@/services/auth.service';
import { getAllReviews } from '@/services/reviews.service';
import { tutorService } from '@/services/tutor.service';
type Review = {
  id: string
  tutorId: string
  userId: string
  rating: string
  comment: string
  createdAt: string
}

export default async function TutorReviewsPage() {
    const {data:user}=await getUser()
    const tutor=await tutorService?.getTutorByUserId(user?.session?.userId)
    // console.log(tutor);
    const reviews=await getAllReviews()
    
    const data= reviews?.data;
    // console.log(data);
    // const filteredReviews=data?.filter((review:Review)=>review?.tutorId===tutor?.data?.id)
    const filteredReviews = data?.filter((review: Review) => {
  // console.log("Review object:", review);
  // console.log("review.tutorId:", review?.tutorId);
  // console.log("tutor.data.id:", tutor?.data.id);
  // console.log(
  //   "Match?",
  //   review?.tutorId === tutor?.data?.id
  // );

  return review?.tutorId === tutor?.data?.id;
});
    // console.log(filteredReviews);
    
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
  {Array.isArray(filteredReviews) && filteredReviews?.length > 0 ? (
    filteredReviews?.map((review: Review) => (
  
         <ReviewCard key={review?.id} review={review} />

      
    ))
  ) : (
    <div className="text-center py-10 text-muted-foreground">
      <p className="text-lg font-medium">No reviews yet</p>
      <p className="text-sm">
        This tutor hasn’t received any reviews so far.
      </p>
    </div>
  )}
</div>

  )
}
