"use client"
import { Button } from "@/components/ui/button";
import { availabilityService } from "@/services/availability.service";
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";

type BookingButtonProps = {
  studentId: string
  sessionId: string
  slotId:string
}
export default function BookingButton({studentId,
  sessionId,slotId
}: BookingButtonProps) {

  const handleBooking= async(studentId:string,sessionId :string,slotId: string)=>{
      console.log("student id: ",studentId,"session id:",sessionId);
       
       const {res}= await bookingService.updateSession(sessionId,{studentId})
       const {res2}= await availabilityService.updateSlot(slotId,{isBooked:true})
      if(res && res2){
        toast.success("Session booked successfully")
      }
       
  }
  return (
    <div>
        <Button onClick={()=>handleBooking(studentId,sessionId,slotId)}> Book Session</Button>
    </div>
  )
}
