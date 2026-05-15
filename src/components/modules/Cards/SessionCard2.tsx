import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import { userService } from "@/services/user.service"
import { tutorService } from "@/services/tutor.service"
import BookingButton from "../shared/BookingButton"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUser } from "@/services/auth.service"


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



export async function  SessionCard2({ session }: { session: Session }) {
  
  const tutorId=session?.tutor?.userId
  const SessionStatus=session?.status
  
 
   const tutorData=await tutorService?.getTutorByUserId(tutorId)
   const tutorName=tutorData?.data?.data?.user?.name
  //  console.log(tutorData);
   
  const start = session?.startTime
  const end = session?.endTime
  const sessionID=session?.studentId
      const { data } = await  getUser();
       
    const role= data?.user?.role
    const userId=data?.user?.id
    const userName=session?.student?.name
    let booked=false
    // const {data:teachingSession}=await bookingService?.getAllSessions()
    //  const teaching=await teachingSession?.json()
    if(userId==sessionID){
       booked=true
    }
  

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  }[session?.status]

  return (
    <Card >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Tutoring Session by {tutorName}</CardTitle>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
        >
          {session?.status}
        </span>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground">Start</p>
          <p>{start?.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-muted-foreground">End</p>
          <p>{end?.toLocaleString()}</p>
        </div>

        
         {userName ? <h1>Session is Booked by {userName}</h1>: <h1>Session is not booked yet</h1>}
         {!booked && (role === "student" || role === "Student") && <BookingButton
                       studentId={data?.user?.id}
                       sessionId={session?.id}
                       slotId={session?.availabilitySlotId}
                     />}
        
      </CardContent>
    </Card>
  )
}
