export const dynamic = "force-dynamic"
import TutorCard from '@/components/modules/Cards/TutorCard';
import { tutorService } from '@/services/tutor.service';
import React from 'react'
type Tutor = {
  id: string
  subject: string
  price: string
  isFeatured: boolean
  status: "ACTIVE" | "INACTIVE"
  user: {
    name: string
    email: string
    image: string
  }
  category: {
    name: string
  }
  reviews: {
    rating: number
    comment: string
  }[]
}
export  default async function AllTutorpage() {
    const {data}=await tutorService?.getTutor();
     
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
  {Array.isArray(data) && data?.length > 0 ? (
    data?.map((tutor: Tutor) => (
      <TutorCard key={tutor?.id} tutor={tutor} />
    ))
  ) : (
    <p className="col-span-1 lg:col-span-2 text-center text-muted-foreground">
      No tutors found
    </p>
  )}
</div>

  )
}
