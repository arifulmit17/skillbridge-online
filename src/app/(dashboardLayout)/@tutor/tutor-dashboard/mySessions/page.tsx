import { SessionCard } from '@/components/modules/Cards/SessionCard';
import { bookingService } from '@/services/booking.service';
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';
import React from 'react'
type User = {
  id: string
  name: string
  email: string
  image: string | null
  role: string
  status: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

type Tutor = {
  id: string
  userId: string
  subject: string
  price: string
  status: string
  isFeatured: boolean
  categoryId: string
  createdAt: string
  updatedAt: string
}

type Session = {
  id: string
  tutorId: string
  studentId: string
  categoryId: string
  availabilitySlotId?: string
  startTime: string // just time in HH:mm format
  endTime: string   // just time in HH:mm format
  status: "PENDING" | "COMPLETED" | "CANCELLED"
  createdAt: string
  updatedAt: string
  student: User
  tutor: Tutor
}

type AvailabilitySlot = {
  id: string
  dayOfWeek: string
  isAvailable: boolean
  isBooked: boolean
}

export default async function MySessions() {
     const {data:user}=await userService?.getSession()
    const  myId=user?.session?.userId;
    const {data:tutor}=await tutorService?.getTutorByUserId(myId);
    const authorId=tutor?.id;
    const sessionsData=await bookingService?.getAllSessions();
    const sessions=await sessionsData?.data?.json();
    const mySessions=sessions?.filter((session:Session)=>session?.tutorId===authorId);
  return (
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
  {Array.isArray(mySessions) && mySessions?.length > 0 ? (
    mySessions?.map((session: Session) => (
      <SessionCard key={session?.id} session={session} />
    ))
  ) : (
    <div className="text-center py-10 text-muted-foreground">
      <p className="text-lg font-medium">No sessions found</p>
      <p className="text-sm">
        You don’t have any sessions yet.
      </p>
    </div>
  )}
</div>
)
}