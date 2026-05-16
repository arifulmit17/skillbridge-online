"use client"
import { Button } from '@/components/ui/button'
import { deleteSession } from '@/services/booking.service';

import React from 'react'
import { toast } from 'sonner';

const handleDelete=async  (sessionId:string)=>{
  // console.log(sessionId);
 toast(`Deleting session with ID: ${sessionId}` );
  // Implement deletion logic here
  const res =await deleteSession(sessionId)
   if(res.data){
    toast.success("session deleted successfully");
   }
    if(res.error){
      toast.error("Failed to delete session:", data.error);
    }
}

export default function DeleteButton({ sessionId }: { sessionId: string }) {
  return (
    <div>
        <Button onClick={()=>handleDelete(sessionId)} size="sm" variant="outline">
                Delete
              </Button>
    </div>
  )
}
