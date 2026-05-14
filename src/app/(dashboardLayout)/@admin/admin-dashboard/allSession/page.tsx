export const dynamic = "force-dynamic"
import { SessionCard } from '@/components/modules/Cards/SessionCard';
import { bookingService } from '@/services/booking.service';
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


export default async function Allsessionpage() {
  const sessionsData=await bookingService?.getAllSessions();
      const sessions=await sessionsData?.data?.json();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
  {Array.isArray(sessions) && sessions?.length > 0 ? (
    sessions?.map((session: Session) => (
      <SessionCard key={session?.id} session={session} />
    ))
  ) : (
    <p className="col-span-1 lg:col-span-2 text-center text-muted-foreground">
      No sessions available
    </p>
  )}
</div>

  )
}
