"use client"
import { Button } from '@/components/ui/button'
import { userService2 } from '@/services/user2.service';
import { toast } from 'sonner';





const handleComplete=async (userId:string,status )=>{
     toast(`Updating user with ID: ${userId}` );
      // Implement deletion logic here
      const data =await userService2.updateUser(userId,{ status })
       if(data.data){
        toast.success("user updated successfully");
       }
        if(data.error){
          toast.error("Failed to update user:", data.error);
        }
}

export default function BanButton({ userId }: { userId: string }) {
  return (
    <div className='w-1/3 flex justify-between'>
        <Button onClick={() => handleComplete(userId, "Banned")} size="sm">
                Ban
              </Button>
        <Button onClick={() => handleComplete(userId, "Unbanned")} size="sm">
                UnBan
              </Button>
    </div>
  )
}
