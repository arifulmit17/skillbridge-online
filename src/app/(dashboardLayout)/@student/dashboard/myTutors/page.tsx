export const dynamic = "force-dynamic"
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';
import TutorProfile from '@/components/modules/pages/TutorProfile';
import React from 'react'


type Tutor = {
  id: string
  subject: string
  price: string
  isFeatured: boolean
  status: "ACTIVE" | "INACTIVE"
  createdAt?: string
  user: {
    name: string
    email: string
    image: string
    role: string
    status: string
  }
}
export default async function MyTutors() {
    const {data:user}=await userService?.getSession()
        const  myId=user?.session?.userId;
        // console.log(myId);
        const {data:tutor}=await tutorService?.getTutorByUserId(myId);
        // console.log(tutor);
  return (
    <div>
  {Array.isArray(tutor) && tutor?.length > 0 ? (
    tutor?.map((t: Tutor) => (
      <TutorProfile key={t?.id} tutor={t} />
    ))
  ) : (
    <div className="text-center py-10 text-muted-foreground">
      <p className="text-lg font-medium">No tutor profile found</p>
      <p className="text-sm">
        This tutor profile is not available or has not been created yet.
      </p>
    </div>
  )}
</div>

  )
}
