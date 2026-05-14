import { tutorService } from '@/services/tutor.service';
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

export default async function GetAllTutor() {
    const {data}=await tutorService?.getTutor();
  return (
    <div>
        {
 data?.map((tutor:Tutor)=><TutorCard key={tutor?.id} tutor={tutor}></TutorCard>)
        }
      
    </div>
  )
}
