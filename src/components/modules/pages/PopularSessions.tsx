

import { bookingService } from '@/services/booking.service';
import { SessionCard2 } from '../Cards/SessionCard2';
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

export default async function  PopularSessions() {
    const sessionsData=await bookingService.getAllSessions();
          const sessions=await sessionsData.data.json();
          const pendingSessions = sessions?.filter(
  (session:Session) => session.status === "PENDING"
) ?? []



  return (
    <div className='w-11/12 grid grid-cols-1 lg:grid-cols-3 gap-5'>
            {pendingSessions.length === 0 ? <p>No sessions available.</p> : 
                    pendingSessions?.slice(0,3).map((session:Session)=>(<SessionCard2 key={session.id} session={session}></SessionCard2>))}
        </div>
  )
}
