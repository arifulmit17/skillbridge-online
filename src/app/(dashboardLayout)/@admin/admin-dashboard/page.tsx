import { getUser } from "@/services/auth.service";
import { bookingService } from "@/services/booking.service";
import { getAllCategories } from "@/services/categories.service";

import { reviewsService } from "@/services/reviews.service";
import { userService2 } from "@/services/user2.service";

export const dynamic = "force-dynamic"
export default async function AdminDashboard() {

  const {data:users}=await userService2?.getAllUser()
  console.log(users);
  const tutor=users?.data.filter(user=>user?.role==="tutor")
  const student=users?.data.filter(user=>user?.role==="student"||user?.role==="Student")
  const {data:sessions}=await bookingService?.getAllSessions()
  const Sessions=await sessions.json()
  const sessionlength=Array.isArray(Sessions) ? Sessions?.length : 0
  const {data:cats}=await getAllCategories()
  
  const Cats=cats
  const Catlength=Array.isArray(Cats) ? Cats?.length : 0
  const { data: reviewsRes } = await reviewsService?.getAllReviews()

const reviews = reviewsRes ? await reviewsRes.json() : []
const reviewLength = Array.isArray(reviews) ? reviews?.length : 0

 
 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  <div className="rounded-xl border bg-card p-6 shadow-sm">
    <p className="text-sm text-muted-foreground">Total Users</p>
    <h2 className="mt-2 text-3xl font-bold">{users?.data?.length}</h2>
  </div>
  <div className="rounded-xl border bg-card p-6 shadow-sm">
    <p className="text-sm text-muted-foreground">Total Tutor</p>
    <h2 className="mt-2 text-3xl font-bold">{tutor?.length}</h2>
  </div>
  <div className="rounded-xl border bg-card p-6 shadow-sm">
    <p className="text-sm text-muted-foreground">Total Student</p>
    <h2 className="mt-2 text-3xl font-bold">{student?.length}</h2>
  </div>

  <div className="rounded-xl border bg-card p-6 shadow-sm">
    <p className="text-sm text-muted-foreground">Total Sessions</p>
    <h2 className="mt-2 text-3xl font-bold">{sessionlength}</h2>
  </div>

  <div className="rounded-xl border bg-card p-6 shadow-sm">
    <p className="text-sm text-muted-foreground">Total Categories</p>
    <h2 className="mt-2 text-3xl font-bold">{Catlength}</h2>
  </div>
  <div className="rounded-xl border bg-card p-6 shadow-sm">
    <p className="text-sm text-muted-foreground">Total Reviews</p>
    <h2 className="mt-2 text-3xl font-bold">{reviewLength}</h2>
  </div>
</div>

  );
}