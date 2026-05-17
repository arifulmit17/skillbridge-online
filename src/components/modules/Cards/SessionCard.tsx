import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import DeleteButton from "../shared/DeleteButton"
import CompleteButton from "../shared/CompleteButton"

import BookingButton from "../shared/BookingButton"

import { tutorService } from "@/services/tutor.service"
import ReviewInput from "../shared/ReviewInput"
import { Button } from "@/components/ui/button"
import CancelBooking from "../shared/CancelBooking"
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




export async function  SessionCard({ session }: { session: Session }) {
  console?.log("session: ", session);
  const tutorId=session?.tutor?.userId
  const SessionStatus=session?.status
  
 
   const tutorData=await tutorService?.getTutorByUserId(tutorId)
   const tutorName=tutorData?.data?.user?.name
  const start = session?.startTime
  const end =session?.endTime
  const sessionStudentID=session?.studentId
      const data = await  getUser();
       
    const role= data?.role
    const userId=data?.id
    const userName=data?.name
    let booked=false
    
    
    // const {data?:teachingSession}=await bookingService?.getAllSessions()
    //  const teaching=await teachingSession?.json()
    if(userId==sessionStudentID){
       booked=true
    }
    
  // const durationHours =
  //   (end - start) / (1000 * 60 * 60)

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  }[session?.status]

  return (
    <Card className="max-w-md rounded-2xl bg-card border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">

  <CardHeader className="flex flex-row items-center justify-between px-5 py-4 border-b">
    <CardTitle className="text-lg font-semibold text-card-foreground">
      Tutoring Session by {tutorName}
    </CardTitle>

    <span
      className={`rounded-full px-3 py-1 text-xs font-medium border ${statusColor}`}
    >
      {session?.status}
    </span>
  </CardHeader>

  <CardContent className="px-5 py-5 space-y-4 text-sm text-card-foreground">

    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-card-foreground/70">
        Session date
      </p>
      <p className="font-medium">Today</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-card-foreground/70">
          Start
        </p>
        <p className="font-medium">{start?.toLocaleString()}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-card-foreground/70">
          End
        </p>
        <p className="font-medium">{end?.toLocaleString()}</p>
      </div>
    </div>

    {userId == sessionStudentID && (
      <div className="text-xs font-medium border rounded-lg px-3 py-2">
        Session booked by {userName}
      </div>
    )}

    <div className="flex flex-col gap-3 pt-4 border-t">

      {role == "admin" && (
        <DeleteButton sessionId={session?.id} />
      )}

      {session?.status === "PENDING" && (
        <>
          <CancelBooking
            slotId={session?.availabilitySlotId}
            sessionId={session?.id}
          />

          {!booked && (
            <BookingButton
              studentId={data?.id}
              sessionId={session?.id}
              slotId={session?.availabilitySlotId}
            />
          )}

          {booked && (
            <CompleteButton sessionId={session?.id} />
          )}
        </>
      )}

      {session?.status === "COMPLETED" &&
        userId == sessionStudentID && (
          <div className="border rounded-lg p-4">
            <h1 className="font-semibold mb-2 text-sm">
              Give your review
            </h1>
            <ReviewInput
              tutorId={session?.tutorId}
              userId={data?.id}
            />
          </div>
        )}
    </div>

  </CardContent>
</Card>

  )
}
