"use client"
import { Button } from '@/components/ui/button'
import { updateSlot } from '@/services/availability.service';

import { bookingService } from '@/services/booking.service';
import { UpdateSlotData } from '@/types/slot.type';
import { toast } from 'sonner';

const handleUpdate=async  (slotId:string,data:UpdateSlotData,sessionId:string)=>{
//   console.log(slotId,data);
 toast(`Updating slot with ID: ${slotId}` );
  // Implement deletion logic here
  const res =await updateSlot(slotId,data)
  const res2 =await bookingService.updateSession(sessionId,{studentId:null})
   if(res.data){
    toast.success("slot updated successfully");
   }
    if(res.error){
      toast.error("Failed to update slot:", data.error);
    }
}

export default function CancelBooking({ slotId,sessionId }: { slotId: string,sessionId:string }) {
  return (
    <div>
        <Button onClick={()=>handleUpdate(slotId,{ isBooked: false },sessionId)} size="sm" variant="outline">
                Cancel
              </Button>
    </div>
  )
}

