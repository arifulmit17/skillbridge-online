export const dynamic = "force-dynamic"
import { SessionCard } from '@/components/modules/Cards/SessionCard';
import { bookingService } from '@/services/booking.service'
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


export default async function MyBookingPage() {
    const {data:user}=await userService?.getSession()
    const  myId=user?.session?.userId;
    const {data}=await bookingService?.getAllSessions()
    const booking=await data?.json()
    
    const myBookings = booking?.filter((b:Session) => b?.studentId === myId);
    
  return (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
  {Array.isArray(myBookings) && myBookings?.length > 0 ? (
    myBookings?.map((session: Session) => (
      <SessionCard key={session?.id} session={session} />
    ))
  ) : (
    <div className="col-span-1 lg:col-span-2 text-center py-10 text-muted-foreground">
      <p className="text-lg font-medium">No sessions found</p>
      <p className="text-sm">
        You don’t have any bookings yet. Please book a session.
      </p>
    </div>
  )}
</div>


  )
}
