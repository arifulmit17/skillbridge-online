"use client"
import { Button } from '@/components/ui/button'
import { bookingService } from '@/services/booking.service';
import React from 'react'
import { toast } from 'sonner';

const handleComplete=async (sessionId:string,status: "COMPLETED")=>{
     toast(`Updating session with ID: ${sessionId}` );
      // Implement deletion logic here
      const data =await bookingService.updateSession(sessionId,{ status })
       if(data.data){
        toast.success("session updated successfully");
       }
        if(data.error){
          toast.error("Failed to update session:", data.error);
        }
}

export default function CompleteButton({ sessionId }: { sessionId: string }) {
  return (
    <div>
        <Button onClick={() => handleComplete(sessionId, "COMPLETED")} size="sm">
                Mark Complete
              </Button>
    </div>
  )
}
