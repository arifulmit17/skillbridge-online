import { tutorService } from '@/services/tutor.service'
import React from 'react'
import TutorCard from '../Cards/TutorCard';

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
export default async function FeaturedTutor() {
  const data=await tutorService?.getTutor({
      isFeatured: true,
    },)
  
  return (
    <div className='w-11/12 grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {data?.data?.map((tutor:Tutor)=><TutorCard key={tutor?.id} tutor={tutor}></TutorCard>)}
    </div>
  )
}
